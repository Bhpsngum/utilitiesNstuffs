String.prototype.oldReplace=String.prototype.replace;
String.prototype.replace= function(params)
{
    function getIndex(array,n)
    {
        let index=0;
        for (let i=0;i<n;i++) index+=array[i].length;
        return index;
    }
    function caseinsensitivecompare(st1,st2,n)
    {
        return (n)?(st1.toUpperCase()==st2.toUpperCase()):(st1==st2);
    }
    function replace(st,finder,replaceparam,isGlobal,isCaseinSensitive,addIndex,startIndex)
    {
        let d=0,s=st;
                for (let i=startIndex;i<=st.length-finder.length;i++)
                {
                    let result=st.slice(i,i+finder.length);
                    if (caseinsensitivecompare(result,finder,isCaseinSensitive))
                    {
                        let parsed=(typeof replaceparam === "function")?(replaceparam(result,i+addIndex)||"undefined").toString():replaceparam.toString();
                        s=s.slice(0,i+d)+parsed+s.slice(i+d+finder.length,s.length);
                        d+=parsed.length-finder.length;
                    }
                    if (!isGlobal) break;
                }
                return s;
    }
    let args=arguments;
    if (args.length<3) return this.oldReplace(args[0],args[1]);
    else
    {
        let finder=(args[0]||"undefined").toString(),flags={},replaceparam=args[2],str=this.toString(),existflags="igmsbe";
        for (let flag of existflags) flags[flag]=(args[1]||"").toString().includes(flag);
        let m=[str],special=(flags.m && flags.g) || flags.b || flags.e;
        if (flags.m && flags.g)
        {
            let preIndex=-1;
            m=[];
            for (let i=0;i<=str.length;i++)
            {
                if (str[i]=="\n" || str[i]=="\r" || i==str.length)
                {
                    m[m.length]=str.slice(preIndex+1,i);
                    m[m.length]=str[i]||"";
                    preIndex=i;
                }
            }
        }
        let mm=[...m];
        for (let i=0;i<m.length;i+=2)
        {
            let st=m[i];
            if (flags.b || flags.e)
            {
                let be=0,start=0;
                if (flags.b && flags.e)
                {
                    if (caseinsensitivecompare(st,finder,flags.i)) be=1;
                }
                else
                {
                    let result;
                    if (flags.b) result=st.slice(0,finder.length);
                    else
                    {
                        result=st.slice(-finder.length);
                        start=st.length-finder.length;
                        if (start<0) start=0;
                    }
                    be= caseinsensitivecompare(result,finder,flags.i);
                }
                if (be) mm[i]=replace(st,finder,replaceparam,0,flags.i,getIndex(m,i),start);
            }
            if (!special) mm[i]=replace(st,finder,replaceparam,flags.g,flags.i,getIndex(m,i),0);
            if (!flags.g) break;
        }
        return mm.join("");
    }
}
