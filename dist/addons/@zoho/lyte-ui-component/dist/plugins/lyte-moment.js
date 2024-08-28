;( function( window ){
		if( lyteDomObj ){
			var shortMon = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
			longMon = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'  ],
			weekLong = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			weekMid = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			weekShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			dayArr = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ],
			week = 'W', wod = 1,
			lm = "lyteMoment",
			uLimit = 19,
			lLimit = 80,
			timeZoneOffsets = {"Etc/GMT+12":-720,"Etc/GMT+11":-660,"Pacific/Midway":-660,"Pacific/Niue":-660,"Pacific/Pago_Pago":-660,"Pacific/Samoa":-660,"US/Samoa":-660,"America/Adak":-540,"America/Atka":-540,"Etc/GMT+10":-600,"HST":-600,"Pacific/Honolulu":-600,"Pacific/Johnston":-600,"Pacific/Rarotonga":-600,"Pacific/Tahiti":-600,"SystemV/HST10":-600,"US/Aleutian":-540,"US/Hawaii":-600,"Pacific/Marquesas":-510,"AST":-480,"America/Anchorage":-480,"America/Juneau":-480,"America/Metlakatla":-480,"America/Nome":-480,"America/Sitka":-480,"America/Yakutat":-480,"Etc/GMT+9":-540,"Pacific/Gambier":-540,"SystemV/YST9":-540,"SystemV/YST9YDT":-480,"US/Alaska":-480,"America/Ensenada":-420,"America/Los_Angeles":-420,"America/Santa_Isabel":-420,"America/Tijuana":-420,"America/Vancouver":-420,"Canada/Pacific":-420,"Etc/GMT+8":-480,"Mexico/BajaNorte":-420,"PST":-480,"PST8PDT":-420,"Pacific/Pitcairn":-480,"SystemV/PST8":-480,"SystemV/PST8PDT":-420,"US/Pacific":-420,"America/Boise":-360,"America/Cambridge_Bay":-360,"America/Chihuahua":-360,"America/Creston":-420,"America/Dawson":-420,"America/Dawson_Creek":-420,"America/Denver":-360,"America/Edmonton":-360,"America/Fort_Nelson":-420,"America/Hermosillo":-420,"America/Inuvik":-360,"America/Mazatlan":-360,"America/Ojinaga":-360,"America/Phoenix":-420,"America/Shiprock":-360,"America/Whitehorse":-420,"America/Yellowknife":-360,"Canada/Mountain":-360,"Canada/Yukon":-420,"Etc/GMT+7":-420,"MST":-420,"MST7MDT":-360,"Mexico/BajaSur":-360,"Navajo":-360,"PNT":-420,"SystemV/MST7":-420,"SystemV/MST7MDT":-360,"US/Arizona":-420,"US/Mountain":-360,"America/Bahia_Banderas":-300,"America/Belize":-360,"America/Chicago":-300,"America/Costa_Rica":-360,"America/El_Salvador":-360,"America/Guatemala":-360,"America/Indiana/Knox":-300,"America/Indiana/Tell_City":-300,"America/Knox_IN":-300,"America/Managua":-360,"America/Matamoros":-300,"America/Menominee":-300,"America/Merida":-300,"America/Mexico_City":-300,"America/Monterrey":-300,"America/North_Dakota/Beulah":-300,"America/North_Dakota/Center":-300,"America/North_Dakota/New_Salem":-300,"America/Rainy_River":-300,"America/Rankin_Inlet":-300,"America/Regina":-360,"America/Resolute":-300,"America/Swift_Current":-360,"America/Tegucigalpa":-360,"America/Winnipeg":-300,"CST":-360,"CST6CDT":-300,"Canada/Central":-300,"Canada/Saskatchewan":-360,"Chile/EasterIsland":-360,"Etc/GMT+6":-360,"Mexico/General":-300,"Pacific/Easter":-360,"Pacific/Galapagos":-360,"SystemV/CST6":-360,"SystemV/CST6CDT":-300,"US/Central":-300,"US/Indiana-Starke":-300,"America/Atikokan":-300,"America/Bogota":-300,"America/Cancun":-300,"America/Cayman":-300,"America/Coral_Harbour":-300,"America/Detroit":-240,"America/Eirunepe":-300,"America/Fort_Wayne":-240,"America/Grand_Turk":-240,"America/Guayaquil":-300,"America/Havana":-240,"America/Indiana/Indianapolis":-240,"America/Indiana/Marengo":-240,"America/Indiana/Petersburg":-240,"America/Indiana/Vevay":-240,"America/Indiana/Vincennes":-240,"America/Indiana/Winamac":-240,"America/Indianapolis":-240,"America/Iqaluit":-240,"America/Jamaica":-300,"America/Kentucky/Louisville":-240,"America/Kentucky/Monticello":-240,"America/Lima":-300,"America/Louisville":-240,"America/Montreal":-240,"America/Nassau":-240,"America/New_York":-240,"America/Nipigon":-240,"America/Panama":-300,"America/Pangnirtung":-240,"America/Port-au-Prince":-240,"America/Porto_Acre":-300,"America/Rio_Branco":-300,"America/Thunder_Bay":-240,"America/Toronto":-240,"Brazil/Acre":-300,"Canada/Eastern":-240,"Cuba":-240,"EST":-300,"EST5EDT":-240,"Etc/GMT+5":-300,"IET":-240,"Jamaica":-300,"SystemV/EST5":-300,"SystemV/EST5EDT":-240,"US/East-Indiana":-240,"US/Eastern":-240,"US/Michigan":-240,"America/Anguilla":-240,"America/Antigua":-240,"America/Aruba":-240,"America/Asuncion":-240,"America/Barbados":-240,"America/Blanc-Sablon":-240,"America/Boa_Vista":-240,"America/Campo_Grande":-240,"America/Caracas":-240,"America/Cuiaba":-240,"America/Curacao":-240,"America/Dominica":-240,"America/Glace_Bay":-180,"America/Goose_Bay":-180,"America/Grenada":-240,"America/Guadeloupe":-240,"America/Guyana":-240,"America/Halifax":-180,"America/Kralendijk":-240,"America/La_Paz":-240,"America/Lower_Princes":-240,"America/Manaus":-240,"America/Marigot":-240,"America/Martinique":-240,"America/Moncton":-180,"America/Montserrat":-240,"America/Port_of_Spain":-240,"America/Porto_Velho":-240,"America/Puerto_Rico":-240,"America/Santiago":-240,"America/Santo_Domingo":-240,"America/St_Barthelemy":-240,"America/St_Kitts":-240,"America/St_Lucia":-240,"America/St_Thomas":-240,"America/St_Vincent":-240,"America/Thule":-180,"America/Tortola":-240,"America/Virgin":-240,"Atlantic/Bermuda":-180,"Brazil/West":-240,"Canada/Atlantic":-180,"Chile/Continental":-240,"Etc/GMT+4":-240,"PRT":-240,"SystemV/AST4":-240,"SystemV/AST4ADT":-180,"America/St_Johns":-90,"CNT":-90,"Canada/Newfoundland":-90,"AGT":-180,"America/Araguaina":-180,"America/Argentina/Buenos_Aires":-180,"America/Argentina/Catamarca":-180,"America/Argentina/ComodRivadavia":-180,"America/Argentina/Cordoba":-180,"America/Argentina/Jujuy":-180,"America/Argentina/La_Rioja":-180,"America/Argentina/Mendoza":-180,"America/Argentina/Rio_Gallegos":-180,"America/Argentina/Salta":-180,"America/Argentina/San_Juan":-180,"America/Argentina/San_Luis":-180,"America/Argentina/Tucuman":-180,"America/Argentina/Ushuaia":-180,"America/Bahia":-180,"America/Belem":-180,"America/Buenos_Aires":-180,"America/Catamarca":-180,"America/Cayenne":-180,"America/Cordoba":-180,"America/Fortaleza":-180,"America/Godthab":-120,"America/Jujuy":-180,"America/Maceio":-180,"America/Mendoza":-180,"America/Miquelon":-120,"America/Montevideo":-180,"America/Nuuk":-120,"America/Paramaribo":-180,"America/Punta_Arenas":-180,"America/Recife":-180,"America/Rosario":-180,"America/Santarem":-180,"America/Sao_Paulo":-180,"Antarctica/Palmer":-180,"Antarctica/Rothera":-180,"Atlantic/Stanley":-180,"BET":-180,"Brazil/East":-180,"Etc/GMT+3":-180,"America/Noronha":-120,"Atlantic/South_Georgia":-120,"Brazil/DeNoronha":-120,"Etc/GMT+2":-120,"America/Scoresbysund":0,"Atlantic/Azores":0,"Atlantic/Cape_Verde":-60,"Etc/GMT+1":-60,"Africa/Abidjan":0,"Africa/Accra":0,"Africa/Bamako":0,"Africa/Banjul":0,"Africa/Bissau":0,"Africa/Casablanca":0,"Africa/Conakry":0,"Africa/Dakar":0,"Africa/El_Aaiun":0,"Africa/Freetown":0,"Africa/Lome":0,"Africa/Monrovia":0,"Africa/Nouakchott":0,"Africa/Ouagadougou":0,"Africa/Sao_Tome":0,"Africa/Timbuktu":0,"America/Danmarkshavn":0,"Antarctica/Troll":120,"Atlantic/Canary":60,"Atlantic/Faeroe":60,"Atlantic/Faroe":60,"Atlantic/Madeira":60,"Atlantic/Reykjavik":0,"Atlantic/St_Helena":0,"Eire":60,"Etc/GMT":-0,"Etc/GMT+0":-0,"Etc/GMT-0":-0,"Etc/GMT0":-0,"Etc/Greenwich":-0,"Etc/UCT":-0,"Etc/UTC":-0,"Etc/Universal":-0,"Etc/Zulu":-0,"Europe/Belfast":60,"Europe/Dublin":60,"Europe/Guernsey":60,"Europe/Isle_of_Man":60,"Europe/Jersey":60,"Europe/Lisbon":60,"Europe/London":60,"GB":60,"GB-Eire":60,"GMT":0,"GMT0":0,"Greenwich":0,"Iceland":0,"Portugal":60,"UCT":0,"UTC":0,"Universal":0,"WET":60,"Zulu":0,"Africa/Algiers":60,"Africa/Bangui":60,"Africa/Brazzaville":60,"Africa/Ceuta":120,"Africa/Douala":60,"Africa/Kinshasa":60,"Africa/Lagos":60,"Africa/Libreville":60,"Africa/Luanda":60,"Africa/Malabo":60,"Africa/Ndjamena":60,"Africa/Niamey":60,"Africa/Porto-Novo":60,"Africa/Tunis":60,"Arctic/Longyearbyen":120,"Atlantic/Jan_Mayen":120,"CET":120,"ECT":120,"Etc/GMT-1":60,"Europe/Amsterdam":120,"Europe/Andorra":120,"Europe/Belgrade":120,"Europe/Berlin":120,"Europe/Bratislava":120,"Europe/Brussels":120,"Europe/Budapest":120,"Europe/Busingen":120,"Europe/Copenhagen":120,"Europe/Gibraltar":120,"Europe/Ljubljana":120,"Europe/Luxembourg":120,"Europe/Madrid":120,"Europe/Malta":120,"Europe/Monaco":120,"Europe/Oslo":120,"Europe/Paris":120,"Europe/Podgorica":120,"Europe/Prague":120,"Europe/Rome":120,"Europe/San_Marino":120,"Europe/Sarajevo":120,"Europe/Skopje":120,"Europe/Stockholm":120,"Europe/Tirane":120,"Europe/Vaduz":120,"Europe/Vatican":120,"Europe/Vienna":120,"Europe/Warsaw":120,"Europe/Zagreb":120,"Europe/Zurich":120,"MET":120,"Poland":120,"ART":120,"Africa/Blantyre":120,"Africa/Bujumbura":120,"Africa/Cairo":120,"Africa/Gaborone":120,"Africa/Harare":120,"Africa/Johannesburg":120,"Africa/Khartoum":120,"Africa/Kigali":120,"Africa/Lubumbashi":120,"Africa/Lusaka":120,"Africa/Maputo":120,"Africa/Maseru":120,"Africa/Mbabane":120,"Africa/Tripoli":120,"Africa/Windhoek":120,"Asia/Amman":180,"Asia/Beirut":180,"Asia/Damascus":180,"Asia/Famagusta":180,"Asia/Gaza":180,"Asia/Hebron":180,"Asia/Jerusalem":180,"Asia/Nicosia":180,"Asia/Tel_Aviv":180,"CAT":120,"EET":180,"Egypt":120,"Etc/GMT-2":120,"Europe/Athens":180,"Europe/Bucharest":180,"Europe/Chisinau":180,"Europe/Helsinki":180,"Europe/Kaliningrad":120,"Europe/Kiev":180,"Europe/Mariehamn":180,"Europe/Nicosia":180,"Europe/Riga":180,"Europe/Sofia":180,"Europe/Tallinn":180,"Europe/Tiraspol":180,"Europe/Uzhgorod":180,"Europe/Vilnius":180,"Europe/Zaporozhye":180,"Israel":180,"Libya":120,"Africa/Addis_Ababa":180,"Africa/Asmara":180,"Africa/Asmera":180,"Africa/Dar_es_Salaam":180,"Africa/Djibouti":180,"Africa/Juba":180,"Africa/Kampala":180,"Africa/Mogadishu":180,"Africa/Nairobi":180,"Antarctica/Syowa":180,"Asia/Aden":180,"Asia/Baghdad":180,"Asia/Bahrain":180,"Asia/Istanbul":180,"Asia/Kuwait":180,"Asia/Qatar":180,"Asia/Riyadh":180,"EAT":180,"Etc/GMT-3":180,"Europe/Istanbul":180,"Europe/Kirov":180,"Europe/Minsk":180,"Europe/Moscow":180,"Europe/Simferopol":180,"Indian/Antananarivo":180,"Indian/Comoro":180,"Indian/Mayotte":180,"Turkey":180,"W-SU":180,"Asia/Tehran":270,"Iran":270,"Asia/Baku":240,"Asia/Dubai":240,"Asia/Muscat":240,"Asia/Tbilisi":240,"Asia/Yerevan":240,"Etc/GMT-4":240,"Europe/Astrakhan":240,"Europe/Samara":240,"Europe/Saratov":240,"Europe/Ulyanovsk":240,"Europe/Volgograd":240,"Indian/Mahe":240,"Indian/Mauritius":240,"Indian/Reunion":240,"NET":240,"Asia/Kabul":270,"Antarctica/Mawson":300,"Asia/Aqtau":300,"Asia/Aqtobe":300,"Asia/Ashgabat":300,"Asia/Ashkhabad":300,"Asia/Atyrau":300,"Asia/Dushanbe":300,"Asia/Karachi":300,"Asia/Oral":300,"Asia/Qyzylorda":300,"Asia/Samarkand":300,"Asia/Tashkent":300,"Asia/Yekaterinburg":300,"Etc/GMT-5":300,"Indian/Kerguelen":300,"Indian/Maldives":300,"PLT":300,"Asia/Calcutta":330,"Asia/Colombo":330,"Asia/Kolkata":330,"IST":330,"Asia/Kathmandu":345,"Asia/Katmandu":345,"Antarctica/Vostok":360,"Asia/Almaty":360,"Asia/Bishkek":360,"Asia/Dacca":360,"Asia/Dhaka":360,"Asia/Kashgar":360,"Asia/Omsk":360,"Asia/Qostanay":360,"Asia/Thimbu":360,"Asia/Thimphu":360,"Asia/Urumqi":360,"BST":360,"Etc/GMT-6":360,"Indian/Chagos":360,"Asia/Rangoon":390,"Asia/Yangon":390,"Indian/Cocos":390,"Antarctica/Davis":420,"Asia/Bangkok":420,"Asia/Barnaul":420,"Asia/Ho_Chi_Minh":420,"Asia/Hovd":420,"Asia/Jakarta":420,"Asia/Krasnoyarsk":420,"Asia/Novokuznetsk":420,"Asia/Novosibirsk":420,"Asia/Phnom_Penh":420,"Asia/Pontianak":420,"Asia/Saigon":420,"Asia/Tomsk":420,"Asia/Vientiane":420,"Etc/GMT-7":420,"Indian/Christmas":420,"VST":420,"Asia/Brunei":480,"Asia/Choibalsan":480,"Asia/Chongqing":480,"Asia/Chungking":480,"Asia/Harbin":480,"Asia/Hong_Kong":480,"Asia/Irkutsk":480,"Asia/Kuala_Lumpur":480,"Asia/Kuching":480,"Asia/Macao":480,"Asia/Macau":480,"Asia/Makassar":480,"Asia/Manila":480,"Asia/Shanghai":480,"Asia/Singapore":480,"Asia/Taipei":480,"Asia/Ujung_Pandang":480,"Asia/Ulaanbaatar":480,"Asia/Ulan_Bator":480,"Australia/Perth":480,"Australia/West":480,"CTT":480,"Etc/GMT-8":480,"Hongkong":480,"PRC":480,"Singapore":480,"Australia/Eucla":525,"Asia/Chita":540,"Asia/Dili":540,"Asia/Jayapura":540,"Asia/Khandyga":540,"Asia/Pyongyang":540,"Asia/Seoul":540,"Asia/Tokyo":540,"Asia/Yakutsk":540,"Etc/GMT-9":540,"JST":540,"Japan":540,"Pacific/Palau":540,"ROK":540,"ACT":570,"Australia/Adelaide":570,"Australia/Broken_Hill":570,"Australia/Darwin":570,"Australia/North":570,"Australia/South":570,"Australia/Yancowinna":570,"AET":600,"Antarctica/DumontDUrville":600,"Antarctica/Macquarie":600,"Asia/Ust-Nera":600,"Asia/Vladivostok":600,"Australia/ACT":600,"Australia/Brisbane":600,"Australia/Canberra":600,"Australia/Currie":600,"Australia/Hobart":600,"Australia/Lindeman":600,"Australia/Melbourne":600,"Australia/NSW":600,"Australia/Queensland":600,"Australia/Sydney":600,"Australia/Tasmania":600,"Australia/Victoria":600,"Etc/GMT-10":600,"Pacific/Chuuk":600,"Pacific/Guam":600,"Pacific/Port_Moresby":600,"Pacific/Saipan":600,"Pacific/Truk":600,"Pacific/Yap":600,"Australia/LHI":630,"Australia/Lord_Howe":630,"Antarctica/Casey":660,"Asia/Magadan":660,"Asia/Sakhalin":660,"Asia/Srednekolymsk":660,"Etc/GMT-11":660,"Pacific/Bougainville":660,"Pacific/Efate":660,"Pacific/Guadalcanal":660,"Pacific/Kosrae":660,"Pacific/Norfolk":660,"Pacific/Noumea":660,"Pacific/Pohnpei":660,"Pacific/Ponape":660,"SST":660,"Antarctica/McMurdo":720,"Antarctica/South_Pole":720,"Asia/Anadyr":720,"Asia/Kamchatka":720,"Etc/GMT-12":720,"Kwajalein":720,"NST":720,"NZ":720,"Pacific/Auckland":720,"Pacific/Fiji":720,"Pacific/Funafuti":720,"Pacific/Kwajalein":720,"Pacific/Majuro":720,"Pacific/Nauru":720,"Pacific/Tarawa":720,"Pacific/Wake":720,"Pacific/Wallis":720,"NZ-CHAT":765,"Pacific/Chatham":765,"Etc/GMT-13":780,"MIT":780,"Pacific/Apia":780,"Pacific/Enderbury":780,"Pacific/Fakaofo":780,"Pacific/Tongatapu":780,"Etc/GMT-14":840,"Pacific/Kiritimati":840,"UT":0,"EDT":-240,"CDT":-300,"MDT":-360,"PDT":-420},
			
			timezone_regex = new RegExp( '(' + Object.keys( timeZoneOffsets ).join('|') + ')' ),

			default_timezone,
			default_offset,

			is_IE,

			formats = [
				{ val :'YYYY', type : 'year', regex : /\d{4}/, len : 4 },
				{ val : 'GGGG', type : 'year', regex : /\d{4}/, len : 4, isWEG : true }, 
				{ val : 'gggg', type : 'year', regex : /\d{4}/, len : 4, isWEG : true }, 
				{ val : 'YY', type : 'year', regex : /\d{2}/, len : 2 }, 
				{ val : 'GG', type : 'year', regex : /\d{2}/, len : 2, isWEG : true}, 
				{ val : 'gg', type : 'year', regex : /\d{2}/, len : 2, isWEG : true}, 
				{ val : 'MMMM', type : "month", regex : /[A-z]{3,}/, long : true, str : true, array : longMon }, 
				{ val : 'MMM', str : true, type : "month", regex : /[A-z]{3,}/, array : shortMon }, 
				{ val : 'Mo', suff : true, type : "month", regex : /\d{1,2}(?=st|nd|rd|th)/, max : 12 }, 
				{ val : 'MM', type : "month", regex : /\d{2}/, len : 2, max : 12, alt : true }, 
				{ val : 'M', type : "month", regex : /\d{1,2}/, max : 12 }, 
				{ val : 'DDDD', type : 'date', regex : /\d{3}/, len : 3, year : true }, 
				{ val : 'DDDo', type : 'date', suff : true, regex : /\d{1,3}(?=st|nd|rd|th)/, len : 3, year : true, ignore : /\d{3}(?=st|nd|rd|th)/ }, 
				{ val : 'DDD', type : 'date', regex : /\d{1,3}/, year : true, ignore : /\d{3}/}, 
				{ val : 'Do', type : 'date', suff : true , regex : /\d{1,2}(?=st|nd|rd|th)/ }, 
				{ val : 'DD', type : 'date', regex : /\d{2}/, len : 2, alt : true }, 
				{ val : 'D', type : 'date', regex : /\d{1,2}/ }, 
				{ val : '[' + week + ']Wo', type : 'week', suff : true, regex : new RegExp('\[' + week + '\]\d{1,2}(?=st|nd|th|rd)'), isWEG : true },
				{ val : '[' + week + ']wo', ignore : 1, type : 'week', suff : true, regex : new RegExp('\[' + week + '\]\d{1,2}(?=st|nd|th|rd)'), isWEG : true }, 
				{ val : '[' + week + ']WW', type : 'week', regex : new RegExp( week +'(\\d{2})'), len : 2, isWEG : true, match : 1 }, 
				{ val : '[' + week + ']ww', ignore : 1, type : 'week', regex : new RegExp( week +'(\\d{2})'), len : 2, isWEG : true, match : 1 }, 
				{ val : '[' + week + ']W', type : 'week', regex : new RegExp( week +'(\\d{1,2})'), isWEG : true, match : 1 }, 
				{ val : '[' + week + ']w', ignore : 1, type : 'week', regex : new RegExp( week +'(\\d{1,2})'), isWEG : true, match : 1 }, 
				{ val : 'Wo', type : 'week', pref : 0, suff : true, regex : new RegExp('\[' + week + '\]\d{1,2}(?=st|nd|th|rd)'), isWEG : true },
				{ val : 'wo', type : 'week', pref : 0, ignore : 1, suff : true, regex : new RegExp('\[' + week + '\]\d{1,2}(?=st|nd|th|rd)'), isWEG : true }, 
				{ val : 'WW', type : 'week', pref : 0, regex : new RegExp( '(\\d{2})'), len : 2, isWEG : true, match : 1 }, 
				{ val : 'ww', type : 'week', pref : 0, ignore : 1, regex : new RegExp( '(\\d{2})'), len : 2, isWEG : true, match : 1 }, 
				{ val : 'W', type : 'week', pref : 0, regex : new RegExp( '(\\d{1,2})'), isWEG : true, match : 1 }, 
				{ val : 'w', type : 'week', pref : 0, ignore : 1, regex : new RegExp( '(\\d{1,2})'), isWEG : true, match : 1 }, 
				{ val : 'E', type : 'day', regex : /\d{1}/, isWEG : true }, 
				{ val : 'e', type : 'day', regex : /\d{1}/, isWEG : true, local : true }, 
				{ val : 'A', type : 'meridian', regex : /AM|PM/, str : true, time : true },
				{ val : 'a', type : 'meridian', regex : /am|pm/, str : true, time : true, lower : true },
				{ val : 'ZZ', type : 'timezone', regex : /(\+|\-)(\d{2})(\d{2})$/, time : true, len : 2 },
				{ val : 'Z', type : 'timezone', regex : /(\+|\-)(\d{2}):(\d{2})$/, time : true, len : 2 },
				{ val : 'HH', type : 'hour', regex : /\d{2}/, railway : true, time : true, len : 2, max : 23 },
				{ val : 'H', type : 'hour', regex : /\d{1,2}/, railway : true, time : true, max : 23 },
				{ val : 'hh', type : 'hour', regex : /\d{2}/, time : true, len : 2, max : 12 },
				{ val : 'h', type : 'hour', regex : /\d{1,2}/, time : true, max : 12 },
				{ val : 'kk', type : 'hour', regex : /\d{2}/, railway : true, time : true, len : 2, max : 24, deduct : -1 },
				{ val : 'k', type : 'hour', regex : /\d{1,2}/, railway : true, time : true, max : 24, deduct : -1 },
				{ val : 'mm', type : 'minute', regex : /\d{2}/, time : true, len : 2, max : 59 },
				{ val : 'm', type : 'minute', regex : /\d{1,2}/, time : true, max : 59 },
				{ val : 'ss', type : 'second', regex : /\d{2}/, time : true, len : 2, max : 59 },
				{ val : 's', type : 'second', regex : /\d{1,2}/, time : true, max : 59 },
				{ val : 'S', type : 'millisecond', regex : /[0-9]{1,}/, time : true, valForm : /[S]+/ },
				{ val : 'zz', type : 'timezone', regex : timezone_regex, str : true, time : true },
				{ val : 'z', type : 'timezone', regex : timezone_regex, str : true, time : true },
				{ val : 'X', type : 'timestamp', regex : /\d{10}/, time : true},
				{ val : 'x', type : 'timestamp', regex : /\d{13,}/, time : true, milli : true}, 
				{ val : 'dddd', type : "longdate", regex : /[A-z]{3,}/, long : true, str : true, array : weekLong },
				{ val : 'ddd', type : "longdate", regex : /[A-z]{3}/, str : true, array : weekMid },
				{ val : 'dd', type : "longdate", regex : /[A-z]{2}/, str : true, array : weekShort },
				{ val : 'do', type : "longdate", regex : /\d{1}(?=st|nd|rd|th)/, suff : true},
				{ val : 'd', type : 'longdate', regex : /\d{1}/ },
				{ val : 'Qo', type : 'quarter', regex : /\d{1}(?=st|nd|rd|th)/, suff : true }, 
				{ val : 'Q', type : 'quarter', regex : /\d{1}/ }
			 ];

			 ( function(){
				try{
				    new Date().toLocaleString( "en-US", { timeZone: 'Europe/London' } )
				 //    new Intl.DateTimeFormat('en-US', {
					//   year: 'numeric', month: 'numeric', day: 'numeric',
					//   hour: 'numeric', minute: 'numeric', second: 'numeric',
					//   timeZone: 'Europe/London'
					// }).format( new Date() );
				} catch( e ){
				    is_IE = true;
				}
			 })();

			function convert_frm_i18n( format, arg, callback ){
				var parsed = this.parseFormat( this.replaceTxt( format ) ).reverse();
				format = format.replace( /{{|}}/g, '' );

				parsed.forEach( function( item ){
					var arr = item.format.array || [],
					fn = window._lyteUiUtils;

					if( item.format.type == 'meridian' ){
						arr = item.format.lower ? [ 'am', 'pm' ] : [ 'AM', 'PM' ];
					}

					Array.from( arr ).reverse().forEach( function( _item ){
						var conv = fn ? fn.i18n( _item ) : _item ;

						if( callback ){
							conv = callback( arg, _item, conv, item.format.val ) || conv;
						}

						if( _item == conv ){
							return;
						}

						arg = replace_original( arg, _item, conv );
					});
				});
				return arg;
			}

			function replace_original( arg, original, i18n ){
				var index = arg.indexOf( i18n );
				if( index != -1 ){
					return replace_original( arg.replace( i18n, original ), original, i18n );
				}
				return arg;
			}

			function lyteMoment( arg, format, uL, lL ){

				if( arg ){
					this._arg = arg; 
				}
				this._format = format;
				var ret = isEmpty( arg ),
				convert_i18n,
				i18n_callback,
				ignore_timezone,
				instance_timezone,
				instance_offset,
				__wod;

				if( ret ) {
					arg = new Date();
				}

				if( uL && uL.constructor == Object ){
					lL = uL.lL;
					convert_i18n = uL.i18n;
					i18n_callback = uL.i18n_callback;
					ignore_timezone = uL.ignore_timezone;
					instance_timezone = uL.timezone;
					instance_offset = uL.timezoneOffset;
					__wod = uL.wod;
					uL = uL.uL;
				}

				if( !ignore_timezone ){
					this.timezone( instance_timezone || default_timezone, instance_offset == void 0 ? default_offset : instance_offset );
				}

				if( convert_i18n && format && arg && arg.constructor == String ){
					arg = convert_frm_i18n.call( this, format, arg, i18n_callback );
				}

				this.uL = uL == undefined ? uLimit : uL;
				this.lL = lL == undefined ? lLimit : lL;
				this.wod = __wod == void 0 ? wod : __wod;

				if( !( isDef( uL ) && isDef( lL ) ) ){
					if( uL ){
						this.alt = true;		
					} else { 
						this.alt = false;
					}
				}
				this._isValid = validate.call( this, arg, format )
			}

			function isDef( arg ) {
				return arg != undefined;
			}

			function totdate( month, isLeap1, day ){
				var total = 0;
				for(var i = 0; i < month; i++ ) {
					total += dayArr[ i ];
					if( isLeap1 && i == 1 ) {
						total += 1;
					}
				} 
				return total + ( day || 0 );
			}

			function isEmpty( arg ){
				if( !arg ){
					return true;
				}
				var cons = arg.constructor;
				if( cons == Array && !cons.length ){
					return true;
				} else if( cons == Object && !Object.keys( arg ).length ){
					return true;
				}
				return false;

			}

			function isLeap( year ) {
				year = year + '';
				if( year.length == 2 ) {
					year = getCorrectYear( parseInt( year ) );
				}
				year = parseInt( year );
				return ( ( year % 4 == 0 ) && ( year % 100 != 0 ) ) || ( year % 400 == 0 );
			}

			function nthconv( date ) {
				 if( date > 3 && date < 21 ) {
				 	return 'th'
				 }
			     switch ( date % 10 ) {
		            case 1 :  return "st";
		          	case 2 :  return "nd";
	          	  	case 3 :  return "rd";
			        default : return "th";
	 	        }
			}

			function replaceTxt( format ) {
				var matches = format.match( /{{/ ), matches1 = format.match( /}}/ );
				if( !( matches && matches1 ) ) {
					return format;
				}
				format = format.replace( format.slice( matches.index, matches1.index + 2 ), function( arg ){
					var ret = ""
					for( var j = 0; j < arg.length - 4; j++ ) {
						ret += '*';
					}
					return ret;
				} )
				return replaceTxt( format );
			}

			function parseFormat( format, validate ) { 
				var forCopy = formats, order = [],
				prev;
				for( var i = 0; i < forCopy.length; i++ ) {
					var cur = forCopy[ i ];
					if( !format.length ) {
						break;
					}
					if( format.indexOf( cur.val ) > -1 ) {
						if( validate && cur.alt ){
							prev = true;
							continue;
						}

						cur = $L.extend( true, {}, cur );

						if( prev ){
							cur.val = forCopy[ i - 1 ].val;
						}
						prev = false;
						order.push( { format : cur, index : format.indexOf( cur.val ) });
						format = format.replace( cur.val, Math.pow( 10, cur.val.length - 1 ) );
						i--;
						continue;
					} 
				}
				return order.sort(function( a, b ){
						return a.index - b.index
					});
			}

			function fmReplace( arg, arr ) {
				var length = 0;
				for( var i = 0; i < arr.length; i++ ) {
					arg = arg.slice( 0, arr[ i ].index + length ) + arr[ i ].format.val + lm + arg.slice( arr[ i ].index + length + arr[ i ].format.val.length );
					length += 10;
				}
				return arg;
			}

			function replace( arg, val, suff, rep ) {
				arg = arg.replace( val, rep || "" );
				if( suff ) {
					arg = arg.replace( /st|nd|rd|th/, '' )
				}
				return arg;
			}

			function find( array, val ){
				array = array || [];

				var crct, i,
				__length = array.length;

				for( i = 0; i < __length; i++ ) {
					var __cur = array[ i ];

					if( new RegExp( __cur ).test( val ) ) {
						crct = __cur;
						break;
					}
				}
				return  { mon : crct, index : i };
			}

			function getMonth( val, suff, str, long ) {
				var mon;
				if( str ) {
					var ret = find( long ? longMon : shortMon, val );
					mon = ret.mon;
					val = ret.index;
					if( !mon || val > 11 ){
						val = "Invalid";
					}
				} else {
					val = parseInt( val ) - 1;
					if( val > 11 ) {
						val = 'Invalid';
					} 
				}

				return { val : val, mon : mon };
			}

			function convertTimeZone( arg ) {
				var ret,
				hour = parseInt( arg[ 2 ] ); minute = parseInt( arg[ 3 ] );
				ret = hour * 60 + minute;
				return arg[ 1 ] == '+' ? ( ret * -1 ) : ret;
			}

			function convertRailway( hour, pm ) {
				if( pm && hour < 12 ) {
					hour += 12;
				} else if( hour == 12 && !pm ) {
					hour = 0;
				}
				return hour;
			}

			function getDay( val, isLeap ) {
				val = parseInt( val ), ini = 0, ind = 0, inc = dayArr[ 0 ];
				if( val > ( 365 + ( isLeap ? 1 : 0 ) ) ){
					return {};
				}
				while( ini + inc < val ) {
					ini += inc;
					ind++;
					inc = dayArr[ ind ]
					if( isLeap && ind == 1 ) {
						inc += 1;
					}
				}
				return { day : val - ini , mon : ind }
			}

			function getWeek( obj ) {
				if( obj.day != undefined || obj.week ) {
					var dtt = new Date( obj.year , 0 ,1 );
					if( !validate.call( this, dtt ) ) {
						return {};
					}
					var dt = dtt.getDay(), isLeap1 = isLeap( obj.year || dtt.getFullYear() ),
					total = wod + obj.week == 1 ? ( obj.day - dt + wod ) : ( obj.week == 2 ? ( 7 + wod - dt + obj.day ) : ( 7 + wod - dt + obj.day + ( obj.week - 2 ) * 7 ) )
					if( total > ( 365 + ( isLeap1 ? 1 : 0 ) ) ) {
						var newStart = new Date( obj.year + 1 , 0 ,1 ).getDay();
						if( newStart > 4 ) {
							obj.year += 1;
							total = total - ( ( 365 + ( isLeap1 ? 1 : 0 ) ) );
						}
					}
					if( total > ( 365 + ( isLeap1 ? 1 : 0 ) ) || obj.day == 0 || obj.day > 7 ) {
						obj.month = obj.year = obj.date = 'Invalid';
						return;
					}
					var ret = getDay( total, isLeap1 );
					obj.month = ret.mon; obj.date = ret.day;
				}
				if( obj.year ) {
					var yr = parseInt( obj.year );
					if( yr < 100 ) {
						obj.year = getCorrectYear( yr );
					}
				}
				if( obj.month < 0 ) {
					obj.month = 'Invalid';
				}
				if( obj.date < 1 ) {
					obj.date = 'Invalid';
				}
			}

			// function getWeekReverse( dobj, ignore ){
			// 	var year = dobj.getFullYear(),
			// 	is_leap = isLeap( year ),
			// 	month = dobj.getMonth(),
			// 	date = dobj.getDate(),
			// 	year_start = new Date( year, 0 ),
			// 	startday = year_start.getDay(),
			// 	start_date = year_start.getDate(),
			// 	cur_day = dobj.getDay() + wod - 1;

			// 	if( cur_day <= 0 ){
			// 		cur_day += 7;
			// 	}

			// 	total = totdate( month, is_leap );

			// 	// if( !ignore ){
			// 		if( month == 0 && startday > 4 && ( date <= ( 8 - startday ) ) ){
			// 			var ret = getWeekReverse( new Date( year - 1, 11, 31 ) );
			// 			ret.day = ( ( ret.day + date ) % 8 ) || 1;
			// 			ret.repYear = true;
			// 			return ret;
			// 		} else {
			// 			if( startday > 4 && ( start_date <= ( 8 - startday ) ) ){
			// 				date -= ( 8 - startday );
			// 				startday = 0;
			// 			} else {
			// 				date--;
			// 			}
			// 		}
			// 	// }

			// 	return {
			// 		week : Math.ceil( ( total + startday + date ) / 7 ),
			// 		day : cur_day
			// 	};
			// }

			function getWeekReverse( dobj, ignore ){
				var __wod = wod,
				timezone = this._timezone;

				if( timezone ){
					dobj = new Date( $L.moment( dobj ).timezone( timezone ).format( 'YYYY-MM-DD' ) );
				}

				if( __wod ){
					dobj = new Date( dobj );
					dobj.setDate( dobj.getDate() - __wod );
				}

				var ret = __getWeekReverse( dobj, ignore );

				return ret;
			}

			function __getWeekReverse( dobj, ignore ){
			    var year = dobj.getFullYear(),
			    is_leap = isLeap( year ),
			    month = dobj.getMonth(),
			    date = dobj.getDate(),
			    __week_start = 0,
			    __week_end = ( __week_start - 1 + 7 ) % 7,
			    year_start = new Date( year, 0, __week_start + 1 ),
			    startday = year_start.getDay(),
			    start_date = year_start.getDate(),
			    cur_day = dobj.getDay(),
			    total = totdate( month, is_leap ) + date,
			    days_without_ends = total - ( 7 - startday + __week_start ) - ( cur_day + 1 ),
			    __weeks = ( days_without_ends / 7 ) + 1;

			    if( month == 11 ){
			        var year_end = new Date( year, 11, 31 + __week_start ),
			        endday = year_end.getDay(),
			        enddate = year_end.getDate(),
			        exp_end = date + ( __week_end - endday + 7 ) % 7;

			        if( exp_end > 31 + __week_start ){
		                return {
		                    week : 1,
		                    day : cur_day
		                };
			        }
			    } 

			    __weeks++;

			    return {
			        week : __weeks,
			        day : cur_day
			    };
			}

			// function getWeekReverse( dobj, ignore ) {
			// 	var isLeap1 = isLeap( dobj.getFullYear() ), month = dobj.getMonth(), date = dobj.getDate(),
			// 	total = ignore ? 0 : - wod, startday = new Date( dobj.getFullYear(), 0 ).getDay();
			// 	total += totdate( month, isLeap1 );

			// 	if( !ignore ) {
			// 		if( month == 0 && startday > 4 && date < 3 ){

			// 			// isLeap1 = isLeap( dobj.getFullYear() - 1 );
			// 			// total = total + 365 + ( isLeap1 ? 1 : 0 );
			// 			// startday = new Date( dobj.getFullYear() - 1, 0 ).getDay();
			// 			// repYear = true;

			// 			var ret = getWeekReverse( new Date( dobj.getFullYear() - 1, 11, 31 ) );
			// 			ret.repYear = true;
			// 			ret.day = ret.day + date;

			// 			return ret;
			// 		} 
			// 	}

	 	// 		return { week : Math.ceil( ( total + startday + date ) / 7 ), day : dobj.getDay() + 1};
			// }	

			function getCorrectYear( year ){
				var copyYear = year + '';
				year = parseInt( year );

				if( copyYear.length == 2 ){
					var today = Number( $L.moment().format( 'YYYY' ) ),
					prefix = parseInt( today / 100 ),
					curTwodigit = today % 100,
					upperLimit = ( curTwodigit + ( this.uL || uLimit ) ) % 100,
					lowerLimit = ( curTwodigit - ( this.lL || lLimit ) + 100 ) % 100;

					if( curTwodigit > lowerLimit ){
						if( year < lowerLimit ){
							year = ( prefix + 1 ) + '' + crctLength( year, 2 );
						} else {
							year = prefix + '' + crctLength( year, 2 );
						}
					} else {
						if( year < lowerLimit ){
							year = prefix + '' + crctLength( year, 2 );
						} else {
							year = ( prefix - 1 ) + '' + crctLength( year, 2 );
						}
					}
				}
				return year;
			}

			function valFormat( arg, format ){
				var copyFormat = {}, 
				ret, 
				date,
				__new = new Date(),
				prseVal = parseFormat( replaceTxt( format ), true ), 
				copyArg = arg,
				format = format.replace(/{{|}}/g, ''),
				copyFormat1 = format,
				to_ret;

				for( var i = 0; i < prseVal.length; i++ ) {
					var ret, cur = prseVal[ i ].format;
					switch( cur.type ) {
						case 'date' :
						case 'year':
						case 'week' :
						case 'day' : {
							if( cur.regex.test(arg) ) {
								if( cur.type == "year" ){
									ret = arg.match( cur.regex )[ cur.match || 0 ];
								} else {
									ret = parseInt( arg.match( cur.regex )[ cur.match || 0 ] );
								}
								copyFormat[ cur.type ] = ret;
								arg = replace( arg, cur.regex, cur.suff );
								copyArg = replace( copyArg, cur.regex, cur.suff, cur.val );
								if( cur.type == 'week' ) {
									arg = replace( arg, week );
								}
								if( cur.type == 'day' && cur.local ) {
									copyFormat.day++;
								}
								if( cur.year ) {
									copyFormat.date = getDay( copyFormat.date ).day;
								}
							} else {
								if( copyFormat.year && copyFormat.week ) {
									copyFormat[ cur.type ] = wod;
									format = format.replace( cur.val, '' );
									copyFormat1 = copyFormat1.replace( cur.val, '' );
								} else {
									copyFormat[ cur.type ] = 'Invalid';
								}
							}
							if( /date/i.test( cur.type ) ){
								if( copyFormat[ cur.type ] == 0 ){
									copyFormat[ cur.type ] = 'Invalid';
								}
							}
							break;
						}
						case 'month' : {
							if( cur.regex.test(arg) ) {
								ret = getMonth( arg.match(  cur.regex )[ 0 ], cur.suff, cur.str, cur.long );
								copyFormat.month = ret.val;
								arg = replace( arg, ret.mon || ( cur.regex ), cur.suff );
								copyArg = replace( copyArg, ret.mon || ( cur.regex ), cur.suff, cur.val );
							} else {
								copyFormat.month = 'Invalid';
							}
							if( copyFormat.month < 0 ){
								copyFormat.month = 'Invalid';
							}
							break;
						}
						case 'quarter' : {
							if( cur.regex.test(arg) ) {
								ret = arg.match(  cur.regex )[ 0 ];
								copyFormat.quarter = ret;
								arg = replace( arg, ret, cur.suff );
								copyArg = replace( copyArg, ret, cur.suff, cur.val );
							}
							break;
						}
						case 'longdate' : {
							if( cur.regex.test(arg) ) {
								if( cur.str ) {
									ret = find( cur.array, arg.match(  cur.regex )[ 0 ] );
								} else {
									ret = parseInt( arg.match( cur.regex )[ 0 ] );
								}
								copyFormat.longdate = !isDef( ret.index ) ? ret : ret.index;
								arg = replace( arg, ret.mon || ret, cur.suff )
								copyArg = replace( copyArg, ret.mon || ret, cur.suff, cur.val );
							}
							break;
						}
						case 'hour' : 
						case 'minute' : 
						case 'second' :
						case 'meridian' : {
							if( cur.regex.test(arg) ) {
								if( cur.str ) {
									ret = arg.match( cur.regex )[ 0 ];
								} else {
									ret = parseInt( arg.match( cur.regex )[ 0 ] );
									if( cur.railway ) {
										copyFormat.railway = true;
									}
								}
								if( cur.deduct ) {
									ret--;
								}
								copyFormat[ cur.type ] = ret;
								if( cur.max && ret > cur.max ) {
								    copyFormat[ cur.type ] = 'Invalid';
								}
								arg = replace( arg, cur.regex );
								copyArg = replace( copyArg, cur.regex, cur.suff, cur.val );
							}
							break;
						}
						case 'millisecond' : {
							if( cur.regex.test(arg) ) {
								ret = arg.match( cur.regex )[ 0 ];
								copyFormat.millisecond = parseFloat( ret );
								arg = replace( arg, ret ).replace(/[S]+/, '');
								copyArg = replace( copyArg, cur.regex, cur.suff, cur.val );
								copyFormat1 = copyFormat1.replace(/[S]+/, 'S');
							}
							break;
						}
						case 'timestamp' : {
							if( cur.regex.test(arg) ) {
								ret = parseInt( arg.match( cur.regex )[ 0 ] );
								copyFormat.timestamp = ret * ( cur.milli ? 1 : 1000 );
								arg = replace( arg, ret );
								copyArg = replace( copyArg, ret, cur.suff, cur.val );
							}
							break;
						}
						case 'timezone' : {
							if( cur.regex.test(arg) ) {
								if( cur.str ) {
									ret = arg.match( cur.regex )[ 0 ];
									ret = -timeZoneOffsets[ ret ];
								} else {
									ret = convertTimeZone( arg.match( cur.regex ) )
								}
								copyFormat.timezone = ret;
								arg = replace( arg, cur.regex );
								copyArg = replace( copyArg, cur.regex, cur.suff, cur.val );
							}
							break;
						}
					}
				format = format.replace( cur.valForm || cur.val, '' );
				}
					
				// date = new Date( __new.getFullYear(), isDef( copyFormat.month ) ? copyFormat.month : __new.getMonth(), copyFormat.date || 1 );
				// date = new Date( __new.getFullYear(), 0 );

				date = new Date( __new.getFullYear(), isDef( copyFormat.month ) ? copyFormat.month : __new.getMonth(), copyFormat.date || 1, copyFormat.hour || 0, copyFormat.minute || 0, copyFormat.second || 0 );

				if( isDef( copyFormat.day ) || isDef( copyFormat.week ) ){
					var oriDate = copyFormat.date
					if( !isDef( copyFormat.year ) ) {
						copyFormat.year = date.getFullYear();
					}
					if( !isDef( copyFormat.day ) ) {
						copyFormat.day = wod;
					} 
					getWeek.call( this, copyFormat );
					if( isDef( oriDate ) ){
						if( copyFormat.date > oriDate ) {
							copyFormat.month++;
						} 
						copyFormat.date = oriDate;
					}
				}
				if( isDef( copyFormat.longdate ) && copyFormat.day && copyFormat.day != copyFormat.longdate ) {
					date.setFullYear( 'Invalid' );
				} else if( isDef( copyFormat.year ) ) {
					date.setFullYear( getCorrectYear( copyFormat.year ) );
				}
				if( isDef( copyFormat.month ) ) {
					date.setMonth( copyFormat.month );
				}
				if( isDef( copyFormat.date ) ) {
					date.setDate( copyFormat.date <= ( dayArr[ date.getMonth() ] + ( date.getMonth() == 1 && isLeap( date.getFullYear() ) ? 1 : 0 ) ) ? copyFormat.date : 'Invalid');
				}
				if( isDef( copyFormat.hour ) ) {
					var mer = copyFormat.meridian;
					date.setHours( copyFormat.railway ? convertRailway( copyFormat.hour, mer ? ( /pm/i.test( mer ) ) : ( copyFormat.hour > 11 ) ) : ( /pm/i.test( mer ) ? ( copyFormat.hour < 12 ? ( copyFormat.hour + 12 ) : copyFormat.hour ) : copyFormat.hour % 12 ) )
				}
				if( isDef( copyFormat.minute ) ) {
					date.setMinutes( copyFormat.minute )
				}
				if( isDef( copyFormat.second ) ) {
					date.setSeconds( copyFormat.second )
				}
				if( isDef( copyFormat.millisecond ) ){
					date.setMilliseconds( copyFormat.millisecond )
				}
				if( isDef( copyFormat.timestamp ) ) {
					date = new Date( copyFormat.timestamp )
				}

				if( validate.call( this, date ) ){
					if( isDef( copyFormat.timezone ) ){
						// to_ret = true;
						var act_diff = date.getTimezoneOffset();

						copyFormat.timezone -= act_diff;
						date.setMinutes( date.getMinutes() + copyFormat.timezone );

						var new_diff = date.getTimezoneOffset();

						if( act_diff != new_diff ){

							/* Daylight saving time causing many issues.
						   	   Here when we are passing wrong timezone date Ex. '2021-11-07T02:30:00-04:00' new date reads it correctly ( In -04:00 timezone machine ). But setting the timezone difference in setMinutes causing problem.
						       Dont know the exact fix. So wrote this as temporary fix. Assuming string contains timezone is readable in new Date()*/

							var new_date = new Date( this._arg );
							// May be we can create a date object by passing already available data

							if( new_date.toString() == 'Invalid Date' ){
								/* In this case can't do anything from moment side. Need to change the input date string */ 
								date.setMinutes( date.getMinutes() - copyFormat.timezone );
							} else{
								date = new_date;
							}
						}

					} else if( isDef( this._timezone ) ){
						var ori_timezone = this.timezoneOffset( date );

						copyFormat.timezone =  ori_timezone - date.getTimezoneOffset();
						date.setMinutes( date.getMinutes() + copyFormat.timezone );

						/*
						 * This below code is written for reading a time in different timezone without timezone present in date string.
						 * My machine is in Asia/Calcutta timezone 'Mar 11, 2022'. Niru <nirmala.b@zohocorp.com> reported this for input type date.
						 * Here DST changes on 'Mar 13, 2022 02:00 AM' in "US/Pacific" 
						 * ex . 'Mar 13, 2022 03:00 AM'
						 * In this case if i use normal functions setting hour 3 will automatically changes to hour 4 of -07:00 timezone
						 * To fix this issue after changing date again finding offset and subtracting the same for getting 3 of -07:00 timezone
						 */

						var new_timezone = this.timezoneOffset( date ),
						diff = ori_timezone - new_timezone;

						if( diff ){
						   date.setMinutes( date.getMinutes() - diff );
						}

						/*
						 * Here same as above
						 * 'Mar 13, 2022 02:59 AM' is an invalid date for "US/Pacific" timezone.
						 * correct output is generally assumed as 03:59 of -07:00 timezone
						 * if i deduct timezone change it goes to 01:59 of -08:00 timezone
						 * if converted hour and inputed hour are not matching we having an invalid hour value
						 * so here i am adding it again for getting 03:59 of -07:00 timezone value
						 */

						var __hour = copyFormat.hour;

						if( isDef( __hour ) && __hour != parseInt( $L.moment( date ).format( 'h' ) ) ){
							date.setMinutes( date.getMinutes() + diff );
						}
						/* ends */
					}
				}

				var def_format = "YYYY-MM-DDTHH:mm:ssZ"; 

				if( copyFormat1 != def_format && arg.length == format.length && copyFormat1 == copyArg && validate.call( this, date ) ) {
					return this._isCorrectFormat = true;
				} else if( !this._format || copyFormat1 == def_format ) {
					return validate.call( this, new Date( this._arg ) );
				}

				return to_ret;
			}

			function crctLength( val, length, suff, deduct ) {
				var sfx = ''
				if( deduct ) {
					val++;
				}
				if( suff ) {
					sfx = nthconv( val );
				}
				if( length ) {
					val = val.toString();
					for( var i = 1; i < length; i++ ) {
						if( val.length <= i ) {
							val = '0' + val;
						}
					}
				}
				return val + sfx;
			}

			function getDObj(){
				var date = this._dateObj,
				timeZone = this._timezone;

				if( timeZone ) {
					if( this.is_IE ){
						date.setMinutes( date.getMinutes() + date.getTimezoneOffset() - this.timezoneOffset( date ) );
					} else{
						return new Date( convert_timezone_DLS.call( this, date, timeZone ) );
					}
				}
				return date;
			}

			function convertFormat( arg ) {
				var parseVal = parseFormat( replaceTxt( arg ) ), isWeek = {},
				act_date = this.toDate(),
				obj = this.split_date( act_date ),
				fake_time,
				create_fake = function(){
					return new Date( act_date.getTime() + ( act_date.getTimezoneOffset() - obj.timezone ) * 1e3 * 60 );
				}.bind( this );

				arg = fmReplace( arg.replace(/{{|}}/g, ''), parseVal );
				for( var i = 0; i < parseVal.length; i++ ) {
					var ret, cur = parseVal[ i ].format;
					switch( cur.type ) {
						case "date" : {
							arg = arg.replace( cur.val + lm, crctLength( ( cur.year ? totdate( obj.month - 1, isLeap( obj.year ), obj.date ) : obj.date ), cur.len, cur.suff ) )
						}
						break;
						case "month" : {
							if( cur.str ) {
								arg = arg.replace( cur.val + lm, cur.array[ obj.month - 1 ] );
							} else {
								arg = arg.replace( cur.val + lm, crctLength( obj.month, cur.len, cur.suff ) );
							}
						}
						break;
						case "year" : {
							arg = arg.replace( cur.val + lm, cur.len == 2 ? crctLength( obj.year % 100, 2 ) : ( ( obj.year + '' ).length == 4 ) ? obj.year : crctLength( obj.year, 4 ) );
							isWeek.year = isWeek.year || [];
							isWeek.year.push( cur );
						}
						break;
						case "day" :
						case "week" : {
							isWeek.flag = true
							isWeek[ cur.type ] = isWeek[ cur.type ] || [];
							isWeek[ cur.type ].push( cur );
						}	
						break;
						case "quarter" : {
							arg = arg.replace( cur.val + lm, crctLength( Math.ceil( ( obj.month ) / 3 ), null , cur.suff ) )
						}
						break;
						case 'longdate' : {
							fake_time =  fake_time || create_fake();
							var __day = fake_time.getDay();
							if( cur.str ) {
								arg = arg.replace( cur.val + lm, cur.array[ __day ]);
							} else {
								arg = arg.replace( cur.val + lm, crctLength( __day, null , cur.suff ) )
							}
						}
						break;
						case 'hour' : {
							var hr = obj.hour;
							arg = arg.replace( cur.val + lm, crctLength( !cur.railway ? ( hr > 12 ? hr % 12 : ( hr || 12 ) ) : hr, cur.len, null, cur.deduct ) )
						}
						break;
						case 'minute' : {
							arg = arg.replace( cur.val + lm, crctLength( obj.minute, cur.len ) );
						}
						break;
						case 'second' : {
							arg = arg.replace( cur.val + lm, crctLength( obj.second, cur.len ) );
						}
						break;
						case 'millisecond' : {
							arg = arg.replace( cur.val + lm, crctLength( act_date.getMilliseconds(), 3 ) ).replace( /\\S+/, '' )
						}
						break;
						case 'timezone' : {
							var val = '';
							if( !cur.str ) {
								var off = obj.timezone, hr = crctLength( Math.abs( parseInt( off / 60 ) ), 2 ), min = crctLength( Math.abs( off % 60 ), 2 ), sign = off <= 0 ? '+' : '-';
								if( cur.val == 'ZZ' ) {
									val = sign + hr + min;
								} else {
									val = sign + hr + ':' + min;
								}
							}
							arg = arg.replace( cur.val + lm, val );
						}
						break;
						case 'timestamp' : {
							var val = '';
							if( cur.val == 'X' ) {
							 	val += parseInt( act_date.getTime() / 1000 )
							} else {
								val += act_date.getTime();
							}
							arg = arg.replace( cur.val + lm, val );
						}
						break;
						case 'meridian' : {
							var forr = obj.meridian;
							if( cur.lower ) {
								forr = forr.toLowerCase();
							}
							arg = arg.replace( cur.val + lm, forr );
						}
					}
				}
				if( isWeek.flag ) {
					fake_time = fake_time || create_fake();
					var ret = getWeekReverse( fake_time );
					if( isWeek.week ){
						for( var j = 0; j < isWeek.week.length; j++ ){
							var __cur = isWeek.week[ j ],
							__ret = getWeekReverse( fake_time, __cur.ignore );
							arg = arg.replace( __cur.val + lm, ( __cur.pref == 0 ? "" : week ) + crctLength( __ret.week, __cur.len, __cur.suff ) );
						}
					}
					if( isWeek.day ) {
						for( var j = 0; j < isWeek.day.length; j++ ){
							arg = arg.replace( isWeek.day[ j ].val + lm, ret.day - ( isWeek.day[ j ].local ? 1 : 0 ) );
						}
					}
					if( ret.repYear && isWeek.year ) {
						for( var j = 0; j < isWeek.year.length; j++ ){
							arg = arg.replace( ( isWeek.year[ j ].len == 2 ? obj.year % 100 : obj.year ), ( isWeek.year[ j ].len == 2 ? obj.year % 100 : obj.year ) - 1 );
						}
					}
				}
				return arg.replace(/{{|}}/g, '')
			}

			function validate( arg, format ) {
				var cons = arg.constructor;
				if( cons == Date ) {
					this._dateObj = arg;
					this._isMoment = true;
					if( arg.toString() == 'Invalid Date' ) {
						return false;
					} else {
						return true;
					}
				} else if( cons == String ) {
					if( format ) {
						var ret = valFormat.call( this, arg, format );
						if( ret && this._isCorrectFormat ) {
							this._format = format;
						}
						return ret;
					} else {
						if( this.constructFormat ){
							return validate.call( this, arg, this.constructFormat.call( this, arg ) );
						} else {
							console.warn( 'Its not supported in lyte-moment-basic.js. Add lyte-moment-additional.js for format construction' );
						}
					}
				} else if( cons == Array ) {
					// new (Function.prototype.bind.apply(Date, [null].concat([1996,04,28])))
					return validate.call( this, new Date( Date.parse( Date.apply( Date, cons ) ) ).getTime() );
				} else if( cons == Number ) {
					arg *= /^\d{10}$/.test( arg ) ? 1000 : 1;
					return validate.call( this, new Date( arg ) );
				} else if( arg._isMoment ) {

					this.name_space = arg.name_space;
					this.dls_check_map = arg.dls_check_map;

					return validate.call( this, arg._dateObj.getTime() );
				}
			}

			function convert_timezone_DLS( date_obj, name, short ){

				short = short || "short";

				var ns = date_obj.getTime() + '_' + name + "_" + short;

				if( ns == this.name_space ){
					return this.dls_check_map;
				}

				this.name_space = ns;

				return ( this.dls_check_map = date_obj.toLocaleString( "en-US", { timeZone: name, timeZoneName: short } ) );
			}

			lyteMoment.prototype = {

				isDef : isDef, 

				find : find,

				totdate : totdate,

				isLeap : isLeap,

				dayArr : dayArr,

				getDObj : getDObj,

				getWeekReverse : getWeekReverse,

				weekShort : weekShort,

				weekMid : weekMid,

				weekLong : weekLong,

				longMon : longMon,

				shortMon : shortMon,

				week : week,

				crctLength : crctLength,

				formats : formats,

				replace : replace,

				inbuiltFormats : {},

				getCorrectYear : getCorrectYear,

				parseFormat : parseFormat,

				replaceTxt : replaceTxt,

				is_IE : is_IE,

				convertTimeZone : convertTimeZone,

				validate : function(){
					return !!this._isValid;
				},

				toDate : function(){
					return this._dateObj;
				},

				isSame : function( arg ){
					if( this.validate() && arg && arg._isMoment && arg._isValid ) {
						return this._dateObj.getTime() == arg._dateObj.getTime();
					}
					return false;
				},

				format : function( arg ) {
					if( this.validate() ) {
						arg = this.inbuiltFormats[ arg ] || arg || "YYYY-MM-DDTHH:mm:ssZ";
						return convertFormat.call( this, arg );	
					}
				},

				utc : function( arg ) {
					return this.timezone( 'UTC' );
				},

				local : function( arg ){
					return this.timezone( void 0 );
				},

				timezone : function( arg, off ){
					this._timezone = arg;

					if( isDef( off ) ){
						if( typeof off == 'string' ){
							timeZoneOffsets[ arg ] = -convertTimeZone( off.match( /(\+|\-)(\d{2}):(\d{2})$/ ) ); 
						} else{
							timeZoneOffsets[ arg ] = off;
						}

						this.is_IE = true;
					}

					return this;
				},	

				getCurrentTimeZone : function(){
					return this._timezone;
				},

				parseDate : function( str, date_obj, timezone ){
					var date_rgx = /(\d+)\/(\d+)\/(\d+),\s(\d+):(\d+):(\d+)\s(AM|PM)/,
					match = str.match( date_rgx ),
					obj = {},
					gmt_rgx = /GMT(\+|-)(\d+):(\d+):(\d+)$/,
					hr_min_rgx = /GMT(\+|-)(\d+):(\d+)$/,
					hr_only_gmt = /GMT(\+|-)(\d+)$/,
					end_rgx = /\s([A-Z]+)$/;

					[ 'month', 'date', 'year', 'hour', 'minute', 'second' ].forEach( function( item, index ){
						obj[ item ] = parseInt( match[ index + 1 ] );
					});

					obj.meridian = match[ 7 ];

					var hr = obj.hour,
					ns = {"ACDT":"GMT+10:30","ACST":"GMT+9:30","ACT":"GMT-5","ACWST":"GMT+8:45","ADT":"GMT-3","AEDT":"GMT+11","AEST":"GMT+10","AFT":"GMT+4:30","AKDT":"GMT-8","AKST":"GMT-9","AMST":"GMT-3","AMT":"GMT+4","ART":"GMT-3","AST":"GMT+3","AT":"GMT-4/GMT-3","AWST":"GMT+8","AZOST":"GMT+0","AZOT":"GMT-1","AZT":"GMT+4","BDT":"GMT+8","BIT":"GMT-12","BNT":"GMT+8","BOT":"GMT-4","BRST":"GMT-2","BRT":"GMT-3","BST":"GMT+11","BTT":"GMT+6","CAT":"GMT+2","CCT":"GMT+6:30","CDT":"GMT-4","CEST":"GMT+2","CET":"GMT+1","CHADT":"GMT+13:45","CHAST":"GMT+12:45","CHOST":"GMT+9","CHOT":"GMT+8","CHST":"GMT+10","CHUT":"GMT+10","CIST":"GMT-8","CIT":"GMT+8","CKT":"GMT-10","CLST":"GMT-3","CLT":"GMT-4","COST":"GMT-4","COT":"GMT-5","CST":"GMT+8","CT":"GMT-6/GMT-5","CVT":"GMT-1","CWST":"GMT+8:45","CXT":"GMT+7","DAVT":"GMT+7","DDUT":"GMT+10","EASST":"GMT-5","EAST":"GMT-6","EAT":"GMT+3","ECT":"GMT-5","EDT":"GMT-4","EEST":"GMT+3","EET":"GMT+2","EGST":"GMT+0","EGT":"GMT-1","EIT":"GMT+9","EST":"GMT-5","ET":"GMT-5/GMT-4","FET":"GMT+3","FJT":"GMT+12","FKST":"GMT-3","FKT":"GMT-4","FNT":"GMT-2","GALT":"GMT-6","GAMT":"GMT-9","GET":"GMT+4","GFT":"GMT-3","GILT":"GMT+12","GIT":"GMT-9","GMT":"GMT+0","GST":"GMT-2","GYT":"GMT-4","HADT":"GMT-9","HAST":"GMT-10","HKT":"GMT+8","HMT":"GMT+5","HOVST":"GMT+8","HOVT":"GMT+7","ICT":"GMT+7","IDT":"GMT+3","IOT":"GMT+6","IRDT":"GMT+4:30","IRKT":"GMT+8","IRST":"GMT+3:30","IST":"GMT+2","JST":"GMT+9","KGT":"GMT+6","KOST":"GMT+11","KRAT":"GMT+7","KST":"GMT+9","LHDT":"GMT+11","LHST":"GMT+10:30","LINT":"GMT+14","MAGT":"GMT+11","MART":"GMT-9:30","MAWT":"GMT+5","MDT":"GMT-6","MHT":"GMT+12","MIST":"GMT+11","MIT":"GMT-9:30","MMT":"GMT+6:30","MSK":"GMT+3","MST":"GMT+8","MT":"GMT-7/GMT-6","MUT":"GMT+4","MVT":"GMT+5","MYT":"GMT+8","NCT":"GMT+11","NDT":"GMT-2:30","NFT":"GMT+11","NPT":"GMT+5:45","NRT":"GMT+12","NST":"GMT-3:30","NT":"GMT-3:30","NUT":"GMT-11","NZDT":"GMT+13","NZST":"GMT+12","OMST":"GMT+6","ORAT":"GMT+5","PDT":"GMT-7","PET":"GMT-5","PETT":"GMT+12","PGT":"GMT+10","PHOT":"GMT+13","PhST":"GMT+8","PHT":"GMT+8","PKT":"GMT+5","PMDT":"GMT-2","PMST":"GMT-3","PONT":"GMT+11","PST":"GMT-8","PT":"GMT-8/GMT-7","PWT":"GMT+9","PYST":"GMT-3","PYT":"GMT-4","RET":"GMT+4","ROTT":"GMT-3","SAKT":"GMT+11","SAMT":"GMT+4","SAST":"GMT+2","SBT":"GMT+11","SCT":"GMT+4","SGT":"GMT+8","SLST":"GMT+5:30","SRET":"GMT+11","SRT":"GMT-3","SST":"GMT-11","SYOT":"GMT+3","TAHT":"GMT-10","TFT":"GMT+5","THA":"GMT+7","TJT":"GMT+5","TKT":"GMT+13","TLT":"GMT+9","TMT":"GMT+5","TOT":"GMT+13","TRT":"GMT+3","TVT":"GMT+12","ULAST":"GMT+9","ULAT":"GMT+8","USZ1":"GMT+2","UTC":"GMT+0","UYST":"GMT-2","UYT":"GMT-3","UZT":"GMT+5","VET":"GMT-4","VLAT":"GMT+10","VOLT":"GMT+4","VOST":"GMT+6","VUT":"GMT+11","WAKT":"GMT+12","WAST":"GMT+2","WAT":"GMT+1","WEST":"GMT+1","WET":"GMT+0","WFT":"GMT+12","WGST":"GMT-2","WIB":"GMT+7","WIT":"GMT+9","WST":"GMT+8","YAKT":"GMT+9","YEKT":"GMT+5"},
					_this = this;

					if( match[ 7 ] == 'PM' ){
						if( hr != 12 ){
							obj.hour += 12;
						}
					} else{
						if( hr == 12 ){
							obj.hour = 0;
						}
					}

					function fn( str, frm_recursive, frm_long ){
						if( gmt_rgx.test( str ) ){
							var gmt_match = str.match( gmt_rgx );
							obj.timezone = ( parseInt( gmt_match[ 2 ] ) * 60 + parseInt( gmt_match[ 3 ] ) ) * ( gmt_match[ 1 ] == '-' ? 1 : -1 );
						} else if( hr_min_rgx.test( str ) ){
							var gmt_match = str.match( hr_min_rgx );
							obj.timezone = ( parseInt( gmt_match[ 2 ] ) * 60 + parseInt( gmt_match[ 3 ] ) ) * ( gmt_match[ 1 ] == '-' ? 1 : -1 );
						} else if( hr_only_gmt.test( str ) ){
							var gmt_match = str.match( hr_only_gmt );
							obj.timezone = ( parseInt( gmt_match[ 2 ] ) * 60 ) * ( gmt_match[ 1 ] == '-' ? 1 : -1 );
						} else{
							if( frm_recursive ){
								if( frm_long ){
									var __cur = timeZoneOffsets[ frm_long ];
									if( __cur ){
										var final_str = "GMT",
										hr = parseInt( __cur / 60 ),
										min = Math.abs( __cur % 60 );

										if( __cur > 0 ){
											final_str += "+";
										}

										final_str += ( hr + ":" + min );

										return fn( final_str, true );
									}
								}
								obj.timezone = 0;
							} else{
								if( end_rgx.test( str ) ){

									var clone = {
										"AMT" : {
											"Amazon Time" : "GMT-4",
											"Armenia Time" : "GMT+4"
										},
										"AST" : {
											"Atlantic Standard Time" : "GMT-4",
											"Arabia Standard Time" : "GMT+3"
										},
										"BST" : {
											"British Summer Time" : "GMT+1",
											"Bangladesh Standard Time" : "GMT+6",
											"Bougainville Standard Time" : "GMT+11"
										},
										"CDT" : {
											"Central Daylight Time" : "GMT-5",
											"Cuba Daylight Time" : "GMT-4"
										},
										"CST" : {
											"Central Standard Time" : "GMT-6",
											"Cuba Standard Time" : "GMT-5",
											"China Standard Time" : "GMT+8"
										},
										"GST" : {
											"Gulf Standard Time" : "GMT+4",
											"South Georgia Time" : "GMT-2"
										},
										"IST" : {
											"Indian Standard Time" : "GMT+5:30",
											"Irish Standard Time" : "GMT+1",
											"Israel Standard Time" : "GMT+2"
										},
										"MST" : {
											"Mountain Standard Time" : "GMT-7",
											"Malaysia Standard Time" : "GMT+8"
										},
										"WGST" : {
											"West Greenland Time" : "GMT-3",
											"West Greenland Summer Time" : "GMT-2"
										}
									},
									value = str.match( end_rgx )[ 1 ],
									clone_value = clone[ value ],
									to_send = ns[ value ],
									frm_long;

									if( clone_value ){
										var return_str = convert_timezone_DLS.call( _this, date_obj, timezone, 'long' );
										for( var key in clone_value ){
											if( return_str.indexOf( key ) != -1 ){
												to_send = clone_value[ key ];
												break;
											}
										}
									} else if( !to_send ){
										to_send = convert_timezone_DLS.call( _this, date_obj, timezone, 'long' );
										frm_long = value;
									} else {
										var dual = [ 'AT', 'CT', 'ET', 'MT', 'PT' ];
										if( dual.indexOf( value ) != -1 ){
											to_send = to_send.replace( /\/(.+)/, '' );
										}
									}

									fn( to_send, true, frm_long );
								}
							}
						}
					};

					fn( str );

					return obj;
				},

				split_date : function( date_obj ){
					if( this.is_IE ){
						var dobj = this.getDObj(),
						hr = dobj.getHours(),
						obj = {
							year : dobj.getFullYear(),
							month : dobj.getMonth() + 1,
							date : dobj.getDate(),
							hour : hr,
							minute : dobj.getMinutes(),
							second : dobj.getSeconds(),
							meridian : hr > 11 ? "PM" : "AM",
							timezone : this.timezoneOffset( date_obj )
						};
						return obj;
					} else {
						try{
							var timezone_date = convert_timezone_DLS.call( this, date_obj, this._timezone ),
							timezone_split = this.parseDate( timezone_date, date_obj, this._timezone );
							return timezone_split;
						} catch( e ){
							this.is_IE = true;
							return this.split_date( date_obj );
						}
					}
				},

				timezoneOffset : function( date_obj ){
					if( isDef( this._timezone ) ){
						if( this.is_IE ){
							var value = timeZoneOffsets[ this._timezone ];
							return -( isDef( value ) ? value : this._timezone );
						}

						var timezone_split = this.split_date( date_obj );

						return timezone_split.timezone;
					}

					if( this.validate() ){
						return this.toDate().getTimezoneOffset();
					}

					return new Date().getTimezoneOffset();
				},

				utcOffset : function( arg ) {
					if( this._isValid ) {
						return this.timezoneOffset( this.toDate() );
					}
				}	

			}

			$L.moment = function( arg, format, uL, lL ){
				return new lyteMoment( arg, format, uL, lL );
			}

			$L.moment.lyteMoment = lyteMoment;

			$L.moment.setLimits = function( a, b ){
				uLimit = a;
				lLimit = b;
			}

			$L.moment.setTimezone = function( arg, off ){
				default_timezone = arg;
				if( isDef( off ) ){
					default_offset = off;
				}
			}

			$L.moment.setWod = function( value ){
				wod = value;
			}
		}
	})(window);
