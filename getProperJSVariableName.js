String.prototype.getProperJSVariableName=function(mode)
{
  let declare=["var","let"];
  CustomError = function(name,message)
  {
    var a=new Error(message);
    a.name=name;
    return a;
  }
  let inp=(this=="")?"_":(this.replace(/^(\d)/g,"_$1").replace(/(=|\n|\r|\s|;)/g,"_"));
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
          for (let index of declare) eval(s+index+" "+inp.substring(0,i+1));
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
        if (reserved === 0 && errors === 1 && illegalchar === 1)
        {
          inp=inp.substring(0,i)+"_"+inp.substring(i+1,inp.length);
        }
      }
    }
    if (err==0) inp="_"+inp;
  }
  return inp;
};
Object.defineProperty(String.prototype, 'properJSVariableName', {
    get() {return this.getProperJSVariableName();}
});
Object.defineProperty(String.prototype, 'properStrictJSVariableName', {
    get() {return this.getProperJSVariableName("strict");}
});
