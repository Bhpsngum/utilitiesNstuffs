(function(){
  var emulatedStorages = new Map();
  var toString = function (item) {
    switch (item) {
      case null: return "null";
      case undefined: return "undefined";
      default: return item.toString();
    }
  }
  var throwError = function (name, quan, args) {
    if (args.length < quan) throw new TypeError("Failed to execute '" + name + "' on '" + Storage.name + "': " + quan + " argument" + (quan==1?"":"s") + " required, but only " + args.length + " present.");
  }
  var props = Object.keys(Storage.prototype);
  Storage.get = function get() {
    throwError("get", 1, arguments);
    var storageName = toString(arguments[0]);
    var storage;
    try {
      if (arguments[1]) throw "force emulated";
      storage = window[storageName];
      if (!(storage instanceof Storage)) throw "no storages available";
    }
    catch (e) {
      storage = emulatedStorages.get(storageName);
      if (!(storage instanceof Storage)) {
        var dump = new Map();
        var updateStorage = function () {
          var dnames = Array.from(dump.keys());
          for (let name of Array.from(new Set([dnames,Object.keys(storage)].flat()))) {
            if (props.indexOf(name) == -1 && name != "__proto__") {
              if (dnames.indexOf(name) != -1) storage[name] = dump.get(name);
              else delete storage[name];
            }
          }
        }
        storage = {
          setItem: function setItem() {
            throwError("setItem", 2, arguments);
            dump.set(toString(arguments[0]), toString(arguments[1]));
            updateStorage();
          },
          getItem: function getItem() {
            throwError("getItem", 1, arguments);
            return dump.get(toString(arguments[0])) || null
          },
          removeItem: function removeItem() {
            throwError("removeItem", 1, arguments);
            dump.delete(toString(arguments[0]));
            updateStorage();
          },
          clear: function clear() {
            dump.clear();
            updateStorage();
          },
          key: function key() {
            throwError("key", 1, arguments);
            return Array.from(dump.keys())[Number(arguments[0]) || 0] || null
          },
          __proto__: Storage.prototype
        }
        Object.defineProperties(storage, {
          length: {
            get() { return dump.size }
          }
        });
        emulatedStorages.set(storageName, storage);
      }
    }
    return storage
  }
})();
