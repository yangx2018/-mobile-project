// var reg =  /<[^>]+>/gi;  //过滤所有的html标签
const reg =  new RegExp('<[^>]+>','gi');  //过滤所有的html标签，不包括内容

// var reg2 = /<(img|br|hr|input)[^>]*>/gi;  //只匹配img、br、hr、input标签
const reg2 = new RegExp('<(img|br|hr|input)[^>]*>','gi');  //只匹配img、br、hr、input标签

// var reg3 = /<(\S*)[^>]*>[^<]*<\/(\1)>/gi;        //分组匹配，过滤所有的html标签，包括内容
const reg3 = new RegExp('<(\\S*)[^>]*>[^<]*<\\/(\\1)>','gi');  //分组匹配，过滤所有的html标签，包括内容

// *
// * 将所有的标签过滤，不过滤标签内内容
// * */
function FilterHtml(str){
    if(typeof str !='string'){  //不是字符串
        return str;
    }

    return str.replace(reg,'');
}
export default FilterHtml