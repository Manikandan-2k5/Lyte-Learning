/**
 * Renders data in tree view
 * @component lyte-tree
 * @version 1.0.6
 * @methods onToggle,onToggleEnd
 */

 Lyte.Component.register("lyte-tree", {
_template:"<template tag-name=\"lyte-tree\" role=\"treeitem\"> <template is=\"switch\" value=\"{{ltPropStructureType}}\"><template case=\"file\"> <template is=\"for\" items=\"{{ltPropData}}\" item=\"item\" index=\"index\"> <div class=\"lyteTreeBodyDiv\" role=\"group\"> <lyte-tree-body data-index=\"{{lyteUiTreeIndexHelp(indexVar,index)}}\" class=\"{{lyteUiTreeClassHelp(item.defaultState,item.collapsed,'lyteTreeBodyOpened','lyteTreeBodyClosed',ltPropWrapperOpenClass,ltPropWrapperCloseClass)}}\" data-level=\"{{lyteUiTreeLevelHelp(indexVar,index)}}\" style=\"--treeLevel:{{lyteUiTreeLevelHelp(indexVar,index)}}\"> <div class=\"mainContainer lyteTreeMainContainer {{lyteUiTreeChildHelp(item,ltPropLeafContainer,ltPropChildrenValue)}} {{lyteUiTreeHasChildHelp(item,ltPropChildrenValue)}} {{lyteTreeMaxChild(indexVar,index,ltPropMaxLevel)}}\" role=\"{{lyteTreeAriaRole(item,ltPropChildrenValue)}}\"> <template is=\"switch\" value=\"{{lyteTreeTypeHelp(ltPropSortable,ltPropAllowExternalImport)}}\"><template case=\"withExternal\"> <div class=\"lyteTreeSortableElement\" __dragenter=\"{{action('dragEnterFunction',event,this)}}\" __dragover=\"{{action('dragOverFunction',event,this)}}\" __dragleave=\"{{action('dragLeaveFunction',event,this)}}\" __drop=\"{{action('dropFunction',event,this)}}\"> <lyte-yield tabindex=\"{{lyteTreeAriaTabIndexHelp(indexVar,index)}}\" collapsed=\"{{if(item.collapsed,'collapsed','')}}\" yield-name=\"content\" list-value=\"{{item}}\" list-index=\"{{lyteUiTreeIndexHelp(indexVar,index)}}\" class=\"{{lyteUiTreeChildHelp(item,ltPropLeafNodeClass,ltPropChildrenValue)}}\"></lyte-yield> </div> </template><template case=\"onlyInternal\"> <div class=\"lyteTreeSortableElement\"> <lyte-yield tabindex=\"{{lyteTreeAriaTabIndexHelp(indexVar,index)}}\" collapsed=\"{{if(item.collapsed,'collapsed','')}}\" yield-name=\"content\" list-value=\"{{item}}\" list-index=\"{{lyteUiTreeIndexHelp(indexVar,index)}}\" class=\"{{lyteUiTreeChildHelp(item,ltPropLeafNodeClass,ltPropChildrenValue)}}\"></lyte-yield> </div> </template><template case=\"nonSortable\"> <lyte-yield tabindex=\"{{lyteTreeAriaTabIndexHelp(indexVar,index)}}\" collapsed=\"{{if(item.collapsed,'collapsed','')}}\" yield-name=\"content\" list-value=\"{{item}}\" list-index=\"{{lyteUiTreeIndexHelp(indexVar,index)}}\" class=\"{{lyteUiTreeChildHelp(item,ltPropLeafNodeClass,ltPropChildrenValue)}}\"></lyte-yield> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(expHandlers(item[ltPropChildrenValue][&quot;length&quot;],'!==',0),'&amp;&amp;',expHandlers(item[ltPropChildrenValue],'!==',undefined)),'&amp;&amp;',expHandlers(item.collapsed,'!')),'&amp;&amp;',lyteUiTreeMaxLevelHelp(indexVar,index,ltPropMaxLevel))}}\"><template case=\"true\"> <lyte-tree class=\"{{lyteTreeClassStateHelp(item)}} lyteTreeChildrenLevel\" lt-prop-children-value=\"{{ltPropChildrenValue}}\" index-var=\"{{lyteUiTreeIndexHelp(indexVar,index)}}\" lt-prop-data=\"{{item[ltPropChildrenValue]}}\" id=\"{{ltPropId}}\" lt-prop-tree-lines=\"{{ltPropTreeLines}}\" lt-prop-yield=\"{{ltPropYield}}\" lt-prop-open-class=\"{{ltPropOpenClass}}\" lt-prop-wrapper-open-class=\"{{ltPropWrapperOpenClass}}\" lt-prop-leaf-node-class=\"{{ltPropLeafNodeClass}}\" lt-prop-close-class=\"{{ltPropCloseClass}}\" lt-prop-wrapper-close-class=\"{{ltPropWrapperCloseClass}}\" lt-prop-max-level=\"{{ltPropMaxLevel}}\" lt-prop-toggle-animation=\"{{ltPropToggleAnimation}}\" lt-prop-sortable=\"{{ltPropSortable}}\" lt-prop-scroll-speed=\"{{ltPropScrollSpeed}}\" lt-prop-allow-external-import=\"{{ltPropAllowExternalImport}}\" on-toggle=\"{{method('onToggle')}}\" on-toggle-end=\"{{method('onToggleEnd')}}\" on-before-open=\"{{method('onBeforeOpen')}}\" on-open=\"{{method('onOpen')}}\" on-before-close=\"{{method('onBeforeClose')}}\" on-close=\"{{method('onClose')}}\"> <template is=\"registerYield\" yield-name=\"content\" from-parent=\"\"></template> </lyte-tree> </template></template> </div> </lyte-tree-body> </div> </template> </template><template case=\"hierarchy\"> <template is=\"for\" items=\"{{ltPropData}}\" item=\"item\" index=\"index\"> <table class=\"lyteHTreeNode\" cellpadding=\"0\" cellspacing=\"0\" data-level=\"{{lyteUiTreeLevelHelp(indexVar,index)}}\" child-index=\"{{index}}\" data-index=\"{{lyteUiTreeIndexHelp(indexVar,index)}}\"> <tbody><tr> <td class=\"lyteHTreeParentNode\" __click=\"{{action('openHorizontalTree',this)}}\"> <template is=\"if\" value=\"{{expHandlers(lyteUiTreeLevelHelp(indexVar,index),'>',0)}}\"><template case=\"true\"> <div class=\"lyteHTreeConnectorLine\"> <div class=\"lyteHTreeVerticalConnectLine {{lyteHTreeTopVline(index,ltPropData)}}\"></div> <div class=\"lyteHTreeVerticalConnectLine {{lyteHTreeBottomVline(index,ltPropData)}}\"></div> </div> <span class=\"lyteHTreeHorizontalBeforeConnectLine\"></span> </template></template> <div class=\"lyteHTreeContentWrap\"> <lyte-yield yield-name=\"content\" list-value=\"{{item}}\"></lyte-yield> </div> <span class=\"lyteHTreeHorizontalAfterConnectLine lyteHTreeHorizontalConnectorHidden\"></span> </td> <td is=\"if\" lyte-if=\"true\" value=\"{{expHandlers(expHandlers(item.collapsed,'!==',undefined),'&amp;&amp;',expHandlers(item.collapsed,'!==',true))}}\"></td> </tr> </tbody></table> </template> </template><template case=\"data\"> <div class=\"lyteDataTreeNodeWrap\"> <template is=\"switch\" value=\"{{dataType}}\"><template case=\"array\"> <template is=\"if\" value=\"{{expHandlers(arrayOpened,'!')}}\"><template case=\"true\"><div class=\"lyteDataTreeNode lyteDataTreeArrayNode {{if(lyteTreeArrayOpened,'lyteDataTreeOpened','lyteDataTreeClosed')}}\" __click=\"{{action('openArray',this)}}\"> <span> [ <template is=\"for\" items=\"{{ltPropArrayData}}\" item=\"item\" index=\"index\"> <template is=\"switch\" value=\"{{lyteTreeDataType(item)}}\"><template case=\"array\"> <span class=\"test\" style=\"text-transform:capitalize;\">{{lyteTreeDataType(item)}}({{lyteTreeGetArrayLength(item)}})</span> <span class=\"lyteTreeComma\">,</span> </template><template case=\"object\"> <span>{...}</span> <span class=\"lyteTreeComma\">,</span> </template><template case=\"string\"> <span class=\"lyteDataTreeNodeText\">'{{item}}'</span> <span class=\"lyteTreeComma\">,</span> </template><template case=\"number\"> <span>{{item}}</span> <span class=\"lyteTreeComma\">,</span> </template></template> </template> ] </span> </div></template><template case=\"false\"><div class=\"lyteDataTreeOpened\" __click=\"{{action('openArray',this)}}\"> <span>Array({{lyteTreeArrayLength}})</span> </div></template></template> <template is=\"if\" value=\"{{lyteTreeArrayOpened}}\"><template case=\"true\"><div class=\"lyteDataTreeNodeWrap\"> <template is=\"for\" items=\"{{ltPropArrayData}}\" item=\"item\" index=\"index\"> <template is=\"switch\" value=\"{{lyteTreeDataType(item)}}\"><template case=\"array\"> <div class=\"lyteDataTreeNode lyteDataTreeArrayNode\"> <span class=\"lyteDataTreeIndex\">{{index}}</span> <span>:</span> <div class=\"lyteDataTreeNodeContent\"> <lyte-tree class=\"lyteDataTreeSubLevel\" lt-prop-structure-type=\"data\" lt-prop-array-data=\"{{item}}\" on-before-open=\"{{method('onBeforeOpen')}}\" on-open=\"{{method('onOpen')}}\" on-before-close=\"{{method('onBeforeClose')}}\" on-close=\"{{method('onClose')}}\"> <template is=\"registerYield\" yield-name=\"content\"></template> </lyte-tree> </div> </div> </template><template case=\"object\"> <div class=\"lyteDataTreeNode lyteDataTreeObjectNode\"> <span class=\"lyteDataTreeIndex\">{{index}}</span> <span>:</span> <div class=\"lyteDataTreeNodeContent\"> <lyte-tree class=\"lyteDataTreeSubLevel\" lt-prop-structure-type=\"data\" lt-prop-json-data=\"{{item}}\" on-before-open=\"{{method('onBeforeOpen')}}\" on-open=\"{{method('onOpen')}}\" on-before-close=\"{{method('onBeforeClose')}}\" on-close=\"{{method('onClose')}}\"> <template is=\"registerYield\" yield-name=\"content\"></template> </lyte-tree> </div> </div> </template><template default=\"\"> <div class=\"lyteDataTreeNode\"> <span class=\"lyteDataTreeIndex\">{{index}}</span> <span>:</span> <span class=\"lyteDataTreeNodeContent lyteDataTreeNodeText\">{{item}}</span> </div> </template></template> </template> </div></template></template> </template><template case=\"object\"> <template is=\"if\" value=\"{{expHandlers(jsonOpened,'!')}}\"><template case=\"true\"><div class=\"lyteDataTreeNode lyteDataTreeObjectNode {{if(lyteTreeJsonOpened,'lyteDataTreeOpened','lyteDataTreeClosed')}}\" __click=\"{{action('openJson',this)}}\"> <span>{ <template is=\"forIn\" object=\"{{ltPropJsonData}}\" value=\"value\" key=\"key\"> <span>{{key}}</span>: <template is=\"switch\" value=\"{{lyteTreeDataType(value)}}\"><template case=\"array\"> <span style=\"text-transform:capitalize;\">{{lyteTreeDataType(value)}}({{lyteTreeGetArrayLength(value)}})</span> <span class=\"lyteTreeComma\">,</span> </template><template case=\"object\"> <span>{...}</span> <span class=\"lyteTreeComma\">,</span> </template><template case=\"string\"> <span class=\"lyteDataTreeNodeText\">'{{value}}'</span> <span class=\"lyteTreeComma\">,</span> </template><template case=\"number\"> <span class=\"lyteDataTreeNodeText\">{{value}}</span> <span class=\"lyteTreeComma\">,</span> </template></template> </template> }</span> </div></template><template case=\"false\"><div class=\"lyteDataTreeOpened\" __click=\"{{action('openJson',this)}}\"> <span class=\"lyteDataTreeObjectTextLabel\">Object</span> </div></template></template> <template is=\"if\" value=\"{{lyteTreeJsonOpened}}\"><template case=\"true\"><div class=\"lyteDataTreeNodeWrap\"> <template is=\"forIn\" object=\"{{ltPropJsonData}}\" value=\"value\" key=\"key\"> <template is=\"switch\" value=\"{{lyteTreeDataType(value)}}\"><template case=\"array\"> <div class=\"lyteDataTreeNode lyteDataTreeArrayNode\"> <span class=\"lyteDataTreeIndex\">{{key}}</span> <span>:</span> <div class=\"lyteDataTreeNodeContent\"> <lyte-tree class=\"lyteDataTreeSubLevel\" lt-prop-structure-type=\"data\" lt-prop-array-data=\"{{value}}\" on-before-open=\"{{method('onBeforeOpen')}}\" on-open=\"{{method('onOpen')}}\" on-before-close=\"{{method('onBeforeClose')}}\" on-close=\"{{method('onClose')}}\"> <template is=\"registerYield\" yield-name=\"content\"></template> </lyte-tree> </div> </div> </template><template case=\"object\"> <div class=\"lyteDataTreeNode lyteDataTreeObjectNode\"> <span class=\"lyteDataTreeIndex\">{{key}}</span> <span>:</span> <div class=\"lyteDataTreeNodeContent\"> <lyte-tree class=\"lyteDataTreeSubLevel\" lt-prop-structure-type=\"data\" lt-prop-json-data=\"{{value}}\" on-before-open=\"{{method('onBeforeOpen')}}\" on-open=\"{{method('onOpen')}}\" on-before-close=\"{{method('onBeforeClose')}}\" on-close=\"{{method('onClose')}}\"> <template is=\"registerYield\" yield-name=\"content\"></template> </lyte-tree> </div> </div> </template><template case=\"string\"></template><template case=\"number\"> <div class=\"lyteDataTreeNode\"> <span class=\"lyteDataTreeIndex\">{{key}}</span> <span>:</span> <span class=\"lyteDataTreeNodeContent lyteDataTreeNodeText\">{{value}}</span> <span class=\"lyteTreeComma testend\">,</span> </div> </template></template> </template> </div></template></template> </template></template> </div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"file":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--treeLevel:'",{"type":"helper","value":{"name":"lyteUiTreeLevelHelp","args":["indexVar","index"]}}]}}}},{"type":"attr","position":[1,1,1]},{"type":"attr","position":[1,1,1,1]},{"type":"switch","position":[1,1,1,1],"cases":{"withExternal":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}]},"onlyInternal":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}]},"nonSortable":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,1,3]},{"type":"if","position":[1,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1,1]}]}]},"hierarchy":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,0,1]},{"type":"attr","position":[1,1,0,1,1]},{"type":"if","position":[1,1,0,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]}]}},"default":{}},{"type":"attr","position":[1,1,0,1,3,1]},{"type":"insertYield","position":[1,1,0,1,3,1]},{"type":"attr","position":[1,1,0,3]},{"type":"if","position":[1,1,0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,1]}]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{(item.collapsed !== undefined) &amp;&amp; (item.collapsed !== true)}}\"><template case=\"true\" depth=\"3\"><table><tbody><tr> <td class=\"lyteHtreeChildNode\"> <lyte-tree id=\"{{ltPropId}}\" class=\"lyteHTreeChildWrap\" index-var=\"{{lyteUiTreeIndexHelp(indexVar,index)}}\" lt-prop-children-value=\"{{ltPropChildrenValue}}\" lt-prop-data=\"{{item[ltPropChildrenValue]}}\" lt-prop-open-class=\"open\" lt-prop-close-class=\"close\" lt-prop-yield=\"{{ltPropYield}}\" lt-prop-structure-type=\"hierarchy\" lt-prop-leaf-node-class=\"{{ltPropLeafNodeClass}}\" on-before-open=\"{{method('onBeforeOpen')}}\" on-open=\"{{method('onOpen')}}\" on-before-close=\"{{method('onBeforeClose')}}\" on-close=\"{{method('onClose')}}\"> <template is=\"registerYield\" yield-name=\"content\" from-parent=\"\"></template> </lyte-tree> </td> </tr></tbody></table></template></template>"}]}]},"data":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"switch","position":[1,1],"cases":{"array":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1,1]},{"type":"for","position":[0,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"array":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[1,2]}]},"object":{"dynamicNodes":[]},"string":{"dynamicNodes":[{"type":"text","position":[1,1]}]},"number":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,1,1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"array":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,5,1]},{"type":"registerYield","position":[1,5,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,5,1]}]},"object":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,5,1]},{"type":"registerYield","position":[1,5,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,5,1]}]}},"default":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,5,0]}]}}]}]}},"default":{}}]},"object":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1,1]},{"type":"forIn","position":[0,1,1],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"attr","position":[3]},{"type":"switch","position":[3],"cases":{"array":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[1,2]}]},"object":{"dynamicNodes":[]},"string":{"dynamicNodes":[{"type":"text","position":[1,1]}]},"number":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"forIn","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"array":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,5,1]},{"type":"registerYield","position":[1,5,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,5,1]}]},"object":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,5,1]},{"type":"registerYield","position":[1,5,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,5,1]}]},"string":{"dynamicNodes":[],"additional":{"next":"number"}},"number":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,5,0]}]}},"default":{}}]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["ltPropData","ltPropJsonData","ltPropArrayData","ltPropContent","ltPropChildrenValue","ltPropLeafContainer","ltPropWrapperOpenClass","ltPropWrapperCloseClass","ltPropOpenClass","ltPropCloseClass","ltPropLeafNodeClass","ltPropMaxLevel","ltPropStructureType","ltPropToggleAnimation","ltPropSortable","ltPropScrollSpeed","ltPropAllowExternalImport","ariaLiveContent","ariaLiveBoolean","treeHeight","ltPropStateAttr","dataType","lyteTreeArrayOpened","lyteTreeJsonOpened","lyteTreeArrayLength","arrayOpened","jsonOpened","heightTransArr","collapsedAll","tempVar","indexVar","currentSortObject","currentClickedBody","treeDimension","contentDimension","initialClientY","currentBodyDimension","previousSortIndex","currentSortIndex","triggerSortable","exeDrop","initialTop","initialLeft","stopScroll","scrollTriggered","dropZoneDim","indexObj"],

  data: function() {
    return {
      /**
       * @componentProperty {array} ltPropData
       */

      'ltPropData': Lyte.attr('array', {
        'default': []
      }),

			/**
       * @componentProperty {array} ltPropJsonData
       */

      'ltPropJsonData': Lyte.attr('object', {
        'default': {}
      }),

			/**
       * @componentProperty {array} ltPropArrayData
       */

      'ltPropArrayData': Lyte.attr('array', {
        'default': []
      }),

      /**
       * @componentProperty {array} ltPropContent
       */

      'ltPropContent': Lyte.attr('object', {
        'default': {lyteTreeEmptyObject : true}
      }),

      /**
       * @componentProperty {string} ltPropChildrenValue
       * @default children
       */

      'ltPropChildrenValue': Lyte.attr('string', {
        'default': 'children'
      }),

      /**
       * @componentProperty {string} ltPropLeafContainer
       * @default lyteTreeNoChildContainer
       */

      'ltPropLeafContainer': Lyte.attr('string', {
        'default': 'lyteTreeNoChildContainer'
      }),

      /**
       * @componentProperty {string} ltPropWrapperOpenClass
       */

      'ltPropWrapperOpenClass': Lyte.attr('string', {
        'default': ''
      }),

      /**
       * @componentProperty {string} ltPropWrapperCloseClass
       */

      'ltPropWrapperCloseClass': Lyte.attr('string', {
        'default': ''
      }),

      /**
       * @componentProperty {string} ltPropOpenClass
       */

      'ltPropOpenClass': Lyte.attr('string', {
        'default': ''
      }),

      /**
       * @componentProperty {string} ltPropCloseClass
       */

      'ltPropCloseClass': Lyte.attr('string', {
        'default': ''
      }),

      /**
       * @componentProperty {string} ltPropLeafNodeClass
       * @default lyteTreeHasNoChild
       */

      'ltPropLeafNodeClass': Lyte.attr('string', {
        'default': 'lyteTreeHasNoChild'
      }),

      'ltPropMaxLevel': Lyte.attr('number', {
        'default': 35
      }),

      "ltPropStructureType": Lyte.attr('string', {
        'default': 'file'
      }),

      "ltPropToggleAnimation" : Lyte.attr('boolean' , {
        'default' : true
      }),

      /**
       * @componentProperty {boolean} ltPropSortable
       * @default false
       * @version 3.71.0
       */
      "ltPropSortable" : Lyte.attr('boolean' , {
        default : false
      }),

      /**
       * @componentProperty {number} ltPropScrollSpeed
       * @default 5
       * @version 3.71.0
       */
       "ltPropScrollSpeed" : Lyte.attr('number' , {
        default : 5
      }),

      "ltPropAllowExternalImport" : Lyte.attr('boolean' , {
        default : false
      }),



      "ariaLiveContent" : Lyte.attr('string' , {
        'default' : ""
      }),
      "ariaLiveBoolean" : Lyte.attr('boolean' , {
        'default' : false
      }),


      'treeHeight': Lyte.attr('number', {
        'default': 0
      }),
      'ltPropStateAttr': Lyte.attr('string', {
        'default': ''
      }),


			'dataType' : Lyte.attr('string' , {
				default : 'array'
			}),
			'lyteTreeArrayOpened' : Lyte.attr('boolean' , {
				default : false
			}),
			'lyteTreeJsonOpened' : Lyte.attr('boolean' , {
				default : false
			}),
      'lyteTreeArrayLength' : Lyte.attr('number' , {
        default : 0
      }),
      'arrayOpened' : Lyte.attr('boolean' , {
        default : false
      }),
      'jsonOpened' : Lyte.attr('boolean' , {
        default : false
      }),

      'heightTransArr': Lyte.attr('array', {
        default: []
      }),

      'collapsedAll': Lyte.attr('boolean', {
        default: false
      }),

      'tempVar': Lyte.attr('string', {
        default: ''
      }),
      'indexVar': Lyte.attr('string', {
        default: ''
      }),
      'currentSortObject' : Lyte.attr('object'),
      'currentClickedBody' : Lyte.attr('string' , {
        default : ''
      }),
      'treeDimension' : Lyte.attr('object' , {
        default : {}
      }),
      'contentDimension' : Lyte.attr('object' , {
        default : {}
      }),
      'initialClientY' : Lyte.attr('number' , {
        default : 0
      }),
      'currentBodyDimension' : Lyte.attr('object'),
      'previousSortIndex' : Lyte.attr('string'),
      'currentSortIndex' : Lyte.attr('string'),
      'triggerSortable' : Lyte.attr('boolean' , {
        default : false
      }),
      'exeDrop' : Lyte.attr('boolean' , {
        default : false
      }),
      'initialTop' : Lyte.attr('number' , {
        default : 0
      }),
      'initialLeft' : Lyte.attr('number' , {
        default : 0
      }),
      'stopScroll' : Lyte.attr('boolean' , {
        default : true
      }),
      'scrollTriggered' : Lyte.attr('boolean' , {
        default : false
      }),
      'dropZoneDim' : Lyte.attr('object' , {
        default : {}
      }),
      'indexObj' : Lyte.attr('string' , {
        default : ""
      })
    }
  },

  init: function() {

    if ($L(this.$node).attr('class') === undefined) {
      $L(this.$node).addClass('lyteTreeOpened')
    }

    var _thisTree = this

    this.$node.closeIcon = function(icon){
      $L(icon).addClass('lyteIconClosed');
      $L(icon).addClass(this.getData('ltPropCloseClass'));
      $L(icon).removeClass('lyteIconOpened');
      $L(icon).removeClass(this.getData('ltPropOpenClass'));
      if($L(icon).hasClass('lyteTreeIconHasChild')){
        $L(icon).removeClass('lyteTreeIconHasChild');
        $L(icon).closest('.lyteTreeMainContainer').removeClass('lyteTreeHasChild');
      }
    }

    this.$node.openIcon = function(icon){
      $L(icon).removeClass('lyteIconClosed');
      $L(icon).removeClass(this.getData('ltPropCloseClass'));
      $L(icon).addClass('lyteIconOpened');
      $L(icon).addClass(this.getData('ltPropOpenClass'));
      if($L(icon).hasClass('lyteTreeIconHasChild')){
        $L(icon).removeClass('lyteTreeIconHasChild');
        $L(icon).closest('.lyteTreeMainContainer').removeClass('lyteTreeHasChild');
      }
      $L(icon).closest('.lyteTreeMainContainer').removeClass('lyteTreeNoChildContainer')
      $L(icon).closest('.lyteTreeMainContainer').removeClass('lyteTreeLastChild')
      $L(icon).closest('lyte-yield').removeClass('lyteTreeLastChild')
      $L(icon).closest('lyte-yield').removeClass(this.getData('ltPropLeafNodeClass'))
    }

    this.$node.expandAll = function(param) {
      var _this = this

      var treeBody = $L(this).find('lyte-tree')[0].closest('lyte-tree-body')
      var icon = $L(treeBody).find('lyte-tree-icon')[0]
      if($L(treeBody).closest('.lyteTreeCollapsed')[0]){
        $L(treeBody).closest('.lyteTreeCollapsed').removeClass('lyteTreeCollapsed')
      }
      if(param && param.changeCollapsed){
        var treeData = this.component.data.ltPropData
        function openCollapsed(treeData){
          for(var i=0;i<treeData.length;i++){
            if(treeData[i].collapsed === true){
              Lyte.objectUtils(treeData[i] , 'add' , 'collapsed' , false)
            }
            if(treeData[i][_this.component.data.ltPropChildrenValue] && treeData[i][_this.component.data.ltPropChildrenValue].length > 0){
              openCollapsed(treeData[i][_this.component.data.ltPropChildrenValue])
            }
          }
          return
        }
        openCollapsed(treeData);
      }

      function openingFun() {

        var children = $L(_this).find('.lyteTreeChildrenLevel')
        var maxedChild = $L(_this).find('.lyteTreeMaxedChild')

        $L(children).find('.lyteTreeCollapsed').removeClass('lyteTreeCollapsed')

        if($L(children.find('.lyteIconClosed.lyteTreeIconHasChild'))){
          $L(children.find('.lyteIconClosed.lyteTreeIconHasChild')).closest('.lyteTreeHasChild').find('lyte-tree').closest('.lyteTreeHasChild').find('lyte-tree-icon').removeClass('lyteTreeIconHasChild')
          $L(children.find('.lyteIconClosed.lyteTreeIconHasChild')).closest('.lyteTreeHasChild').find('lyte-tree').closest('.lyteTreeHasChild').removeClass('lyteTreeHasChild')
        }

        $L(children).find('.lyteTreeClosed:not(.lyteTreeIconHasChild)').closest('.lyteTreeBodyClosed').addClass('lyteTreeBodyOpened')
        $L(children).find('.lyteTreeClosed:not(.lyteTreeIconHasChild)').closest('.lyteTreeBodyClosed').removeClass('lyteTreeBodyClosed')

        $L(children).find('.lyteTreeClosed:not(.lyteTreeIconHasChild)').addClass('lyteTreeOpened');
        $L(children).find('.lyteTreeClosed:not(.lyteTreeIconHasChild)').removeClass('lyteTreeClosed');

        $L(maxedChild).find('.lyteTreeOpened').addClass('lyteTreeClosed');
        $L(maxedChild).find('.lyteTreeOpened').removeClass('lyteTreeOpened');

        $L(children).find('.lyteIconClosed:not(.lyteTreeIconHasChild)').addClass('lyteIconOpened ' + _this.getData('ltPropOpenClass'));
        $L(children).find('.lyteIconClosed:not(.lyteTreeIconHasChild)').removeClass('lyteIconClosed ' + _this.getData('ltPropCloseClass'));


        $L(maxedChild).find('.lyteIconOpened').addClass('lyteIconClosed ' + _this.getData('ltPropCloseClass'));
        $L(maxedChild).find('.lyteIconOpened').removeClass('lyteIconOpened ' + _this.getData('ltPropOpenClass'));

        $L(_this).find('.lyteTreeChildrenLevel').css({
          display: '',
          height: 'auto'
        });

        if(_this.getData('collapsedAll')) {
          icon.click();
        }

        _this.setData('collapsedAll', false);
      }

      if ($L('.lyteTreeCollapsed').length > 0) {
        // if (this.getData('collapsedAll')) {
          openingFun()
        // }
      } else {
        openingFun()
        $L(_thisTree.$node).find('.lyteIconClosed:not(.lyteTreeIconMaxed)').click();
      }

    }
    this.$node.collapseAll = function() {

      if (!this.getData('collapsedAll')) {
        var _this = this

        var collTrans = function() {

          $L(_this).find('.lyteTreeOpened').addClass('lyteTreeClosed');
          $L(_this).find('.lyteTreeOpened').removeClass('lyteTreeOpened');
          $L(_this).find('.lyteTreeBodyOpened').addClass('lyteTreeBodyClosed');
          $L(_this).find('.lyteTreeBodyOpened').removeClass('lyteTreeBodyOpened');

          $L(_this).find('.lyteIconOpened').addClass('lyteIconClosed ' + _this.getData('ltPropCloseClass'));
          $L(_this).find('.lyteIconOpened').removeClass('lyteIconOpened ' + _this.getData('ltPropOpenClass'));

          $L(_this).find('.lyteTreeChildrenLevel').css({
            display: 'none',
            height: 'auto'
          });

          $L(_this).find('.lyteTreeChildrenLevel')[0].removeEventListener('transitionend', collTrans)

        }

        var treeBody = $L(this).find('lyte-tree')[0].closest('lyte-tree-body')
        var icon = $L(treeBody).find('lyte-tree-icon')[0]
        if (!$L(icon).hasClass('lyteIconClosed')) {
          icon.click();
          $L(this).find('.lyteTreeChildrenLevel')[0].addEventListener('transitionend', collTrans)
        } else {
          $L(icon).addClass('lyteTreeIconClosed');
          collTrans();
        }

        $L(this).addClass('lyteTreeCollapsed')

        this.setData('collapsedAll', true);

      }

    }

    this.$node.openRecursive = function(targetElem){

      var currentIndex = $L(targetElem).attr('data-index')
      var currentTree
      var currentIcon
      var indexLen = Math.floor(currentIndex.length/2)

      var dummy
      var th = this

      var outMostTree = $L(th).find('LYTE-TREE-BODY [data-index="'+currentIndex.slice(0 , 5)+'"]')[0]
      function openRec(){

        currentIndex = currentIndex.slice(0 , -2);
        currentTree = $L(th).find('LYTE-TREE [index-var="'+currentIndex+'"]')[0]
        currentIcon = $L(currentTree).closest('.lyteTreeMainContainer').find('LYTE-TREE-ICON')[0]

        if(currentTree){
          th.component.onOpenClasses(currentIcon , currentTree);
          // this.component.toggleAnimation($L( currentIcon).attr('class').split(" "),currentIcon,this,currentTree,targetElem);
        }

        if(currentIndex.length > 0){
          openRec()
        } else {
          return
        }

      }

      openRec()

    }

    this.$node.closeTree = function(targetElem , closeAllNodes){

      var currentParentTree = $L(targetElem).closest('LYTE-TREE')[0];


      var openedIcons = $L(targetElem).find('lyte-tree-icon.lyteIconOpened')
      var openedTrees = $L(targetElem).find('lyte-tree.lyteTreeOpened')
      var openedBodies = $L(targetElem).find('lyte-tree-body.lyteTreeBodyOpened')

      var currentIndex = $L(targetElem).attr('data-index')

      var currentTree = $L(targetElem).find('LYTE-TREE[index-var="'+currentIndex+'"]')
      var currentIcon = $L(openedIcons[0])
      var currentBody = $L(targetElem)


      if(currentTree.hasClass('lyteTreeOpened')){

        var closeTransition = function(){

          if(closeAllNodes){
            openedIcons.addClass('lyteIconClosed');
            openedIcons.addClass(this.getData('ltPropCloseClass'));
            openedIcons.removeClass('lyteIconOpened');
            openedIcons.removeClass(this.getData('ltPropOpenClass'));

            openedTrees.css({"display" : "none"});
            openedTrees.addClass('lyteTreeClosed');
            openedTrees.removeClass('lyteTreeOpened');
            openedTrees.css({"height" : "auto"});

            openedBodies.addClass('lyteTreeBodyOpened');
            openedBodies.addClass(currentTree.getData('ltPropWrapperOpenClass'));
            openedBodies.removeClass('lyteTreeBodyClosed');
            openedBodies.removeClass(currentTree.getData('ltPropWrapperCloseClass'));

          } else {
            currentIcon.addClass('lyteIconClosed');
            currentIcon.addClass(this.getData('ltPropCloseClass'));
            currentIcon.removeClass('lyteIconOpened');
            currentIcon.removeClass(this.getData('ltPropOpenClass'));

            currentTree.css({"display" : "none"});
            currentTree.addClass('lyteTreeClosed');
            currentTree.removeClass('lyteTreeOpened');
            currentTree.css({"height" : "auto"});
            $L(targetElem).addClass('lyteTreeBodyClosed')
            $L(targetElem).removeClass('lyteTreeBodyOpened')

          }
          currentBody.addClass('lyteTreeBodyClosed');
          currentBody.addClass(this.getData('ltPropWrapperCloselass'));
          currentBody.removeClass('lyteTreeBodyOpened');
          currentBody.removeClass(this.getData('ltPropWrapperOpenClass'));

          currentTree.removeClass('treeTransRunning');

          currentTree[0].removeEventListener('transitionend' , closeTransition)

        }

        var closingTempHeight = currentTree[0].getBoundingClientRect().height;
        currentTree[0].style.height = closingTempHeight + "px";

        currentTree.addClass('treeTransRunning');

        setTimeout(function(){
          currentTree[0].style.height = "0px";
        },10)

        currentTree[0].addEventListener('transitionend', closeTransition);

      }


    }

    this.$node.openTree = function(targetElem , param , openAllNodes){

      if($L(targetElem).closest('.lyteTreeCollapsed')[0]){
        $L(targetElem).closest('.lyteTreeCollapsed')[0].setData('collapsedAll' , false)
        $L(targetElem).closest('.lyteTreeCollapsed').removeClass('lyteTreeCollapsed')
      }

      if(param && param.changeCollapsed){
        var indArr = $L(targetElem).attr('data-index').split(" ")
        var ind = indArr[indArr.length-1]
        var data = $L(targetElem).closest('lyte-tree')[0].getData().ltPropData[ind]
        Lyte.objectUtils(data , 'add' , 'collapsed' , false)
        this.openIcon($L(targetElem).find('lyte-tree-icon.lyteIconClosed')[0])
        // return
      }

      var closedIcons = $L(targetElem).find('lyte-tree-icon.lyteIconClosed:not(.lyteTreeIconHasChild)')
      var closedTrees = $L(targetElem).find('lyte-tree.lyteTreeClosed')

      var currentIndex = $L(targetElem).attr('data-index')

      var currentTree = $L(targetElem).find('LYTE-TREE[index-var="'+currentIndex+'"]')
      var currentIcon = $L(closedIcons[0])

      if(currentTree.hasClass('lyteTreeClosed')){

        if(openAllNodes){
          closedIcons.addClass('lyteIconOpened');
          closedIcons.addClass(this.getData('ltPropOpenClass'));
          closedIcons.removeClass('lyteIconClosed');
          closedIcons.removeClass(this.getData('ltPropCloseClass'));

          closedTrees.css({"display" : ""});
          closedTrees.addClass('lyteTreeOpened');
          closedTrees.removeClass('lyteTreeClosed');
          closedTrees.css({"height" : "auto"});
        } else {
          currentIcon.addClass('lyteIconOpened');
          currentIcon.addClass(this.getData('ltPropOpenClass'));
          currentIcon.removeClass('lyteIconClosed');
          currentIcon.removeClass(this.getData('ltPropCloseClass'));

          currentTree.css({"display" : ""});
          currentTree.addClass('lyteTreeOpened');
          currentTree.removeClass('lyteTreeClosed');
          $L(targetElem).removeClass('lyteTreeBodyClosed')
          $L(targetElem).addClass('lyteTreeBodyOpened')
        }

        var openTransition = function(){
          currentTree.removeClass('treeTransRunning');
          currentTree[0].style.height = "auto"

          currentTree[0].removeEventListener('transitionend', openTransition);
        }

        currentTree[0].style.display = "block";
        currentTree[0].style.height = "auto";
        var openingTempHeight = currentTree[0].getBoundingClientRect().height;
        currentTree[0].style.height = "0px";

        currentTree.addClass('treeTransRunning');
        setTimeout(function(){
          currentTree[0].style.height = openingTempHeight + "px";
          currentTree[0].addEventListener('transitionend', openTransition);
        },10)

      }

    }

  },

  focusNextNode : function(){

    var _thisTree = this;
    var currentActiveLTB = $L(document.activeElement).closest('lyte-tree-body')[0]
    var currentActiveParent = $L(document.activeElement).closest('.lyteTreeBodyDiv')[0]

    function focusNextElem(currentActiveLTB){

      if($L(currentActiveLTB).find('.lyteTreeBodyDiv')[0] && !($L(currentActiveLTB).hasClass('lyteTreeBodyClosed'))){
        $L(currentActiveLTB).find('.lyteTreeBodyDiv').eq(0).find('lyte-yield')[0].focus();
        // if($L(document.activeElement).hasClass('lyteTreeLastChild')){
        //   _thisTree.setData('ariaLiveContent' , 'You are currently on a last tree node')
        // }
        // else if($L(document.activeElement).find('lyte-tree-icon').eq(0).hasClass('lyteIconOpened')){
        //   _thisTree.setData('ariaLiveContent' , 'You are currently on a opened tree node to close press enter or space')
        // } else if(($L(document.activeElement).find('lyte-tree-icon').eq(0).hasClass('lyteIconOpened')) && !($L(document.activeElement).hasClass('lyteTreeLastChild'))){
        //   _thisTree.setData('ariaLiveContent' , 'You are currently on a closed tree node to open press enter or space')
        // }
        // _thisTree.setData('ariaLiveBoolean' , true);
      } else if(currentActiveParent){
        if(currentActiveParent.nextElementSibling){
          $L(currentActiveParent.nextElementSibling).find('lyte-yield')[0].focus();
          // if($L(document.activeElement).hasClass('lyteTreeLastChild')){
          //   _thisTree.setData('ariaLiveContent' , 'You are currently on a last tree node')
          // }
          // else if($L(document.activeElement).find('lyte-tree-icon').eq(0).hasClass('lyteIconOpened')){
          //   _thisTree.setData('ariaLiveContent' , 'You are currently on a opened tree node to close press enter or space')
          // } else if(($L(document.activeElement).find('lyte-tree-icon').eq(0).hasClass('lyteIconOpened')) && !($L(document.activeElement).hasClass('lyteTreeLastChild'))){
          //   _thisTree.setData('ariaLiveContent' , 'You are currently on a closed tree node to open press enter or space')
          // }
          // _thisTree.setData('ariaLiveBoolean' , true);
          return
        } else {
          currentActiveParent = $L(currentActiveParent.parentElement).closest('.lyteTreeBodyDiv')[0]
          focusNextElem()
        }
      } else {
        return
      }

    }

   focusNextElem(currentActiveLTB)

  },

  focusPreviousNode : function(){
    var currentActiveLTB = $L(document.activeElement).closest('lyte-tree-body')[0]
    var currentActiveParent = $L(document.activeElement).closest('.lyteTreeBodyDiv')[0]
    var tempTrees;

    if(currentActiveParent){
      if((!$L(currentActiveParent.previousElementSibling).find('lyte-tree-body').eq(0).hasClass('lyteTreeBodyClosed')) && ($L(currentActiveParent.previousElementSibling).hasClass('lyteTreeBodyDiv')) ){
        tempTrees = $L(currentActiveParent.previousElementSibling).find('lyte-yield');
        tempTrees[tempTrees.length-1].focus()
      } else if($L(currentActiveParent.previousElementSibling).find('lyte-tree-body').eq(0).hasClass('lyteTreeBodyClosed')){
        $L(currentActiveParent.previousElementSibling).find('lyte-tree-body').eq(0).find('lyte-yield')[0].focus()
      } else {
        if($L(currentActiveParent.parentElement).closest('.lyteTreeBodyDiv')[0]){
          $L(currentActiveParent.parentElement).closest('.lyteTreeBodyDiv').eq(0).find('lyte-yield')[0].focus()
        }
      }
    }
  },

  closeTreeNodeOrMoveOut : function(){
    var currentBody = $L(document.activeElement).closest('lyte-tree-body')[0]
    var currentIndex = $L(currentBody).attr('data-index')
    var currentTree = $L(currentBody).find('LYTE-TREE[index-var="'+currentIndex+'"]')

    var container = $L(currentTree).closest('.lyteTreeMainContainer')[0]

    if(($L(currentTree).hasClass('lyteTreeClosed')) || ($L(container).hasClass('lyteTreeHasChild'))){
      $L(currentBody).closest('LYTE-TREE-BODY[data-index="'+(currentIndex.slice(0, -2))+'"]')[0].focus()
    } else {
      if($L(currentBody).hasClass('lyteTreeBodyOpened')){
        $L(currentBody).find('lyte-tree-icon')[0].click();
      }
    }
  },
  openTreeNodeOrMoveIn : function(){
    var currentBody = $L(document.activeElement).closest('lyte-tree-body')[0]
    var currentIndex = $L(currentBody).attr('data-index')
    var currentTree = $L(currentBody).find('LYTE-TREE[index-var="'+currentIndex+'"]')

    var container = $L(currentTree).find('.lyteTreeMainContainer')[0]


    if($L(currentTree).hasClass('lyteTreeOpened')){
      $L(currentBody).find('LYTE-TREE-BODY[data-index="'+currentIndex+' 0"]')[0].focus()
    } else {
      if($L(currentBody).hasClass('lyteTreeBodyClosed')){
        $L(currentBody).find('lyte-tree-icon')[0].click();
      }
    }
  },

  toggleTreeNode : function(){
    $L(document.activeElement).find('lyte-tree-icon')[0].click();
  },

  didConnect: function() {

    var _thisTree = this;

    this.$node.keydownEvents = function(event){
      if(document.activeElement.tagName === 'LYTE-YIELD'){
        if(event.keyCode === 40){
          _thisTree.focusNextNode();
        }
      } else {
        if(event.shiftKey && (event.keyCode === 40)){
          _thisTree.focusNextNode();
        }
      }

      if(document.activeElement.tagName === 'LYTE-YIELD'){
        if(event.keyCode === 38){
          _thisTree.focusPreviousNode();
        }
      } else {
        if(event.shiftKey && (event.keyCode === 38)){
          _thisTree.focusPreviousNode();
        }
      }

      if(document.activeElement.tagName === 'LYTE-YIELD'){
        if(event.keyCode === 37){
          if($L(document.activeElement).find('lyte-tree-icon').hasClass('lyteIconOpened')){
            _thisTree.closeTreeNodeOrMoveOut();
          } else {
            _thisTree.focusPreviousNode();
          }
        }
        if(event.keyCode === 39){
          if($L(document.activeElement).find('lyte-tree-icon').hasClass('lyteIconClosed')){
            _thisTree.openTreeNodeOrMoveIn();
          } else {
            _thisTree.focusNextNode();
          }
        }
        if((event.keyCode === 13) || (event.keyCode === 32)){
          _thisTree.toggleTreeNode();
        }
      }
    }

    if(!$L(this.$node).attr('index-var')){
      document.addEventListener('keydown' , this.$node.keydownEvents)
    }

		if(this.getData('ltPropArrayData').length > 0){
			this.setData('dataType' , 'array')
		} else if(!this.getData('ltPropJsonData').lyteTreeEmptyObject && this.getData('ltPropArrayData').length <= 0){
			this.setData('dataType' , 'object')
		}

    if(!$L(this.$node).closest('.lyteTreeTopParent')[0] && $L(this.$node).attr('index-var') === undefined){
      $L(this.$node).addClass('lyteTreeTopParent')
    }

    if(this.getData('ltPropSortable')){
      $L(this.$node).closest('.lyteTreeTopParent').addClass('lyteTreeSortable')
      if($L(this.$node).attr('index-var') === undefined){
        $L(this.$node)[0].addEventListener('mousedown' , this.mouseDownFunction)
        // $L(this.$node)[0].addEventListener('mouseup' , this.mouseLeaveFunction)
      }
    }
    if(this.getData('ltPropData')[0].exclusiveTree){
      $L(this.$node).attr('exclusive' , true)
    }

  },

  mouseDownFunction : function(eve){
    this.setData('triggerSortable', true)
    this.setData('initialClientY' , eve.clientY)

    var currentTreeBody = $L(eve.target).closest('lyte-tree-body')
    this.setData('currentClickedBody' , $L(currentTreeBody).attr('data-index'))

    if(currentTreeBody[0]){
      var lyteTreeContent = $L(eve.target).closest('.lyteTreeSortableElement')
      lyteTreeContent.addClass('lyteTreeNodeCurrentlyDragged')

      var currentObjectIndexAttr = $L(lyteTreeContent).closest('lyte-tree-body').attr('data-index').split(' ');
      var currentObjectIndex = currentObjectIndexAttr[currentObjectIndexAttr.length-1]
      var currentTreeData = $L(lyteTreeContent).closest('lyte-tree')[0].getData('ltPropData')[currentObjectIndex]

      this.setData('currentSortObject' , currentTreeData)
      this.setData('treeDimension' , $L('.lyteTreeTopParent')[0].getBoundingClientRect())
      this.setData('initialTop' , lyteTreeContent[0].getBoundingClientRect().top)
      this.setData('initialLeft' , lyteTreeContent[0].getBoundingClientRect().left)
      this.setData('contentDimension' , lyteTreeContent[0].getBoundingClientRect())

      var dragStart = this.component.executeMethod('onDragStart' , $L(lyteTreeContent).closest('lyte-tree-body') , currentTreeData)
      
      if(dragStart !== false){
        document.addEventListener('mousemove' , this.component.mouseMoveFunction)
        document.addEventListener('mouseup' , this.component.mouseLeaveFunction)
        document.removeEventListener('drop' , this.component.dropFunction)
      }
    }

  },

  mouseMoveFunction : function(eve , external){
    if(external){
      var topTree = $L(eve.target).closest('.lyteTreeTopParent')
    } else {
      var topTree = $L('.lyteTreeNodeCurrentlyDragged').closest('.lyteTreeTopParent')
    }
    var treeComponent = topTree[0].component

    $L(topTree).find('.lyteTreeDropParent').removeClass('lyteTreeDropParent')
    $L(topTree).closest('.lyteTreeSortableElement').addClass('lyteTreeDropParent');

    $L(topTree).find('.lyteTreeSortableDropPlaceholderBottom').removeClass('lyteTreeSortableDropPlaceholderBottom')
    $L(topTree).find('.lyteTreeSortableDropPlaceholderTop').removeClass('lyteTreeSortableDropPlaceholderTop')
    $L(topTree).find('.lyteTreeSortableDropPlaceholderChild').removeClass('lyteTreeSortableDropPlaceholderChild')

    var currentDraggedElem = $L(topTree).find('.lyteTreeNodeCurrentlyDragged')[0]

    if(Math.abs(treeComponent.data.initialClientY - eve.clientY) > 5){

      topTree.addClass('lyteTreeDragRunning')

      // var treeContent = $L('.lyteTreeNodeCurrentlyDragged')[0];
      var treeContent;
      if(eve.target.tagName === ".lyteTreeSortableElement"){
        treeContent = eve.target
      } else {
        treeContent = $L(eve.target).eq(0).closest('.lyteTreeSortableElement')[0]
      }

      // if(!$L(treeComponent.$node).closest('.lyteTreeTopParent').find('.lyteTreeCurrentSortElem')[0]){
      if(!$L('.lyteTreeCurrentSortElem')[0]){
        var dummyTreeContent = treeContent.cloneNode(true);
        $L(dummyTreeContent).addClass('lyteTreeCurrentSortElem')
        $L(dummyTreeContent).removeClass('lyteTreeNodeCurrentlyDragged');
        dummyTreeContent.style.position = "absolute";
        dummyTreeContent.style.width = treeContent.getBoundingClientRect().width + "px"
        dummyTreeContent.style.height = treeContent.getBoundingClientRect().height + "px"
        dummyTreeContent.style.setProperty('--treeLevel' , $L(treeContent).closest('lyte-tree-body').attr('data-level'))

        $L(dummyTreeContent).find('lyte-tree-icon').addClass('lyteTreeClonedIcon')
        // topTree[0].appendChild(dummyTreeContent)
        document.body.appendChild(dummyTreeContent)
      }

      // var currentSortElem = $L(topTree).find('.lyteTreeCurrentSortElem')[0]
      var currentSortElem = $L('.lyteTreeCurrentSortElem')[0]

      if(treeContent){
        var draggedDataIndex = $L(treeContent).closest('lyte-tree-body').attr('data-index').split(" ")
        var draggedData = $L(treeContent).closest('lyte-tree')[0].getData('ltPropData')[draggedDataIndex[draggedDataIndex.length-1]]
      }

      var dragObj = {}
      dragObj.draggedElem = currentSortElem
      dragObj.overElem = treeContent
      dragObj.overElemParent = treeComponent.getParentNode(treeContent)
      dragObj.draggedData = draggedData
      if($L(treeContent).closest('lyte-tree')[0]){
        dragObj.hoveredData = $L(treeContent).closest('lyte-tree')[0].getData('ltPropData')
      } else {
        dragObj.hoveredData = {}
      }
      var beforeDrag = treeComponent.executeMethod('onBeforeDrag' , dragObj)

      if(treeContent && (beforeDrag !== false)){
        var treeContentDim = treeContent.getBoundingClientRect()

        var topHeight = treeContentDim.height * .2
        var midheight = treeContentDim.height * .8

        if(eve.clientY < (treeContentDim.top + topHeight)){
          
          // topPlaceHolder
          $L(treeContent).addClass('lyteTreeSortableDropPlaceholderTop')

        } else if((eve.clientY > (treeContentDim.top + topHeight)) && (eve.clientY < (treeContentDim.top + midheight))){
          
          // bodyPlaceHolder
          $L(treeContent).addClass('lyteTreeSortableDropPlaceholderChild')

        } else if((eve.clientY > (treeContentDim.top + midheight)) && (eve.clientY < (treeContentDim.top + treeContentDim.height))){
          
          // bottomPlaceHolder
          $L(treeContent).addClass('lyteTreeSortableDropPlaceholderBottom')

        }
        var currentTreeBody = $L(eve.target).closest('lyte-tree-body')
        var currentDropBodyInd = $L(currentTreeBody).attr('data-index').slice(0,-2)
        var currentClickedBodyInd = treeComponent.getData('currentClickedBody')
        // var currentSortElem = $L(topTree).find('.lyteTreeCurrentSortElem')[0]
        if(($L(currentTreeBody).attr('data-index') === currentClickedBodyInd) || (currentDropBodyInd === currentClickedBodyInd)){
          $L(currentTreeBody).addClass('lyteTreeSortableDropNotAllowed')
        }
        currentSortElem.style.position = "absolute";
        // currentSortElem.style.top = ( treeComponent.getData('initialTop') - currentDraggedElem.getBoundingClientRect().top) + eve.clientY + "px"
        // currentSortElem.style.top = topTree[0].scrollTop + eve.clientY - treeComponent.getData('treeDimension').top + "px"
        // currentSortElem.style.left = topTree[0].scrollLeft + eve.clientX - treeComponent.getData('treeDimension').left + "px"
        treeComponent.setData('exeDrop' , true);

        treeComponent.executeMethod('onDrag' , dragObj)

      }
      
      currentSortElem.style.top = eve.clientY + "px"
      currentSortElem.style.left = eve.clientX + "px"

      var topTreeDim = topTree[0].getBoundingClientRect()
      var scrollTree = function(){

        if(!treeComponent.getData('scrollTriggered')){
          window.cancelAnimationFrame(treeComponent.animation)
          treeComponent.setData('stopScroll' , false)
          return
        }

        if(eve.clientY >= (topTreeDim.top + topTreeDim.height)){
          topTree[0].scrollTop += treeComponent.getData('ltPropScrollSpeed');
          if(topTree[0].scrollTop >= (topTree[0].scrollHeight-topTreeDim.height)){
            window.cancelAnimationFrame(treeComponent.animation)
            treeComponent.setData('stopScroll' , false)
            return
          }
        } else if (eve.clientY <= (topTreeDim.top)){
          topTree[0].scrollTop -= treeComponent.getData('ltPropScrollSpeed');
          if(topTree[0].scrollTop <= 0){
            window.cancelAnimationFrame(treeComponent.animation)
            treeComponent.setData('stopScroll' , false)
            return
          } 
        }
        treeComponent.animation = window.requestAnimationFrame(scrollTree.bind(eve))
      }
      if(eve.clientY >= (topTreeDim.top + topTreeDim.height) && (treeComponent.getData('stopScroll')) && !treeComponent.getData('scrollTriggered')){
        treeComponent.setData('scrollTriggered' , true)
        treeComponent.animation = window.requestAnimationFrame(scrollTree.bind(eve))
      } else if (eve.clientY <= (topTreeDim.top) && (treeComponent.getData('stopScroll')) && !treeComponent.getData('scrollTriggered')){
        treeComponent.setData('scrollTriggered' , true)
        treeComponent.animation = window.requestAnimationFrame(scrollTree.bind(eve))
      } else if((eve.clientY < (topTreeDim.top + topTreeDim.height)) && eve.clientY > (topTreeDim.top)){
        window.cancelAnimationFrame(treeComponent.animation)
        treeComponent.setData('stopScroll' , true)
        treeComponent.setData('scrollTriggered' , false)
      }
    }
  },

  mouseLeaveFunction : function(eve){

    var topTree = $L('.lyteTreeNodeCurrentlyDragged').closest('.lyteTreeTopParent')
    var treeComponent = topTree[0].component
    var currentDraggedElem = $L(treeComponent.$node).find('.lyteTreeNodeCurrentlyDragged')

    $L(treeComponent.$node).find('.lyteTreeSortableDropPlaceholderBottom').removeClass('lyteTreeSortableDropPlaceholderBottom')
    $L(treeComponent.$node).find('.lyteTreeSortableDropPlaceholderTop').removeClass('lyteTreeSortableDropPlaceholderTop')
    $L(treeComponent.$node).find('.lyteTreeSortableDropPlaceholderChild').removeClass('lyteTreeSortableDropPlaceholderChild')

    $L(treeComponent.$node).find('.lyteTreeDragRunning').removeClass('lyteTreeDragRunning')
    $L(treeComponent.$node).find('.lyteTreeNodeCurrentlyDragged').removeClass('lyteTreeNodeCurrentlyDragged')
    $L(treeComponent.$node).find('.lyteTreeDropParent').removeClass('lyteTreeDropParent')
    $L(treeComponent.$node).find('.lyteTreeSortableDropNotAllowed').removeClass('lyteTreeSortableDropNotAllowed')

    if(treeComponent.animation){
      window.cancelAnimationFrame(treeComponent.animation)
      treeComponent.setData('stopScroll' , true)
      treeComponent.setData('scrollTriggered' , false)
    }

    var treeContent;
    if($L(eve.target).eq(0).hasClass('lyteTreeSortableElement')){
      treeContent = eve.target
    } else {
      treeContent = $L(eve.target).eq(0).closest('.lyteTreeSortableElement')[0]
    }

      if(treeContent){
        if(treeComponent.data.exeDrop){
    
          var treeContentDim = treeContent.getBoundingClientRect()
    
          var topHeight = treeContentDim.height * .2
          var midheight = treeContentDim.height * .8
    
          var currentTreeBody = $L(eve.target).closest('lyte-tree-body')
          var dummyTreeContent = $L('.lyteTreeCurrentSortElem')
    
          dummyTreeContent[0].remove()
    
          var currentDropBodyInd = $L(currentTreeBody).attr('data-index').slice(0,-2)
          var currentClickedBodyInd = treeComponent.getData('currentClickedBody')

          //util for checking index of parent and current child
    
          if(currentDropBodyInd === currentClickedBodyInd){
            document.removeEventListener('mousemove' , treeComponent.mouseMoveFunction)
            document.removeEventListener('mouseup' , treeComponent.mouseLeaveFunction)
            return
          }
    
          var backgroundElem = $L(eve.target).closest('.lyteTreeSortableElement')
          var currentObjectIndexAttr = $L(backgroundElem).closest('lyte-tree-body').attr('data-index').split(' ');
          var currentObjectIndex = currentObjectIndexAttr[currentObjectIndexAttr.length-1]
          var currentTreeData = $L(backgroundElem).closest('lyte-tree')[0].getData('ltPropData')[currentObjectIndex];
          var currentTreeArr = $L(backgroundElem).closest('lyte-tree')[0].getData('ltPropData')
          var prevDataArr

          var callBackObj = {}
    
          if(currentClickedBodyInd.length < 2){
            prevDataArr = $L(topTree)[0].getData('ltPropData')
          } else {
            prevDataArr = $L(topTree).find('[index-var="'+currentClickedBodyInd.slice(0,-2)+'"]')[0].getData('ltPropData')
          }
          var sibInsertIndexArr = $L(currentTreeBody).attr('data-index').split(' ')
          var sibInsertIndex = parseInt(sibInsertIndexArr[sibInsertIndexArr.length-1])
    
          var beforeDrop;
          var allowDrop = true;
          if(treeComponent.getData('currentClickedBody') <= $L(currentTreeBody).attr('data-index')){
            if($L(currentTreeBody).attr('data-index').slice(0 , treeComponent.getData('currentClickedBody').length)  ===  treeComponent.getData('currentClickedBody')){
              allowDrop = false
            }
          }
    
          if(allowDrop){
            if(eve.clientY < (treeContentDim.top + topHeight)){
              if(prevDataArr === currentTreeArr){
                sibInsertIndex -= 1
              }
              callBackObj = {}
              callBackObj.asChild = false
              callBackObj.actualElem = currentDraggedElem[0]
              callBackObj.targetElem = currentTreeBody[0]
              callBackObj.draggedObject = treeComponent.getData('currentSortObject')
              callBackObj.droppedIndex = sibInsertIndex
              callBackObj.droppedArray = currentTreeArr
              callBackObj.droppedObject = currentTreeData
              beforeDrop = treeComponent.executeMethod('onBeforeDrop' , callBackObj)
      
              if(beforeDrop !== false){
                Lyte.arrayUtils( prevDataArr , 'removeAt' , currentClickedBodyInd.charAt(currentClickedBodyInd.length-1) , 1 )
                if(sibInsertIndex < 0){
                  sibInsertIndex = 0;
                }
                Lyte.arrayUtils( currentTreeArr , 'insertAt' , sibInsertIndex , treeComponent.getData('currentSortObject'));
              }
      
            } else if((eve.clientY > (treeContentDim.top + topHeight)) && (eve.clientY < (treeContentDim.top + midheight))){
              if(treeComponent.getData('currentClickedBody') !== $L(currentTreeBody).attr('data-index')){
                if(!currentTreeData[treeComponent.getData('ltPropChildrenValue')]){
                  Lyte.objectUtils(currentTreeData , 'add' , treeComponent.getData('ltPropChildrenValue') , [])
                }
                callBackObj = {}
                callBackObj.asChild = true
                callBackObj.actualElem = currentDraggedElem[0]
                callBackObj.targetElem = currentTreeBody[0]
                callBackObj.draggedObject = treeComponent.getData('currentSortObject')
                callBackObj.droppedIndex = currentTreeData[treeComponent.getData('ltPropChildrenValue')].length
                callBackObj.droppedArray = treeComponent.getTreeArray(currentTreeBody)
                callBackObj.droppedObject = currentTreeData

                beforeDrop = treeComponent.executeMethod('onBeforeDrop' , callBackObj)
      
                if(beforeDrop !== false){
                  Lyte.arrayUtils( prevDataArr , 'removeAt' , currentClickedBodyInd.charAt(currentClickedBodyInd.length-1) , 1 )
                  Lyte.arrayUtils( currentTreeData[treeComponent.getData('ltPropChildrenValue')] , 'push' , treeComponent.getData('currentSortObject'))
    
                  if(!$L(eve.target).closest('.lyteTreeSortableElement').find('lyte-tree-icon').hasClass('lyteIconClosed') || $L(eve.target).closest('.lyteTreeSortableElement').find('lyte-yield').hasClass('lyteTreeLastChild') || $L(eve.target).closest('.lyteTreeMainContainer').hasClass('lyteTreeHasChild')){
                    treeComponent.$node.openIcon($L(eve.target).closest('.lyteTreeSortableElement').find('lyte-tree-icon')[0])
                  }
    
                }
    
          
              }
      
            } else if((eve.clientY > (treeContentDim.top + midheight)) && (eve.clientY < (treeContentDim.top + treeContentDim.height))){
      
              if(Math.abs(currentTreeArr.length - (sibInsertIndex + 1)) > 1){
                sibInsertIndex += 1
              }
              callBackObj = {}
              callBackObj.asChild = false
              callBackObj.actualElem = currentDraggedElem[0]
              callBackObj.targetElem = currentTreeBody[0]
              callBackObj.draggedObject = treeComponent.getData('currentSortObject')
              callBackObj.droppedIndex = sibInsertIndex
              callBackObj.droppedArray = currentTreeArr
              callBackObj.droppedObject = currentTreeData
    
              beforeDrop = treeComponent.executeMethod('onBeforeDrop' , callBackObj)
              
              if(beforeDrop !== false){
               
                Lyte.arrayUtils( prevDataArr , 'removeAt' , currentClickedBodyInd.charAt(currentClickedBodyInd.length-1) , 1 )
                Lyte.arrayUtils( currentTreeArr , 'insertAt' , sibInsertIndex , treeComponent.getData('currentSortObject'));  
                
              }
            }
          }
    
         
    
          treeComponent.setData('exeDrop' , false);
          if(callBackObj.asChild){
            callBackObj = {}
            callBackObj.droppedArray = currentTreeData[treeComponent.getData('ltPropChildrenValue')] 
          } else {
            callBackObj = {}
            callBackObj.droppedArray = currentTreeArr
          }
          callBackObj.draggedObject = treeComponent.getData('currentSortObject')
          treeComponent.executeMethod('onDrop' , callBackObj)
        }
      } else {
        var dummyTreeContent = $L('.lyteTreeCurrentSortElem')
        dummyTreeContent[0].remove()
      }

    document.removeEventListener('mousemove' , treeComponent.mouseMoveFunction)
    document.removeEventListener('mouseup' , treeComponent.mouseLeaveFunction)
  },

  onOpenClasses : function(icon , tree){

    var value,
    __data = this.data;

    $L(icon).addClass('lyteIconOpened');

     ( value = __data.ltPropOpenClass ) && $L(icon).addClass( value );

    $L(icon).removeClass('lyteIconClosed');

    ( value = __data.ltPropCloseClass ) && $L(icon).removeClass( value );

    tree.style.display = 'block';
    $L(tree).addClass('lyteTreeOpened');
    $L(tree).removeClass('lyteTreeClosed');

    tree.style.height = "auto";

  },

  onCloseClasses : function(icon , tree){

    var value,
    __data = this.data;

    $L(icon).addClass('lyteIconClosed');
    ( value = __data.ltPropCloseClass ) && $L(icon).addClass( value );
    $L(icon).removeClass('lyteIconOpened');
    ( value = __data.ltPropOpenClass ) && $L(icon).removeClass( value );

    tree.style.display = 'none';
    $L(tree).addClass('lyteTreeClosed');
    $L(tree).removeClass('lyteTreeOpened');

    tree.style.height = "auto";

  },

  openrecursive: function(array) {
    if (array.length) {
      var newEl = array[0];
      array.shift();
      if (!newEl || $L(newEl).hasClass('lyteTreeOpened')) {
        this.openrecursive(array)
        return
      }
      var icon = newEl.parentElement.querySelector('lyte-tree-icon');
      clearTimeout(newEl._treetime);
      $L(newEl).removeClass('lyteTreeClosed');
      $L(newEl).addClass('lyteTreeOpened');
      $L(icon).removeClass('lyteIconClosed')
      $L(icon).addClass('lyteIconOpened');
      newEl.style.display = "";
      newEl.style.height = "auto";
      this.data.ltPropCloseClass && $L(icon).removeClass(this.data.ltPropCloseClass);
      this.data.ltPropOpenClass && $L(icon).addClass(this.data.ltPropOpenClass);
      newEl._treetime = setTimeout(this.heightcalc.bind(this, newEl, array), 0)
    }
  },

  heightcalc: function(elem, array) {
    if (!document.body.contains(elem)) {
      this.openrecursive(array);
      return
    }
    var height = elem.getBoundingClientRect().height;
    elem.style.height = 0;
    if (height == 0) {
      this.transEnd(elem, array)
    } else {
      setTimeout(this.heightset.bind(this, elem, array, height), 20)
    }
  },

  heightset: function(elem, array, height) {
    if (!document.body.contains(elem)) {
      this.openrecursive(array);
      return
    }
    elem.style.height = height + 'px';
    elem._trn = this.transEnd.bind(this, elem, array)
    elem.addEventListener('transitionend', elem._trn)
  },

  transEnd: function(elem, array) {
    elem.style.height = "auto"
    elem.removeEventListener('transitionend', elem._trn)
    delete elem._trn;
    this.openrecursive(array);
  },

  getTreeObject : function(currentTreeBody){
    var currentIndex = currentTreeBody.attr('data-index').split(" ")
    var treeArr = currentTreeBody.closest('lyte-tree')[0].getData('ltPropData')
    return treeArr[currentIndex[currentIndex.length-1]]
  },
  getTreeArray : function(currentTreeBody){
    return currentTreeBody.closest('lyte-tree')[0].getData('ltPropData')
  },
  getParentNode : function(currentSortElem){
    return $L(currentSortElem).closest('lyte-tree')[0]
  },

  stateChange: function(arg) {
    if (arg.newValue) {
      var idx = arg.newValue,
        elements = [],
        tree = Array.from(this.$node.getElementsByTagName('lyte-tree')),
        _length = idx.length,
        fn = function(sliced, new_tree, item) {
          var value = item.component.data.tempVar;
          if (value.startsWith(sliced)) {
            new_tree.push(item);
          }
          return value == sliced;
        }

      for (var i = 1; i <= _length; i++) {
        var sliced = idx.slice(0, i),
          new_tree = [],

          filtered = tree.filter(fn.bind(this, sliced, new_tree));

        tree = new_tree;

        elements.push(filtered[0]);
      }
      this.openrecursive(elements)
      this.setData('ltPropStateAttr', '')
    }
  }.observes('ltPropStateAttr'),
  methods: {
    onToggle: function() {},
    onToggleEnd: function() {},
    onBeforeOpen : function() {},
    onOpen : function() {},
    onBeforeClose : function() {},
    onClose : function() {},
    onError : function() {},
    onBeforeDrop : function() {},
    onDrop : function(){},
    onDragStart : function(){},
    onBeforeDrag : function(){},
    onDrag : function(){}
  },
	actions : {
		openArray : function(th){
			if(!this.getData('lyteTreeArrayOpened')){
        this.executeMethod('onBeforeOpen' , this.getData('ltPropArrayData') , this.$node)
				this.setData('lyteTreeArrayOpened' , true)
        this.setData('lyteTreeArrayLength' , this.getData('ltPropArrayData').length)
        if($L(this.$node).hasClass('lyteDataTreeSubLevel')){
          this.setData('arrayOpened' , true)
        }else {
          this.setData('arrayOpened' , false)
        }
        this.executeMethod('onOpen' , this.getData('ltPropArrayData') , this.$node)
			} else {
        this.executeMethod('onBeforeClose' , this.getData('ltPropArrayData') , this.$node)
				this.setData('lyteTreeArrayOpened' , false)
        this.setData('lyteTreeArrayLength' , 0)
        this.setData('arrayOpened' , false)
        this.executeMethod('onClose' , this.getData('ltPropArrayData') , this.$node)
			}
		},
		openJson : function(th){
			if(!this.getData('lyteTreeJsonOpened')){
        this.executeMethod('onBeforeOpen' , this.getData('ltPropJsonData') , this.$node)
				this.setData('lyteTreeJsonOpened' , true)
        if($L(this.$node).hasClass('lyteDataTreeSubLevel')){
          this.setData('jsonOpened' , true)
        } else {
          this.setData('jsonOpened' , false)
        }
        this.executeMethod('onOpen' , this.getData('ltPropJsonData') , this.$node)
			} else {
        this.executeMethod('onBeforeClose' , this.getData('ltPropJsonData') , this.$node)
				this.setData('lyteTreeJsonOpened' , false)
        this.setData('jsonOpened' , false)
        this.executeMethod('onClose' , this.getData('ltPropJsonData') , this.$node)
			}
		},
    openHorizontalTree : function(th){

    var currentTreeData = this.getData('ltPropData')[$L(th).closest('table').attr('child-index')]

    if(currentTreeData[this.getData('ltPropChildrenValue')] && currentTreeData[this.getData('ltPropChildrenValue')].length > 0){
      $L(th).find('.lyteHTreeHorizontalConnectorHidden').removeClass('lyteHTreeHorizontalConnectorHidden')
    }

    if(currentTreeData.collapsed === undefined ||
       currentTreeData.collapsed === true){
         this.executeMethod('onBeforeOpen' , currentTreeData , this.$node)
         if($L(th).find('lyte-tree-icon') && $L(th).find('lyte-tree-icon').length>0){
           this.$node.openIcon($L(th).find('lyte-tree-icon')[0])
         }
          Lyte.objectUtils(currentTreeData , 'add' , 'collapsed' , false)
          this.executeMethod('onOpen' , currentTreeData , this.$node)
       } else {
         this.executeMethod('onBeforeClose' , currentTreeData , this.$node)
         if($L(th).find('lyte-tree-icon') && $L(th).find('lyte-tree-icon').length>0){
           this.$node.closeIcon($L(th).find('lyte-tree-icon')[0])
         }
         Lyte.objectUtils(currentTreeData , 'add' , 'collapsed' , true)
         this.executeMethod('onClose' , currentTreeData , this.$node)
         $L(th).find('.lyteHTreeHorizontalAfterConnectLine').addClass('lyteHTreeHorizontalConnectorHidden')
       }

       if(currentTreeData[this.getData('ltPropChildrenValue')] && currentTreeData[this.getData('ltPropChildrenValue')].length < 1){
         $L(th).find('lyte-tree-icon').addClass('lyteTreeHasNoChild')
       }


    },
    dragEnterFunction : function(eve , th){
      this.setData('dropZoneDim' , th.getBoundingClientRect())
      var topTree = $L(th).closest('.lyteTreeTopParent')[0]
      $L(topTree).addClass('lyteTreeDragRunning')
      $L(topTree).find('.lyteTreeDropParent').removeClass('lyteTreeDropParent')
      $L(topTree).closest('.lyteTreeSortableElement').addClass('lyteTreeDropParent');

      $L(topTree).find('.lyteTreeSortableDropPlaceholderBottom').removeClass('lyteTreeSortableDropPlaceholderBottom')
      $L(topTree).find('.lyteTreeSortableDropPlaceholderTop').removeClass('lyteTreeSortableDropPlaceholderTop')
      $L(topTree).find('.lyteTreeSortableDropPlaceholderChild').removeClass('lyteTreeSortableDropPlaceholderChild')
    },
    dragOverFunction : function(eve , th){
      eve.preventDefault()

      var treeContentDim = this.data.dropZoneDim
      var topHeight = treeContentDim.height * .2
      var midheight = treeContentDim.height * .8
      var _this = this
      var onDragFun
      var topTreeComp = $L(th).closest('.lyteTreeTopParent')[0].component
      if(!topTreeComp.dragDebounce){
        topTreeComp.dragDebounce = setTimeout(function(){
          delete topTreeComp.dragDebounce
          if(th){
            var draggedDataIndex = $L(th).closest('lyte-tree-body').attr('data-index').split(" ")
            var draggedData = $L(th).closest('lyte-tree')[0].getData('ltPropData')[draggedDataIndex[draggedDataIndex.length-1]]
          }
          var dragObj = {}
          dragObj.overElem = th
          dragObj.overElemParent = topTreeComp.getParentNode(th)
          dragObj.overObj = draggedData
          dragObj.event = eve
          if($L(th).closest('lyte-tree')[0]){
            dragObj.hoveredData = $L(th).closest('lyte-tree')[0].getData('ltPropData')
          } else {
            dragObj.hoveredData = {}
          }
          var beforeDrag = topTreeComp.executeMethod('onBeforeDrag' , dragObj)
          if(beforeDrag !== false){
            var topTree = $L(th).closest('.lyteTreeTopParent')[0]
            $L(topTree).addClass('lyteTreeDragRunning')
            $L(topTree).find('.lyteTreeDropParent').removeClass('lyteTreeDropParent')
            $L(topTree).closest('.lyteTreeSortableElement').addClass('lyteTreeDropParent');

            $L(topTree).find('.lyteTreeSortableDropPlaceholderBottom').removeClass('lyteTreeSortableDropPlaceholderBottom')
            $L(topTree).find('.lyteTreeSortableDropPlaceholderTop').removeClass('lyteTreeSortableDropPlaceholderTop')
            $L(topTree).find('.lyteTreeSortableDropPlaceholderChild').removeClass('lyteTreeSortableDropPlaceholderChild')
            if(eve.clientY < (treeContentDim.top + topHeight)){
              $L(th).addClass('lyteTreeSortableDropPlaceholderTop')
            } else if((eve.clientY > (treeContentDim.top + topHeight)) && (eve.clientY < (treeContentDim.top + midheight))){
              $L(th).addClass('lyteTreeSortableDropPlaceholderChild')
            } else if((eve.clientY > (treeContentDim.top + midheight)) && (eve.clientY < (treeContentDim.top + treeContentDim.height))){
              $L(th).addClass('lyteTreeSortableDropPlaceholderBottom')
            }
            topTreeComp.executeMethod('onDrag' , dragObj)
          }
        },50)
      }
    },
    dragLeaveFunction : function(eve , th){
      var topTree = $L(th).closest('.lyteTreeTopParent')[0]
      var topTreeComp = $L(th).closest('.lyteTreeTopParent')[0].component
      if(topTreeComp.dragDebounce){
        clearTimeout(topTreeComp.dragDebounce) 
        delete topTreeComp.dragDebounce
      }
      $L(topTree).find('.lyteTreeDropParent').removeClass('lyteTreeDropParent')
      $L(topTree).removeClass('lyteTreeDragRunning')

      $L(topTree).find('.lyteTreeSortableDropPlaceholderBottom').removeClass('lyteTreeSortableDropPlaceholderBottom')
      $L(topTree).find('.lyteTreeSortableDropPlaceholderTop').removeClass('lyteTreeSortableDropPlaceholderTop')
      $L(topTree).find('.lyteTreeSortableDropPlaceholderChild').removeClass('lyteTreeSortableDropPlaceholderChild')
    },
    dropFunction : function(eve , th){
      eve.preventDefault()
      var dropObj = {}
      var topTree = $L(th).closest('.lyteTreeTopParent')[0]
      var topTreeComp = $L(th).closest('.lyteTreeTopParent')[0].component
      if(topTreeComp.dragDebounce){
        clearTimeout(topTreeComp.dragDebounce) 
        delete topTreeComp.dragDebounce
      }
      var currentTreeBody = $L(th).closest('lyte-tree-body')
      if($L(th).hasClass('lyteTreeSortableDropPlaceholderBottom')){
        dropObj.asChild = false
        dropObj.droppedObject = topTree.component.getTreeObject(currentTreeBody)
      } else if($L(th).hasClass('lyteTreeSortableDropPlaceholderTop')){
        dropObj.asChild = false
        dropObj.droppedObject = topTree.component.getTreeObject(currentTreeBody)
      } else if($L(th).hasClass('lyteTreeSortableDropPlaceholderChild')){
        dropObj.asChild = true
        dropObj.droppedObject = {}
      }
      dropObj.droppedObject = topTree.component.getTreeObject(currentTreeBody)
      dropObj.event = eve
      dropObj.droppedArray = topTree.component.getTreeArray(currentTreeBody)
      dropObj.externalImport = true
      topTree.component.executeMethod('onBeforeDrop' , dropObj)
      $L(topTree).find('.lyteTreeDropParent').removeClass('lyteTreeDropParent')
      $L(topTree).removeClass('lyteTreeDragRunning')
      $L(topTree).find('.lyteTreeSortableDropPlaceholderBottom').removeClass('lyteTreeSortableDropPlaceholderBottom')
      $L(topTree).find('.lyteTreeSortableDropPlaceholderTop').removeClass('lyteTreeSortableDropPlaceholderTop')
      $L(topTree).find('.lyteTreeSortableDropPlaceholderChild').removeClass('lyteTreeSortableDropPlaceholderChild')
      document.removeEventListener('drop' , topTree.component.dropFunction)
      topTree.component.executeMethod('onDrop' , dropObj)
    }
	},
  didDestroy : function(){
    document.removeEventListener('keydown' , this.$node.keydownEvents)
  }
});

