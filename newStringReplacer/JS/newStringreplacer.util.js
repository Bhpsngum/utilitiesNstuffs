String.prototype.oldReplace=String.prototype.replace;
String.prototype.replace= function(params)
{
    let args=arguments;
    if ((args[0]||/test/g).test) return this.oldReplace(args[0],args[1]);
    else
    {
        let finder=args[0].toString(),flags={},replaceparam,str=this.toString(),existflags="igmsbe";
        switch(args.length)
        {
            case 1:
                return str.oldReplace(args[0]);
            case 2:
                replaceparam=args[1];
                break;
            default:
                for (let flag of existflags) flags[flag]=args[1].toString().includes(flag);
                replaceparam=args[2];
        }
        let m;
        if (flags.m && flags.g)
        {
            let preIndex=-1;
            m=[];
            for (let i=0;i<=str.length;i++)
            {
                if (str[i]=="\n" || str[i]=="\r" || i==str.length)
                {
                    m.push(str.slice(preIndex+1,i));
                    m.push(str[i]||"");
                    preIndex=i;
                }
            }
        }
        else m=[str];
        for (let i=0;i<m.length;i+=2)
        {
            let st=m[i];
            if (flags.b || flags.e)
            {
                let be=0;
                if (flags.b && flags.e)
                {
                    if (st==finder) be=1;
                }
                else
                {
                    if (flags.b)
                    {
                        if (st.slice(0,finder.length)==finder) be=1;
                    }
                    else
                    {
                        if (st.slice(-1*finder.length)==finder) be=1;
                    }
                }
                if (be) m[i]=st.oldReplace(finder,replaceparam);
            }
            if (!flags.g) break;
        }
        return m.join("");
    }
}
