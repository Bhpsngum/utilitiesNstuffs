String.prototype.getProperJSVariableName = function getProperJSVariableName()
{
  let declare=["var","let"];
  CustomError = function(name,message)
  {
    var a=new Error(message);
    a.name=name;
    return a;
  }
  function check(s,l,str)
  {
    eval(s+"function test(){"+l+" "+str+"}");
  }
  let inp=(this=="")?"_":(this.replace(/^(\d)/g,"_$1").replace(/(=|\n|\r|\s|;|,)/g,"_"));
  let s;
  switch (arguments[0]||"")
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
          inp=inp.slice(0,i)+"_"+inp.slice(i+1,inp.length);
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