if (!_lyteUiUtils.registeredCustomElements['lyte-tree-icon']) {

  _lyteUiUtils.registeredCustomElements['lyte-tree-icon'] = true

  Lyte.createCustomElement("lyte-tree-icon", {
    connectedCallback: function() {
      var currTreeElem = $L(this).closest('lyte-tree');
      if (currTreeElem.hasClass('lyteTreeClosed')) {
        currTreeElem[0].style.display = 'none';
      }
      if (!this.hasAttribute('lyte-custom-icon')) {
        this.innerHTML = '<i class="arrow up"></i>';
      }
    },
    constructor: function() {
      if($L(this) && !$L(this).hasClass('lyteTreeClonedIcon')){
          var res = true;
          var classComponent = $L(this).closest('lyte-tree')[0]
          var classComponentData = classComponent.getData()
          var lyteTreeIcon = this;
          var iconCorresTree = $L(this).closest('.lyteTreeMainContainer').find('lyte-tree')[0]

          if (iconCorresTree) {
            if ($L(iconCorresTree).hasClass('lyteTreeOpened')) {
              $L(lyteTreeIcon).addClass('lyteIconOpened ' + classComponent.getData('ltPropOpenClass'))
            } else if ($L(iconCorresTree).hasClass('lyteTreeClosed')) {
              $L(lyteTreeIcon).addClass('lyteIconClosed ' + classComponent.getData('ltPropCloseClass'))
            }
          } else {
            $L(lyteTreeIcon).addClass('lyteIconClosed ' + classComponent.getData('ltPropCloseClass'))
          }

          if ($L(this).closest('.lyteTreeMainContainer').hasClass('lyteTreeHasChild') ||
            $L(this).closest('.lyteTreeMainContainer').hasClass('lyteTreeMaxedChild')) {
            $L(lyteTreeIcon).addClass('lyteIconClosed lyteTreeIconMaxed lyteTreeIconHasChild ' + classComponent.getData('ltPropCloseClass'))
          }

          if(classComponent.getData('ltPropStructureType') !== 'horizontal'){

            // Lyte tree icon for normal folder tree structure with event listener

            var closeTransBoolean = false
            var openTransBoolean = false

            this.addEventListener('click' , function(eve){

              var currentMainContainer = $L(lyteTreeIcon).closest('.lyteTreeMainContainer')[0]

              if($L(currentMainContainer).hasClass('lyteTreeLastChild')){
                return
              }

              var currentTreeBody = $L(lyteTreeIcon).closest('LYTE-TREE-BODY')
              var currentTree = $L(lyteTreeIcon).closest('LYTE-TREE')[0]
              var currentChildTree = $L(currentTreeBody).find('LYTE-TREE')[0]
              var iconClassList = $L(this).attr('class').split(" ");
              var res;
              var resBoolean = false;

              if (currentTree && currentTree.getMethods('onToggle')) {
                res = currentTree.component.executeMethod('onToggle', currentTreeBody[0], eve, currentTree, lyteTreeIcon , currentTree.getData('ltPropData'));
                if (res === undefined) {
                  res = true
                }
              }

              if($L(currentTree).attr('exclusive') === 'true'){
                var dataLevel = currentTreeBody.attr('data-level')
                currentTree.closeTree($L(currentTree).find("lyte-tree-body .lyteTreeBodyOpened[data-level='"+dataLevel+"']")[0])
              }

              if (res !== undefined) {
                if (res && res.then) {
                  res.then(function(arg) {
                    lyteTreePromiseFun();
                  }, function() {});
                } else {
                  if (res) {
                    lyteTreePromiseFun();
                  }
                }
                currentChildTree = $L(currentTreeBody).find('LYTE-TREE')[0]
              } else {
                lyteTreePromiseFun();
                currentChildTree = $L(currentTreeBody).find('LYTE-TREE')[0]
              }

              var currentIndex = currentTreeBody.attr('data-index').split(" ")

              function closingTransition(){

                $L(currentChildTree).addClass('lyteTreeClosed');
                $L(currentChildTree).removeClass('lyteTreeOpened');

                $L(currentChildTree).removeClass('treeTransRunning');

                closeTransBoolean = false
                currentChildTree.style.display = "none";
                currentChildTree.removeEventListener('transitionend', closingTransition);
                if (currentTree && currentTree.getMethods('onToggleEnd') && eve) {
                  res = currentTree.component.executeMethod('onToggleEnd', currentTreeBody[0], eve, currentTree, lyteTreeIcon , currentTree.getData('ltPropData'));
                  if (res === undefined) {
                    res = true
                  }
                }

                //after close call back
                var afterClose = currentTree.component.executeMethod('onClose' , currentTreeBody[0], eve, currentTree, lyteTreeIcon , currentTree.getData('ltPropData') , currentTree.getData('ltPropData')[currentIndex[currentIndex.length-1]]);

                if(afterClose === false){
                  return
                }
              }

              function openingTransition(){

                $L(currentChildTree).removeClass('treeTransRunning');
                openTransBoolean = false
                currentChildTree.removeEventListener('transitionend', openingTransition);
                if(currentChildTree){
                  currentChildTree.style.height = "auto";
                }
                currentTree.setData('collapsedAll' , false)
                if (currentTree && currentTree.getMethods('onToggleEnd') && eve) {
                  res = currentTree.component.executeMethod('onToggleEnd', currentTreeBody[0], eve, currentTree, lyteTreeIcon , currentTree.getData('ltPropData'));
                  if (res === undefined) {
                    res = true
                  }
                }

                // after open callback
                var afterOpen = currentTree.component.executeMethod('onOpen' , currentTreeBody[0], eve, currentTree, lyteTreeIcon , currentTree.getData('ltPropData'),currentTree.getData('ltPropData')[currentIndex[currentIndex.length-1]]);

                if(afterOpen === false){
                  return
                }
              }

              if(iconClassList.indexOf('lyteIconOpened') > -1){
                // tree to be closed

                var beforeClose = currentTree.component.executeMethod('onBeforeClose',currentTreeBody[0], eve, currentTree, lyteTreeIcon , currentTree.getData('ltPropData'),currentTree.getData('ltPropData')[currentIndex[currentIndex.length-1]]);

                if(beforeClose === false){
                  return
                }

                $L(lyteTreeIcon).addClass('lyteIconClosed');
                $L(lyteTreeIcon).addClass(currentTree.getData('ltPropCloseClass'));
                $L(lyteTreeIcon).removeClass('lyteIconOpened');
                $L(lyteTreeIcon).removeClass(currentTree.getData('ltPropOpenClass'));

                if(currentTree.getData('ltPropToggleAnimation')){
                  if(currentChildTree){
                    var closingTempHeight = currentChildTree.getBoundingClientRect().height;
                    currentChildTree.style.height = closingTempHeight + "px";
                  
                    $L(currentChildTree).addClass('treeTransRunning');

                    setTimeout(function(){
                      if(currentChildTree){
                        currentChildTree.style.height = "0px";
                      }
                    },10)

                    currentChildTree.addEventListener('transitionend', closingTransition);
                  } 

                } else {
                  if(currentChildTree){
                    currentChildTree.style.height = "0px";
                    currentChildTree.style.display = "none";
                  }

                }

                $L(currentTreeBody).addClass('lyteTreeBodyClosed');
                $L(currentTreeBody).addClass(currentTree.getData('ltPropWrapperCloseClass'));
                $L(currentTreeBody).removeClass('lyteTreeBodyOpened');
                $L(currentTreeBody).removeClass(currentTree.getData('ltPropWrapperOpenClass'));

              } else if(iconClassList.indexOf('lyteIconClosed') > -1){

                var beforeOpen = currentTree.component.executeMethod('onBeforeOpen',currentTreeBody[0], eve, currentTree, lyteTreeIcon , currentTree.getData('ltPropData'),currentTree.getData('ltPropData')[currentIndex[currentIndex.length-1]]);

                if(beforeOpen === false){
                  return
                }

                if($L(classComponent).hasClass('lyteTreeCollapsed')){
                  $L(classComponent).removeClass('lyteTreeCollapsed')
                }

                // tree to be opened

                $L(lyteTreeIcon).removeClass('lyteIconClosed');
                $L(lyteTreeIcon).removeClass(currentTree.getData('ltPropCloseClass'));
                $L(lyteTreeIcon).addClass('lyteIconOpened');
                $L(lyteTreeIcon).addClass(currentTree.getData('ltPropOpenClass'));

                if($L(lyteTreeIcon).closest('.lyteTreeMainContainer').hasClass('lyteTreeHasChild')){
                  $L(lyteTreeIcon).closest('.lyteTreeMainContainer').removeClass('lyteTreeHasChild')
                  $L(lyteTreeIcon).removeClass('lyteTreeIconHasChild')
                  if($L(lyteTreeIcon).closest('lyte-tree-body').attr('data-index').split(' ').length < currentTree.getData().ltPropMaxLevel){
                    $L(lyteTreeIcon).removeClass('lyteTreeIconMaxed')
                  }
                }

                $L(currentChildTree).addClass('lyteTreeOpened');
                $L(currentChildTree).removeClass('lyteTreeClosed');


                if(currentTree.getData('ltPropToggleAnimation')){

                  if(currentChildTree){
                    currentChildTree.style.display = "block";
                    currentChildTree.style.height = "auto";
                    var openingTempHeight = currentChildTree.getBoundingClientRect().height;
                    currentChildTree.style.height = "0px";

                    $L(currentChildTree).addClass('treeTransRunning');
                    setTimeout(function(){
                      currentChildTree.style.height = openingTempHeight + "px";
                    },10)

                    currentChildTree.addEventListener('transitionend', openingTransition);
                  }


                } else {
                  if(currentChildTree){
                    currentChildTree.style.display = "block";
                    currentChildTree.style.height = "auto";
                  }

                }

                $L(currentTreeBody).removeClass('lyteTreeBodyClosed');
                $L(currentTreeBody).removeClass(currentTree.getData('ltPropWrapperCloseClass'));
                $L(currentTreeBody).addClass('lyteTreeBodyOpened');
                $L(currentTreeBody).addClass(currentTree.getData('ltPropWrapperOpenClass'));

              }


              function lyteTreePromiseFun() {
                var treeDt = currentTree.getData('ltPropData');
                var path = $L(currentTreeBody).attr('data-index').split(" ");

                if (path.length < 2) {
                  var pathIndex = path[0];
                  var x = treeDt[pathIndex];
                  if (x !== undefined) {
                    Lyte.objectUtils(x, 'add', 'collapsed', false);
                    if(x.hasChild){
                      Lyte.objectUtils(x, 'add', 'hasChild', false);
                    }
                  }
                } else {
                  var x = treeDt;
                  for (var pathIndex = 1; pathIndex < path.length; pathIndex++) {
                    var x = treeDt[path[pathIndex]];
                  }
                  Lyte.objectUtils(x, 'add', 'collapsed', false)
                  if(x.hasChild){
                    Lyte.objectUtils(x, 'add', 'hasChild', false)
                  }
                }
                if(x[currentTree.getData('ltPropChildrenValue')]){
                  if(x[currentTree.getData('ltPropChildrenValue')].length > 0){
                    currentTree.openIcon($L(currentTreeBody).find('lyte-tree-icon')[0])
                  }
                }
                resBoolean = true;
              }


            }.bind(this))


          } else if(classComponent.getData('ltPropStructureType') === 'horizontal'){

            $L(this).addClass('lyteHTreeIcon')

            if(!classComponent.getData('ltPropData')[$L(this).closest('table').attr('child-index')][classComponentData.ltPropChildrenValue]){
              $L(this).addClass(classComponentData.ltPropLeafNodeClass)
            }

          }
      }
    },
    static: {
      "observedAttributes": {}
    }
  });

}