;( function( window ){
	if( $L.moment ) {
		var proto = $L.moment.lyteMoment.prototype;
		var standardDate = [
			{ val : 'YYYY-MM-DD', regex : /^(\d{4}-\d{2}-\d{2})/ },
			{ val : 'GGGG-['+ proto.week + ']WW-E', regex : new RegExp( '\^(\\d{4}-'+ proto.week + '\\d{2}-\\d)' ) },
			{ val : 'GGGG-['+ proto.week + ']WW', regex : new RegExp( '\^(\\d{4}-'+ proto.week + '\\d{2})' ) },
			{ val : 'YYYY-DDD', regex : /^(\d{4}-\d{3})/ },
			{ val : 'YYYY-MM', regex : /^(\d{4}-\d{2})/ },
			{ val : 'YYYYMMDD', regex : /^(\d{8})/},
			{ val : 'GGGG['+ proto.week + ']WWE', regex : new RegExp( '\^(\\d{4}'+ proto.week + '\\d{2}\\d)' ) },
			{ val : 'GGGG['+ proto.week + ']WW', regex : new RegExp( '\^(\\d{4}'+ proto.week + '\\d{2})' ) },
			{ val : 'YYYYDDD', regex : /^(\d{4}\d{3})/ }
		],
		standardTime = [
			{ val : 'HH:mm:ss.SSSS', regex : /^\d{2}:\d{2}:\d{2}\.[0-9]{1,}$/ },
			{ val : 'HH:mm:ss,SSSS', regex : /^\d{2}:\d{2}:\d{2},[0-9]{1,}$/ },
			{ val : 'HH:mm:ss', regex : /^\d{2}:\d{2}:\d{2}$/ },
			{ val : 'HH:mm', regex : /^\d{2}:\d{2}$/ },
			{ val : 'HHmmss.SSSS', regex : /^\d{6}\.[0-9]{1,}$/ },
			{ val : 'HHmmss,SSSS', regex : /^\d{6},[0-9]{1,}$/ },
			{ val : 'HHmmss', regex : /^\d{6}$/ },
			{ val : 'HHmm', regex : /^\d{4}$/ },
			{ val : 'HH', regex : /^\d{2}$/ }
		];
		function constructFormatCopy( arg, isTime ) {
			var cpForm = this.formats.slice(), obj = {}, dummy = arg, isWEG = new RegExp(  this.week + '|G|E' , 'i' ).test( arg );
			for( var i = 0; i < cpForm.length; i++ ) {
				var cur = cpForm[ i ];
				if( isTime != cur.time ) {
					continue;
				}
				if( cur.regex.test( dummy ) && isWEG == !!cur.isWEG && !this.isDef( obj[ cur.type ] ) ) {
					if( cur.ignore && !cur.ignore.test( dummy ) ) {
						var dd = this.dayArr[ obj.month ] || 30;
						if( parseInt( dummy.match( cur.regex )[ 0 ] ) < dd ){
							continue;
						}
					}
					if( cur.str ) {
						var matches = this.find( cur.array, dummy.replace( /(Y|G)+/, '' ) ).mon;
						if( matches ){
							arg = this.replace( arg, matches, false, cur.val );
							obj[ cur.type ] = cur.array ? this.find( cur.array, matches ).index : matches;
						}
					} else {
						var matches = dummy.match( cur.regex )[ 0 ];
						arg = this.replace( arg, cur.regex, cur.suff, cur.val );
						obj[ cur.type ] = parseInt( matches );
						if( cur.type == 'week' ) {
							arg = this.replace( arg, new RegExp( this.week + '(?=\\\[' + this.week + ')') );
						}
					}
					dummy = dummy.replace( matches, '' );
				}
			}
			return arg;
		}

		function iterate( array, arg ) {
			for( var i = 0; i < array.length; i++ ) {
				if( array[ i ].regex.test( arg ) ) {
					return array[ i ];
				}
			}
		}

		function get_day( month, year ){
			var dayArr = this.dayArr,
			isLeap = this.isLeap( year );

			return dayArr[ month ] + ( month == 1 && isLeap ? 1 : 0 );
		}

		function constructFormat( arg ) {
			var dateFormat = iterate.call( this, standardDate, arg ), timeFormat;
			if( dateFormat ) {
				timeFormat = iterate.call( this, standardTime, arg.replace( dateFormat.regex, '' ) );
				if( timeFormat ) {
					arg = dateFormat.val + timeFormat.val;
				} else {
					arg = constructFormatCopy.call( this, arg.replace( dateFormat.regex, dateFormat.val ), true );
				}
			} else {
				arg = constructFormatCopy.call( this, arg )
				arg = constructFormatCopy.call( this, arg, true )
			}
			return arg;
		}

		proto.additional = true;

		$L.extend( proto, {

			 inbuiltFormats : {
			 	localDatetime: 'YYYY-MM-DDTHH:mm',            
		        localSecondDatetime: 'YYYY-MM-DDTHH:mm:ss',
		        localMillisecondDatetime: 'YYYY-MM-DDTHH:mm:ss.SSS',   
		        defaultDate: 'YYYY-MM-DD',                             
		        defaultTime: 'HH:mm',                                
		        defaultTimeSecond: 'HH:mm:ss',                 
		        defaultTimeMillisecond: 'HH:mm:ss.SSS',           
		        defaultWeek: 'GGGG-[W]WW',    
		        defaultMonth: 'YYYY-MM'
			 },

			get : function( arg ){
				if( arg ){
					return this[ arg ]();
				}
			},

			set : function( arg, val ) {
				if( arg ) {
					if( val.constructor == Object ) {
						for( var key in val ) {
							this[ key ]( val[ key ] );
						}
						return this
					} else {
						return this[ arg ]( val );
					}
				}
			},

			constructFormat : constructFormat,

			i18N : i18N
		})

		new Array( { prop : 'date', array : [ proto.weekLong, proto.weekShort, proto.weekMid] }, { prop : 'day', array : [ proto.weekLong, proto.weekShort, proto.weekMid] } , { prop : 'month', array : [ proto.shortMon, proto.longMon ] }, { prop : 'year'}, { prop : 'fullYear' }, { prop : 'hours' }, { prop : 'minutes' }, { prop : 'seconds' }, { prop : 'milliseconds' },{ prop : 'UTCMilliseconds' }, { prop : 'time' } ).forEach( function( val ) {
			
			proto[ val.prop ] = function( arg ){
				if( this.validate() ) {
					var dob = this.toDate();
					var prop = val.prop[ 0 ].toUpperCase() + val.prop.slice( 1 );
					if( this.isDef( arg ) ) {
						if( arg.constructor == String ) {
							for( var i = 0; i < val.array.length; i++ ) {
								var ret = this.find( val.array[ i ], arg )
								if( ret.mon ) {
									arg = ret.index;
									break;
								}
							}
						} else if( arg.constructor == Number && Math.floor( arg ) != arg ) {
							if( val.prop == 'year' ) {
								val.prop = 'month';
								arg = Math.round( arg * 12 );
							} else {
								arg = Math.round( arg )
							}
						}
						if( val.prop == 'day' ) {
							dob.setDate( dob.getDate() + ( arg - dob.getDay() ) );
						} else{
							dob[ 'set' + prop ]( arg );
						}
						return this;
					} else {
						return dob[ 'get' + prop ]();
					}
				}
			}
		});

		$L.extend( proto, {
			week : function( arg ) {
				if( this.validate() ) {
					var dob = this.toDate();
					if( this.isDef( arg ) ) {
						dob.setDate( dob.getDate() + ( arg - this.week() ) * 7 );
						return this;
					} else{
						return this.getWeekReverse( dob, 1 ).week;
					}
				}
			},

			quarter : function( arg ) {
				if( this.validate() ) {
					var dob = this.toDate();
					if( this.isDef( arg ) ) {
						var mon = dob.getMonth();
						dob.setMonth( dob.getMonth() + ( arg - this.quarter() ) * 3 );
						return this;
					} else{
						return Math.ceil( dob.getMonth() / 3 );
					}
				}
			},

			add : function( val, prop, cyclic ) {

				if( val < 0 ){
					return this.subtract( Math.abs( val ), prop, cyclic );
				}

				if( this.validate() ) {
					var dob = this.toDate();
					if( this.isDef( prop ) ) {
					 	var old_time = dob.getTimezoneOffset(),
					 	newmoment = this.set( prop, this.get( prop ) + val );
					 	if( cyclic ){
							return convertCyclic.call( this, newmoment );
						}
						return newmoment;
					}
				}
			},

			subtract : function( val, prop, cyclic ) {

				if( val < 0 ){
					return this.add( Math.abs( val ), prop, cyclic );
				}

				if( this.validate() ) {
					var dob = this.toDate();
					if( this.isDef( prop ) ) {
						var newmoment = this.set( prop, this.get( prop ) - val );
						if( cyclic ){
							return convertCyclic.call( this, newmoment );
						}
						return newmoment;
					}
				}
			},

			modify : function( val, prop, cyclic ){

				if( this.validate() ){

					if( prop == "month" ){
						if( val > 0 ){
							add_value.call( this, val );
						} else {
							deduct_value.call( this, Math.abs( val ) );
						}
					} else{
						this.add( val, prop, cyclic );
					}

					if( cyclic ){
						convertCyclic.call( this, this );
					}

					return this;
				}
			},

			startOf : function( prop ){
				if( this.validate() ){
					var dob = this.toDate(),
					flag,
					format = this.format(),
					replace = [],
					year = Number( format.slice( 0, 4 ) ),
					month = Number( format.slice( 5, 7 ) ),
					date = Number( format.slice( 8, 10 ) ),
					hour = Number( format.slice( 11, 13 ) ),
					minute = Number( format.slice( 14, 16 ) ),
					second = Number( format.slice( 17, 19 ) ),
					milliseconds = dob.getMilliseconds(),
					to_deduct = 0,
					old_time = this.timezoneOffset( dob );

					if( prop == "week" ){
						var weekLong = this.weekLong,
						name = this.format( 'dddd' ),
						wod = this.wod,
						__index = weekLong.indexOf( name ),
						diff = ( __index - wod + 7 ) % 7;
						to_deduct = diff * 24 * 60 * 60 * 1e3;
						flag = true;
						prop = "hour";
					}

					switch( prop ){
						case "year" : {
							flag = true;
						}
						case "month" : {
							if( flag ){
								to_deduct += this.totdate( month - 1, this.isLeap( year ) ) * 24 * 60 * 60 * 1e3;
							}
							flag = true;
						}
						case "date" : 
						case "day" : {
							if( flag ){
								to_deduct += ( date - 1 ) * 24 * 60 * 60 * 1e3;
							}
							flag = true;
						}
						case "hour" : {
							if( flag ){
								to_deduct += hour * 60 * 60 * 1e3;
							}
							flag = true;
						}
						case "minute" : {
							if( flag ){
								to_deduct += minute * 60 * 1e3;
							}
							flag = true;
						}
						case "second" : {
							if( flag ){
								to_deduct += second * 1e3;
							}
						}
					}

					if( to_deduct ){
						dob.setTime( dob.getTime() - to_deduct - milliseconds );

						var new_time = this.timezoneOffset( dob ),
						diff = new_time - old_time;

						if( diff ){
							dob.setTime( dob.getTime() + diff * 60 * 1e3 );
						}
					}

					return this;
				}
			},

			endOf : function( prop ){
				if( this.validate() ){

					this.startOf( prop );

					var dob = this.toDate(),
					format = this.format(),
					replace = [],
					year = Number( format.slice( 0, 4 ) ),
					month = Number( format.slice( 5, 7 ) ),
					date = Number( format.slice( 8, 10 ) ),
					hour = Number( format.slice( 11, 13 ) ),
					minute = Number( format.slice( 14, 16 ) ),
					second = Number( format.slice( 17, 19 ) ),
					milliseconds = dob.getMilliseconds(),
					to_add = 0,
					old_time = this.timezoneOffset( dob );

					if( prop == "week" ){
						to_add += 7 * 24 * 60 * 60 * 1e3;
					}

					switch( prop ){
						case "year" : {
							to_add += this.totdate( 12, this.isLeap( year ) ) * 24 * 60 * 60 * 1e3;
						}
						break;
						case "month" : {
							var is_leap = this.isLeap( year );

							to_add += ( this.totdate( month, is_leap ) - this.totdate( month - 1, is_leap ) ) * 24 * 60 * 60 * 1e3;	
						}
						break;
						case "date" : 
						case "day" : {
							to_add += ( 24 - hour ) * 60 * 60 * 1e3;
						}
						break;
						case "hour" : {
							to_add += ( 60 - minute ) * 60 * 1e3;
						}
						break
						case "minute" : {
							to_add += ( 60 - second ) * 1e3;
						}
						break;
						case 'second' : {
							to_add += 1e3;
						}
					}

					if( to_add ){
						dob.setTime( dob.getTime() + to_add - 1 );

						var new_time = this.timezoneOffset( dob ),
						diff = new_time - old_time;

						if( diff ){
							dob.setTime( dob.getTime() + diff * 60 * 1e3 );
						}
					}

					return this;
				}
			},

			fromNow : function( arg, to_accurate ){
				if( this.validate() ){
					var today = this,
					past_date = $L.moment( arg );

					if( !past_date.validate() ){
						return;
					}

					var old_time = today.get( 'time' ),
					new_time = past_date.get(  'time' ),
					diff = parseInt( ( new_time - old_time ) / 1000 ),
					past = diff < 0,
					limits = { years : { val : 320 * 24 * 60 * 60, conv : 365 * 24 * 60 * 60 }, months : { val : 26 * 24 * 60 * 60, conv : 30 * 24 * 60 * 60 }, days : { val : 22 * 60 * 60, conv : 24 * 60 * 60 }, hours : { val : 45 * 60, conv : 60 * 60 }, minutes : { val : 44, conv : 60 }, seconds : { val : 0, conv : 1 } },
					timestamp = new_time - old_time,
					ns1 = to_accurate ? 'conv' : 'val',
					ns2 = to_accurate ? 'floor' : 'round',
					fn = function( _diff, obj ){
						var key,
						value;

						for( key in limits ){
							if( _diff >= limits[ key ][ ns1 ] ) {
								val = Math[ ns2 ]( _diff / limits[ key ].conv );
								value = val;

								var new_diff = _diff - val * limits[ key ].conv;
								if( new_diff > 0 ){
									fn( new_diff, obj );
								}
								break;
							}
						}

						obj[ key ] = { value : value };

						return {
							property : key,
							value : value
						};
					},
					obj = { past : past, timestamp : timestamp };

					diff = Math.abs( diff ); 

					return $L.extend( obj, fn( diff, obj ) );
				}
			},

			isDst : function(){

				if( this.validate() ){
					var __start = $L.moment( this ).startOf( 'day' ),
					__end = $L.moment( this ).endOf( 'day' );

					this.__start = __start;
					this.__end = __end;
					
					return __start.format( 'Z' ) != __end.format( 'Z' );
				}

				return false;
			},

			dstPoint : function( time_format, increment ){
				if( this.validate() && this.isDst() ){
					var start = $L.moment( this.__start ),
					format = start.format( 'Z' ),
					change,
					count = 0,
					limit;

					increment = increment || 30;
					limit = 1440 / increment;
					time_format = time_format || "HH:mm:ss";

					while( count < limit ){
						var new_format = start.add( increment, 'minutes' ).format( 'Z' ),
						rgx = /(\+|\-)(\d{2}):(\d{2})$/;
						if( format !=  new_format ){
							var diff = this.convertTimeZone( format.match( rgx ) ) - this.convertTimeZone( new_format.match( rgx ) );

							change = {
								moment : $L.moment( start ).subtract( 1, 'seconds' ),
								time : start.add( 1, 'day' ).subtract( diff, 'minutes' ).format( time_format ),
								value : diff,
								timeZoneOld : format,
								timeZoneNew : new_format
							};

							break;
						}
						count++;
					}	

					return change;
				}
			},

			getWeekDays : function( start, end ){

				if( this.validate() ){
					start = start == void 0 ? 1 : start;
					end = end == void 0 ? 5 : end;

					if( end < start ){
						end += 7;
					}

					var dobj = this.getDObj(),
					__time = dobj.getTime(),
					__day = dobj.getDay(),
					final = [],
					diff = end - start,
					off = __day - start,
					one_day = 24 * 60 * 60 * 1e3;

					for( var i = 0; i <= diff; i++ ){
						final.push( $L.moment( new Date( __time - ( off - i ) * one_day ) ) );
					}

					return final;
				}
			}
		} );

		function convertCyclic( newmoment ){
			var dob = this.toDate();
			
			dob.setFullYear( parseInt( this.getCorrectYear( this.crctLength( Number( this.format( 'YYYY' ) ) % 100, 2 ) ) ) );
			return this;
		}

		function i18N( format, callBack, convert_numbers ){
			if( this.validate() ){
				var parsed = this.parseFormat( this.replaceTxt( format ) ).reverse();
				format = format.replace( /{{|}}/g, '' );

				if( callBack == true ){
					convert_numbers = callBack;
					callBack = void 0;
				}

				parsed.forEach( function( item ){
					var __format = item.format,
					value = __format.val,
					formatted = this.format( value ),
					i18ned = window._lyteUiUtils ? _lyteUiUtils.i18n( formatted ) : formatted,
					index = item.index;

					// if( convert_numbers && !__format.str ){
						// debugger
					// }

					format = format.slice( 0, index ) + ( callBack ? callBack( formatted, i18ned, value ) : i18ned ) + format.slice( index + value.length );
				}.bind( this ) );

				return format;
			}
		}

		function add_value( value ){

			var ref_date = parseInt( this.format( 'DD' ) );

			while( value-- ){
				var ref_moment = $L.moment( this ).endOf( 'month' ), 
				cur_end = parseInt( ref_moment.format( 'DD' ) ),
				end = parseInt( ref_moment.add( 1, 'milliseconds' ).endOf( 'month' ).format( 'DD' ) ),
				to_add = Math.max( cur_end, ref_date ) - ref_date + Math.min( ref_date, end );

				this.add( to_add, 'day' );
			}

		}

		function deduct_value( value ){
			
			var ref_date = parseInt( this.format( 'DD' ) );

			while( value-- ){
				var ref_moment = $L.moment( this ).startOf( 'month' ), 
				cur_date = parseInt( this.format( 'DD' ) ),
				end = parseInt( ref_moment.subtract( 1, 'milliseconds' ).format( 'DD' ) ),
				to_subtract = cur_date + Math.max( 0, end - ref_date );

				this.subtract( to_subtract, 'day' );
			}
		}

	}
})(window);