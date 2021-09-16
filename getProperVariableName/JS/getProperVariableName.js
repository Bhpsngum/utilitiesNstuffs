String.prototype.getProperJSVariableName = function getProperJSVariableName()
{
  let declare=["var","let"];
  function slice(str,firstIndex,lastIndex)
  {
    let st="";
    for (let i=firstIndex;i<lastIndex;i++) st+=str[i];
    return st;
  }
  function check(s,l,str)
  {
    eval("(function(){"+s+l+" "+str+"})();");
  }
  let inp=(this=="")?"_":this+"";
  if (inp == "async" || inp == "await") inp="_"+inp;
  switch(inp[0])
  {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      inp="_"+inp;
      break;
  }
  for (let i=0;i<inp.length;i++)
  {
    switch(inp[i])
    {
      case "\n":
      case "\r":
      case "=":
      case ";":
      case ",":
      case " ":
        inp=slice(inp,0,i)+"_"+slice(inp,i+1,inp.length);
        break;
    }
  }
  let s,mode=arguments[0]||"";
  switch (mode)
  {
    case "":
      s="";
      break;
    case "strict":
      s="'use strict';";
      break;
    default:
      let emg = new Error();
      emg.name = "ModeError";
      emg.message = "Invalid javascript mode '"+mode+"'";
      throw emg;
  }
  try
  {
    for (let i of declare) check(s,i,inp);
  }
  catch(e)
  {
    let err=0;
    try
    {
      for (let i of declare) check(s,i,"_"+inp);
    }
    catch(er)
    {
      err=1;
      for (let i=0;i<inp.length;i++)
      {
        let reserved=0,illegalchar=0,errors=0;
        try
        {
          for (let index of declare) check(s,index,inp.slice(0,i+1));
        }
        catch(errr)
        {
          reserved=1;
          illegalchar=1;
          errors=1;
        }
        try
        {
          for (let index of declare) check(s,index,inp[i]);
        }
        catch(error)
        {
          reserved=0;
        }
        if ((!reserved) && errors && illegalchar)
        {
          inp=slice(inp,0,i)+"_"+slice(inp,i+1,inp.length);
        }
      }
    }
    if (!err) inp="_"+inp;
  }
  var temp=window[inp];
  window[inp]=window[inp]+1;
  let opt={name:inp,mutable:!(temp == window[inp]||inp == "NaN"),proper:this+""==inp};
  if (!opt.mutable)
  {
    if (!arguments[1]) console.warn(`"'"+inp+"' is initially defined as a global variable or the properties of them, therefore it's immutable or read-only. Setting them won’t have an effect. Avoid using this input as a variable name.");
    else
    {
      opt.name = "_"+opt.name;
      opt.mutable = true;
    }
  }
  window[inp]=temp;
  return (arguments[2] === true)?opt:opt.name;
};
Object.defineProperties(String.prototype, {
  properJSVariableName: {
    get() {return this.getProperJSVariableName()}
  },
  properStrictJSVariableName: {
    get() {return this.getProperJSVariableName("strict")}
  }
});