if (!_lyteUiUtils.registeredCustomElements['lyte-tree-content']) {
  _lyteUiUtils.registeredCustomElements['lyte-tree-content'] = true;

  Lyte.createCustomElement("lyte-tree-content", {
    static: {
      "observedAttributes": {
        get: function() {
          return [];
        }
      }
    },

    "connectedCallback": function() {
      var currentTree = $L(this).closest('lyte-tree')[0]
      if(currentTree.getData('ltPropSortable')){
        $L(this).addClass('lyteTreeSortableElem')
      }
      if(currentTree.getData('ltPropStructureType') !== 'horizontal'){
        var level = $L(this).closest('lyte-tree-body')[0].getAttribute('data-index').split(' ').length;
        this.setAttribute('lyte-tree-level', level)
      }
    },

    constructor : function(){
      // var thisDim = {};
      // var topParentDim ={};
      // this.addEventListener('mouseenter' , function(){
      //   var topParent = $L(this).closest('.lyteTreeTopParent')[0]
      //   if(topParent.getData('triggerSortable')){
      //     // var currentTree = $L(this).closest('lyte-tree')
      //     // topParentDim = topParent.getBoundingClientRect()
      //     // thisDim = this.getBoundingClientRect()
      //     // currentTree[0].setData('currentBodyDimension' , this.getBoundingClientRect())
      //     // var prevInd = topParent.getData('currentSortIndex')
      //     // if(!prevInd){
      //     //   prevInd = $L(this).closest('lyte-tree-body').attr('data-index')
      //     // }
      //     // topParent.setData('previousSortIndex' , prevInd)
      //     // topParent.setData('currentSortIndex' , $L(this).closest('lyte-tree-body').attr('data-index'))
      //   }
      // })
    }

  });
}

/**
 * @syntax yielded
 *	 <lyte-tree>
 *	 <template is="registerYield" yield-name="content">
 *			 <lyte-tree-content onclick="{{action('test')}}">
 *				 <lyte-tree-icon lyte-custom-icon>
 *					 <div set-level="{{treeCheck(this)}}"></div>
 *						 <div class="collapseBox">
 *							 <div class="arrow"></div>
 *						 </div>
 *				 </lyte-tree-icon>
 *			 </lyte-tree-content>
 *		 </template>
 *	 </lyte-tree>
 */