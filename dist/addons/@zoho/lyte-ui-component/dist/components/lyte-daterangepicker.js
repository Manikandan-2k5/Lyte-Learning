/**
 * Renders a daterangepicker
 * @component lyte-daterangepicker
 * @version 1.0.0
 * @dependencies lyte-calendar,lyte-dropdown,lyte-moment
 * @methods onDateSelected,onNavigation
 * @utility revertToSelected,revertToToday
 */

Lyte.Component.register("lyte-daterangepicker", {
_template:"<template tag-name=\"lyte-daterangepicker\"> <template is=\"switch\" value=\"{{ltPropSelectionType}}\"><template case=\"continuous\"> <div class=\"lyteDateRangePickerRow\" __mousedown=\"{{action('mouseDown',event)}}\" __mouseover=\"{{action('mouseOver',event)}}\" __keydown=\"{{action('keydown',event)}}\"> <div class=\"lyteDateRangePickerCol1\"> <lyte-calendar nav-yield=\"true\" lt-prop-format=\"{{ltPropFormat}}\" lt-prop-max-date=\"{{ltPropMaxDate}}\" lt-prop-min-date=\"{{ltPropMinDate}}\" lt-prop-fill-rows=\"{{ltPropFillRows}}\" lt-prop-start-week-day=\"{{ltPropStartWeekDay}}\" class=\"dRPCalendar1\" on-viewdate-change=\"{{method('viewDateChange','cal1')}}\" lt-prop-disable-navigation=\"true\" header-id=\"{{lbind(headerId1)}}\" month-dropdown-id=\"{{lbind(monthDropdownId1)}}\" year-dropdown-id=\"{{lbind(yearDropdownId1)}}\" month-header=\"{{lbind(monthHeader1)}}\"> <template is=\"registerYield\" yield-name=\"navigator\"> <div class=\"lyteDateRPLeftNav\"> <span role=\"button\" case=\"true\" class=\"lyteCalNav lyteCalyearNavLft\" tabindex=\"{{navtab}}\" aria-label=\"{{previousYear}}\" __click=\"{{action('previous','Y',event)}}\" __keydown=\"{{action('prevKey','Y',event)}}\"> </span> <span role=\"button\" class=\"lyteCalNav lyteCaldLft\" tabindex=\"{{navtab}}\" aria-label=\"{{previousMonth}}\" __click=\"{{action('previous','M',event)}}\" __keydown=\"{{action('prevKey','M',event)}}\"> </span> </div> <div class=\"{{lyteUiDateRPHeaderClass(ltPropHeaderType)}}\"> <template is=\"if\" value=\"{{ifEquals(ltPropHeaderType,&quot;dropdown&quot;)}}\"><template case=\"true\"> <lyte-dropdown on-before-show=\"{{method('addDropdownClass')}}\" on-show=\"{{method('editArrowPosition')}}\" lt-prop-callout=\"true\" class=\"monthDD\" lt-prop-tabindex=\"{{droptab1}}\" on-option-selected=\"{{method('optionSelected','cal1','M')}}\" lt-prop=\"{{ltPropDropdown}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{monthNames}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item}}\">{{item}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <lyte-dropdown on-before-show=\"{{method('addDropdownClass')}}\" on-show=\"{{method('editArrowPosition')}}\" lt-prop-callout=\"true\" class=\"yearDD\" lt-prop-tabindex=\"{{droptab2}}\" on-option-selected=\"{{method('optionSelected','cal1','Y')}}\" lt-prop=\"{{ltPropDropdown}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{years}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item}}\">{{item}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <span class=\"lyteVisuallyHidden\" aria-live=\"polite\" id=\"{{headerId1}}\">{{monthHeader1}}</span> </template><template case=\"false\"> <span aria-live=\"polite\" id=\"{{headerId1}}\">{{monthHeader1}}</span> </template></template> </div> </template> </lyte-calendar> </div> <div class=\"lyteDateRangePickerCol2\"> <lyte-calendar nav-yield=\"true\" lt-prop-format=\"{{ltPropFormat}}\" lt-prop-max-date=\"{{ltPropMaxDate}}\" lt-prop-min-date=\"{{ltPropMinDate}}\" lt-prop-fill-rows=\"{{ltPropFillRows}}\" lt-prop-start-week-day=\"{{ltPropStartWeekDay}}\" class=\"dRPCalendar2\" select-date=\"false\" on-viewdate-change=\"{{method('viewDateChange','cal2')}}\" lt-prop-disable-navigation=\"true\" header-id=\"{{lbind(headerId2)}}\" month-dropdown-id=\"{{lbind(monthDropdownId2)}}\" year-dropdown-id=\"{{lbind(yearDropdownId2)}}\" month-header=\"{{lbind(monthHeader2)}}\"> <template is=\"registerYield\" yield-name=\"navigator\"> <div class=\"{{lyteUiDateRPHeaderClass(ltPropHeaderType)}}\"> <template is=\"if\" value=\"{{ifEquals(ltPropHeaderType,&quot;dropdown&quot;)}}\"><template case=\"true\"> <lyte-dropdown on-before-show=\"{{method('addDropdownClass')}}\" on-show=\"{{method('editArrowPosition')}}\" lt-prop-callout=\"true\" class=\"monthDD\" lt-prop-tabindex=\"{{droptab1}}\" on-option-selected=\"{{method('optionSelected','cal2','M')}}\" lt-prop=\"{{ltPropDropdown}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{monthNames}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item}}\">{{item}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <lyte-dropdown on-before-show=\"{{method('addDropdownClass')}}\" on-show=\"{{method('editArrowPosition')}}\" lt-prop-callout=\"true\" class=\"yearDD\" lt-prop-tabindex=\"{{droptab2}}\" on-option-selected=\"{{method('optionSelected','cal2','Y')}}\" lt-prop=\"{{ltPropDropdown}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{years}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item}}\">{{item}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <span class=\"lyteVisuallyHidden\" aria-live=\"polite\" id=\"{{headerId2}}\">{{monthHeader2}}</span> </template><template case=\"false\"> <span aria-live=\"polite\" id=\"{{headerId2}}\">{{monthHeader2}}</span> </template></template> </div> <div class=\"lyteDateRPRightNav\"> <span role=\"button\" case=\"true\" class=\"lyteCalNav lyteCaldRgt\" tabindex=\"{{navtab}}\" aria-label=\"{{nextMonth}}\" __click=\"{{action('previous','M',event,'next')}}\" __keydown=\"{{action('nextKey','M',event)}}\"> </span> <span role=\"button\" class=\"lyteCalNav lyteCalyearNavRgt\" tabindex=\"{{navtab}}\" aria-label=\"{{nextYear}}\" __click=\"{{action('previous','Y',event,'next')}}\" __keydown=\"{{action('nextKey','Y',event)}}\"> </span> </div> </template> </lyte-calendar> </div> </div> </template><template case=\"separate\"> <div class=\"lyteDateRangePickerRow lyteSeperateDRP\" __mousedown=\"{{action('separateMouseDown',event)}}\" __keydown=\"{{action('keydown',event)}}\"> <div class=\"lyteDateRangePickerCol1\"> <lyte-calendar nav-yield=\"true\" lt-prop-format=\"{{ltPropFormat}}\" lt-prop-max-date=\"{{ltPropMaxDate}}\" lt-prop-min-date=\"{{ltPropMinDate}}\" lt-prop-fill-rows=\"{{ltPropFillRows}}\" lt-prop-start-week-day=\"{{ltPropStartWeekDay}}\" class=\"dRPCalendar1\" on-viewdate-change=\"{{method('viewDateChange','cal1')}}\" lt-prop-disable-navigation=\"true\" header-id=\"{{lbind(headerId1)}}\" month-dropdown-id=\"{{lbind(monthDropdownId1)}}\" year-dropdown-id=\"{{lbind(yearDropdownId1)}}\" month-header=\"{{lbind(monthHeader1)}}\"> <template is=\"registerYield\" yield-name=\"navigator\"> <div class=\"lyteDateRPLeftNav\"> <span role=\"button\" case=\"true\" class=\"lyteCalNav lyteCalyearNavLft\" tabindex=\"{{navtab}}\" aria-label=\"{{previousYear}}\" __click=\"{{action('separatePrevious','Y','cal1',event)}}\" __keydown=\"{{action('prevKey','Y',event,'cal1')}}\"> </span> <span role=\"button\" class=\"lyteCalNav lyteCaldLft\" tabindex=\"{{navtab}}\" aria-label=\"{{previousMonth}}\" __click=\"{{action('separatePrevious','M','cal1',event)}}\" __keydown=\"{{action('prevKey','M',event,'cal1')}}\"> </span> </div> <div class=\"{{lyteUiDateRPHeaderClass(ltPropHeaderType)}}\"> <template is=\"if\" value=\"{{ifEquals(ltPropHeaderType,&quot;dropdown&quot;)}}\"><template case=\"true\"> <lyte-dropdown on-before-show=\"{{method('addDropdownClass')}}\" on-show=\"{{method('editArrowPosition')}}\" lt-prop-callout=\"true\" class=\"monthDD\" lt-prop-tabindex=\"{{droptab1}}\" on-option-selected=\"{{method('optionSelected','cal1','M')}}\" lt-prop=\"{{ltPropDropdown}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{monthNames1}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item}}\">{{item}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <lyte-dropdown on-before-show=\"{{method('addDropdownClass')}}\" on-show=\"{{method('editArrowPosition')}}\" lt-prop-callout=\"true\" class=\"yearDD\" lt-prop-tabindex=\"{{droptab2}}\" on-option-selected=\"{{method('optionSelected','cal1','Y')}}\" lt-prop=\"{{ltPropDropdown}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{years1}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item}}\">{{item}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <span class=\"lyteVisuallyHidden\" aria-live=\"polite\" id=\"{{headerId1}}\">{{monthHeader1}}</span> </template><template case=\"false\"> <span aria-live=\"polite\" id=\"{{headerId1}}\">{{monthHeader1}}</span> </template></template> </div> <div class=\"lyteDateRPRightNav\"> <span role=\"button\" case=\"true\" class=\"lyteCalNav lyteCaldRgt\" tabindex=\"{{navtab}}\" aria-label=\"{{nextMonth}}\" __click=\"{{action('separatePrevious','M','cal1',event,'next')}}\" __keydown=\"{{action('nextKey','M',event,'cal1')}}\"> </span> <span role=\"button\" class=\"lyteCalNav lyteCalyearNavRgt\" tabindex=\"{{navtab}}\" aria-label=\"{{nextYear}}\" __click=\"{{action('separatePrevious','Y','cal1',event,'next')}}\" __keydown=\"{{action('nextKey','Y',event,'cal1')}}\"> </span> </div> </template> </lyte-calendar> </div> <div class=\"lyteDateRangePickerCol2\"> <lyte-calendar nav-yield=\"true\" lt-prop-format=\"{{ltPropFormat}}\" lt-prop-max-date=\"{{ltPropMaxDate}}\" lt-prop-min-date=\"{{ltPropMinDate}}\" lt-prop-fill-rows=\"{{ltPropFillRows}}\" lt-prop-start-week-day=\"{{ltPropStartWeekDay}}\" class=\"dRPCalendar2\" on-viewdate-change=\"{{method('viewDateChange','cal2')}}\" lt-prop-disable-navigation=\"true\" header-id=\"{{lbind(headerId2)}}\" month-dropdown-id=\"{{lbind(monthDropdownId2)}}\" year-dropdown-id=\"{{lbind(yearDropdownId2)}}\" month-header=\"{{lbind(monthHeader2)}}\"> <template is=\"registerYield\" yield-name=\"navigator\"> <div class=\"lyteDateRPLeftNav\"> <span role=\"button\" case=\"true\" class=\"lyteCalNav lyteCalyearNavLft\" tabindex=\"{{navtab}}\" aria-label=\"{{previousYear}}\" __click=\"{{action('separatePrevious','Y','cal2',event)}}\" __keydown=\"{{action('prevKey','Y',event,'cal2')}}\"> </span> <span role=\"button\" class=\"lyteCalNav lyteCaldLft\" tabindex=\"{{navtab}}\" aria-label=\"{{previousMonth}}\" __click=\"{{action('separatePrevious','M','cal2',event)}}\" __keydown=\"{{action('prevKey','M',event,'cal2')}}\"> </span> </div> <div class=\"{{lyteUiDateRPHeaderClass(ltPropHeaderType)}}\"> <template is=\"if\" value=\"{{ifEquals(ltPropHeaderType,&quot;dropdown&quot;)}}\"><template case=\"true\"> <lyte-dropdown on-before-show=\"{{method('addDropdownClass')}}\" on-show=\"{{method('editArrowPosition')}}\" lt-prop-callout=\"true\" class=\"monthDD\" lt-prop-tabindex=\"{{droptab1}}\" on-option-selected=\"{{method('optionSelected','cal2','M')}}\" lt-prop=\"{{ltPropDropdown}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{monthNames2}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item}}\">{{item}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <lyte-dropdown on-before-show=\"{{method('addDropdownClass')}}\" on-show=\"{{method('editArrowPosition')}}\" lt-prop-callout=\"true\" class=\"yearDD\" lt-prop-tabindex=\"{{droptab2}}\" on-option-selected=\"{{method('optionSelected','cal2','Y')}}\" lt-prop=\"{{ltPropDropdown}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{years2}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item}}\">{{item}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <span class=\"lyteVisuallyHidden\" aria-live=\"polite\" id=\"{{headerId2}}\">{{monthHeader2}}</span> </template><template case=\"false\"> <span aria-live=\"polite\" id=\"{{headerId2}}\">{{monthHeader2}}</span> </template></template> </div> <div class=\"lyteDateRPRightNav\"> <span role=\"button\" case=\"true\" class=\"lyteCalNav lyteCaldRgt\" tabindex=\"{{navtab}}\" aria-label=\"{{nextMonth}}\" __click=\"{{action('separatePrevious','M','cal2',event,'next')}}\" __keydown=\"{{action('nextKey','M',event,'cal2')}}\"> </span> <span role=\"button\" class=\"lyteCalNav lyteCalyearNavRgt\" tabindex=\"{{navtab}}\" aria-label=\"{{nextYear}}\" __click=\"{{action('separatePrevious','Y','cal2',event,'next')}}\" __keydown=\"{{action('nextKey','Y',event,'cal2')}}\"> </span> </div> </template> </lyte-calendar> </div> </div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"continuous":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"registerYield","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"text","position":[5,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,3,1]},{"type":"registerYield","position":[1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"text","position":[5,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3,1]},{"type":"attr","position":[3,3]}]},{"type":"componentDynamic","position":[1,3,1]}]},"separate":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"registerYield","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"text","position":[5,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[5,1]},{"type":"attr","position":[5,3]}]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,3,1]},{"type":"registerYield","position":[1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5]},{"type":"text","position":[5,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[5,1]},{"type":"attr","position":[5,3]}]},{"type":"componentDynamic","position":[1,3,1]}]}},"default":{}}],
_observedAttributes :["monthHeader1","monthHeader2","ltPropCurrentDate","ltPropFormat","ltPropMonthHeaderFormat","shortMonthNames","longMonthNames","ltPropStartYear","ltPropEndYear","ltPropStartDate","ltPropEndDate","ltPropDisabledDates","ltPropMinDate","ltPropMaxDate","ltPropSelectionType","ltPropPosition","ltPropHeaderType","ltPropFillRows","ltPropDropdown","ltPropMaxDiff","ltPropActivateNavigation","ltPropNavigation","ltPropTabindex","ltPropDisableCheck","ltPropStartWeekDay","years","dateSelected","selectedDate1","selectedDate2","calViewDate1","calViewDate2","tempDate","monthNames","dateNode1","dateNode2","clickCount","convertedDates","convert","internallyChanged","monthNames1","monthNames2","years1","years2","triggerDidconnect","activeDate","selected","preventKeydown","navtab","droptab1","droptab2","headerId1","monthDropdownId1","yearDropdownId1","headerId2","monthDropdownId2","yearDropdownId2","previousMonth","nextMonth","previousYear","nextYear"],

	data: function () {
		return {
			"monthHeader1": Lyte.attr("string", { "default": "Initializing.." }),
			"monthHeader2": Lyte.attr("string", { "default": "Initializing.." }),

			/**
						 * @componentProperty {string} ltPropCurrentDate
						 * @version 1.0.0
						 */
			"ltPropCurrentDate": Lyte.attr("string", { "default": '' }),
			/** 
			 * @typedef {
			 * MM/DD/YYYY |
			 * YYYY/MM/DD |
			 * MMM/DD/YYYY |
			 * MMM/YYYY/DD |
			 * DD/MMM/YYYY |
			 * YYYY/MMM/DD |
			 * DD/YYYY/MMM |
			 * YYYY/DD/MMM |
			 * MMMM/DD/YYYY |
			 * MMMM/YYYY/DD |
			 * DD/YYYY/MMMM |
			 * YYYY/DD/MMMM |
			 * DD/MMMM/YYYY |
			 * YYYY/MMMM/DD
			 * } dateFormat
			*/
			/**
						 * @componentProperty {dateFormat} ltPropFormat
						 * @version 1.0.0
						 * @default MM/DD/YYYY
						 */
			"ltPropFormat": Lyte.attr("string", { "default": "MM/DD/YYYY" }),
			/**
			 * @typedef {
			 * 'MMMM YYYY' |
			 * 'MMM YYYY' 
			 * } MonthHeaderFormat
			 */
			/**
						 * @componentProperty {MonthHeaderFormat} ltPropMonthHeaderFormat
						 * @version 1.0.0
						 * @default MMM YYYY
						 * @options MMMM YYYY,MMM YYYY
						 */
			"ltPropMonthHeaderFormat": Lyte.attr("string", { "default": "MMM YYYY" }),
			"shortMonthNames": Lyte.attr("array", { "default": ['Jan', 'Feb', 'Mar', 'Apr', 'short.may', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] }),
			'longMonthNames': Lyte.attr('array', {
				'default': [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December'
				]
			}),

			/**
						 * @componentProperty {number} ltPropStartYear
						 * @version 1.0.0
						 * @default 1900
						 */
			"ltPropStartYear": Lyte.attr("number", { "default": 1900 }),

			/**
						 * @componentProperty {number} ltPropEndYear
						 * @version 1.0.0
						 * @default 2100
						 */
			"ltPropEndYear": Lyte.attr("number", { "default": 2100 }),

			/**
						 * @componentProperty {dateString} ltPropStartDate
						 * @version 1.0.0
						 */
			"ltPropStartDate": Lyte.attr("string", { "default": "" }),

			/**
						 * @componentProperty {dateString} ltPropEndDate
						 * @version 1.0.0
						 */
			"ltPropEndDate": Lyte.attr("string", { "default": "" }),

			/**
						 * @componentProperty {array} ltPropDisabledDates
						 * @version 1.0.0
						 * @default []
						 */
			"ltPropDisabledDates": Lyte.attr("array", { "default": [] }),

			/**
						 * @componentProperty {dateString} ltPropMinDate
						 * @version 1.0.0
						 */
			"ltPropMinDate": Lyte.attr("string", { "default": "" }),

			/**
						 * @componentProperty {dateString} ltPropMaxDate
						 * @version 1.0.0
						 */
			"ltPropMaxDate": Lyte.attr("string", { "default": "" }),

			/**
						 * @componentProperty {continuous|separate} ltPropSelectionType
						 * @version 2.0.0
						 * @default continuous
						 */
			"ltPropSelectionType": Lyte.attr("string", { "default": "continuous" }),

			/**
						 * @componentProperty {left|right} ltPropPosition
						 * @version 2.2.6
						 * @default left
						 */
			"ltPropPosition": Lyte.attr("string", { "default": "left" }),

			/**
						 * @componentProperty {dropdown|default} ltPropHeaderType
						 * @version 2.2.16
						 * @default dropdown
						 */
			"ltPropHeaderType": Lyte.attr("string", { "default": "dropdown" }),

			/**
						 * @componentProperty {boolean} ltPropFillRows
						 * @version 2.2.16
						 * @default false
						 * 
						 */
			"ltPropFillRows": Lyte.attr("boolean", { "default": false }),

			/**
			 * @componentProperty {string} ltPropDropdown
			 * @version 3.39.0
			 * @default {}
			 * @component lyte-dropdown
			 */

			ltPropDropdown : Lyte.attr( 'string', { default : '{}' } ),

			/**
			 * @componentProperty {number} ltPropMaxDiff
			 * @version 3.46.0
			 */

			ltPropMaxDiff : Lyte.attr( 'number' ),

			/**
			 * @componentProperty {boolean} ltPropActivateNavigation=false
			 * @version 3.46.0
			 */
			ltPropActivateNavigation : Lyte.attr( 'boolean', { default : false } ),

			/**
			 * @componentProperty {boolean} ltPropNavigation=false
			 * @version 3.50.0
			 */

			ltPropNavigation : Lyte.attr( 'boolean', { default : false } ),

			/**
			 * @componentProperty {string} ltPropTabindex
			 * @default 2
			 * @version 3.50.0
			 */

			ltPropTabindex : Lyte.attr( 'string', { default : "2" } ),
			/**
			 * @componentProperty {boolean} ltPropDisableCheck
			 * @default false
			 * @version 3.50.0
			 */
			ltPropDisableCheck : Lyte.attr( 'boolean', { default : false } ),
			/**
			 * @componentProperty {number} ltPropStartWeekDay
			 * @default 1
			 * @version 3.80.0
			 */
			ltPropStartWeekDay : Lyte.attr( 'number', { default : 1 } ),

			// "ltPropPreventClick" : Lyte.attr("boolean",{"default":true}),

			//local variables
			"years": Lyte.attr("array", { "default": [] }),
			"dateSelected": Lyte.attr("boolean", { "default": false }),
			"selectedDate1": Lyte.attr("string"),
			"selectedDate2": Lyte.attr("string"),
			"calViewDate1": Lyte.attr("object"),
			"calViewDate2": Lyte.attr("object"),
			"tempDate": Lyte.attr("string"),
			"monthNames": Lyte.attr("array"),
			"dateNode1": Lyte.attr("object"),
			"dateNode2": Lyte.attr("object"),
			"clickCount": Lyte.attr("number", { "default": 0 }),
			"convertedDates": Lyte.attr("array", { "default": [] }),
			"convert": Lyte.attr("number", { "default": 0 }),
			"internallyChanged": Lyte.attr("boolean", { "default": false }),
			"monthNames1": Lyte.attr("array"),
			"monthNames2": Lyte.attr("array"),
			"years1": Lyte.attr("array", { "default": [] }),
			"years2": Lyte.attr("array", { "default": [] }),
			"triggerDidconnect": Lyte.attr("number", { "default": 0 }),

			activeDate : Lyte.attr( 'string', { default : "" } ),
			selected : Lyte.attr( 'string', { default : "1" } ),
			preventKeydown : Lyte.attr( 'boolean' ),
			navtab : Lyte.attr( 'string', { default : "-1" } ),
			droptab1 : Lyte.attr( 'string', { default : "1" } ),
			droptab2 : Lyte.attr( 'string', { default : "2" } ),

			headerId1 : Lyte.attr( 'string' ),
			monthDropdownId1 : Lyte.attr( 'string' ),
			yearDropdownId1 : Lyte.attr( 'string' ),

			headerId2 : Lyte.attr( 'string' ),
			monthDropdownId2 : Lyte.attr( 'string' ),
			yearDropdownId2 : Lyte.attr( 'string' ),

			previousMonth : Lyte.attr( 'string', { default : _lyteUiUtils.i18n( 'lyte.calendar.previous.month' ) } ),
			nextMonth : Lyte.attr( 'string', { default : _lyteUiUtils.i18n( 'lyte.calendar.next.month' ) } ),
			previousYear : Lyte.attr( 'string', { default : _lyteUiUtils.i18n( 'lyte.calendar.previous.year' ) } ),
			nextYear : Lyte.attr( 'string', { default : _lyteUiUtils.i18n( 'lyte.calendar.next.year' ) } )
		}
	},

	init_obs : function(){
		var __data = this.data;
		
		if( __data.ltPropNavigation ){
			var __final = __data.ltPropTabindex;
			this.setData({
				droptab2 : __final,
				droptab1 : __final,
				navtab : __final
			});
		}
	}.observes( 'ltPropTabindex' ).on( 'init' ),

	didConnect : function(){
		this.isTimezone = $L.moment && $L.moment().getCurrentTimeZone();
	},


	toDate : function(){
		if( this.isTimezone ){
			return new Date( $L.moment().format( 'MM/DD/YYYY' ) );
		}
		return new Date();
	},	

	moment : function( arg1, arg2 ){
		return $L.moment( arg1, arg2, { ignore_timezone : this.isTimezone } );
	},

	init : function(){
		var _this = this,
		$node = _this.$node;

		$node.revertToSelected = _this.revertToSelected.bind( _this );
		$node.revertToToday = _this.revertToToday.bind( _this );
		$node.reset = _this.resetDrp.bind( _this );
	},


	/**
	 * The method is going to initialize the values based on which the daterangepicker will be rendered
	 *
	 */
	initFunc : function(){
		var year = [],
		__data = this.data,
		endYear = __data.ltPropEndYear;

		for ( var i = __data.ltPropStartYear; i <= endYear; i++ ){
			year.push( i );
		}

		this.setData({
			years : year,
			years1 : year,
			years2 : year
		});
	}.observes('ltPropStartYear','ltPropEndYear' ).on('init'),

	/**
	 * The method is going to reset the daterangepicker component
	 *
	 */
	resetDrp : function(){
		if( !this.__ignoremin ){
			this.setData({
				dateNode1 : null,
				dateNode2 : null,
				selectedDate1 : "",
				selectedDate2 : ""
			});
		}

		this.checkAndRemoveSelectedDateClass('start');
		this.checkAndRemoveSelectedDateClass('end');

		var __data = this.data;

		if ( __data.ltPropSelectionType == 'separate') {
			this.restrictCalendarDates( "cal2", __data.ltPropMinDate, "min" );
			this.restrictCalendarDates( "cal1", __data.ltPropMaxDate, "max" );
			this.validateNavigation();

			var selected = $L( '.lyteCalSel', this.$node ),
			__length = selected.length;

			if( __length > 0 ){
				var __first = selected[ 0 ].dataset.date;

				selectedDate = new Date( __first );
				if ( selectedDate.toString() === "Invalid Date" ) {
					if( !$L.moment ){
						console.error("INCLUDE LYTE-MOMENT PLUGIN");
						return;
					}
					selectedDate = this.moment( __first, __data.ltPropFormat.toUpperCase() ).getDObj();
				}
				for (var i = 0; i < __length; i++) {
					selected.eq( i ).removeClass( 'lyteCalSel' );
				}
			}
		} else if( __data.ltPropDisableCheck ) {
			this.disablecheck();
		}
	},
	revertToSelected: function () {
		var __data = this.data;

		this.setData('triggerDidconnect', __data.triggerDidconnect++ );

		if ( __data.ltPropSelectionType == "separate" ) {
			var start_date = __data.ltPropStartDate,
			end_date = __data.ltPropEndDate;

			if( start_date ){
				this.checkforStartDateAndEndDate( this.$node.querySelector( '.dRPCalendar1' ), start_date, "start" );
			}
			if( end_date ){
				this.checkforStartDateAndEndDate( this.$node.querySelector('.dRPCalendar2'), end_date, "end");
			}
		}
	},
	revertToToday: function ( __date ) {
		var cal1 = this.$node.querySelector('.dRPCalendar1');
		var cal2 = this.$node.querySelector('.dRPCalendar2');
		var today = __date || this.toDate();
		var dd = today.getDate();
		var mm = today.getMonth(); //January is 0!
		var yy = today.getFullYear();
		// this.setMonthAndYear(cal1,{dd:dd,mm:mm,yy:yy},"cal1");
		if (this.getData('ltPropSelectionType') == "continuous") {
			if (this.getData('ltPropPosition') == "right") {
				mm -= 1;
				if (mm < 0) {
					mm = 11;
					yy -= 1;
				}
				cal1.setData('selectDate', false);
				this.setMonthAndYear(cal1, { dd: 1, mm: mm, yy: yy }, "cal1");
				cal1.setData('selectDate', true);
			}
			else {
				this.setMonthAndYear(cal1, { dd: dd, mm: mm, yy: yy }, "cal1");
			}
			if (mm < 11) {
				mm += 1
			}
			else {
				mm = 0;
				yy += 1;
			}
			if (this.getData('ltPropPosition') == "right") {
				cal2.setData('selectDate', true);
				this.setMonthAndYear(cal2, { dd: dd, mm: mm, yy: yy }, "cal2");
				cal2.setData('selectDate', false);
			} else {
				this.setMonthAndYear(cal2, { dd: 1, mm: mm, yy: yy }, "cal2");
			}
			var selected = this.$node.querySelector('.lyteCalSel');
			if (selected) {
				var selectedDate = new Date(selected.dataset.date);
				if (selectedDate.toString() === "Invalid Date") {
					if (!($L.moment)) {
						console.error("INCLUDE LYTE-MOMENT PLUGIN");
						return;
					}
					selectedDate = this.moment(selected.dataset.date, this.getData('ltPropFormat').toUpperCase()).getDObj();
				}
				if (selectedDate.getMonth() === today.getMonth() && selectedDate.getDate() === today.getDate() && selectedDate.getFullYear() === today.getFullYear()) {
					selected.classList.remove('lyteCalSel');
					// selected.classList.add('lyteCalToday');
				}
			}

			if( this.data.ltPropDisableCheck ) {
				this.disablecheck();
			}
		}
		else if (this.getData('ltPropSelectionType') == "separate") {
			this.setMonthAndYear(cal1, { dd: dd, mm: mm, yy: yy }, "cal1");
			var startDate = this.getData('ltPropStartDate') ? Date.parse(this.stringToDate(this.getData('ltPropStartDate'), this.getData('ltPropFormat'))) : null,
				endDate = this.getData('ltPropEndDate') ? Date.parse(this.stringToDate(this.getData('ltPropEndDate'), this.getData('ltPropFormat'))) : null,
				currentDate = Date.parse(today), dateObj;
			if (startDate && startDate > currentDate) {
				dateObj = this.stringToDate(this.getData('ltPropStartDate'), this.getData('ltPropFormat'));
				var dd = dateObj.getDate();
				var mm = dateObj.getMonth(); //January is 0!
				var yy = dateObj.getFullYear();
				this.setMonthAndYear(cal2, { dd: dd, mm: mm, yy: yy }, "cal2");
				this.restrictCalendarDates("cal2", this.getData('ltPropStartDate'), "min");
			}
			else if (endDate && endDate < currentDate) {
				dateObj = this.stringToDate(this.getData('ltPropEndDate'), this.getData('ltPropFormat'));
				var dd = dateObj.getDate();
				var mm = dateObj.getMonth(); //January is 0!
				var yy = dateObj.getFullYear();
				this.setMonthAndYear(cal1, { dd: dd, mm: mm, yy: yy }, "cal1");
				this.restrictCalendarDates("cal1", this.getData('ltPropEndDate'), "max");
			}
			else {
				this.setMonthAndYear(cal2, { dd: dd, mm: mm, yy: yy }, "cal2");
			}
			var selected = this.$node.querySelectorAll('.lyteCalSel');
			if (selected.length > 0) {
				var selectedDate = new Date(selected[0].dataset.date);
				if (selectedDate.toString() === "Invalid Date") {
					if (!($L.moment)) {
						console.error("INCLUDE LYTE-MOMENT PLUGIN");
						return;
					}
					selectedDate = this.moment(selected[0].dataset.date, this.getData('ltPropFormat').toUpperCase()).getDObj();
				}
				for (var i = 0; i < selected.length; i++) {
					if (selectedDate.getMonth() === today.getMonth() && selectedDate.getDate() === today.getDate() && selectedDate.getFullYear() === today.getFullYear()) {
						selected[0].classList.remove('lyteCalSel');
						// selected[0].classList.add('lyteCalToday');
					}
				}
			}
			if (this.getData('ltPropStartDate')) {
				this.setData('selectedDate1', this.getData('ltPropStartDate'));
				this.checkforStartDateAndEndDate(this.$node.querySelector('.dRPCalendar1'), this.getData('ltPropStartDate'), "start");
			}
			if (this.getData('ltPropEndDate')) {
				this.setData('selectedDate2', this.getData('ltPropEndDate'));
				this.checkforStartDateAndEndDate(this.$node.querySelector('.dRPCalendar2'), this.getData('ltPropEndDate'), "end");
			}
			this.validateNavigationAndDropdown();
		}


		if (this.getData('ltPropDisabledDates').length > 0) {
			this.setData('convert', this.getData('convert') + 1);
		}
		if (this.getData('ltPropSelectionType') == "continuous" && this.getData('ltPropStartDate') && this.getData('ltPropEndDate')) {
			this.setData('selectedDate1', this.getData('ltPropStartDate'));
			this.setData('selectedDate2', this.getData('ltPropEndDate'));
			this.checkForSelectedDates(this.getData('ltPropStartDate'), this.getData('ltPropEndDate'));
		}
		this.setTodayClass();
	},

	setTodayClass : function(){
		var currentDate = this.toDate();
		if(this.getData('calViewDate1').getMonth() == currentDate.getMonth() && this.getData('calViewDate1').getFullYear() == currentDate.getFullYear()){
			var nodes = this.$node.querySelector('.dRPCalendar1').querySelectorAll('.lyteCalCdate:not(.lyteCalDiffMonth)');
			for(var i = 0; i<nodes.length; i++){
				var date = this.stringToDate(nodes[i].dataset.date, this.getData('ltPropFormat'));
				if(currentDate.getDate() == date.getDate() && !(nodes[i].classList.contains('lyteDateRPFirstDateSelected') || nodes[i].classList.contains('lyteDateRPTempSelected') || nodes[i].classList.contains('lyteDateRPLastDateSelected'))){
					// nodes[i].classList.add('lyteCalToday');
				}
			}
		}
		if(this.getData('calViewDate2').getMonth() == currentDate.getMonth() && this.getData('calViewDate2').getFullYear() == currentDate.getFullYear()){
			var nodes = this.$node.querySelector('.dRPCalendar2').querySelectorAll('.lyteCalCdate:not(.lyteCalDiffMonth)');
			for(var i = 0; i<nodes.length; i++){
				var date = this.stringToDate(nodes[i].dataset.date, this.getData('ltPropFormat'));
				if(currentDate.getDate() == date.getDate() && !(nodes[i].classList.contains('lyteDateRPFirstDateSelected') || nodes[i].classList.contains('lyteDateRPTempSelected') || nodes[i].classList.contains('lyteDateRPLastDateSelected'))){
					// nodes[i].classList.add('lyteCalToday');
				}
			}
		}
	},

	toggleSelectionType : function(){
		this.setData('triggerDidconnect',this.getData('triggerDidconnect') + 1);
	}.observes('ltPropSelectionType'),
	convertDisabledDates: function () {
		// var disabledDates = this.getData('ltPropDisabledDates');
		// var convertedDates = [];
		// for(var i = 0; i<disabledDates.length; i++){
		// 	convertedDates.push(Date.parse(disabledDates[i]));
		// }
		// this.setData('convertedDates',convertedDates);
		if (this.getData('ltPropDisabledDates').length > 0) {
			this.checkAndMarkDisabledDates();
		}
	}.observes("ltPropDisabledDates.[]","convert"),

	/**
	 * The method is going to set the months that will be shown in the daterangepicker
	 *
	 */
	setMonths : function(){
		var monthNames = [],
		ns = 'shortMonthNames',
		arr,
		__data = this.data;

		if( __data.ltPropMonthHeaderFormat == "MMMM YYYY" ){
			ns = 'longMonthNames';
		}

		arr = __data[ ns ];

		for( var i = 0; i < 12; i++ ){
			monthNames.push( _lyteUiUtils.i18n( arr[ i ] ) );
		}
		
		this.setData({
			monthNames : monthNames,
			monthNames1 : monthNames,
			monthNames2 : monthNames
		});
	}.observes('ltPropMonthHeaderFormat').on( 'init' ),

	setCalendarHeader: function (cal, comp, viewDate) {
		var dd = 1;
		var mm = viewDate.getMonth();
		var yy = viewDate.getFullYear();
		if (this.getData('ltPropSelectionType') == "continuous") {
			if (this.getData('ltPropHeaderType') == "dropdown") {
				comp.$node.querySelector('.monthDD').ltProp("selected", this.getData("monthNames")[mm]);
				comp.$node.querySelector('.yearDD').ltProp("selected", "" + yy);
			}
		}
		if (this.getData('ltPropSelectionType') == "separate") {
			if (this.getData('ltPropHeaderType') == "dropdown") {
				if (cal == "cal1") {
					comp.$node.querySelector('.monthDD').ltProp("selected", this.getData("monthNames1")[mm]);
				}
				if (cal == "cal2") {
					comp.$node.querySelector('.monthDD').ltProp("selected", this.getData("monthNames2")[mm]);
				}
				comp.$node.querySelector('.yearDD').ltProp("selected", "" + yy);
			}
		}
	},
	didConnectFunc: function ( arg ) {

		if( this.__ignoremin && arg && arg.item == "ltPropMinDate" ){
			return;
		}

		var cal1 = this.$node.querySelector('.dRPCalendar1');
		var cal2 = this.$node.querySelector('.dRPCalendar2');
		var currentDate = this.toDate();
		var today = this.getData("ltPropCurrentDate") ? this.stringToDate(this.getData("ltPropCurrentDate"), this.getData('ltPropFormat')) : currentDate;
		if (this.getData('ltPropSelectionType') == "continuous" && this.getData('ltPropStartDate') && this.getData('ltPropEndDate')) {
			today = this.stringToDate(this.getData('ltPropStartDate'), this.getData('ltPropFormat'));
		}
		if (this.getData('ltPropSelectionType') == "separate" && this.getData('ltPropStartDate')) {
			today = this.stringToDate(this.getData('ltPropStartDate'), this.getData('ltPropFormat'));
			this.restrictCalendarDates("cal2", this.getData('ltPropStartDate'), "min");
		}
		var dd = today.getDate();
		var mm = today.getMonth(); //January is 0!
		var yy = today.getFullYear();
		// this.setMonthAndYear(cal1,{dd:dd,mm:mm,yy:yy},"cal1");
		if (this.getData('ltPropSelectionType') == "continuous") {
			if (this.getData('ltPropPosition') == "right") {
				mm -= 1;
				if (mm < 0) {
					mm = 11;
					yy -= 1;
				}
				cal1.setData('selectDate', false);
				this.setMonthAndYear(cal1, { dd: 1, mm: mm, yy: yy }, "cal1");
				cal1.setData('selectDate', true);
			}
			else {
				this.setMonthAndYear(cal1, { dd: dd, mm: mm, yy: yy }, "cal1");
			}
			if (mm < 11) {
				mm += 1
			}
			else {
				mm = 0;
				yy += 1;
			}
			if (this.getData('ltPropPosition') == "right") {
				cal2.setData('selectDate', true);
				this.setMonthAndYear(cal2, { dd: dd, mm: mm, yy: yy }, "cal2");
				cal2.setData('selectDate', false);
			} else {
				this.setMonthAndYear(cal2, { dd: 1, mm: mm, yy: yy }, "cal2");
			}
			// this.setMonthAndYear(cal2,{dd:1,mm:mm,yy:yy});
			var selected = this.$node.querySelector('.lyteCalSel');
			if (selected) {
				var selectedDate = new Date(selected.dataset.date);
				if (selectedDate.toString() === "Invalid Date") {
					if (!($L.moment)) {
						console.error("INCLUDE LYTE-MOMENT PLUGIN");
						return;
					}
					selectedDate = this.moment(selected.dataset.date, this.getData('ltPropFormat').toUpperCase()).getDObj();
				}
				if (selectedDate.getMonth() === currentDate.getMonth() && selectedDate.getDate() === currentDate.getDate() && selectedDate.getFullYear() === currentDate.getFullYear()) {
					selected.classList.remove('lyteCalSel');
					// selected.classList.add('lyteCalToday');
				}
			}

			if( this.data.ltPropDisableCheck ) {
				this.disablecheck();
			}
		}
		else if (this.getData('ltPropSelectionType') == "separate") {
			this.setMonthAndYear(cal1, { dd: dd, mm: mm, yy: yy }, "cal1");
			if (this.getData('ltPropEndDate')) {
				today = this.stringToDate(this.getData('ltPropEndDate'), this.getData('ltPropFormat'));
				this.restrictCalendarDates("cal1", this.getData('ltPropEndDate'), "max");
				var dd = today.getDate();
				var mm = today.getMonth(); //January is 0!
				var yy = today.getFullYear();
			}
			this.setMonthAndYear(cal2, { dd: dd, mm: mm, yy: yy }, "cal2");
			var selected = this.$node.querySelectorAll('.lyteCalSel');
			if (selected.length > 0) {
				var selectedDate = new Date(selected[0].dataset.date);
				if (selectedDate.toString() === "Invalid Date") {
					if (!($L.moment)) {
						console.error("INCLUDE LYTE-MOMENT PLUGIN");
						return;
					}
					selectedDate = this.moment(selected[0].dataset.date, this.getData('ltPropFormat').toUpperCase()).getDObj();
				}
				for (var i = 0; i < selected.length; i++) {
					if (selectedDate.getMonth() === currentDate.getMonth() && selectedDate.getDate() === currentDate.getDate() && selectedDate.getFullYear() === currentDate.getFullYear()) {
						selected[0].classList.remove('lyteCalSel');
						// selected[0].classList.add('lyteCalToday');
					}
				}
			}
			this.validateNavigationAndDropdown();
			this.setTodayClass();
		}


		if (this.getData('ltPropDisabledDates').length > 0) {
			this.setData('convert', this.getData('convert') + 1);
		}
		if (this.getData('ltPropSelectionType') == "continuous" && this.getData('ltPropStartDate') && this.getData('ltPropEndDate')) {
			this.setData('selectedDate1', this.getData('ltPropStartDate'));
			this.setData('selectedDate2', this.getData('ltPropEndDate'));
			this.checkForSelectedDates(this.getData('ltPropStartDate'), this.getData('ltPropEndDate'));
		}
	}.observes('ltPropCurrentDate', 'ltPropMinDate', 'ltPropMaxDate', 'triggerDidconnect').on('didConnect'),
	restrictCalendarDates: function (cal, date, cond) {
		var calendar;
		if (cal == "cal1") {
			calendar = this.$node.querySelector('.dRPCalendar1');
		}
		else if (cal == "cal2") {
			calendar = this.$node.querySelector('.dRPCalendar2');
		}
		if (cond === "min") {
			calendar.ltProp('minDate', date);
			var minDate = this.stringToDate(date, this.getData('ltPropFormat'));
			this.calculateYears(cal, typeof minDate == "object" ? minDate.getFullYear() : this.getData('ltPropStartYear'), this.getData('ltPropEndYear'));
		}
		else if(cond == "max"){
			calendar.ltProp('maxDate',date);
			var maxDate = this.stringToDate(date,this.getData('ltPropFormat'));
			this.calculateYears(cal,this.getData('ltPropStartYear'),typeof maxDate == "object" ? maxDate.getFullYear() : this.getData('ltPropEndYear'));
		}
	},
	calculateYears: function (cal, start, end) {
		var year = [];
		for (var i = start; i <= end; i++) {
			year.push(i);
		}
		if (cal == "cal1") {
			this.setData('years1', year);
		}
		if (cal == "cal2") {
			this.setData('years2', year);
		}
	},
	changeStartAndEndDate: function () {
		// console.log(this.getData('internallyChanged'));
		if (this.getData('ltPropSelectionType') == "separate") {
			if (this.getData('ltPropStartDate')) {
				this.restrictCalendarDates("cal2", this.getData('ltPropStartDate'), "min");
			}
			if (this.getData('ltPropEndDate')) {
				this.restrictCalendarDates("cal1", this.getData('ltPropEndDate'), "max");
			}
			if (this.getData('ltPropStartDate')) {
				this.checkAndRemoveSelectedDateClass("start");
				this.checkforStartDateAndEndDate(this.$node.querySelector('.dRPCalendar1'), this.getData('ltPropStartDate'), "start");
			}
			if (this.getData('ltPropEndDate')) {
				this.checkAndRemoveSelectedDateClass("end");
				this.checkforStartDateAndEndDate(this.$node.querySelector('.dRPCalendar2'), this.getData('ltPropEndDate'), "end");
			}
		}
		else if (this.getData('ltPropSelectionType') == "continuous") {
			if (!this.getData('internallyChanged')) {
				if (this.getData('dateSelected')) {
					this.setData('dateSelected', false);
				}
				if (this.getData('tempDate')) {
					this.setData('tempDate', '');
				}
				// if(this.getData('ltPropStartDate') === "" || this.getData('ltPropEndDate') === ""){
				this.checkAndRemoveAllSelectedClasses();
				this.removeMonthEndAndStart();
				// }
				if (this.getData('ltPropStartDate') && this.getData('ltPropEndDate')) {
					this.setData('selectedDate1', this.getData('ltPropStartDate'));
					this.setData('selectedDate2', this.getData('ltPropEndDate'));
					this.checkForSelectedDates(this.getData('ltPropStartDate'), this.getData('ltPropEndDate'));
				}
			}
			else {
				this.setData('internallyChanged', false);
			}
		}
		if (!this.getData('ltPropStartDate') && !this.getData('ltPropEndDate')) {
			this.resetDrp();
		}
	}.observes('ltPropStartDate', 'ltPropEndDate'),
	checkforStartDateAndEndDate: function (cal, date, cond) {
		var nodes = cal.querySelectorAll('.lyteCalCdate:not(.lyteCalDiffMonth)');
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].dataset.date == date) {
				if (cond == "start") {
					nodes[i].classList.add('lyteDateRPFirstDateSelected');
					this.setData('dateNode1', nodes[i]);
				}
				if (cond == "end") {
					nodes[i].classList.add('lyteDateRPLastDateSelected');
					this.setData('dateNode2', nodes[i]);
				}
				return;
			}
		}
	},
	checkAndRemoveSelectedDateClass: function (cond) {
		if (cond == "start") {
			var calendar = this.$node.querySelector('.dRPCalendar1');
			var nodes = Array.from(calendar.querySelectorAll(".lyteDateRPFirstDateSelected"));
			// Lyte.arrayUtils(nodes, "push", Array.from(this.$node.querySelectorAll(".lyteCalToday")));
			Lyte.arrayUtils(nodes, "push", Array.from(this.$node.querySelectorAll(".lyteCalSel")));
			if (nodes.length > 0) {
				for (var i = 0; i < nodes.length; i++) {
					nodes[i].classList.remove("lyteDateRPFirstDateSelected"/*, "lyteCalToday"*/, "lyteCalSel");
				}
			}
		}
		if (cond == "end") {
			var calendar = this.$node.querySelector('.dRPCalendar2');
			var nodes = Array.from(calendar.querySelectorAll(".lyteDateRPLastDateSelected"));
			// Lyte.arrayUtils(nodes, "push", Array.from(this.$node.querySelectorAll(".lyteCalToday")));
			Lyte.arrayUtils(nodes, "push", Array.from(this.$node.querySelectorAll(".lyteCalSel")));
			if (nodes.length > 0) {
				for (var i = 0; i < nodes.length; i++) {
					nodes[i].classList.remove("lyteDateRPLastDateSelected"/*, "lyteCalToday"*/, "lyteCalSel");
				}
			}
		}
	},

	/**
	 * The method is going to validate and change the month shown in the daterangepicker
	 *
	 */
	validateNavigation : function(){
		if(this.getData('ltPropStartYear') || this.getData('ltPropEndYear')){
			if(this.getData('ltPropSelectionType') == 'continuous'){
				if(this.getData('ltPropStartYear')){
					var date = this.getData('calViewDate1');
					var node = this.$node.querySelector('.lyteDateRangePickerCol1 .lyteDateRPLeftNav');
					if (date.getMonth() == 0 && date.getFullYear() == this.getData('ltPropStartYear')) {
						node.classList.add('lyteDateRPNavDisabled');
					}
					else {
						node.classList.remove('lyteDateRPNavDisabled');
					}
				}
				if (this.getData('ltPropEndYear')) {
					var date = this.getData('calViewDate2');
					var node = this.$node.querySelector('.lyteDateRangePickerCol2 .lyteDateRPRightNav');
					if (date.getMonth() == 11 && date.getFullYear() == this.getData('ltPropEndYear')) {
						node.classList.add('lyteDateRPNavDisabled');
					}
					else {
						node.classList.remove('lyteDateRPNavDisabled');
					}
				}
			}
			if (this.getData('ltPropSelectionType') == 'separate') {
				var date1 = this.getData('calViewDate1');
				var date2 = this.getData('calViewDate2');
				if (this.getData('ltPropStartYear')) {
					var node1 = this.$node.querySelector('.lyteDateRangePickerCol1 .lyteDateRPLeftNav');
					var node2 = this.$node.querySelector('.lyteDateRangePickerCol2 .lyteDateRPLeftNav');
					if (date1.getMonth() == 0 && date1.getFullYear() == this.getData('ltPropStartYear')) {
						node1.classList.add('lyteDateRPNavDisabled');
					}
					else {
						node1.classList.remove('lyteDateRPNavDisabled');
					}
					if (date2.getMonth() == 0 && date2.getFullYear() == this.getData('ltPropStartYear')) {
						node2.classList.add('lyteDateRPNavDisabled');
					}
					else {
						node2.classList.remove('lyteDateRPNavDisabled');
					}
				}
				if (this.getData('ltPropEndYear')) {
					var node1 = this.$node.querySelector('.lyteDateRangePickerCol1 .lyteDateRPRightNav');
					var node2 = this.$node.querySelector('.lyteDateRangePickerCol2 .lyteDateRPRightNav');
					if (date1.getMonth() == 11 && date1.getFullYear() == this.getData('ltPropEndYear')) {
						node1.classList.add('lyteDateRPNavDisabled');
					}
					else {
						node1.classList.remove('lyteDateRPNavDisabled');
					}
					if (date2.getMonth() == 11 && date2.getFullYear() == this.getData('ltPropEndYear')) {
						node2.classList.add('lyteDateRPNavDisabled');
					}
					else {
						node2.classList.remove('lyteDateRPNavDisabled');
					}
				}
			}
		}

		if( this.data.ltPropDisableCheck ){
			this.disablecheck();
		}
	},

	/**
	 * The method is going to validate and change the month shown in the daterangepicker and also change the dropdown values
	 *
	 */
	validateNavigationAndDropdown : function(){
		this.validateNavigation();
		if (this.getData('ltPropStartDate')) {
			var date1 = this.stringToDate(this.getData('ltPropStartDate'), this.getData('ltPropFormat'));
			var date2 = this.getData('calViewDate2');
			var node = this.$node.querySelector('.lyteDateRangePickerCol2 .lyteDateRPLeftNav');
			if (date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear()) {
				node.classList.add('lyteDateRPNavDisabled');
			}
			else {
				node.classList.remove('lyteDateRPNavDisabled');
			}
			if (date1.getFullYear() === date2.getFullYear()) {
				var monthNames = this.getData('monthNames2');
				var index = monthNames.indexOf(this.getData('monthNames')[date1.getMonth()]);
				if (index == -1 || index != 0) {
					this.calculateMonths('cal2', date1.getMonth());
				}
			}
			else {
				if (this.getData('monthNames2').length < 12) {
					this.setData('monthNames2', this.getData('monthNames'));
				}
			}

		}
		if (this.getData('ltPropEndDate')) {
			var date1 = this.stringToDate(this.getData('ltPropEndDate'), this.getData('ltPropFormat'));
			var date2 = this.getData('calViewDate1');
			var node = this.$node.querySelector('.lyteDateRangePickerCol1 .lyteDateRPRightNav');
			if (date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear()) {
				node.classList.add('lyteDateRPNavDisabled');
			}
			else {
				node.classList.remove('lyteDateRPNavDisabled');
			}
			if (date1.getFullYear() === date2.getFullYear()) {
				var monthNames = this.getData('monthNames1');
				var index = monthNames.indexOf(this.getData('monthNames')[date1.getMonth()]);
				if (index == -1 || index != monthNames.length - 1) {
					this.calculateMonths('cal1', date1.getMonth());
				}
			}
			else {
				if (this.getData('monthNames1').length < 12) {
					this.setData('monthNames1', this.getData('monthNames'));
				}
			}
		}
	},
	calculateMonths: function (cal, limit) {
		if (cal == "cal1") {
			var monthNames = this.getData('monthNames');
			this.setData('monthNames1', monthNames.slice(0, limit + 1));
		}
		if (cal == "cal2") {
			var monthNames = this.getData('monthNames');
			this.setData('monthNames2', monthNames.slice(limit));
		}
	},
	setMonthAndYear: function (cal, date, view) {
		if( this.__ignoremin ){
			return;
		}
		cal.ltProp("currentDate", this.constructDateString(date.mm + 1, date.dd, date.yy));
		cal.setData('currentDatechanged', cal.getData('currentDatechanged') + 1);
		if (this.getData('ltPropSelectionType') == "separate") {
			if (view == "cal1" && this.getData('monthNames1').indexOf(this.getData("monthNames")[date.mm]) == -1) {
				this.setData("monthNames1", this.getData('monthNames'));
			}
			if (view == "cal2" && this.getData('monthNames2').indexOf(this.getData("monthNames")[date.mm]) == -1) {
				this.setData("monthNames2", this.getData('monthNames'));
			}
		}
		if (this.getData('ltPropHeaderType') == "dropdown") {
			cal.querySelector('.monthDD').ltProp("selected", this.getData("monthNames")[date.mm]);
			cal.querySelector('.yearDD').ltProp("selected", "" + date.yy);
		}

		if (view == "cal1") {
			this.setData('calViewDate1', cal.getData('viewDate'));
		}
		else {
			this.setData('calViewDate2', cal.getData('viewDate'));
		}
	},
	selectDates: function (targetDate) {
		var nodes = this.$node.querySelectorAll('.lyteCalCdate:not(.lyteCalDiffMonth)');
		var initNode = $L( this.getData('dateNode1') );
		var target = $L( this.getData('dateNode2') );
		var date1 = Date.parse(this.stringToDate(this.getData('selectedDate1'), this.getData('ltPropFormat')) /*this.getData('selectedDate1')*/);
		var date2 = Date.parse(this.stringToDate(targetDate, this.getData('ltPropFormat')) /*targetDate*/);
		var node1 = this.$node.querySelector('.lyteDateRPTempFirstDateSelected');
		var node2 = this.$node.querySelector('.lyteDateRPTempLastDateSelected');
		if (node1) {
			node1.classList.remove('lyteDateRPTempFirstDateSelected');
		}
		if (node2) {
			node2.classList.remove('lyteDateRPTempLastDateSelected');
		}
		this.removeMonthEndAndStart();
		if (date1 < date2) {
			for (var i = 0; i < nodes.length; i++) {
				var date = Date.parse(this.stringToDate(nodes[i].dataset.date, this.getData('ltPropFormat')) /*nodes[i].dataset.date*/);
				if (date >= date1 && date <= date2) {
					if (nodes[i].classList.contains("lyteCalDisabled")) {
						this.checkForBeforeAndAfter(nodes, i, date1, date2);
					}
					else {
						if (date == date1) {
							initNode.addClass('lyteDateRPTempFirstDateSelected');
						}
						else if (date == date2) {
							target.addClass('lyteDateRPTempLastDateSelected');
						}
						else {
							if (!nodes[i].classList.contains("lyteDateRPTempSelected")) {
								nodes[i].classList.add("lyteDateRPTempSelected");
							}
						}
						this.checkForMonthEndAndStart(nodes, i, this.getData('selectedDate1'), targetDate);
					}
				}
				else {
					if (nodes[i].classList.contains("lyteDateRPTempSelected") || nodes[i].classList.contains("lyteCalSel")) {
						nodes[i].classList.remove("lyteDateRPTempSelected", 'lyteCalSel');
					}
				}
			}
		}
		else if (date1 > date2) {
			for (var i = 0; i < nodes.length; i++) {
				var date = Date.parse(this.stringToDate(nodes[i].dataset.date, this.getData('ltPropFormat')) /*nodes[i].dataset.date*/);
				if (date >= date2 && date <= date1) {
					if (nodes[i].classList.contains("lyteCalDisabled")) {
						this.checkForBeforeAndAfter(nodes, i, date2, date1);
					}
					else {
						if (date == date2) {
							target.addClass('lyteDateRPTempFirstDateSelected');
						}
						else if (date == date1) {
							initNode.addClass('lyteDateRPTempLastDateSelected');
						}
						else {
							if (!nodes[i].classList.contains("lyteDateRPTempSelected")) {
								nodes[i].classList.add("lyteDateRPTempSelected");
							}
						}
						this.checkForMonthEndAndStart(nodes, i, targetDate, this.getData('selectedDate1'));
					}
				}
				else {
					if (nodes[i].classList.contains("lyteDateRPTempSelected") || nodes[i].classList.contains("lyteCalSel")) {
						nodes[i].classList.remove("lyteDateRPTempSelected", "lyteCalSel");
					}
				}
			}
		}
		else {
			this.checkAndRemoveAllSelectedClasses();
			this.setData('selectedDate1', targetDate)
			target.addClass('lyteDateRPTempFirstDateSelected', 'lyteDateRPTempLastDateSelected');
			this.checkForMonthEndAndStart(nodes, Array.from(nodes).indexOf( target.get( 0 ) ), targetDate, this.getData('selectedDate1'));
		}
		this.setData("tempDate", targetDate);

	},
	checkAndMarkDisabledDates: function () {
		var nodes = this.$node.querySelectorAll('.lyteCalCdate:not(.lyteCalDiffMonth)');
		if (nodes.length == 0) {
			return
		}
		var date;
		for (var j = 0; j < nodes.length; j++) {
			date = nodes[j].dataset.date;
			if (this.checkForDisabledDates(date)) {
				nodes[j].classList.add("lyteCalDisabled");
			}
		}
	},
	checkForDisabledDates: function (date) {
		var disabledDates = this.getData('ltPropDisabledDates');
		for (var i = 0; i < disabledDates.length; i++) {
			if (new RegExp(disabledDates[i]).test(date)) {
				return true;
			}
		}
		return false;
	},
	checkForBeforeAndAfter: function (nodes, pos, startDate, endDate) {
		if (pos > 0 && pos < nodes.length - 1) {
			var date1 = Date.parse(this.stringToDate(nodes[pos - 1].dataset.date, this.getData('ltPropFormat')) /*nodes[pos-1].dataset.date*/);
			var date2 = Date.parse(this.stringToDate(nodes[pos + 1].dataset.date, this.getData('ltPropFormat')) /*nodes[pos+1].dataset.date*/);
			if (date1 >= startDate && date1 <= endDate) {
				nodes[pos - 1].classList.add('lyteDateRPInterimEndDate');
			}
			if (date2 >= startDate && date2 <= endDate) {
				nodes[pos + 1].classList.add('lyteDateRPInterimStartDate');
			}
		}
	},
	checkAndRemoveAllSelectedClasses: function () {
		var nodes = Array.from(this.$node.querySelectorAll(".lyteDateRPFirstDateSelected"));
		Lyte.arrayUtils(nodes, "push", (Array.from(this.$node.querySelectorAll(".lyteDateRPLastDateSelected"))));
		Lyte.arrayUtils(nodes, "push", (Array.from(this.$node.querySelectorAll(".lyteDateRPTempLastDateSelected"))));
		Lyte.arrayUtils(nodes, "push", (Array.from(this.$node.querySelectorAll(".lyteDateRPTempFirstDateSelected"))));
		Lyte.arrayUtils(nodes, "push", (Array.from(this.$node.querySelectorAll(".lyteDateRPTempSelected"))));
		Lyte.arrayUtils(nodes, "push", (Array.from(this.$node.querySelectorAll(".lyteCalSel"))));
		// Lyte.arrayUtils(nodes, "push", (Array.from(this.$node.querySelectorAll(".lyteCalToday"))));
		for (var i = 0; i < nodes.length; i++) {
			nodes[i].classList.remove("lyteDateRPFirstDateSelected", "lyteDateRPTempSelected", "lyteDateRPLastDateSelected", "lyteDateRPTempFirstDateSelected", "lyteDateRPTempLastDateSelected", "lyteCalSel"/*, "lyteCalToday"*/);
		}
		this.setData("selectedDate1", "");
		this.setData("selectedDate2", "");
	},
	checkForMonthEndAndStart: function (nodes, pos, startDate, endDate) {
		// var allNodes = this.$node.getElementsByClassName( 'lyteCalCdate' );
		// var lastNode = allNodes[allNodes.length - 1];

		var __curNode = nodes[ pos ],
		format = this.data.ltPropFormat,
		is_first = this.isFirstDayOfTheMonth( __curNode ),
		is_last = this.isLastDayOfTheMonth( __curNode ),
		cur_date,
		start_date,
		end_date,
		allow,
		classList = __curNode.classList,
		class_name = 'lyteDateRPTempSelected';

		if( is_first || is_last ){
			cur_date = Date.parse( this.stringToDate( __curNode.dataset.date, format ) );
			start_date = Date.parse( this.stringToDate( startDate, format ) );
			end_date = Date.parse( this.stringToDate( endDate, format ) );

			allow = cur_date >= start_date && cur_date <= end_date;
		}

		if( is_first && allow ){
			classList.remove( class_name );
			classList.add( 'lyteDateRPMonthStartDate' );
		} else if( is_last && allow ){
			classList.remove( class_name );
			classList.add( 'lyteDateRPMonthEndDate' );
		}
	},
	isFirstDayOfTheMonth: function (node) {
		return node.innerText.trim() === "1";
	},
	isLastDayOfTheMonth: function (node) {
		var calendar = node.closest('lyte-calendar');
		var viewDate = calendar.getData('viewDate');
		var month_31 = [0, 2, 4, 6, 7, 9, 11];
		var month_30 = [3, 5, 8, 10];
		if (month_31.indexOf(viewDate.getMonth()) != -1) {
			return node.innerText.trim() === "31";
		}
		else if (month_30.indexOf(viewDate.getMonth()) != -1) {
			return node.innerText.trim() === "30";
		}
		else {
			var year = viewDate.getFullYear();
			if (this.isLeapYear(year)) {
				return node.innerText.trim() === "29";
			}
			else {
				return node.innerText.trim() === "28";
			}
		}
	},
	isLeapYear: function (year) {
		return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
	},
	removeMonthEndAndStart: function () {
		var nodes = Array.from(this.$node.querySelectorAll('.lyteDateRPMonthStartDate'));
		Lyte.arrayUtils(nodes, "push", (Array.from(this.$node.querySelectorAll(".lyteDateRPMonthEndDate"))));
		for (var i = 0; i < nodes.length; i++) {
			nodes[i].classList.remove("lyteDateRPMonthStartDate", "lyteDateRPMonthEndDate");
		}
	},
	executeSelected: function (event) {

		var contains_method = this.getMethods( 'onDateSelected' );

		// if (this.getMethods('onDateSelected')) {
			var date1 = Date.parse(this.stringToDate(this.getData('selectedDate1'), this.getData('ltPropFormat')) /*this.getData('selectedDate1')*/);
			var date2 = Date.parse(this.stringToDate(this.getData('selectedDate2'), this.getData('ltPropFormat')) /*this.getData('selectedDate2')*/);
			if (date1 <= date2) {
				if (this.getData('ltPropSelectionType') == "continuous") {
					this.setData('internallyChanged', true);
					this.setData('ltPropStartDate', this.getData('selectedDate1'));
					this.setData('internallyChanged', true);
					this.setData('ltPropEndDate', this.getData('selectedDate2'));
				}
				if( contains_method ){
					this.executeMethod('onDateSelected', event, this.getData('selectedDate1'), this.getData('selectedDate2'), this);
				}
			}
			else {
				if (this.getData('ltPropSelectionType') == "continuous") {
					this.setData('internallyChanged', true);
					this.setData('ltPropStartDate', this.getData('selectedDate2'));
					this.setData('internallyChanged', true);
					this.setData('ltPropEndDate', this.getData('selectedDate1'));
				}
				if( contains_method ){
					this.executeMethod('onDateSelected', event, this.getData('selectedDate2'), this.getData('selectedDate1'), this);
				}
			}
		// }
	},
	checkForSelectedDates: function (startDate, endDate) {
		var nodes = this.$node.querySelectorAll('.lyteCalCdate:not(.lyteCalDiffMonth)');
		if (startDate && endDate) {
			var date1 = Date.parse(this.stringToDate(startDate, this.getData('ltPropFormat')) /*startDate*/);
			var date2 = Date.parse(this.stringToDate(endDate, this.getData('ltPropFormat')) /*endDate*/);
			for (var i = 0; i < nodes.length; i++) {
				var date = Date.parse(this.stringToDate(nodes[i].dataset.date, this.getData('ltPropFormat')) /*nodes[i].dataset.date*/);
				if (date >= date1 && date <= date2) {
					if (nodes[i].classList.contains('lyteCalDisabled')) {
						this.checkForBeforeAndAfter(nodes, i, date1, date2);
					}
					else {
						if (date == date1) {
							nodes[i].classList.add('lyteDateRPFirstDateSelected');
						}
						if (date == date2) {
							nodes[i].classList.add('lyteDateRPLastDateSelected');
						}
						if (date !== date1 && date !== date2) {
							nodes[i].classList.add('lyteDateRPTempSelected');
						}
						this.checkForMonthEndAndStart(nodes, i, startDate, endDate);
					}
				}
			}
		}
		else {
			if (this.getData('ltPropDisabledDates').length > 0) {
				this.checkAndMarkDisabledDates();
			}
			var date1 = this.getData("selectedDate1");
			var date2 = this.getData("selectedDate2");
			var date3 = this.getData("tempDate");
			if (date1 && date2) {
				// this.removeMonthEndAndStart();
				date1 = Date.parse(this.stringToDate(date1, this.getData('ltPropFormat')) /*date1*/);
				date2 = Date.parse(this.stringToDate(date2, this.getData('ltPropFormat')) /*date2*/);
				if (date1 < date2) {
					for (var i = 0; i < nodes.length; i++) {
						var date = Date.parse(this.stringToDate(nodes[i].dataset.date, this.getData('ltPropFormat')) /*nodes[i].dataset.date*/);
						if (date >= date1 && date <= date2) {
							if (nodes[i].classList.contains('lyteCalDisabled')) {
								this.checkForBeforeAndAfter(nodes, i, date1, date2);
							}
							else {
								if (date == date1) {
									nodes[i].classList.add('lyteDateRPFirstDateSelected');
								}
								if (date == date2) {
									nodes[i].classList.add('lyteDateRPLastDateSelected');
								}
								if (date !== date1 && date !== date2) {
									nodes[i].classList.add('lyteDateRPTempSelected');
								}
								this.checkForMonthEndAndStart(nodes, i, this.getData("selectedDate1"), this.getData("selectedDate2"));
							}
						}
					}
				}
				else {
					for (var i = 0; i < nodes.length; i++) {
						var date = Date.parse(this.stringToDate(nodes[i].dataset.date, this.getData('ltPropFormat')) /*nodes[i].dataset.date*/);
						if (date >= date2 && date <= date1) {
							if (nodes[i].classList.contains('lyteCalDisabled')) {
								this.checkForBeforeAndAfter(nodes, i, date2, date1);
							}
							else {
								if (date == date2) {
									nodes[i].classList.add('lyteDateRPFirstDateSelected');
								}
								if (date == date1) {
									nodes[i].classList.add('lyteDateRPLastDateSelected');
								}
								if (date !== date1 && date !== date2) {
									nodes[i].classList.add('lyteDateRPTempSelected');
								}
								this.checkForMonthEndAndStart(nodes, i, this.getData("selectedDate2"), this.getData("selectedDate1"));
							}
						}
					}
				}
			}
			else if (date1 && date3) {
				date1 = Date.parse(this.stringToDate(date1, this.getData('ltPropFormat')) /*date1*/);
				date3 = Date.parse(this.stringToDate(date3, this.getData('ltPropFormat')) /*date3*/);
				if (date1 < date3) {
					for (var i = 0; i < nodes.length; i++) {
						var date = Date.parse(this.stringToDate(nodes[i].dataset.date, this.getData('ltPropFormat')) /*nodes[i].dataset.date*/);
						if (nodes[i].classList.contains('lyteCalDisabled')) {
							this.checkForBeforeAndAfter(nodes, i, date1, date3);
						}
						else {
							if (date1 <= date3 && date == date1) {
								nodes[i].classList.add('lyteDateRPTempFirstDateSelected');
							}
							else if (date == date3) {
								nodes[i].classList.add('lyteDateRPTempLastDateSelected');
							}
							else if (date > date1 && date < date3) {
								nodes[i].classList.add('lyteDateRPTempSelected');
							}
						}
					}
				}
				else {
					for (var i = 0; i < nodes.length; i++) {
						var date = Date.parse(this.stringToDate(nodes[i].dataset.date, this.getData('ltPropFormat')) /*nodes[i].dataset.date*/);
						if (nodes[i].classList.contains('lyteCalDisabled')) {
							this.checkForBeforeAndAfter(nodes, i, date3, date1);
						}
						else {
							if (date3 <= date1 && date == date1) {
								nodes[i].classList.add('lyteDateRPTempFirstDateSelected');
							}
							else if (date == date1) {
								nodes[i].classList.add('lyteDateRPTempLastDateSelected');
							}
							else if (date >= date2 && date < date1) {
								nodes[i].classList.add('lyteDateRPTempSelected');
							}
						}
					}
				}
			}
		}
	},
	callOnNavigate : function(event,fromMonths,toMonths,comp,cal){

		if( this.data.dateSelected ){
			this.update_nodes();
		}

		this.setTodayClass();
		if(this.getMethods('onNavigation')){
			this.executeMethod('onNavigation',event,fromMonths,toMonths,this,cal);
		}
	},

	/** 
	 * get proper month from user defined value
	 * @param {String} mon - The current month
	 *
	 */

	getProperMonth: function (val) {
		var sm = {
			'jan': 1,
			'feb': 2,
			'mar': 3,
			'apr': 4,
			'may': 5,
			'jun': 6,
			'jul': 7,
			'aug': 8,
			'sep': 9,
			'oct': 10,
			'nov': 11,
			'dec': 12
		}, lg = {
			'january': 1,
			'february': 2,
			'march': 3,
			'april': 4,
			'may': 5,
			'june': 6,
			'july': 7,
			'august': 8,
			'september': 9,
			'october': 10,
			'november': 11,
			'december': 12
		}, ret

		val = val.toLowerCase();
		ret = sm[val] || lg[val];

		if (!ret && ret !== 0) {
			return parseFloat(val) - 1;
		}

		return ret - 1;
	},

	/**
	 * Convert the string to date object based on the format
	 * @param {String} cur - The current date of the user passed
	 * @param {String} format - The format of the dates
	 *
	 */

	stringToDate: function (cur, format) {

		try {
			var vals = cur.match(/([\da-z]+)/ig),
				format = format.toUpperCase(),
				sep = format.match(/([a-z]+)/ig),
				date = this.toDate(), i = 0, order = ['Y', 'M', 'D'];
			date.setDate(1);  //initialize the day to be 1 to avoid error for eg: 30 Feb if passed will generate 1 Mar as result.

			if (vals.length !== 3) {
				return 'Invalid Date';
			}

			while (i < sep.length) {
				var ind = this.getOrderIndex(sep, order[i]);
				if (i == 0) {
					date.setFullYear(vals[ind]);
				}
				else if (i == 1) {
					date.setMonth(this.getProperMonth(vals[ind]));
				}
				else if (i == 2) {
					date.setDate(vals[ind]);
				}

				if (date.toString() === 'Invalid Date') {
					return date.toString();
				}
				i++;
			}

			return date;
		}
		catch (e) {
			return 'Invalid Date';
		}


	},

	getOrderIndex: function (objArr, match) {
		for (var i = 0; i < objArr.length; i++) {
			if (objArr[i].charAt(0) === match) {
				return i;
			}
		}
		return -1;
	},

	/**
	 * The method is going to return the date as string based on the format
	 * @param {number} mm - month value
	 * @param {number} dd - day value
	 * @param {number} yy - year value
	 *
	 */
	constructDateString : function (mm,dd,yy) {
		var format = this.getData('ltPropFormat'),
			formatArr,
			date = '',
			sep;
		if ($L.moment) {
			var dateObj = new Date(mm + "/" + dd + "/" + yy);
			date = this.moment(dateObj).format(format.toUpperCase());
			return date;
		}
		if (format.indexOf('/') == -1) {
			if (!($L.moment)) {
				console.error("INCLUDE LYTE-MOMENT PLUGIN");
				return;
			}
			var dateObj = new Date(mm + "/" + dd + "/" + yy);
			date = this.moment(dateObj).format(format.toUpperCase());
			return date;
		}
		else {
			formatArr = format.split("/");
			sep = '/';
		}
		// if(format.indexOf('/') != -1){
		// 	formatArr = format.split("/"); 
		// 	sep = '/';
		// }
		if (formatArr.length != 3) {
			return "Invalid Format";
		}
		for (var i = 0; i < 3; i++) {
			if (formatArr[i].toUpperCase().charAt(0) === "M") {
				date += mm;
				if (i != 2) {
					date += sep;
				}
			}
			else if (formatArr[i].toUpperCase().charAt(0) === "D") {
				date += dd;
				if (i != 2) {
					date += sep;
				}
			}
			else if (formatArr[i].toUpperCase().charAt(0) === "Y") {
				date += yy;
				if (i != 2) {
					date += sep;
				}
			}
		}
		return date;
	},

	previous_action : function( opt, event ){
		var calendar = this.$node.querySelector('.dRPCalendar1');
		var fromMonths = {
			"date1": this.getData('monthNames')[this.getData('calViewDate1').getMonth()] + " " + this.getData('calViewDate1').getFullYear(),
			"date2": this.getData('monthNames')[this.getData('calViewDate2').getMonth()] + " " + this.getData('calViewDate2').getFullYear()
		};
		calendar.setData('selectDate', false);
		var dd = 1;
		var mm;
		var yy;
		if (opt == 'M') {
			mm = calendar.getData('viewDate').getMonth() - 1;
		}
		else {
			mm = calendar.getData('viewDate').getMonth();
		}
		if (opt == 'Y') {
			yy = calendar.getData('viewDate').getFullYear() - 1;
		}
		else {
			yy = calendar.getData('viewDate').getFullYear();
		}
		if (mm == -1) {
			mm = 11;
			yy -= 1;
		}
		if (yy < this.getData("ltPropStartYear")) {
			return;
		}
		this.setMonthAndYear(calendar, { dd: dd, mm: mm, yy: yy }, "cal1");
		if (mm < 11) {
			mm += 1;
		}
		else {
			mm = 0;
			yy += 1;
		}
		this.setMonthAndYear(this.$node.querySelector('.dRPCalendar2'), { dd: dd, mm: mm, yy: yy }, "cal2");
		this.checkForSelectedDates();
		var toMonths = {
			"date1": this.getData('monthNames')[this.getData('calViewDate1').getMonth()] + " " + this.getData('calViewDate1').getFullYear(),
			"date2": this.getData('monthNames')[this.getData('calViewDate2').getMonth()] + " " + this.getData('calViewDate2').getFullYear()
		};
		this.validateNavigation();
		this.callOnNavigate(event, fromMonths, toMonths, this);
	},

	next_action : function( opt, event ){
		var calendar = this.$node.querySelector('.dRPCalendar2');
		calendar.setData('selectDate', false);
		var fromMonths = {
			"date1": this.getData('monthNames')[this.getData('calViewDate1').getMonth()] + " " + this.getData('calViewDate1').getFullYear(),
			"date2": this.getData('monthNames')[this.getData('calViewDate2').getMonth()] + " " + this.getData('calViewDate2').getFullYear()
		};
		var dd = 1;
		var mm;
		var yy;
		if (opt == 'M') {
			mm = calendar.getData('viewDate').getMonth() + 1;
		}
		else {
			mm = calendar.getData('viewDate').getMonth();
		}
		if (opt == 'Y') {
			yy = calendar.getData('viewDate').getFullYear() + 1;
		}
		else {
			yy = calendar.getData('viewDate').getFullYear();
		}
		if (mm == 12) {
			mm = 0;
			yy += 1;
		}
		if (yy > this.getData('ltPropEndYear')) {
			return;
		}
		this.setMonthAndYear(calendar, { dd: dd, mm: mm, yy: yy }, "cal2");
		if (mm > 0) {
			mm -= 1;
		}
		else {
			mm = 11;
			yy -= 1;
		}
		this.$node.querySelector('.dRPCalendar1').setData('selectDate', false);
		this.setMonthAndYear(this.$node.querySelector('.dRPCalendar1'), { dd: dd, mm: mm, yy: yy }, "cal1");
		this.checkForSelectedDates();
		var toMonths = {
			"date1": this.getData('monthNames')[this.getData('calViewDate1').getMonth()] + " " + this.getData('calViewDate1').getFullYear(),
			"date2": this.getData('monthNames')[this.getData('calViewDate2').getMonth()] + " " + this.getData('calViewDate2').getFullYear()
		};
		this.validateNavigation();
		this.callOnNavigate(event, fromMonths, toMonths, this);
	},

	separate_previous : function( opt, cal, event ){
		var calendar, fromMonths, toMonths;
		if (cal == 'cal1') {
			calendar = this.$node.querySelector('.dRPCalendar1');
			fromMonths = this.getData('monthNames1')[this.getData('calViewDate1').getMonth()] + " " + this.getData('calViewDate1').getFullYear();
		}
		else if (cal == 'cal2') {
			calendar = this.$node.querySelector('.dRPCalendar2');
			fromMonths = this.getData('monthNames2')[this.getData('calViewDate2').getMonth()] + " " + this.getData('calViewDate2').getFullYear();
		}
		if (calendar) {
			calendar.setData('selectDate', false);
			var dd = 1;
			var mm;
			var yy;
			if (opt == 'M') {
				mm = calendar.getData('viewDate').getMonth() - 1;
			}
			else {
				mm = calendar.getData('viewDate').getMonth();
			}
			if (opt == 'Y') {
				yy = calendar.getData('viewDate').getFullYear() - 1;
			}
			else {
				yy = calendar.getData('viewDate').getFullYear();
			}
			if (mm == -1) {
				mm = 11;
				yy -= 1;
			}
			if (yy < this.getData("ltPropStartYear")) {
				return;
			}
			this.setMonthAndYear(calendar, { dd: dd, mm: mm, yy: yy }, cal);
			if (cal == 'cal1') {
				if (this.getData('ltPropStartDate')) {
					this.checkforStartDateAndEndDate(calendar, this.getData('ltPropStartDate'), "start");
				}
				toMonths = this.getData('monthNames1')[this.getData('calViewDate1').getMonth()] + " " + this.getData('calViewDate1').getFullYear();
			}
			else if (cal == 'cal2') {
				if (this.getData('ltPropEndDate')) {
					this.checkforStartDateAndEndDate(calendar, this.getData('ltPropEndDate'), "end");
				}
				toMonths = this.getData('monthNames2')[this.getData('calViewDate2').getMonth()] + " " + this.getData('calViewDate2').getFullYear();
			}
			this.validateNavigationAndDropdown();
			this.callOnNavigate(event, fromMonths, toMonths, this, cal == "cal1" ? "from Calendar" : "to Calendar");
		}
	},

	separate_next : function( opt, cal, event ){
		var calendar, fromMonths, toMonths;
		if (cal == 'cal1') {
			calendar = this.$node.querySelector('.dRPCalendar1');
			fromMonths = this.getData('monthNames1')[this.getData('calViewDate1').getMonth()] + " " + this.getData('calViewDate1').getFullYear();
		}
		else if (cal == 'cal2') {
			calendar = this.$node.querySelector('.dRPCalendar2');
			fromMonths = this.getData('monthNames2')[this.getData('calViewDate2').getMonth()] + " " + this.getData('calViewDate2').getFullYear();
		}
		if (calendar) {
			calendar.setData('selectDate', false);
			var dd = 1;
			var mm;
			var yy;
			if (opt == 'M') {
				mm = calendar.getData('viewDate').getMonth() + 1;
			}
			else {
				mm = calendar.getData('viewDate').getMonth();
			}
			if (opt == 'Y') {
				yy = calendar.getData('viewDate').getFullYear() + 1;
			}
			else {
				yy = calendar.getData('viewDate').getFullYear();
			}
			if (mm == 12) {
				mm = 0;
				yy += 1;
			}
			if (yy > this.getData('ltPropEndYear')) {
				return;
			}
			this.setMonthAndYear(calendar, { dd: dd, mm: mm, yy: yy }, cal);
			if (cal == 'cal1') {
				if (this.getData('ltPropStartDate')) {
					this.checkforStartDateAndEndDate(calendar, this.getData('ltPropStartDate'), "start");
				}
				toMonths = this.getData('monthNames1')[this.getData('calViewDate1').getMonth()] + " " + this.getData('calViewDate1').getFullYear();
			}
			else if (cal == 'cal2') {
				if (this.getData('ltPropEndDate')) {
					this.checkforStartDateAndEndDate(calendar, this.getData('ltPropEndDate'), "end");
				}
				toMonths = this.getData('monthNames2')[this.getData('calViewDate2').getMonth()] + " " + this.getData('calViewDate2').getFullYear();
			}
			this.validateNavigationAndDropdown();
			this.callOnNavigate(event, fromMonths, toMonths, this, cal == "cal1" ? "from Calendar" : "to Calendar");
		}
	},

	separate_mousedown : function( event ){
		var target = event.target;
		while (target.parentElement) {
			if (target.classList.contains('lyteCalCdate')) {
				break;
			}
			target = target.parentElement;
		}
		if (target.tagName === "HTML") {
			return;
		}
		if (target.classList.contains("lyteCalCdate")) {
			if (!target.classList.contains("lyteCalDiffMonth")) {
				var calendar = target.closest('lyte-calendar');
				if (calendar.classList.contains('dRPCalendar1')) {
					this.setData('selectedDate1', target.dataset.date);
					this.setData('ltPropStartDate', target.dataset.date);
					var date1 = this.getData('calViewDate1');
					var date2 = this.getData('calViewDate2');
					if ((date1.getMonth() > date2.getMonth() && date1.getFullYear() == date2.getFullYear()) || (date1.getFullYear() > date2.getFullYear())) {
						var cal2 = this.$node.querySelector('.dRPCalendar2');
						var mm = this.getData('calViewDate1').getMonth(); //January is 0!
						var yy = this.getData('calViewDate1').getFullYear();
						this.setMonthAndYear(cal2, { dd: 1, mm: mm, yy: yy }, "cal2");
						if (this.getData('ltPropEndDate')) {
							this.checkforStartDateAndEndDate(cal2, this.getData('ltPropEndDate'), "end");
						}
					}
				}
				else if (calendar.classList.contains('dRPCalendar2')) {
					this.setData('selectedDate2', target.dataset.date);
					this.setData('ltPropEndDate', target.dataset.date);
					var date1 = this.getData('calViewDate1');
					var date2 = this.getData('calViewDate2');
					if ((date2.getMonth() < date1.getMonth() && date2.getFullYear() == date1.getFullYear()) || (date2.getFullYear() < date1.getFullYear())) {
						var cal1 = this.$node.querySelector('.dRPCalendar1');
						var mm = this.getData('calViewDate2').getMonth(); //January is 0!
						var yy = this.getData('calViewDate2').getFullYear();
						this.setMonthAndYear(cal1, { dd: 1, mm: mm, yy: yy }, "cal1");
						if (this.getData('ltPropStartDate')) {
							this.checkforStartDateAndEndDate(cal1, this.getData('ltPropStartDate'), "start");
						}
					}
				}
				this.validateNavigationAndDropdown();
				if (this.getData('dateNode1') && this.getData('dateNode2')) {
					this.executeSelected(event);
				}
			}
		}
	},

	common_fn : function( ns, opt, cal, evt, rgx ){
		
		if( $L( evt.target.parentNode ).hasClass( 'lyteCalDiffMonth' ) ){
			return;
		}

		var keycode = evt.which || evt.keyCode;

		if( rgx.test( keycode ) ){
			if( cal ){
				this[ 'separate_' + ns ]( opt, cal, evt );
			} else {
				this[ ns + '_action' ]( opt, evt );
			}
			evt.preventDefault();
		}
	},

	actions: {

		prevKey : function( opt, evt, cal ){
			this.common_fn( 'previous', opt, cal, evt, /^3(7|2)|13$/ );
			return false;
		},

		nextKey : function( opt, evt, cal ){
			this.common_fn( 'next', opt, cal, evt, /^3(9|2)|13$/ );
			return false;
		},

		blurKey : function( evt ){
			evt.target.tabIndex = -1;
		},

		previous: function ( opt, event, ns ) {
			this[ ( ns || 'previous' ) + '_action' ]( opt, event );
		},
		mouseDown: function (event) {
			var target = event.target;
			while (target.parentElement) {
				if (target.classList.contains('lyteCalCdate')) {
					break;
				}
				target = target.parentElement;
			}
			if (target.tagName === "HTML") {
				return;
			}
			var clickCount = this.getData('clickCount');
		 	clickCount++;
		 	this.setData('clickCount',clickCount);
		 	var self = this;
		    if (clickCount === 1) {
		        this.singleClickTimer = setTimeout(function() {
		            clickCount = 0;
		            self.setData('clickCount',clickCount);
		            delete this.singleClickTimer;
		        }, 400);
		    } else if (clickCount === 2) {
		        clearTimeout(this.singleClickTimer);
		        if(this.singleClickTimer){
		        	delete this.singleClickTimer;
		        }
		        clickCount = 0;
		        this.setData('clickCount',clickCount);
		        // var target = event.target;
		        if(target.classList.contains("lyteCalCdate")){
					if(!target.classList.contains("lyteCalDiffMonth")){
						this.checkAndRemoveAllSelectedClasses();
						this.removeMonthEndAndStart();
						this.setData('dateNode1', target);
						this.setData('dateNode2', target);
						target.classList.add('lyteDateRPFirstDateSelected', 'lyteDateRPLastDateSelected');
						var nodes = this.$node.querySelectorAll('.lyteCalCdate:not(.lyteCalDiffMonth)');
						this.checkForMonthEndAndStart(nodes, Array.from(nodes).indexOf(target), target.dataset.date, target.dataset.date);
						this.setData('selectedDate1', target.dataset.date);
						this.setData('selectedDate2', target.dataset.date);
						this.setData('dateSelected', false);
						this.executeSelected(event);
					}
				}
				return;
			}

			if (target.classList.contains("lyteCalCdate")) {
				if (!target.classList.contains("lyteCalDiffMonth")) {
					if (!this.getData('dateSelected')) {
						// if(this.getMethods('firstSelection')){
						// 	this.executeMethod('firstSelection',event,this);
						// }
						this.checkAndRemoveAllSelectedClasses();
						this.removeMonthEndAndStart();
						this.setData('dateNode1', target);
						target.classList.add("lyteDateRPTempFirstDateSelected");
						target.classList.add("lyteDateRPTempLastDateSelected");
						var nodes = this.$node.querySelectorAll('.lyteCalCdate:not(.lyteCalDiffMonth)');
						this.checkForMonthEndAndStart(nodes, Array.from(nodes).indexOf(target), target.dataset.date, target.dataset.date);
						this.setData('selectedDate1', target.dataset.date);
						this.setData('dateSelected', true);
					}
					else {
						// if(this.getMethods('secondSelection')){
						// 	this.executeMethod('secondSelection',event,this);
						// }
						if (target.classList.contains('lyteDateRPTempSelected')) {
							target.classList.remove('lyteDateRPTempSelected');
						}
						var date1 = Date.parse(this.stringToDate(this.getData('selectedDate1'), this.getData('ltPropFormat')) /*this.getData('selectedDate1')*/);
						var date2 = Date.parse(this.stringToDate(target.dataset.date, this.getData('ltPropFormat')) /*target.dataset.date*/);
						if (date1 <= date2) {

							$L( this.getData( 'dateNode1' ) ).removeClass( 'lyteDateRPTempFirstDateSelected' ).addClass( 'lyteDateRPFirstDateSelected' );
							$L( this.getData( 'dateNode2' ) ).removeClass( 'lyteDateRPTempLastDateSelected' ).addClass( 'lyteDateRPLastDateSelected' );

							// this.getData('dateNode1').classList.remove('lyteDateRPTempFirstDateSelected');
							// this.getData('dateNode1').classList.add('lyteDateRPFirstDateSelected');
							// this.getData('dateNode2').classList.remove('lyteDateRPTempLastDateSelected');
							// this.getData('dateNode2').classList.add('lyteDateRPLastDateSelected');
						}
						else {

							$L( this.getData( 'dateNode1' ) ).removeClass( 'lyteDateRPTempLastDateSelected' ).addClass( 'lyteDateRPLastDateSelected' );
							$L( this.getData( 'dateNode2' ) ).removeClass( 'lyteDateRPTempFirstDateSelected' ).addClass( 'lyteDateRPFirstDateSelected' );
							
							// this.getData('dateNode1').classList.remove('lyteDateRPTempLastDateSelected');
							// this.getData('dateNode1').classList.add('lyteDateRPLastDateSelected');
							// this.getData('dateNode2').classList.remove('lyteDateRPTempFirstDateSelected');
							// this.getData('dateNode2').classList.add('lyteDateRPFirstDateSelected');
						}
						this.setData('selectedDate2', target.dataset.date);
						this.setData('tempDate', "");
						this.setData('dateSelected', false);
						this.executeSelected(event);
					}
				}
			}
		},
		mouseOver: function (event) {
			if (this.getData("dateSelected")) {

				if( this._prev_mouse ){
					return;
				}

				var target = event.target;
				while (target.parentElement) {
					if (target.classList.contains('lyteCalCdate')) {
						break;
					}
					target = target.parentElement;
				}
				if (target.tagName === "HTML") {
					return;
				}
				if (target.classList.contains("lyteCalCdate")) {
					if (!target.classList.contains("lyteCalDiffMonth")) {
						this.setData('dateNode2', target);
						this.selectDates(target.dataset.date);
					}
				}
			}
		},
		separateMouseDown: function (event) {
			this.separate_mousedown( event );
		},
		separatePrevious: function (opt, cal, event, ns ) {
			this[ 'separate_' + ( ns || 'previous' ) ]( opt, cal, event );
		},

		keydown : function( evt ){

			var drops = Array.from( this.$node.getElementsByTagName( 'lyte-dropdown' ) ).filter( function( item ){
				return item.ltProp( 'isOpen' );
			});


			if( drops.length ){
				return;
			}

			this.keydown( evt );
		}
	},

	start_obs : function( arg ){	
		var cb = 'onStartDateChanged',
		__data = this.data,
		__newValue = arg.newValue,
		ns = 'activeDate';

		if( __data.ltPropMaxDiff != void 0 ){
			this.setup_maxdiff( arg );
		}

		if( __newValue && __data.ltPropNavigation ){
			this.active_obs( __newValue, __data[ ns ] );
			this.setData( ns, __newValue );
		}

		if( this.getMethods( cb ) ){
		   /**
	        * @method onStartDateChanged
	        * @version 3.29.0
	        */
			this.executeMethod( cb, arg, this );
		}

	}.observes( 'selectedDate1' ),

	setup_maxdiff : function( arg ){
		var value = arg.newValue,
		data = this.data,
		format = data.ltPropFormat,
		maxDiff = data.ltPropMaxDiff;

		if( !value || data.ltPropMinDate == value ){
			return;
		}

		this.__ignoremin = true;

		var calendars = Array.from( this.$node.getElementsByTagName( 'lyte-calendar' ) );

		calendars.forEach( function( item ){
			item.component.__ignoremin = true;
		});

		this.setData({
			ltPropStartDate : "",
			ltPropEndDate : "",
			ltPropMinDate : value,
			ltPropMaxDate : this.get_crct_value( this.moment( value, format ).add( maxDiff, 'day' ) ).format( format )
		});

		var fn = function( ns ){
			 var __node = data[ ns ];
			 if( __node ){
			 	data[ ns ] = $L( this.$node.querySelector( 'div[data-date="' + __node.getAttribute( 'data-date' ) + '"]' ) ).removeClass( 'lyteCalToday' ).get( 0 ) || __node;
			 }
		}.bind( this );

		fn( 'dateNode1' );
		fn( 'dateNode2' );

		calendars.forEach( function( item ){
			delete item.component.__ignoremin;
		});

		delete this.__ignoremin;
	},

	get_crct_value : function( __max ){
		var data = this.data,
		max_date = data.ltPropMaxDate;

		if( max_date ){
			var max_moment = this.moment( max_date, data.ltPropFormat );
			if( __max.fromNow( max_moment ).past ){
				return max_moment;
			}
		}

		return __max;
	},

	methods: {
		addDropdownClass: function (ev, comp) {
			var body = comp.childComp;
			body.classList.add('lyteCalendarDropdown');
		},
		editArrowPosition: function (ev, comp) {
			var arrow = comp.childComp.querySelector('.lyteArrow');
			if (_lyteUiUtils.getRTL()) {
				arrow.style.right = "20%";
				arrow.style.left = "auto";
			} else {
				arrow.style.left = "20%";
				arrow.style.right = "auto";
			}
		},
		optionSelected: function (cal, opt, event, selected, comp) {

			var __data = this.data,
			month_names = __data.monthNames,
			view_date1 = __data.calViewDate1,
			view_date2 = __data.calViewDate2,
			from_month = {
				date1 : month_names[ view_date1.getMonth() ] + " " + view_date1.getFullYear(),
				date2 : month_names[ view_date2.getMonth() ] + " " + view_date2.getFullYear()
			};

			if (this.getData('ltPropSelectionType') == "separate") {
				if (cal == "cal1") {
					var calendar = this.$node.querySelector('.dRPCalendar1');
					calendar.setData('selectDate', false);
					var dd = 1;
					var mm;
					var yy;
					if (opt == 'M') {
						mm = this.getData('monthNames').indexOf(selected);
					}
					else {
						mm = calendar.getData('viewDate').getMonth();
					}
					if (opt == 'Y') {
						yy = parseInt(selected);
					}
					else {
						yy = calendar.getData('viewDate').getFullYear();
					}
					if (this.getData('ltPropEndDate')) {
						var date = this.stringToDate(this.getData('ltPropEndDate'), this.getData('ltPropFormat'));
						if (mm > date.getMonth() && yy >= date.getFullYear()) {
							if (opt == 'M') {
								calendar.querySelector('.monthDD').ltProp("selected", this.getData("monthNames")[calendar.getData('viewDate').getMonth()]);
							}
							if (opt == 'Y') {
								calendar.querySelector('.yearDD').ltProp("selected", "" + calendar.getData('viewDate').getFullYear());
							}
							return;
						}
					}
					this.setMonthAndYear(calendar, { dd: dd, mm: mm, yy: yy }, "cal1");
					if (this.getData('ltPropStartDate')) {
						this.checkforStartDateAndEndDate(calendar, this.getData('ltPropStartDate'), "start");
					}
				}
				else if (cal == "cal2") {
					var calendar = this.$node.querySelector('.dRPCalendar2');
					calendar.setData('selectDate', false);
					var dd = 1;
					var mm;
					var yy;
					if (opt == 'M') {
						mm = this.getData('monthNames').indexOf(selected);
					}
					else {
						mm = calendar.getData('viewDate').getMonth();
					}
					if (opt == 'Y') {
						yy = selected;
					}
					else {
						yy = calendar.getData('viewDate').getFullYear();
					}
					if (this.getData('ltPropStartDate')) {
						var date = this.stringToDate(this.getData('ltPropStartDate'), this.getData('ltPropFormat'));
						if (mm < date.getMonth() && yy <= date.getFullYear()) {
							if (opt == 'M') {
								calendar.querySelector('.monthDD').ltProp("selected", this.getData("monthNames")[calendar.getData('viewDate').getMonth()]);
							}
							if (opt == 'Y') {
								calendar.querySelector('.yearDD').ltProp("selected", "" + calendar.getData('viewDate').getFullYear());
							}
							return;
						}
					}
					this.setMonthAndYear(calendar, { dd: dd, mm: mm, yy: yy }, "cal2");
					if (this.getData('ltPropEndDate')) {
						this.checkforStartDateAndEndDate(calendar, this.getData('ltPropEndDate'), "end");
					}
				}
				this.validateNavigationAndDropdown();
			}
			// if(this.getMethods('ddOptionSelected')){
			// 	this.executeMethod('ddOptionSelected',event,selected,comp,cal,opt,this);
			// }
			if (this.getData('ltPropSelectionType') == "continuous") {
				if (cal == "cal1") {
					var calendar = this.$node.querySelector('.dRPCalendar1');
					calendar.setData('selectDate', false);
					var dd = 1;
					var mm;
					var yy;
					if (opt == 'M') {
						mm = this.getData('monthNames').indexOf(selected);
					}
					else {
						mm = calendar.getData('viewDate').getMonth();
					}
					if (opt == 'Y') {
						yy = parseInt(selected);
					}
					else {
						yy = calendar.getData('viewDate').getFullYear();
					}
					if (mm > 10 && yy == this.getData('ltPropEndYear')) {
						if (selected == _lyteUiUtils.i18n('Dec') || selected == _lyteUiUtils.i18n('December')) {
							calendar.querySelector('.monthDD').ltProp("selected", this.getData("monthNames")[calendar.getData('viewDate').getMonth()]);
						}
						else {
							calendar.querySelector('.yearDD').ltProp("selected", "" + calendar.getData('viewDate').getFullYear());
						}
						// console.log("returning "+mm+" "+yy);
						return;
					}
					this.setMonthAndYear(calendar, { dd: dd, mm: mm, yy: yy }, "cal1");
					if (mm < 11) {
						mm += 1;
					}
					else {
						mm = 0;
						yy += 1;
					}
					this.setMonthAndYear(this.$node.querySelector('.dRPCalendar2'), { dd: dd, mm: mm, yy: yy }, "cal2");
				}
				else if (cal == "cal2") {
					var calendar = this.$node.querySelector('.dRPCalendar2');
					calendar.setData('selectDate', false);
					var dd = 1;
					var mm;
					var yy;
					if (opt == 'M') {
						mm = this.getData('monthNames').indexOf(selected);
					}
					else {
						mm = calendar.getData('viewDate').getMonth();
					}
					if (opt == 'Y') {
						yy = selected;
					}
					else {
						yy = calendar.getData('viewDate').getFullYear();
					}
					if (mm < 1 && yy == this.getData('ltPropStartYear')) {
						if (selected == _lyteUiUtils.i18n('Jan') || selected == _lyteUiUtils.i18n('January')) {
							calendar.querySelector('.monthDD').ltProp("selected", this.getData("monthNames")[calendar.getData('viewDate').getMonth()]);
						}
						else {
							calendar.querySelector('.yearDD').ltProp("selected", "" + calendar.getData('viewDate').getFullYear());
						}
						// console.log("returning "+mm+" "+yy);
						return;
					}
					this.setMonthAndYear(calendar, { dd: dd, mm: mm, yy: yy }, "cal2");
					if (mm > 0) {
						mm -= 1;
					}
					else {
						mm = 11;
						yy -= 1;
					}
					this.$node.querySelector('.dRPCalendar1').setData('selectDate', false);
					this.setMonthAndYear(this.$node.querySelector('.dRPCalendar1'), { dd: dd, mm: mm, yy: yy }, "cal1");
				}
				this.checkForSelectedDates();
				this.validateNavigation();
			}
			// this.setTodayClass();

			view_date1 = __data.calViewDate1;
			view_date2 = __data.calViewDate2;
			to_month = {
				date1 : month_names[ view_date1.getMonth() ] + " " + view_date1.getFullYear(),
				date2 : month_names[ view_date2.getMonth() ] + " " + view_date2.getFullYear()
			};

			this.callOnNavigate( event, from_month, to_month, this, cal == "cal1" ? "from Calendar" : "to Calendar" );
		},
		viewDateChange : function(cal,comp,viewDate){
			this.setCalendarHeader(cal,comp,viewDate);
		}
	},

	nav_obs : function( arg ){
		if( arg.newValue ){
			if( this.data.ltPropNavigation ){
				this.set_navigationNode();
			}
			this.setData( arg.item, false );
		}
	}.observes( 'ltPropActivateNavigation' ),

	set_navigationNode : function( to_check ){
		var __data = this.data,
		date1 = __data.calViewDate1,
		date2 = __data.calViewDate2,
		tempDate = __data.tempDate,
		start_date = to_check || __data.selectedDate1,
		end_date = to_check || __data.selectedDate2,
		format = __data.ltPropFormat,
		final,
		is_separate = __data.ltPropSelectionType == "separate",
		__selected = __data.selected,
		is_selected_1 = __selected == "1",
		is_selected_2 = !is_selected_1,
		fn = function( end_date, d2, cond ){

			if( is_separate && !cond ){
				return;
			}

			var end_obj = this.moment( end_date, format ).getDObj();
			if( end_obj.getMonth() == d2.getMonth() && end_obj.getFullYear() == d2.getFullYear() ){
				return end_obj;
			}
		}.bind( this );

		if( !to_check ){
			if( tempDate ){
				final = fn( tempDate, date1, is_selected_1 ) || fn( tempDate, date2, is_selected_2 );
			}
		}


		if( !final && end_date ){
			final = fn( end_date, date2, is_selected_2 ) || fn( end_date, date1, is_selected_1 );
		} 

		if( !final && start_date ){
			final = fn( start_date, date1, is_selected_1 ) || fn( start_date, date2, is_selected_2 );
		} 

		if( !final && !to_check ){
			var __today = $L.moment().format( format );
			final = fn( __today, date1, is_selected_1 ) || fn( __today, date2, is_selected_2 );
		}

		if( to_check ){
			return final;
		}

		if( !final ){
			final = is_separate ? ( is_selected_1 ? date1 : date2 ) : date1;
		}

		var value_to_be = $L.moment( final ).format( format );

		this.active_obs( value_to_be, __data.activeDate );		
		this.setData( 'activeDate', value_to_be );
	},

	active_obs : function( __new, __old, return_dom ){

		var cls_name = 'lyteCalNavCell',
		tabindex = 'tabindex',
		query = '.lyteCalCdate[data-date="',
		$node = this.$node,
		__index = 0,
		__data = this.data;

		if( __data.ltPropSelectionType == "separate" ){
			query = '.lyteDateRangePickerCol' + __data.selected + ' ' + query;
		}

		__old && $L( query + __old + '"]', $node ).eq( __index ).removeClass( cls_name ).attr( tabindex, '-1' );
		
		var dom = $L( query + __new + '"]', $node ).eq( __index );

		if( return_dom ){
			return dom.get( 0 );
		}

		dom = dom.addClass( cls_name ).attr( tabindex, '1' ).get( 0 );

		if( dom ){
			dom.focus();
		}

	},

	keydown : function( evt ){
		var __target = evt.target,
		__data = this.data,
		type = __data.ltPropSelectionType,
		active = __data.activeDate,
		format = __data.ltPropFormat,
		__prevent,
		keycode = evt.which || evt.keyCode,
		call_selection,
		start_date = __data.selectedDate1,
		end_date = __data.selectedDate2,
		__selected = __data.selected,
		__modified,
		__prevent_key = __data.preventKeydown;

		if( !active ){
			return this.set_navigationNode();
		} 
		
		var moment = this.moment( active, format ),
		is_continuous = type == "continuous",
		is_ctrl = evt.ctrlKey;

		switch( keycode ){
			case 37 : {
				__prevent = -1;
			}
			break;
			case 38 : {
				__prevent = __prevent_key ? 0 : -7;
			}
			break;
			case 39 : {
				__prevent = 1;
			}
			break;
			case 40 : {
				__prevent = __prevent_key ? 0 : 7;
			}
			break;
			case 13 : {
				if( !$L( __target ).hasClass( 'lyteCalDisabled' ) ){
					this.key_enter( evt );
					call_selection = true;
				}
				evt.preventDefault();
			}
			break;
		}

		if( __prevent ){

			if( is_ctrl ){
			 	this.setData( 'selected', __prevent > 0 ? '2' : '1' );
			 	this.set_navigationNode();
			} else {
				moment.add( __prevent, 'day' );
				var new_format = moment.format( format ),
				is_exist = this.set_navigationNode( new_format ),
				fn = function(){
					this.active_obs( new_format, active );
					this.setData( 'activeDate', new_format );

					if( start_date && !end_date ){
						this.setData({
						   tempDate : new_format,
						   dateNode2 : this.active_obs( new_format, "", true )
						});
						call_selection = true;
					}

				}.bind( this ),
				check_min_max = function(){
					var min_date = __data.ltPropMinDate,
					max_date = __data.ltPropMaxDate,
					min_moment = this.moment( min_date, format ),
					max_moment = this.moment( max_date, format );

					if( min_date && min_moment.fromNow( moment ).past ){
						__modified = new_format = min_date;
						moment = min_moment;
					}

					if( max_date && moment.fromNow( max_moment ).past ){
						__modified = new_format = max_date;
						moment = max_moment;
					}

					if( !is_continuous ){
						if( __selected == "1" ){
							if( end_date && __prevent > 0 && moment.fromNow( this.moment( end_date, format ) ).past ){
								__modified = new_format = end_date;
							}
						} else {
							if( start_date && __prevent < 0 && this.moment( start_date, format ).fromNow( moment ).past ){
								__modified = new_format = start_date;
							}
						}
					}

					if( __modified ){
						is_exist = this.set_navigationNode( new_format );
					}

					return true;
				}

				if( check_min_max.call( this ) ){
					if( is_exist ){
						fn();
					} else {
						var __name = 'next';
						if( __prevent < 0 ){
							__name = 'previous';
						}

						if( is_continuous ){
							
							this._prev_mouse = true;
							this[ __name + '_action' ]( 'M', evt );

							window.requestAnimationFrame( function(){
								delete this._prev_mouse;
							}.bind( this ) );
						} else {
							var _cal_name = "cal1";
							if( __selected == '2' ){
								_cal_name = "cal2";
							}

							this[ "separate_" + __name ]( 'M', _cal_name, evt );
						}

						if( this.set_navigationNode( new_format ) ){
							fn();
						}
					}
				}
			}
			evt.preventDefault();
		}

		if( call_selection ){
			if( is_continuous ){
				this.selectDates( __data.tempDate || __data.ltPropEndDate );
			}
		}
	},

	key_enter : function( evt ){
		var __data = this.data,
		type = __data.ltPropSelectionType,
		active = __data.activeDate,
		format = __data.ltPropFormat,
		start_date = __data.selectedDate1,
		end_date = __data.selectedDate2,
		node = this.active_obs( active, "", true ),
		obj,
		call_execute;

		if( type == "continuous" ){
			if( !start_date || ( start_date && end_date ) ){
				obj = {
					ltPropStartDate : "",
					ltPropEndDate : "",
					dateNode1 : node,
					dateNode2 : node,
					selectedDate1 : active,
					selectedDate2 : "",
					dateSelected : true,
					internallyChanged : true,
					tempDate : active
				};
			} else if( start_date ){

				this.active_obs( "", active );

				call_execute = obj = {
					selectedDate2 : active,
					dateSelected : false,
					dateNode2 : node,
					activeDate : ""
				};
			}
		} else {
			this.separate_mousedown( evt );
		}

		if( obj ){
			this.setData( obj );

			if( call_execute ){
				this.executeSelected( evt )
			}

			this.setData( 'internallyChanged', false );
		}
	},

	update_nodes : function(){
		var __data = this.data,
		node = __data.dateNode1,
		selected = __data.selectedDate1;

		if( selected && !this.$node.contains( node ) ){
			this.setData( 'dateNode1', this.active_obs( selected, "", true ) );
		}
	},

	disablecheck : function(){
		var __data = this.data,
		is_separate = __data.ltPropSelectionType == "separate",
		date1 = __data.calViewDate1,
		date2 = __data.calViewDate2,
		min_date = __data.ltPropMinDate,
		max_date = __data.ltPropMaxDate,
		format = __data.ltPropFormat,
		is_same = function( d1, d2 ){
			return d1.getMonth() == d2.getMonth() && d1.getFullYear() == d2.getFullYear();
		},
		min_fn = function( d1, d2 ){
			if( is_same( d1, d2 ) ){
				return true;
			}
			
			return d1.getTime() > d2.getTime();
		},
		max_fn = function( d1, d2 ){
			if( is_same( d1, d2 ) ){
				return true;
			}
			
			return d1.getTime() < d2.getTime();
		},
		cls_name = 'lyteCalDiffMonth',
		__attr = 'aria-disabled',
		fn2 = function( bool, elem ){
			if( bool ){
				elem.addClass( cls_name ).attr( __attr, 'true' );
			} else {
				elem.removeClass( cls_name ).removeAttr( __attr );
			}
		}.bind( this ),
		cal_query = '.lyteDateRangePickerCol',
		$node = this.$node;

		if( min_date ){
			var common_query = ' .lyteDateRPLeftNav',
			min_dobj = this.moment( min_date, format ).getDObj();

			fn2( min_fn( min_dobj, date1 ), $L( cal_query + 1 + common_query, $node ) );

			if( is_separate ){
				fn2( min_fn( min_dobj, date2 ), $L( cal_query + 2 + common_query, $node ) );
			}
		}

		if( max_date ){
			var common_query = ' .lyteDateRPRightNav',
			max_dobj = this.moment( max_date, format ).getDObj();

			fn2( max_fn( max_dobj, date2 ), $L( cal_query + 2 + common_query, $node ) );

			if( is_separate ){
				fn2( max_fn( max_dobj, date1 ), $L( cal_query + 1 + common_query, $node ) );
			}
		}
		
	}
});

/**
 * @syntax nonYielded
 * <lyte-daterangepicker>
 * </lyte-daterangepicker>
 */
