// ; (function () {
//     let html
//     let stack
//     let json
//     let cur

//     function init() {
//         stack = []
//         json = []
//         cur = json
//     }

//     let openTagRegex = "<[^>]*>"
//     let voidElements = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"]

//     let closeTagRegex = "<\/[^>]*>"
//     let contentRegex = ".[^<]*(?=(<))"
//     let openTag, closeTag, textContent
//     let tabstyleRegex = "(url\(+[^)]*)+\)"
//     let styleRegex = "style='([^']*)'"

//     let typeTag = {

//         "strong": "strong",
//         "sup": "script",
//         "sub": "script",
//         "a": "link",
//         "em": "em",
//         "u": "underline",
//         "s": "strikeThrough",
//         "span": "span",
//         "h1": "h1",
//         "h2": "h2",
//         "h3": "h3"
//     }

//     let tagAbbreviations = {
//         "p": "paragraph",
//         "ol": "orderedList",
//         "ul": "bulletList",
//         "li": "listItem",
//         "tr": "table_row",
//         "td": "table_cell",
//         "th": "table_header",
//         "table": "table",
//         "hr": "hr",
//         "dl": "decriptionList"
//     }

//     let varyingTags = {
//         "font-size": "fontSize",
//         "text-align": "align",
//         "background-color": "highlight",
//         "color": "fontColor"
//     }

//     function camelCase(string) {
//         return string?.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
//     }

//     function innerContent() {
//         cur.content = []
//         let cur_content = {}
//         html = html.replace(openTag, "")
//         html = html?.trimStart()
//         textContent = html?.match(contentRegex)

//         if (textContent != null && textContent.index == 0 && textContent[0][0] != '<') {
//             cur_content.type = "text"
//             cur_content.text = textContent[0]
//             html = html.replace(cur_content.text, "")
//             cur.content.push(cur_content)
//         }

//         cur = cur.content
//     }

//     function flyingText() {
//         let cur_content = {}

//         html = html?.trimStart()
//         textContent = html?.match(contentRegex)

//         if (textContent != null && textContent.index == 0 && textContent[0][0] != '<') {
//             cur_content.type = "text"
//             cur_content.text = textContent[0]
//             html = html.replace(cur_content.text, "")
//             cur.push(cur_content)
//         }
//     }

//     function span(type) {

        
//         let typeMatch = html?.match(`<${type}[^>]*>(?:.|\n)*?<\/${type}>`)
//         // html?.match(`<${type}[^>]*>((?:(?!<\/${type}>).)*)<\/${type}>`)

//         if (typeMatch == null) {
//             flag = false
//         }
//         let tagContent = typeMatch != null ? typeMatch[0] : null
//         html = html.replace(tagContent, " ")
//         openTag = ""
//         cur.type = "text"
//         cur.marks = []

//         let styleTags = ["strong", "em", "sup", "sub", "u", "s", "a"]
//         let tagsOpened = []


//         let opentagRegex = "<[a-z0-9]* [^>]*>|<[a-z0-9]*>", i = 0, tagname, attrs

//         while (tagContent != "" && tagContent != "\n" && i < 100) {
            
//             let openTag = tagContent?.match(opentagRegex)
//             let closeTag = tagContent?.match(closeTagRegex)
//             let content = tagContent?.match(contentRegex)
//             let currentTag
//             if (openTag != null) {
//                 tagname = openTag[0]?.slice(1, -1)
//                 attrs = tagname?.split(" ")
//             }
//             if (openTag != null && openTag?.index == 0) {
//                 cur.type = "text"
//                 tagsOpened.push(tagname)
//                 currentTag = attrs[0]
//                 attrs = tagname.replace(attrs[0], "")
//                 attrs = attrs.replaceAll('"', "'")
//                 let style = attrs?.match(styleRegex)

//                 let styleAttrs
//                 if (style != null && style[1] != undefined) {
//                     attrs = attrs.replace(style[0], "")
//                     styleAttrs = style[1]?.split(";").filter(item => item.trim() !== "")
//                     for (let item of styleAttrs) {
//                         styleType(item, attrs, currentTag)
//                     }

//                 }
//                 attrs = attrs.split(" ").map(item => item.replace(/['"]+/g, ''))
//                 attrs = attrs.filter(item => item.trim() !== "")
//                 styleAttrs = []
//                 for (let obj of attrs) {
//                     styleAttrs.push(obj)
//                 }
//                 for (let item of styleAttrs) {
//                     styleType(item, attrs)
//                 }


