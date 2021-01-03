(function (){
  var types = ["object","string","number","array","symbol","boolean","null","multi","function"], getType = function(value) {
    var type = typeof value;
    if (type == "object") {
      if (Array.isArray(value)) return "array";
      if (value === null) return "null";
      if (value.constructor == MultiType) return "multi";
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
    obj.isEmpty = !Math.max(...t);
  }, checkType = function(type) {
    var t = (type || "").toString().toLowerCase();
    if (types.indexOf(t) == -1 && t != "undefined") throw new TypeError("Unknown variable type");
    return t;
  }, setValue = function(obj,values) {
    for (let value of values) {
      var type = getType(value);
      if (type == "undefined") obj[type] = true;
      else obj[type] = value;
    }
    checkEmpty(obj);
  }, MultiType = class {
    constructor() {
      this.undefined = false;
      setValue(this,arguments);
    }
    toJSON () {
      let json={undefined:this.undefined};
      for (let i of types) {
        if (this[i]!== void 0) {
          switch(i) {
            case "multi":
              let f = {class:"MultiType"};
              if (this[i]==this) f.circular=true;
              else f.values=this[i];
              json[i] = f;
              break;
            default:
              json[i] = this[i];
          }
        }
      }
      return {class:"MultiType",values:json};
    }
  }
  MultiType.prototype.set = function set () {
    throwError("set",arguments,true);
    setValue(this,arguments);
  }
  MultiType.prototype.get = function get (type) {
    checkEmpty(this);
    throwError("get",arguments);
    type = checkType(type);
    if (type == "undefined") return void 0;
    return (getType(this[type]) == type)?this[type]:void 0;
  }
  MultiType.prototype.remove = function remove (...types) {
    throwError("remove",arguments,true);
    for (let type of types) {
      type = checkType(type);
      if (type == "undefined") this[type] = false;
      else this[type] = void 0;
    }
    checkEmpty(this);
  }
  MultiType.prototype.has = function has (type) {
    checkEmpty(this);
    throwError("has",arguments);
    type = checkType(type);
    if (type == "undefined") return this[type] === true;
    return getType(this[type]) == type;
  }
  MultiType.prototype.toString = function () {
    checkEmpty(this);
    let y = this.string;
    return typeof y == "string"?y:"undefined";
  }
  MultiType.prototype.valueOf = function () {
    checkEmpty(this);
    let n = this.number;
    return typeof n == "number"?n:NaN;
  }
  MultiType.prototype.clear = function clear () {
    for (let i of types) this[i] = void 0;
    this.undefined = false;
    checkEmpty(this);
  }
  MultiType.parse = function(json) {
    json = JSON.parse(json);
    let t = new MultiType(), circular = false;
    if (json.class == "MultiType" && json.values && typeof json.values == "object") {
      for (let i of types) {
        let v = json.values[i];
        switch (i) {
          case "multi":
            if (v.class="MultiType" && v.circular === true) circular = true;
            else t[i] = MultiType.parse(v);
            break;
          default:
            t[i] = v;
        }
      }
      if (circular) t.set(t);
      checkEmpty(t);
    }
    return t;
  }
  window.MultiType = MultiType;
})();
