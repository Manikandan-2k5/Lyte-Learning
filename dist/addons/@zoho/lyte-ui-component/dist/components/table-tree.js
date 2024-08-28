Lyte.Component.register("table-tree", {
_template:"<template tag-name=\"table-tree\"> <div class=\"parallelcontainer\" __scroll=\"{{action('ScrollHeader',event)}}\"> <div class=\"fixeddiv\"> <table class=\"fixedtable\" cellpadding=\"0\"> <thead> </thead> <tbody> <tr is=\"if\" lyte-if=\"true\" value=\"{{expHandlers(ltPropFixedHeader.length,'!=',0)}}\"></tr> </tbody> </table> </div> <div class=\"tablediv\"> <table class=\"ltPropScrollableHeader\" cellpadding=\"0\"> <thead> </thead> <tbody> <tr class=\"thead\"> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropHeader}}\" item=\"item\" index=\"index\" depth=\"3\"></td> </tr> </tbody> </table> </div> </div> <div class=\"container\" __scroll=\"{{action('fixHeader',event)}}\"> <div class=\"fixeddiv\"> <table cellpadding=\"0\" class=\"fixedtable\"> <thead> </thead> <tbody> <tr is=\"if\" lyte-if=\"true\" value=\"{{expHandlers(ltPropFixedHeader.length,'!=',0)}}\"></tr> <tr is=\"for\" lyte-for=\"true\" items=\"{{ltPropData}}\" item=\"item\" index=\"index\" depth=\"2\"></tr> </tbody> </table> </div> <div class=\"tablediv\"> <table cellpadding=\"0\" class=\"lyteScrollableTreeTable\"> <thead> </thead> <tbody> <tr class=\"thead\"> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropHeader}}\" item=\"item\" index=\"index\" depth=\"3\"></td> </tr> <tr is=\"for\" lyte-for=\"true\" items=\"{{ltPropData}}\" item=\"item\" index=\"index\" depth=\"2\"></tr> </tbody> </table> </div> </div> <div class=\"scrollbar\"> <div class=\"scroll\"></div> </div> <template is=\"if\" value=\"{{expHandlers(ltPropisDrag,'==',true)}}\"><template case=\"true\"> <lyte-yield yield-name=\"dragContent\" lt-header=\"{{ltPropHeader}}\" drag-data=\"{{ltPropDragData}}\" id=\"dragelement\"> </lyte-yield> </template></template> </template>\n<style>table-tree {\n  display: block;\n  height: inherit;\n  margin:0;\n  margin-left: 500px;\n}\nlyte-tree-table{\n  display: table;\n \n  border: none;\n  \n}\nlyte-tree-tr {\n  display: table-row;\n \n  \n  \n}\n\nlyte-tree-thead {\n  display: table-header-group;\n \n  background-color: gray;\n}\nlyte-tree-th {\n  \n    background-color:#c4c4c4;\n  \n  display: table-cell;\n  word-wrap: normal;\n  overflow: hidden;\n\n  \n}\n.leftend{\n /* background-image: url('/components/images/arrow-l.gif');\n  background-repeat: no-repeat;\n  background-position: center;*/\n/*padding-<left|right>: <width of image>px;*/\n}\n.rigthend{\n /* background-image: url('/components/images/arrow-r.gif');\n  background-repeat: no-repeat;\n  background-position: center;*/\n/*padding-<left|right>: <width of image>px;*/\n}\nlyte-tree-body {\n  display: table-row-group;\n  }\n lyte-tree-td {\n \n  display: table-cell;\n   \n  \n}\n.col-reoder-div{\n  position: absolute;\n  background-color: white;\n  opacity: 2px;\n  height: 25px;\n  text-align: center;\n  border: 2px black solid;\n  z-index: 12;\n}\n.fixedtable {\nbox-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 0px 0px 0 rgba(0, 0, 0, 0.19);\n\n}\n.container{\n  width: 600px;\n  \n  overflow-y: scroll;\n   overflow-x: hidden;\n  position: relative;\n}\n\n.tablediv::-webkit-scrollbar {\n    display: none;\n}\n.parallelcontainer::-webkit-scrollbar {\n    display: none;\n}\n\n.fixeddiv{\n    /*width: 0px;*/\n    position: absolute;\n    background: white;\n    z-index: 10;\n    \n\n}\n.tablediv{\n    overflow: auto;\n    width: 100%;\n\n}\n.parallelcontainer{\n\n  position: absolute;\nz-index: 11;\n\nbackground-color: white;\n}\nbutton{\n  padding: 0px;\n  height: 10px;\n  width: 16px;\n  text-align: center;\n}\n.scroll{\n\n  min-width: 50px;\n  height: 10px; \n    position: absolute;\n\n  \n}\n.scrollbar{\n  bottom: 0;\n  height: 10px;\n}\n\ntable{\n  position: relative;\n  /*word-wrap: break-word;*/\n  white-space: nowrap;\n /* margin-left: 500px;*/\n}\n\nth{\n  background-color:#c4c4c4;\n  border-bottom: 0px;\n  height: 50px;\n}\ntable-tree{\n  display: block;\n}\ntd {\n  \n    height: 50px;\n    border-bottom: 1px solid gray;\n  }</style>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,3,1]},{"type":"if","position":[1,1,1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,0]}],"actualTemplate":"<template is=\"for\" items=\"{{ltPropFixedHeader}}\" item=\"item\" index=\"index\" depth=\"3\"><table><tbody><tr> <th>{{item.body}}</th> </tr></tbody></table></template>","tagName":"TR"}]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{ltPropFixedHeader.length!=0}}\"><template case=\"true\" depth=\"2\"><table><tbody> <tr class=\"thead\"> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropFixedHeader}}\" item=\"item\" index=\"index\" depth=\"3\"></td> </tr> </tbody></table></template></template>"},{"type":"attr","position":[1,3,1,3,1,1]},{"type":"for","position":[1,3,1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}],"actualTemplate":"<template is=\"for\" items=\"{{ltPropHeader}}\" item=\"item\" index=\"index\" depth=\"3\"><table><tbody><tr> <th fixed=\"{{item.fixed}}\" tree-col=\"{{item.istree}}\">{{item.body}}</th> </tr></tbody></table></template>","tagName":"TR"},{"type":"attr","position":[3]},{"type":"attr","position":[3,1,1,3,1]},{"type":"if","position":[3,1,1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,0]}],"actualTemplate":"<template is=\"for\" items=\"{{ltPropFixedHeader}}\" item=\"item\" index=\"index\" depth=\"3\"><table><tbody><tr> <th>{{item.body}}</th> </tr></tbody></table></template>","tagName":"TR"}]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{ltPropFixedHeader.length!=0}}\"><template case=\"true\" depth=\"2\"><table><tbody> <tr class=\"thead\"> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropFixedHeader}}\" item=\"item\" index=\"index\" depth=\"3\"></td> </tr> </tbody></table></template></template>"},{"type":"attr","position":[3,1,1,3,3]},{"type":"for","position":[3,1,1,3,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"insertYield","position":[1,3]}],"actualTemplate":"<template is=\"for\" items=\"{{ltPropFixedHeader}}\" item=\"items\" index=\"index\" depth=\"3\"><table><tbody><tr> <td> <template is=\"if\" value=\"{{expHandlers(items.istree,'==','true')}}\"><template case=\"true\"> {{unescape(generatespan(item.depth),undefined,instance.obj)}} </template></template> <lyte-yield yield-name=\"bodyContent\" obj=\"{{item[items.body]}}\"></lyte-yield> </td> </tr></tbody></table></template>","tagName":"TR"}]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{ltPropFixedHeader.length!=0}}\"><template case=\"true\" depth=\"2\"><table><tbody> <tr helper-attr=\"{{parentchild(this,item)}}\"> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropFixedHeader}}\" item=\"items\" index=\"index\" depth=\"3\"></td> </tr> </tbody></table></template></template>"}],"actualTemplate":"<template is=\"for\" items=\"{{ltPropData}}\" item=\"item\" index=\"index\" depth=\"2\"><table><tbody> <tr is=\"if\" lyte-if=\"true\" value=\"{{expHandlers(ltPropFixedHeader.length,'!=',0)}}\"></tr> </tbody></table></template>","tagName":"TBODY"},{"type":"attr","position":[3,3,1,3,1,1]},{"type":"for","position":[3,3,1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}],"actualTemplate":"<template is=\"for\" items=\"{{ltPropHeader}}\" item=\"item\" index=\"index\" depth=\"3\"><table><tbody><tr> <th fixed=\"{{item.fixed}}\" tree-col=\"{{item.istree}}\">{{item.body}}</th> </tr></tbody></table></template>","tagName":"TR"},{"type":"attr","position":[3,3,1,3,3]},{"type":"for","position":[3,3,1,3,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"insertYield","position":[1,3]}],"actualTemplate":"<template is=\"for\" items=\"{{ltPropHeader}}\" item=\"items\" index=\"index\" depth=\"3\"><table><tbody><tr> <td> <template is=\"if\" value=\"{{expHandlers(items.istree,'==','true')}}\"><template case=\"true\"> {{unescape(generatespan(item.depth),undefined,instance.obj)}} </template></template> <lyte-yield yield-name=\"bodyContent\" obj=\"{{item[items.body]}}\"></lyte-yield> </td> </tr></tbody></table></template>","tagName":"TR"}],"actualTemplate":"<template is=\"for\" items=\"{{ltPropData}}\" item=\"item\" index=\"index\" depth=\"2\"><table><tbody> <tr helper-attr=\"{{parentchild(this,item,item.isdropped)}}\" class=\"dragdrop\" data-id=\"{{item.lytetreeid}}\"> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropHeader}}\" item=\"items\" index=\"index\" depth=\"3\"></td> </tr> </tbody></table></template>","tagName":"TBODY"},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropHeader","ltPropFixedHeader","ltPropContent","ltPropData","ltPropColwidth","ltPropTreeData","ltPropIsChild","ltPropHeaderLength","ltPropColumnReorder","ltPropTableResize","ltPropDragData","ltPropisDrag","instance","ltPropDragDrop","ltPropisDropped"],

	data : function(){
		return {
			ltPropHeader : Lyte.attr('array'),
			ltPropFixedHeader : Lyte.attr('array',{default:[]}),
			ltPropContent : Lyte.attr('array'),
			ltPropData :Lyte.attr('array'),
			ltPropColwidth : Lyte.attr('string'), 
			ltPropTreeData :Lyte.attr('array'),
			ltPropIsChild: Lyte.attr( 'boolean' ,{default:false}),
			ltPropHeaderLength:Lyte.attr('number'),
			ltPropColumnReorder:Lyte.attr('boolean',{default:false}),
			ltPropTableResize:Lyte.attr('boolean',{default:false}),
			ltPropDragData:Lyte.attr('object',{default:undefined}),
			ltPropisDrag:Lyte.attr('boolean',{default:false}),
			instance : Lyte.attr('object',{default:{"obj":{}}}),
			ltPropDragDrop : Lyte.attr('boolean',{default:false}),
			ltPropisDropped : Lyte.attr('boolean',{default:false})

		}		
	},
	init:function(){
		var isWindow=false;
		var index=0;
		var container =document.getElementsByClassName('container')[ 0 ];
		var depth=0;
		var treedata={};
		$L.extend(true,treedata,this.getData('ltPropContent'));
		var tempdata=[],stack=[];
		var customSanitizer  = Lyte.Security.createSanitizer({ GLOBAL_TAGS  : ["lyte-comp","span"],"GLOBAL_ATTRIBUTES" : ["style"] ,"ALLOWED_STYLE":"ALL"});
		this.setData('instance.obj',customSanitizer)
		this.setData('ltPropTreeData',treedata);
		
		var length=Object.entries(treedata).length-1;
		while(length>=0){
			treedata[length].depth=0;
			stack.push(treedata[length]);
			length--;
		}
		tempdata=this.tabledata(stack.pop(),tempdata,stack,depth);
		this.setData('ltPropData',tempdata);
		//console.log(tempdata);
 		
	},
	tabledata :function(treedata,tempdata,stack){
			
			
			treedata.lytetreeid=Math.random();
			// treedata.depth=depth;
			treedata.isdropped=false;
			var next_depth=treedata.depth;
			tempdata.push(treedata);
			var templength=tempdata.length==0?0:tempdata.length-1;
			if(treedata.children!=undefined){
				treedata=treedata.children;
				++next_depth;
				tempdata[templength].children=[];
				var length=treedata.length - 1;
				child_count=length;
				while(length>=0){

					treedata[length].parent=tempdata[templength].lytetreeid;
					treedata[length].depth=next_depth;
					stack.push(treedata[length]);
					length--;
				}

				//var next_depth=stack[stack.length-1].depth;
				return this.tabledata(stack.pop(),tempdata,stack);
			}else if(stack.length){
				//var next_depth=stack[stack.length-1];
				return this.tabledata(stack.pop(),tempdata,stack);
			}
			else{
				return tempdata;
			}
		
		
	},
	colresize : function(){
		if(this.getData('ltPropTableResize')){
			var header_index;
			var head;
			var start_ele;
			var table_width;
			var table=this.$node.querySelector('.ltPropScrollableHeader');
			Array.prototype.forEach.call(table.querySelectorAll('th'),function(th,index){

				th.style.position='relative';
				var resize = document.createElement('div');
				
				resize.style.height='100%';
		        resize.innerHTML = "";
		        resize.style.top = 0;
		        resize.style.right = 0;
		        resize.style.bottom = 0;
		        resize.style.width = '5px';
		        resize.style.position = 'absolute';
		        resize.style.cursor = 'col-resize';
		        resize.addEventListener('mousedown', function (e) {
		           	header_index=index;
		            head = th;
		            start_ele = th.offsetWidth - e.pageX;
		            table_width=table.offsetWidth-e.pageX;

		        });

		        th.appendChild(resize);

				th.style.minWidth=th.offsetWidth+'px';
				th.style.width=th.offsetWidth+'px';
			});
			this.$node.addEventListener('mousemove', function (e) {
		      if (head) {
		      	var newwidth=start_ele+e.pageX;
		      	if( newwidth > parseFloat( head.style.minWidth ) ){
		        	head.style.width = newwidth + 'px';
		        	table.style.width=table_width+e.pageX+'px';
		        	table_row_resize(e.pageX);
				}	      
		      }
	    	});

		    this.$node.addEventListener('mouseup', function () {
		        head = undefined;
		        var table=document.querySelector('.lyteScrollableTreeTable');
		        //table.querySelector('thead').style.display="none";
		    });
			
		}
		function table_row_resize(pageX){
			var table=document.querySelector('.lyteScrollableTreeTable');
			var thead=table.querySelector('.thead');
			//thead.style.display='';
			var th=table.querySelectorAll('th');
			//thead.style.visibility='collapse';
			th[header_index].style.width=start_ele+pageX+'px';
			
			table.style.width=table_width+pageX+'px';
			//thead.style.display='none';

		}

	}.observes('ltPropTableResize').on('didConnect'),
	colreorder :function(){
		this.index=0;
		var that=this;
		if(this.getData('ltPropColumnReorder')){
			var div=document.createElement('div');
			div.style.width="80px";
			var table=this.$node.querySelector('.ltPropScrollableHeader');
			var thead=table.querySelector('.thead');
			var that = this;
			var parallelcontainer=document.getElementsByClassName('parallelcontainer')[ 0 ];
			var maxLeft=(parallelcontainer.offsetLeft+thead.offsetWidth)-parseFloat(div.style.width);
			div.className+="col-reoder-div";
			thead.addEventListener('mousedown',function(event){
					
				div.innerHTML=event.target.textContent;
				
				div.style.left=event.pageX+'px';
				div.style.top=parallelcontainer.offsetTop+10+'px';
				document.getElementsByTagName('body')[0].appendChild(div);
				document.addEventListener('mousemove',MouseMove);
				
				document.addEventListener("mouseup",MouseUp);
			});
			function MouseMove(event){

				 if(maxLeft>event.pageX&&parallelcontainer.offsetLeft<event.pageX){
					div.style.left=event.pageX+10+'px';
					
				}
			}
			function MouseUp(event) {
				
				if(event.target.tagName=='TH'){
						var div_mid=(div.offsetWidth/2)+div.offsetLeft;
						var target_start=event.target.offsetLeft;
							
						if(target_start<=div_mid){
							var divcontent=div.textContent;
							document.getElementsByTagName('body')[0].removeChild(div);
							var header=that.getData('ltPropHeader');
							var target=event.target.textContent;
							var isEqual = function(element){if(element.body == target){
								return element;
							}};

							var source=function(element){if(element.body == divcontent){
								return element;
							}};
							var targetindex=header.findIndex(isEqual);
							var sourceindex=header.findIndex(source);
							
							var removed_header=header[sourceindex];
							Lyte.arrayUtils(header ,'removeAt',sourceindex,1);
							
							Lyte.arrayUtils(header,'insertAt',targetindex,removed_header);
							that.tableheader();
							document.removeEventListener('mousemove',MouseMove);
							document.removeEventListener('mouseup',MouseUp);
						}else{
							document.getElementsByTagName('body')[0].removeChild(div);
							document.removeEventListener('mousemove',MouseMove);
							document.removeEventListener('mouseup',MouseUp);
						}
								
				}
				else{
					document.getElementsByTagName('body')[0].removeChild(div);
					document.removeEventListener('mousemove',MouseMove);
					document.removeEventListener('mouseup',MouseUp);
				}
			}
		}	

	}.observes('ltPropColumnReorder').on('didConnect'),
	scroll : function(){
		this.lytePropscrollbar();
			
	}.on('didConnect'),
	lytePropscrollbar : function(){
		
		var parallelcontainer =document.getElementsByClassName('parallelcontainer')[ 0 ];
		var scroll = document.getElementsByClassName('scroll')[ 0 ];
		var container =document.getElementsByClassName('container')[ 0 ];
		var scrollbar =document.getElementsByClassName('scrollbar')[ 0 ];
		var tablediv=document.getElementsByClassName('tablediv')[ 1 ];
		var table= document.getElementsByClassName('lyteScrollableTreeTable')[ 0 ];
		var leftend=document.createElement('button');
		var rightend=document.createElement('button');
		
		if(table.offsetWidth<container.offsetWidth){
			container.style.width=table.offsetWidth+'px';
			var scrollratio=1;
		}else{
			var scrollratio=table.offsetWidth/(container.offsetWidth);
		}
		scrollbar.style.width=container.offsetWidth+'px';
		var that=this;

		parallelcontainer.style.width=container.offsetWidth+'px';
		if (navigator.appVersion.indexOf("Win") != -1){
			
			this.isWindow=true;
			leftend.style.float="left";
			rightend.style.float="right";
			scrollbar.style.backgroundColor="#e8e8e8";
			scroll.style.backgroundColor="#a9a4a4";
			//leftend.innerHTML="<";
			leftend.className+='leftend';
			rightend.className+='rightend';
			//rightend.innerHTML=">";
			leftend.addEventListener('click',function(event){
				scroll.style.left=leftend.offsetWidth+leftend.offsetLeft+'px';
				tablediv.scrollLeft=0;


			});
			rightend.addEventListener('click',function(event){
				scroll.style.left=(rightend.offsetLeft-scroll.offsetWidth)+'px';
				var fixedheader=that.getData('ltPropFixedHeader');
				var theader = document.getElementsByClassName( 'ltPropScrollableHeader' )[ 0 ],
				thead = theader.querySelectorAll( 'th' );
				var fixeddiv= document.getElementsByClassName('fixeddiv')[ 0 ];
				
				while(that.index<thead.length){
					if(thead[that.index].getAttribute('fixed')=="true"){
						Lyte.arrayUtils( fixedheader,'push',thead[that.index].textContent);
						that.fixed_tableheader();
						if((fixeddiv.offsetWidth>=container.offsetWidth)){
							Lyte.arrayUtils(fixedheader,'pop')
						}
										
					}
					that.index++;
				}
				that.index--;
				tablediv.scrollLeft=table.offsetWidth-container.offsetWidth;


			});

			scrollbar.appendChild(rightend);
			scrollbar.appendChild(leftend);
			scrollbar.style.height=leftend.offsetHeight+'px';
			scroll.style.height=leftend.offsetHeight+'px';
			scroll.style.left = (scroll.offsetLeft + leftend.offsetWidth )+'px';
        	scroll.style.width=((container.offsetWidth-leftend.offsetWidth-rightend.offsetWidth)/(scrollratio))+'px';			

			
        	

        }else if (navigator.appVersion.indexOf("Mac") != -1){
        	/*scrollbar.style.display="none";
        	container.addEventListener('mouseover',function(event){
        		scrollbar.style.display="block";
        	});
        	container.addEventListener('mouseout',function(event){
        		scrollbar.style.display="none";
        	});
        	scrollbar.addEventListener('mouseover',function(event){
        		scrollbar.style.display="block";
        	});
        	scrollbar.addEventListener('mouseout',function(event){
        		scrollbar.style.display="none";
        	});  
        	*/
        	this.isWindow=false;
           scroll.style.backgroundColor="gray";
           scroll.style.borderRadius='3px';
           scroll.style.height='7px';
           scrollbar.style.height='7px';
           scrollbar.style.borderRadius='3px';
           scrollbar.style.backgroundColor="lightgray";
           scroll.style.width=(container.offsetWidth/scrollratio)+'px';
          
       }else if (navigator.appVersion.indexOf("Linux") != -1){
       		 
          scroll.style.backgroundColor="gray";
           scroll.style.borderRadius='3px';
           scroll.style.height='7px';
           scrollbar.style.height='7px';
           scrollbar.style.borderRadius='3px';
           scrollbar.style.backgroundColor="lightgray";
           scroll.style.width=(container.offsetWidth/scrollratio)+'px';
       }
		var start_ele;
		scroll.addEventListener('mousedown',function(event){
			start_ele=scroll.offsetLeft-event.pageX;
			document.addEventListener('mousemove',ScrollMove);
			document.addEventListener('mouseup',ScrollUp);
		});
		
		function ScrollMove(event){
			var tablediv=document.getElementsByClassName('tablediv')[ 1 ];
			var container=document.getElementsByClassName('container')[ 0 ];
			if(that.isWindow){
				if((start_ele+event.pageX)>=(container.offsetLeft+leftend.offsetWidth)&& (start_ele+event.pageX+scroll.offsetWidth)<=(rightend.offsetLeft) ){
					scroll.style.left=start_ele+event.pageX+'px';
					
					tablediv.scrollLeft=((table.offsetWidth*((scroll.offsetLeft)-(container.offsetLeft+leftend.offsetWidth)))/(container.offsetWidth-leftend.offsetWidth-rightend.offsetWidth));
					
				}
				if((start_ele+event.pageX)==(container.offsetLeft+leftend.offsetWidth)){
						tablediv.scrollLeft=0;
				}
				
			}
			else{

				if(((start_ele+event.pageX)>=container.offsetLeft) && ((container.offsetLeft+container.offsetWidth)>=(start_ele+event.pageX+scroll.offsetWidth)) ){ 
					scroll.style.left=start_ele + event.pageX +'px';
					tablediv.scrollLeft=( ( table.offsetWidth * ( scroll.offsetLeft - container.offsetLeft ) ) ) / container.offsetWidth;
						
					
				}
				if((start_ele+event.pageX)==container.offsetLeft){
						tablediv.scrollLeft=0;
				}
				
			}

			
			


			
		}
		function ScrollUp(event){
			document.removeEventListener('mousemove',ScrollMove);
			document.removeEventListener('mouseup',ScrollUp);
		}
	},
	










	didConnect : function(){
		

		var theader = document.getElementsByClassName( 'ltPropScrollableHeader' )[ 0 ],
		thead = theader.querySelectorAll( 'th' );
		var fixedtable=document.getElementsByClassName('fixedtable')[ 1 ];
		
		//fixedtable.querySelector('thead').style.visibility='collapse';
		var table= document.getElementsByClassName('lyteScrollableTreeTable')[ 0 ];
		var index=0;
		table.querySelector('.thead').style.visibility='hidden';
		theader.style.width=table.offsetWidth+'px';
		Array.prototype.forEach.call(table.querySelectorAll('th'),function(th){
			thead[index].style.width=th.offsetWidth+'px';
			index++;

		});
		//table.querySelector('thead').style.width='0.11px';
		//table.style.top='-'+theader.offsetHeight+'px';
		//table.style.transform='translateY(-'+(theader.offsetHeight)+'px)';
		
		
	},
	tableheader:function(){

		var theader = document.getElementsByClassName( 'ltPropScrollableHeader' )[ 0 ],
		thead = theader.querySelectorAll( 'th' );
		
		var table= document.getElementsByClassName('lyteScrollableTreeTable')[ 0 ];
		var index=0;
		//table.querySelector('thead').style.display=''
		theader.style.width=table.offsetWidth+'px';
		Array.prototype.forEach.call(table.querySelectorAll('th'),function(th){
			thead[index].style.width=th.offsetWidth+'px';
			index++;

		});
		 //table.querySelector('thead').style.display='none'
	},	



	fixed_tableheader :function(){
		
		var fixedtable=document.getElementsByClassName('fixedtable')[ 1 ];
		var fixedheader =document.getElementsByClassName('fixedtable')[0],
		thead=fixedheader.querySelectorAll('th');

		index=0;
		Array.prototype.forEach.call(fixedtable.querySelectorAll('th'),function(th){
			thead[index].style.width=th.offsetWidth+'px';
			index++;
		})
		
	},
	treedragdrop :function(){
		if(this.getData('ltPropDragDrop')){
			this.table= document.getElementsByClassName('lyteScrollableTreeTable')[ 0 ];
			
			this.table_content=this.getData('ltPropData');
			//var that=this;
			this.target_children;
			this.child_elements;
			//target_id;
			var depth;
			this.dragged_row;
			this.dragIndex;
			this.dragged_element;
			this.lyte_draggable();
			this.lyte_droppable();
	 		
 		}
	}.observes('ltPropDragDrop').on('didConnect'),
	lyte_draggable : function(){
		var that=this;
		$L(".dragdrop").draggable({
				
				helper  : function (elem ){ 
					
					that.dragged_element=elem;
					var target_id=parseFloat(elem.dataset.id);
					that.dragIndex=dragdrop_fun.findElement(target_id,that.table_content);
					that.dragged_row=that.table_content[that.dragIndex];
					
					
					var header=that.getData('ltPropHeader')
					that.setData('ltPropDragData',that.dragged_row);

					that.setData('ltPropisDrag',true);
					
					var drag_element=document.getElementById('dragelement').children[0];
					return drag_element;
			 	},
			 	onStart : function(element){

			 		target_id=parseFloat(element.dataset.id);
			 		that.dragged_row=that.table_content[dragdrop_fun.findElement(target_id,that.table_content)];
			 		var parent_index= dragdrop_fun.findElement(that.dragged_row.parent,that.table_content);
			 		
					if(parent_index!=undefined){
						var parent = that.table_content[parent_index];
						var index=0;
						while(parent.children[index]!=undefined){
							if(parent.children[index]===element){
								parent.children.splice(index,1);
							}
							index++;
						}
					}
					that.target_children=(that.dragged_row).children;
					var childElems=[];
			 		if(that.target_children!=undefined){
			 			var length=that.target_children.length - 1;
						while(length>=0){
							childElems.push(that.target_children[length]);
							length--;
						}

						that.child_elements=dragdrop_fun.findchild(childElems.pop(),childElems,[],that.table_content);
						
			 		}else{
			 			that.child_elements=undefined;
			 		}
			 		//console.log(that.table_content);
			 	},
			 	onStop :function(element){
			 		
			 		return false;
			 	}

	 		});
	},
	lyte_droppable :function(){
		var that=this;
		//this.scroll();
		$L(".dragdrop").droppable({
	 			 
				onDrop  : function(draggedElem, droppableElem) {
					var dropIndex=dragdrop_fun.findElement(droppableElem.dataset.id,that.table_content);
					var dropElem_record=that.table_content[dropIndex];
					if(that.dragged_row.lytetreeid!=droppableElem.dataset.id){
						if(dragdrop_fun.findischild(dropElem_record,that.child_elements,that.table_content)==-1){
							var index=0;
							var rows=document.querySelectorAll('tr');
							var dropIndex=dragdrop_fun.findElement(droppableElem.dataset.id,that.table_content);
							var dropElem_record=that.table_content[dropIndex];
							var isdropped=that.getData('ltPropisDropped');
							
							if(dropIndex>that.dragIndex){
								var diff=(dropElem_record.depth+1)-that.dragged_row.depth;
								Lyte.arrayUtils(that.table_content ,'removeAt',that.dragIndex,1);
								that.dragged_row.depth+=diff;
								that.dragged_row.parent=parseFloat(droppableElem.dataset.id);
								that.dragged_row.children=[];
								debugger
								that.dragged_row.isdropped=true;
								Lyte.arrayUtils(that.table_content ,'insertAt',dropIndex,that.dragged_row);
								/*that.setData('ltPropisDropped',false);*/
								var table_row=that.table.querySelectorAll('tr');
								that.dragged_row.isdropped=false;
								index=0;
								
								
								
								var temprow=that.dragged_row;
								if(that.child_elements!=undefined){
									while(that.child_elements[index]!=undefined){
										
										Lyte.arrayUtils(that.table_content ,'removeAt',that.dragIndex,1);
										that.child_elements[index].depth+=diff;
										that.child_elements[index].children=[];
										Lyte.arrayUtils(that.table_content ,'insertAt',dropIndex,that.child_elements[index]);
										
										
										
										
										index++;
									}
								}
							}else{
								
								var diff=(dropElem_record.depth+1)-that.dragged_row.depth;
								Lyte.arrayUtils(that.table_content ,'removeAt',that.dragIndex++,1);
								that.dragged_row.depth+=diff;
								that.dragged_row.parent=parseFloat(droppableElem.dataset.id);
								that.dragged_row.children=[];
								that.dragged_row.isdropped=true;
								Lyte.arrayUtils(that.table_content ,'insertAt',++dropIndex,that.dragged_row);
								
								that.dragged_row.isdropped=false;
								if(that.child_elements!=undefined){
									while(that.child_elements[index]!=undefined){
										Lyte.arrayUtils(that.table_content ,'removeAt',that.dragIndex++,1);
										that.child_elements[index].depth+=diff;
										that.child_elements[index].children=[];
										Lyte.arrayUtils(that.table_content ,'insertAt',++dropIndex,that.child_elements[index]);
										index++;
									}
								}
							}
							
							
							
						}
						that.setData('ltPropisDrag',false);
						that.tableheader();
						var scroll=document.getElementsByClassName('scroll')[0];
						var scrollbar =document.getElementsByClassName('scrollbar')[ 0 ];
						that.lytePropscrollbar();
						that.lyte_draggable();
						that.lyte_droppable();
					}
					
					
				}
	 		});

	},
 




	actions: {
		
		fixHeader: function( event ) {

			if(event.target.scrollLeft>=0){
			var scroll=document.getElementsByClassName('scroll')[0];
			var theader = document.getElementsByClassName( 'ltPropScrollableHeader' )[ 0 ],
			thead = theader.querySelectorAll( 'th' );
			var fixeddiv= document.getElementsByClassName('fixeddiv')[ 0 ];
			var tablediv=document.getElementsByClassName('tablediv')[ 0 ];
			var table= document.getElementsByClassName('lyteScrollableTreeTable')[ 0 ];
			var fixedheader=this.getData('ltPropFixedHeader');
			var container=document.getElementsByClassName('container')[0];

			var tempheader=thead[this.index];

			
			if(event.target.className!="container"){
				tablediv.scrollLeft=event.target.scrollLeft;
				var scrollbar=document.getElementsByClassName('scrollbar')[0];

				 if(this.isWindow){
				 	var button= scrollbar.querySelectorAll('button');
				 	var scrollwidth=((event.target.scrollLeft*(container.offsetWidth-button[0].offsetWidth-button[1].offsetWidth))/table.offsetWidth)+container.offsetLeft+button[1].offsetWidth;
				 	
				 	scroll.style.left=scrollwidth+'px';
				 	

				}else{
					
					var scrollwidth=((event.target.scrollLeft*(container.offsetWidth))/table.offsetWidth)+container.offsetLeft;
					scroll.style.left=(scrollwidth)+'px';
					
				}
				
			while(true){
				
				if(((fixeddiv.getBoundingClientRect().x + fixeddiv.offsetWidth)>(tempheader.getBoundingClientRect().x)) ){
					var temp_index=this.index;
					if(tempheader.getAttribute('fixed')=="true"){
							if(tempheader.getAttribute('tree-col')=="true"){
								Lyte.arrayUtils( fixedheader,'push',{'body':tempheader.textContent,'istree':'true'});
							}else{
								Lyte.arrayUtils( fixedheader,'push',{'body':tempheader.textContent});
							}
							this.fixed_tableheader();
							if((fixeddiv.offsetWidth>=container.offsetWidth)){
								Lyte.arrayUtils(fixedheader,'pop')
							}
							

					}
					if(++this.index<thead.length){
						tempheader=thead[this.index];
					}else{
						this.index--;
						break;
					}
					/*if((fixeddiv.getBoundingClientRect().x + fixeddiv.offsetWidth)>(tempheader.getBoundingClientRect().x+tempheader.offsetWidth)){
							this.index++;
					}*/
				}else{
					break;
				}
			}
			while(true){
				if(((fixeddiv.getBoundingClientRect().x + fixeddiv.offsetWidth)<=(tempheader.getBoundingClientRect().x))){
					if(--this.index>=0){
						tempheader=thead[this.index];
					}else{
						this.index++;
						break;
					}
					if(thead[this.index].getAttribute('fixed')=="true"){
							Lyte.arrayUtils( fixedheader,'pop');
					}
					
				}else{
					break;
				}
			}
				/*if(event.target.scrollLeft==(table.offsetWidth-container.offsetWidth)&&(this.index<(thead.length-1))){
					while(this.index<thead.length-1){
						if(thead[this.index].getAttribute('fixed')=="true"){

							Lyte.arrayUtils( fixedheader,'push',thead[this.index].textContent);
							this.tableheader();
							if((fixeddiv.offsetWidth>=container.offsetWidth)){

								Lyte.arrayUtils(fixedheader,'pop')
							}
									
						}
						this.index++;
					}


				}*/
				
				/*if(event.target.scrollLeft==0){
					
					while(fixedheader.length){
						Lyte.arrayUtils(fixedheader,'pop')
					}
					this.index=0;
				}
*/
				


			}
		}

			
		},
		ScrollHeader :function ( event ){
			//debugger

			var tablediv=document.getElementsByClassName('tablediv')[ 1 ];
			tablediv.scrollLeft=event.target.scrollLeft;

		}
	}
	

	

	










	/*(tabletag Implementation)Colwidth :function(){
		
		if( !this.getData( 'ltPropIsChild' ) ) {
			var arr=[] ,count=0,minarr=[];
			var th=this.$node.querySelectorAll('th');
			var headerlength=this.data.ltPropHeader.length;
			
			this.setData('ltPropHeaderLength',headerlength);
			var width;
			for(var thead=0;thead<headerlength;thead++){
				
				th[thead].style.minWidth=th[thead].offsetWidth+'px';
				width=th[thead].getBoundingClientRect().width;
				th[thead].style.width=width+'px';
				minarr.push(th[thead].style.minWidth);
				//debugger
				arr.push(width);
			}
			
			for(var i=headerlength;i<th.length;i++){
				th[i].style.width=arr[i%headerlength] + 'px';
				th[i].style.minWidth=minarr[i%headerlength];
				
				
			}
			
		}
	}.on('didConnect'),
	colresize:function(){
		if(!this.getData('ltPropIsChild')){

			var head;
			var id;
			var startele,table_width;
			var table=this.$node.querySelector('table');
			//table_width=table.offsetWidth;
			//table.style.width=table_width+'px';
			//table.style.minWidth=table_width+'px';
			this.$node.addEventListener('mousedown',function(event){
				if(event.target.tagName=="TH"){
					head=event.target;
					startele=head.offsetWidth-event.pageX;
					id=head.dataset.id;
					table_width=table.offsetWidth-event.pageX;


				}
			});
			this.$node.addEventListener('mousemove',function(event){
				if(head){
					hwidth=startele+event.pageX+'px';
					if( parseFloat( head.style.minWidth ) < parseFloat( hwidth ) ) { 
						head.style.width=hwidth;
						table.style.width=table_width+event.pageX+'px';
						var headerlength= this.getData('ltPropHeaderLength');
						var th=this.querySelectorAll('th');
						var th_id;
						for(var start_head=headerlength;start_head<th.length;start_head++){
							th_id=th[start_head].dataset.id;
							if(th_id==id){
								th[start_head].style.width=head.offsetWidth+'px';
							}
						}
					}	
				}
			});
			this.$node.addEventListener('mouseup',function(event){
				head=undefined;
			});
		}else{
			var table=this.$node.querySelector('table');

			table.style.width="100%";
		}
	}.on('didConnect')*/
	/* flex table-tree Implementation
	colresize : function(){
		var head;
		var startele;
		this.$node.addEventListener('mousedown',function(event){
			
		});
		this.$node.addEventListener('mousemove',function(event){
			if(head){
				head.style.width=startele+event.pageX+'px';
				var rows=this.querySelectorAll('TD');

				var arr = [], count = 0;

				Array.prototype.forEach.call(this.querySelectorAll('TH'),function(th){
					var width=th.getBoundingClientRect().width;
					arr.push( width );
				});

				Array.from( rows ).forEach( function( item ) {
					item.style.width = arr[ count++ % arr.length ] + 'px';
				} );


			}
		});
		this.$node.addEventListener('mouseup',function(event){
			head=undefined;
		});
	}.observes('ltPropResize').on('didConnect'),
	setcolwidth : function(){
		debugger;
		var rows=this.$node.querySelectorAll('td');
			for(var i = 0; i < th.length; ) {
				i += this.setWidthOfEachCell( rows, i );
				
			} 
	},

	setWidthOfEachCell: function( rows, rowStart ) {
		var count = 0;
		Array.prototype.forEach.call(
			this.$node.querySelectorAll( 'TH' ),
			function( th ) {
				var width = th.getBoundingClientRect().width;
				rows[ rowStart + count ].style.width=width+'px';
				count++;
			} 
		);

		return count;
	}*/

});


