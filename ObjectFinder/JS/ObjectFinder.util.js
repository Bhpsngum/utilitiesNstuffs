Object.prototype.get = function()
{
  let qS=arguments[0];
  if (Array.isArray(qS))
  {
    let obj=this,j=0;
    while (j<qS.length)
    {
      let cObj=obj[qS[j]];
      if (cObj == void 0) return cObj;
      obj=cObj;
      j++;
    }
    return obj;
  }
  else
  {
    if (arguments[1] === true)
    {
      function isCyclic(object) {
        const seenObjects = new WeakMap();
        function detectCycle(obj) {
          if (Object.prototype.toString.call(obj) == '[object Object]') {
            if (seenObjects.has(obj)) return true;
            seenObjects.set(obj, undefined);
            for (var key in obj) {
              if (detectCycle(obj[key])) return true;
            }
          } else if (Array.isArray(obj)) {
              for (var i in obj) {
                if (detectCycle(obj[i])) return true;
              }
            }
            return false;
        }
        return detectCycle(object);
      }
      if (isCyclic(this))
      {
        let a=new Error("Cannot search in circular structure");
        a.name = "TypeError";
        throw a;
      }
      else
      {
        let results=[];
        function search(prnt,object)
        {
          Object.keys(object).forEach(function(i)
          {
            let parent=Array.from(prnt);
            parent.push(i);
            if (i===qS.toString())
            {
              results.push({path:parent,value:object[i]});
              if (Object.keys(object[i]).length) search(parent,object[i]);
              else return;
            }
            else if (Object.keys(object[i]).length) search(parent,object[i]);
            else return;
          });
        }
        search([],this);
        switch(results.length)
        {
          case 0:
            return;
          case 1:
            return results[0];
          default:
            return results;
        }
      }
    }
    else return this[qS];
  }
}
