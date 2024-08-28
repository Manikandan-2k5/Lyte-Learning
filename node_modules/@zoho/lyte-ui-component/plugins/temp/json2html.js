// ; (function () {
//     let data
//     let typeTag = {
//         "strong": "strong",
//         "script": "sup",
//         "link": "a",
//         "em": "em",
//         "underline": "u",
//         "strikeThrough": "s",
//     }

//     let spanStyle = {
//         "fontSize": "font-size",
//         "align": "text-align",
//         "highlight": "background-color",
//         "fontColor": "color"
//     }


   

//     let html = " ";

//     function dasherize(string) {
//         return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
//     }

//     function style(style) {

//         for (const key in style) {
//             if (spanStyle.hasOwnProperty(key)) {
//                 html += `${spanStyle[key]}:${style[key]};`;
//             } else if (key == "height") {
//                 html += `${dasherize(key)}:${style[key]};`;
//             } else {
//                 html += `${dasherize(key)}:${style[key]};`;
//             }
//         }


//         html+="'"

//     }

//     function paragraph(data) {
        
//         let paraType = "p"
//         let attrs = data?.attrs;

        
//         let content = data?.content
//         if(attrs?.type!=null && attrs?.type!=undefined){
//             paraType = attrs?.type
//         }
        
        
//         html += `<${paraType} style='`;
        
//         style(attrs);
        
//         if(attrs?.dir!=null && attrs?.dir!=undefined){
//             html+=` ${"dir"}=${attrs["dir"]}`
//         }

//         html += ">"

//         if (content != undefined) {
//             for (const key in content) {
//                 innerText(content[key])
//             }
//         } else {
//             html += "<br>"
//         }

//         html += `</${paraType}>`

//     }

//     function innerText(data) {

//         let marks = data?.marks
//         let currentTag = ""
//         let type = ""
//         let tagsOpened = []


//         let color = ""
//         for (const key in marks) {

//             type = marks[key]?.type
            

//             if (type == "link") {
//                 currentTag = typeTag[type]
//                 html += `<${currentTag} href=${marks[key]?.attrs?.href} ${color!="" ? `style='color:${color}'`  : ""}>`
//             }else if(type=="script"){
//                 if(marks[key]?.attrs?.type=="sub"){
//                     currentTag = "sub"
//                     html+=`<${currentTag}>`
//                 }else if(marks[key]?.attrs?.type=="sup"){
//                     currentTag = "sup"
//                     html+=`<${currentTag}>`
//                 }
//             } else if (typeTag.hasOwnProperty(type)) {
//                 currentTag = typeTag[type]
//                 html += `<${currentTag}>`
//             } else if (spanStyle.hasOwnProperty(type)) {
//                 currentTag = "span"
//                 html += `<${currentTag} style='${dasherize(spanStyle[type])}:${marks[key]?.attrs?.value}'>`
//                 if(type=="fontColor") {
//                     color = marks[key]?.attrs?.value  
//                 }
//             } else {
//                 console.log("missing-->" + JSON.stringify(marks[key]))
//             }

//             tagsOpened.push(currentTag)
            
//         }
//         color = ""
//         if (data?.type == "image" || data?.type == "img") {
//             html += `<img src='${data?.attrs?.src}'  `
//             delete data?.attrs?.src
//             nonStyleAttrs(data?.attrs)

//             html += ">"
//         }

//         if (data?.type == "br") {
//             html += "<br>"
//         }

//         html += data.text != undefined ? data?.text : ""

//         let length = tagsOpened.length
//         if (length) {
//             for (let i = tagsOpened.length; i > 0; i--) {
//                 html += `</${tagsOpened[i - 1]}>`
//             }
//         }

//     }

//     function nonStyleAttrs(style){
//         // console.log(data)
//         for (const key in style) {
//             if (spanStyle.hasOwnProperty(key)) {
//                 html += `${spanStyle[key]}=${style[key]} `;
//             } else if (key == "height") {
//                 html += `${dasherize(key)}=${style[key]} `;
//             } else {
//                 html += `${dasherize(key)}=${style[key]} `;
//             }
//         }


        
//     }