var dragdrop_fun={
	findElement:function(target_id,table_content){
 			var index=0;
 			
 			while(table_content[index]!=undefined){
 				if(table_content[index].lytetreeid===parseFloat(target_id)){
 					return index;
 				}
 				index++;
			}
			return undefined;

		 		
		 },
	findchild :function (curr_child,childElems,child_stack,table_content){
		 	if(curr_child!=undefined){
		 		var temp=table_content[this.findElement(curr_child.dataset.id,table_content)];
			 	
			 	child_stack.push(temp);

			 	curr_child=temp.children;
			 	
			 	if(curr_child!=undefined){
			 		
					
						var length=(curr_child.length) - 1;
						while(length>=0){
							childElems.push(curr_child[length]);
							length--;
						}
					
					return this.findchild(childElems.pop(),childElems,child_stack,table_content);
			 	}else if(childElems.length){
					return this.findchild(childElems.pop(),childElems,child_stack,table_content);
				}
				else{
					return child_stack;
				}
			}
			else{
					return child_stack;
				}
		 },
		findischild: function (target_element,child_elements,table_content){
		 	var index=0;
		 	if(child_elements!=undefined){
			 	var temp=child_elements[index];
			 	while(temp!=undefined){
			 		if(target_element.lytetreeid===temp.lytetreeid){
			 			return index;
			 		}
			 		index++;
			 		temp=child_elements[index];
			 	}
		 	}else{
		 		return -1;
		 	}
		 	return -1;
		 }
}



Lyte.Component.registerHelper("generatespan",function(depth){
	var element="";

	for(var i=0;i<depth;i++){
		element += "<span style='width:10px; height:10px; display:inline-block;'></span>";
	} 
	return element;
});


Lyte.Component.registerHelper("parentchild",function(node,item,isdropped){ 
	
		var parent=item.parent;
		var data=this.getData('ltPropData');
		if(parent!=undefined){
			var index=0;
			
 			while(data[index]!=undefined){
 				if(data[index].lytetreeid===parseFloat(parent)){
 					break;
 				}
 				index++;
			}

			if(data[index]!=undefined){
				if(isdropped==false){
					if(data[index].children!=undefined){
						data[index].children.push(node);
					}else{
						data[index].children=[];
						data[index].children.push(node);
					}
				}else{
					if(data[index].children!=undefined){
						data[index].children.unshift(node);
					}else{
						data[index].children=[];
						data[index].children.unshift(node);
					}
				}
			}

		}
		
});