//                 if (styleTags.includes(currentTag)) {
//                     if (typeTag[currentTag] == "script") {
//                         cur.marks.push({ "type": `${typeTag[currentTag]}`, "attrs": { "type": `${currentTag}` } })
//                     } else if (currentTag == "a") {
//                         let href
//                         for (let item of styleAttrs) href = item.split("=")[0] == "href" ? item.split("=") : href
//                         cur.marks.push({ "type": `${typeTag[currentTag]}`, "attrs": {"href": href[1]} })
//                     } else {
//                         cur.marks.push({ "type": `${typeTag[currentTag]}` })
//                     }
//                 }
//                 tagContent = tagContent.replace(openTag, "")
//             } else if (closeTag?.index == 0) {
//                 tagContent = tagContent.replace(closeTag, "")
//                 tagsOpened = tagsOpened.filter(item => item.split(" ")[0] !== closeTag[0].slice(2, -1))
//             } else if (content?.index == 0) {
//                 cur.text = content[0]
//                 tagContent = tagContent.replace(content[0], "")
//                 break
//             }


//             i++

//         }
//         let index
//         let length = tagsOpened?.length

//         for (let i = 0; i < length; i++) {
//             tagContent = tagContent.trimStart()
//             let closingTag = tagContent?.match(closeTagRegex)
//             if (closingTag != null && closingTag.index==0) {
//                 let tag = closingTag[0]?.slice(2, -1)
//                 tagContent = tagContent.replace(closingTag[0], "")
//                 tagsOpened.map((item , ind) =>{
//                     if(item.split(" ")[0] == tag){
//                         index = ind+1
//                     }else{
//                         index = -1
//                     }
//                 })
//             }
//             if (index > -1) {
//                 tagsOpened.splice(index-1)
//             }
//             index = -1
//         }
        


//         let additionalTags = ""

//         for (let elem of tagsOpened) {
//             additionalTags += `<${elem}>`
//         }
//         html = additionalTags + tagContent + html

//        if(JSON.stringify(cur.marks) == JSON.stringify([])){
//             delete cur.marks
//        } 

//         cur = stack.pop()
//         flyingText()
//     }

//     function styleType(styleAttrs, attrs) {
//         let style = styleAttrs.split(":")

//         let decorAbbrev = {
//             "underline": "underline",
//             "line-through": "strikeThrough",
//         }
//         if (style[0] == "font-size" || style[0] == "color") {
//             cur.marks.push({ "type": varyingTags[style[0]], "attrs": { "value": style[1] } });
//         } else if (style[0] == "a") {
//             cur.marks.push({ "type": camelCase(style[0]), "attrs": { "href": style[1] } });
//         }
//         else if (style[0] == "font-weight" && style[1] == "bold") {
//             cur.marks.push({ "type": "strong" })
//         }
//         else if (style[0] == "href") {
//             cur.marks.push({ "type": typeTag[attrs[0]], "attrs": { "href": style[0] + ":" + style[1] + ":" + style[2] } });
//             attrs[0] = ""
//         }else if (style[0] == "text-decoration") {
//             let decor = style[1].split(" ")
//             for (let prop of decor) {
//                 if(decorAbbrev.hasOwnProperty(prop)) cur.marks.push({ "type": `${decorAbbrev[prop]}` });
//             }
//         } else if (style[0] == "font-style" && style[1] == "italic") {
//             cur.marks.push({ "type": "em" });
//         } else if (style[0] == "font-family") {
//             cur.marks.push({ "type": camelCase(style[0]), "attrs": { "value": style[1] } });
//         }else if(style[0]=="background-color"){
//             cur.marks.push({ "type": varyingTags[style[0]], "attrs": { "value": style[1] } });
//         }
//         // some style attributes might be missing here
//     }

//     function styling(attrs){

//         cur.attrs = {}
        
//         for (let attr of attrs) {
            
//             attr = attr?.trimStart()
//             attr = attr.replaceAll('"' ,"'" )
//             let _style = attr?.match(styleRegex)
//             attr = _style!=null ? attr?.replace(_style[0] , "") : attr
//             attr = attr?.replace('"', "")
            
//             attr = attr.replace(/['"]+/g, '')
//             // let style = attr?.match("style=")
//             let value;
//             if(_style != null || _style!=undefined){
//                 value = _style[0].replace("style=", "")
//                 let property = value?.split(";");
//                 property = property.filter(item => item.trim() !== "")
//                 if (property != undefined) {
//                     for (let i = 0; i < property.length; i++) {
//                         property[i] = property[i].replaceAll("'", "")?.trimStart()
//                         let [nextKey, nextVal] = ""
//                         let [key, val, etc] = property[i].split(":").map(item => item.replace(/['"]+/g, ''));
//                         try {
//                             [nextKey, nextVal] = property[i + 1].split(":").map(item => item.replace(/['"]+/g, ''));
//                         } catch (error) {
//                             nextKey = ""
//                         }
//                         if ((key == "--tabstyle" )&& nextVal == undefined) {
//                             cur.attrs[key] = `${val!=null ? val : ""}:${etc!=null ? etc : ""};${nextKey !=null ? nextKey : ""}`
//                             i = i + 1
//                         }else if(key[0]=="-"){
//                             cur.attrs[key] = val
//                         } else if (!varyingTags.hasOwnProperty(key) && key && val) {
//                             cur.attrs[camelCase(key)] = val
//                         } else if(key && val){
//                             cur.attrs[varyingTags[key]] = val
//                         }
//                     }
//                 };
//             }
//             if(attr!=null || attr!=undefined) {

