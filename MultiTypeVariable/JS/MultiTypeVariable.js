;(function(){
  var types = ["object","string","number","array","symbol","boolean","multi","function","bigint"], nullish = ["null","undefined"], all_types = [...types, ...nullish], isNullish = function(type) {
    return nullish.indexOf(type) != -1
  }, getType = function getType (value) {
    var type = typeof value;
    if (type == "object") {
      if (value instanceof [].constructor) return "array";
      if (value === null) return "null";
      if (value instanceof MultiType) return "multi";
      return type;
    }
    return type;
  }, throwError = function(name,args,isMore) {
    if (args.length === 0) throw new TypeError(`Failed to execute '${name}' on 'MultiType':${isMore?" at least":""} 1 argument required, but only 0 present.`);
  }, checkEmpty = function(obj) {
    var t = [];
    for (let i of types) {
      let check = getType(obj[i]) == i;
      if (!check) delete obj[i];
      t.push(Number(check));
    }
    for (let i of nullish) t.push(obj[i] === true);
    return !Math.max(...t)
  }, checkType = function(type) {
    var t = (type || "").toString().toLowerCase();
    if (all_types.indexOf(t) == -1) throw new TypeError("Unknown variable type");
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
        return getType(t[type]) == type;
      },
      toString: function toString () {
        let y = t.string;
        return typeof y == "string"?y:JSON.stringify(this);
      },
      valueOf: function valueOf () {
        let n = t.number;
        return typeof n == "number"?n:this;
      },
      toJSON: function toJSON () {
        var json = {};
        for (let i of types) try {
          if (t[i] !== void 0) {
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
      get() {return t[i]}
    });
    Object.defineProperty(this, 'isEmpty', {
      get() {return checkEmpty(t)}
    })
  }, proto = {};
  var MultiType = function MultiType () {
    let m = new multiType(...arguments);
    Object.setPrototypeOf(m, proto);
    if (new.target != undefined) Object.assign(this, m);
    return m;
  }
  Object.assign(proto, new MultiType);
  proto.constructor = MultiType;
  Object.defineProperties(proto, {
    [Symbol.toStringTag]: {
      value: "MultiType"
    }
  });
  MultiType.prototype = proto;
  var getRepresentative = function getRepresentative (type) {
    return [{},"",0,[],Symbol(),false,new MultiType,function(){},0n,null,undefined][all_types.indexOf(checkType(type))]
  }
  MultiType.parse = function parse (json) {
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
                else m.set(MultiType.parse(JSON.stringify(v)))
              }
              break;
            case "bigint":
              if (v.class == "BigInt") m.set((0n).constructor(v.value));
              break;
            case "symbol":
              if (v.class == "Symbol") m.set(Symbol(v.description));
              break;
            default:
              if (getType(v) == i) m.set(v)
          }
        }
      } catch(e) {}
      for (let i of nullish) if (json.values[i] === true) m.set(getRepresentative(i));
    }
    return m;
  }
  MultiType.getType = getType;
  MultiType.getRepresentative = getRepresentative;
  window.MultiType = MultiType
})();
