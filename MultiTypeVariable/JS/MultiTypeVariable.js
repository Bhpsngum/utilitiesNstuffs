;(function(){
  var types = ["object","string","number","array","symbol","boolean","multi","function","bigint"], nullish = ["null","undefined"], all_types = [...types, ...nullish], isNullish = function(type) {
    return nullish.indexOf(type) != -1
  }, isType = function isType (value, type) {
    return getType(value) == checkType(type)
  }, getType = function getType (value) {
    var type = typeof value;
    if (type == "object") switch (true) {
      case value === null: return "null";
      case Array.isArray(value): return "array";
      case value instanceof MultiType: return "multi";
      default: return type;
    }
    return type;
  }, throwError = function(name,args,isMore) {
    if (args.length === 0) throw new TypeError(`Failed to execute '${name}' on 'MultiType':${isMore?" at least":""} 1 argument required, but only 0 present.`);
  }, checkEmpty = function(obj) {
    for (let i of types) if (isType(obj[i], i)) return false;
    for (let i of nullish) if (obj[i] === true) return false;
    return true
  }, checkType = function(type) {
    var t = (type || "").toString().toLowerCase();
    if (all_types.indexOf(t) == -1) throw new TypeError("Invalid variable type");
    return t
  }, setValue = function(obj,values) {
    for (let value of values) {
      var type = getType(value);
      if (isNullish(type)) obj[type] = true;
      else obj[type] = value;
    }
  }, multiType = function MultiType() {
    let t = nullish.reduce(function(a,b){return a[b]=false,a},{});
    setValue(t,arguments);
    Object.assign(this, {
      set: function set () {
        throwError("set",arguments,true);
        setValue(t,arguments);
      },
      get: function get (type) {
        throwError("get",arguments);
        type = checkType(type);
        return t[type]
      },
      delete: function () {
        throwError("delete",arguments,true);
        for (let type of arguments) {
          type = checkType(type);
          if (isNullish(type)) t[type] = false;
          else delete t[type];
        }
      },
      clear: function clear () {
        for (let i of types) delete t[i];
        for (let i of nullish) t[i] = false;
      },
      has: function has (type) {
        throwError("has",arguments);
        type = checkType(type);
        if (isNullish(type)) return t[type] === true;
        return isType(t[type], type)
      },
      toString: function toString () {
        let y = t.string;
        return isType(y,"string")?y:this.toJSON()
      },
      valueOf: function valueOf () {
        for (let type of ["number","bigint","string","boolean","array","multi","function","symbol","object"]) try{ if (isType(t[type],type) && isType(+t[type],"number")) return t[type] } catch (e) {}
        return null
      },
      toJSON: function toJSON () {
        var json = {};
        for (let i of types) try {
          if (isType(t[i],i)) {
            switch(i) {
              case "multi":
                let f = {class:"MultiType"};
                if (t[i]==this) f.circular=true;
                else f = JSON.parse(JSON.stringify(t[i]));
                json[i] = f;
                break;
              case "bigint":
                json[i] = {class: "BigInt", value: t[i].toString()}
                break;
              case "symbol":
                json[i] = {class: "Symbol", description: t[i].description}
                break;
              default:
                json[i] = t[i];
            }
          }
        } catch(e) {}
        for (let i of nullish) if (t[i] == true) json[i] = true;
        return {class:"MultiType",values:json};
      }
    });
    for (let i of types) Object.defineProperty(this, i, {
      get() {return isType(t[i], i)?t[i]:void 0}
    });
    Object.defineProperty(this, 'isEmpty', {
      get() {return checkEmpty(t)}
    })
  }, proto = {};
  var MultiType = function MultiType () {
    let m = new multiType(...arguments);
    Object.setPrototypeOf(m, proto);
    if (new.target != void 0) Object.assign(this, m);
    return m;
  }
  Object.assign(proto, new MultiType);
  proto.constructor = MultiType;
  Object.defineProperties(proto, {
    [Symbol.toStringTag]: {
      value: "MultiType"
    }
  });
  var getRepresentative = function getRepresentative (type) {
    return [{},"",0,[],Symbol(),false,new MultiType,function(){},0n,null,undefined][all_types.indexOf(checkType(type))]
  }
  var parseJSON = function parseJSON (json) {
    json = JSON.parse(json);
    let m = new MultiType(), circular = false;
    if (json.class == "MultiType" && json.values && typeof json.values == "object") {
      for (let i of types) try {
        if (json.values.hasOwnProperty(i)) {
          let v = json.values[i];
          switch (i) {
            case "multi":
              if (v.class == "MultiType") {
                if (v.circular === true) m.set(m);
                else m.set(parseJSON(JSON.stringify(v)))
              }
              break;
            case "bigint":
              if (v.class == "BigInt") m.set(BigInt(v.value));
              break;
            case "symbol":
              if (v.class == "Symbol") m.set(Symbol(v.description));
              break;
            default:
              if (isType(v, i)) m.set(v)
          }
        }
      } catch(e) {}
      for (let i of nullish) if (json.values[i] === true) m.set(getRepresentative(i));
    }
    return m;
  }
  MultiType.prototype = proto;
  MultiType.getType = getType;
  MultiType.isType = isType;
  MultiType.getRepresentative = getRepresentative;
  MultiType.parseJSON = parseJSON;
  window.MultiType = MultiType
})();