//                 attr = attr.trimStart()
//                 attr = attr.replace('"', "")
//                 attr = attr.split(" ").map(item => item.replace(/['"]+/g, ''))
//                 attr = attr.filter(item => item.trim() !== "")
                
//                 for (let item of attr) {
//                     let [name, value] = item.split("=").map(item => item.replace(/['"]+/g, ''));
//                     value = value?.trimStart()
//                     if (varyingTags.hasOwnProperty(name) && name && value) {
//                         cur.attrs[varyingTags[name]] = value
//                     } else if(name && value) {
//                         cur.attrs[camelCase(name)] = value
//                     }
//                 }
//             }
//         }
//     }

//     var flag

//     function convertToJson(htmlstring) { 
//         init()
//         html = htmlstring
//         flag = true
//         let i = 1
//         let replacingitems = ["<tbody[^>]*>", "</tbody[^>]*>", "<thead[^>]*>", "</thead[^>]*>"]

//         for (let string of replacingitems){ 
//             for( let item of html.matchAll(string)){
//                 html = html.replaceAll(item[0] , "")
//             }
//         }

//         // for removing col group tag
//         for(let item of html.matchAll("<colgroup[^>]*>(?:.|\n)*?<\/colgroup>")){
//             html = html.replaceAll(item[0] , "")
//         }

//         while (html != "" && html != "\n" && flag && i < 1000) {
//             html = html?.trimStart()

//             openTag = html?.match(openTagRegex)
//             closeTag = html?.match(closeTagRegex)
//             if (openTag == null && closeTag == null) {
//                 flag = false
//             } else if (openTag?.index < closeTag?.index && openTag.index < 3) {
//                 let tagName = openTag[0].slice(1, -1)
//                 let attrs = tagName.split(" ")
//                 let isVoidElement = false


//                 cur.push({})
//                 stack.push(cur)
//                 cur = cur[cur.length - 1]

//                 if (attrs[0] == "br") {
//                     cur.type = "paragraph"
//                     cur.content = [ {"type" : "br" } ]
//                     cur = stack.pop()
//                     html = html.replace(openTag, "")
//                     continue
//                 } else {
//                     cur.type = tagAbbreviations.hasOwnProperty(attrs[0]) ? tagAbbreviations[attrs[0]] : attrs[0]
//                 }

//                 if (voidElements.includes(attrs[0])) {
//                     isVoidElement = true
//                 }

//                 attrs.shift()

//                 if (typeTag.hasOwnProperty(cur.type)) {
//                     span(cur.type)
//                     i++
//                     continue
//                 }
//                 else if (attrs.length > 0 && JSON.stringify(attrs) != JSON.stringify([""]) && JSON.stringify(attrs) != JSON.stringify([''])) {
//                     let attrString = ""
//                     for (let style of attrs) {
//                         attrString += " " + style
//                     }
//                     attrs = []
//                     attrs[0] = attrString
//                     styling(attrs)
//                 }

//                 if (cur.type == "hr") {
//                     html = html.replace(openTag, "")
//                     cur = stack.pop()
//                     continue
//                 }
//                 if (html != null || html != "" || html != undefined) {
//                     innerContent()
//                 }

//                 if (isVoidElement) {
//                     cur = stack.pop()

//                 }
//             } else if (openTag?.index < closeTag?.index) {
//                 cur.content = []
//                 cur = cur.content
//                 flyingText()
//             } else if ((closeTag == null || closeTag == undefined) && voidElements.includes(openTag[0].slice(1, -1).split(" ")[0])) {
//                 let tagName = openTag[0].slice(1, -1)
//                 let attrs = tagName.split(" ")

//                 if (!Array.isArray(cur)) {
//                     cur = stack.pop()
//                 }

//                 cur.push({})
//                 stack.push(cur)
//                 cur = cur[cur.length - 1]
//                 if (attrs[0] == "br") {
//                     cur.type = "paragraph"

//                 } else {
//                     cur.type = attrs[0]
//                 }
//                 attrs.shift()
//                 if (attrs.length > 0 && JSON.stringify(attrs) != JSON.stringify([""]) && JSON.stringify(attrs) != JSON.stringify([''])) {
//                     let attrString = ""
//                     for (let style of attrs) {
//                         attrString += style + " "
//                     }
//                     attrs = []
//                     attrs[0] = attrString
//                     styling(attrs)
//                 }
//                 html = html.replace(openTag, "")
//             }
//             else if (closeTag != null && closeTag != undefined) {
//                 cur = stack.pop()
//                 html = html.replace(closeTag, "")
//             } else {
//                 flag = false
//             }
//             i++
//         }



//         return {
//             "type": "doc",
//             "content": json
//         }
//     }

//     window.convertToJson = convertToJson

// })();