//     let image , img = function(data){
//         html += `<img src=${data?.attrs?.src} `
//             delete data?.attrs?.src
//             nonStyleAttrs(data?.attrs)
//             html += ">"
//     }

//     function orderedList(data) {
//         html += "<ol style='"
//         let attrs = data?.attrs
//         style(attrs)

//         html += ">"

//         let content
//         if (Array.isArray(data)) {
//             for (const elem of data) {
//                 content = elem
//                 eval(`${content.type}(${JSON.stringify(content)})`)
//             }
//         } else {
//             content = data?.content
//             for (const key in content) {
//                 eval(`${content[key].type}(${JSON.stringify(content[key])})`)
//             }
//         }
//         html += "</ol>"

//     }


//     function bulletList(data) {
//         html += "<ul style='"
//         let attrs = data?.attrs
//         style(attrs)

//         html += ">"

//         let content
//         if (Array.isArray(data)) {
//             for (const elem of data) {
//                 content = elem
//                 eval(`${content.type}(${JSON.stringify(content)})`)
//             }
//         } else {
//             content = data?.content
//             for (const key in content) {
//                 eval(`${content[key].type}(${JSON.stringify(content[key])})`)
//             }
//         }
//         html += "</ul>"

//     }
//     function unorderedList(data) {
//         html += "<ul style='"
//         let attrs = data?.attrs
//         style(attrs)

//         html += ">"

//         let content
//         if (Array.isArray(data)) {
//             for (const elem of data) {
//                 content = elem
//                 eval(`${content.type}(${JSON.stringify(content)})`)
//             }
//         } else {
//             content = data?.content
//             for (const key in content) {
//                 eval(`${content[key].type}(${JSON.stringify(content[key])})`)
//             }
//         }
//         html += "</ul>"

//     }

//     function br(none) {
//         html += "<br>"
//     }

//     function listItem(data) {
//         html += "<li style='"

//         style(data?.attrs)



//         html += " >"

//         let content = data?.content

//         for (const key in content) {
//             if (content[key].type == "br") {
//                 debugger
//             }
//             eval(`${content[key].type}(${JSON.stringify(content[key])})`)
//         }
//         html += "</li>"
//     }

//     function table(data) {

//         html += "<table style='"
//         let content = data?.content;
//         style(data?.attrs)
//         html+=" > <tbody>"


//         for (let index = 0; index < content.length; index++) {
//             if (content[index]?.type == "table_row") {
//                 html += "<tr>"
//                 table_cell(content[index]);
//                 html += "</tr>"
//             }
//         }

//         html += "</tbody></table>"
//     }

//     function table_cell(data) {
//         let content = data?.content;
//         let tagOpened =""
//         for (let index = 0; index < content.length; index++) {

//             if(content[index]?.type=="table_cell"){
//                 html += `<td style='`
//                 tagOpened = "td"
//             }else if(content[index]?.type=="table_header"){
//                 html+= `<th style='`
//                 tagOpened = "th"
//             }else{
//                 break
//             }

//             style(content[index]?.attrs)
//             html+=">"
//             let innerContent = content[index]?.content;
//             if (innerContent != undefined) {
//                 for (let j = 0; j < innerContent.length; j++) {
//                     if (innerContent[j]?.type == "paragraph") {
//                         paragraph(innerContent[j])
//                     }
//                 }
//             }
//             html += `</${tagOpened}>`
//         }
//     }

//     function hr() {
//         html += "<hr>"
//     }



//     function convertToHtml(jsonData) {
//         html = ""
//         data = jsonData
//         let parentContent = data?.content;

//         for (const key in parentContent) {
//             try {
//                 eval(`${parentContent[key].type}(${JSON.stringify(parentContent[key])})`)
//             } catch (reference) {
//                 console.log(reference)
//             }
//         }

//         return html



//     }


//     window.convertToHtml = convertToHtml;

// })();
