String.prototype.getProperJSVariableName=function(mode)
{
  let declare=["var","let"];
  CustomError = function(name,message)
  {
    var a=new Error(message);
    a.name=name;
    return a;
  }
  function slice(str,firstIndex,lastIndex)
  {
    let st="";
    for (let i=firstIndex;i<lastIndex;i++) st+=str[i];
    return st;
  }
  let inp=(this=="")?"_":this;
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
  let s;
  switch (mode||"")
  {
    case "":
      s="";
      break;
    case "strict":
      s="'use strict';";
      break;
    default:
      throw new CustomError("ModeError","Invalid javascript mode '"+mode+"'");
  }
  try
  {
    for (let i of declare) eval(s+i+" "+inp);
  }
  catch(e)
  {
    let err=0;
    try
    {
      for (let i of declare) eval(s+i+" _"+inp);
    }
    catch(er)
    {
      err=1;
      for (let i=0;i<inp.length;i++)
      {
        let reserved=0,illegalchar=0,errors=0;
        try
        {
          for (let index of declare) eval(s+index+" "+inp.slice(0,i+1));
        }
        catch(errr)
        {
          reserved=1;
          illegalchar=1;
          errors=1;
        }
        try
        {
          for (let index of declare) eval(s+index+" "+inp[i]);
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
    if (err==0) inp="_"+inp;
  }
  return inp;
};
Object.defineProperties(String.prototype, {
  properJSVariableName: {
    get() {return this.getProperJSVariableName();}
  },
  properStrictJSVariableName: {
    get() {return this.getProperJSVariableName("strict");}
  }
});
