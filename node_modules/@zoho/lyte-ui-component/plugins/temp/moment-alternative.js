
// ; (function () {
//     let global_config = {
//         "Europe/London": {
//             timezone: 0,
//             shift: 60,
//             start: {
//                 month: 3,
//                 adj: -1,
//                 day: 0,
//                 hours: 1,
//                 minutes: 0,
//                 fact: 1
//             },
//             end: {
//                 month: 10,
//                 adj: -1,
//                 day: 0,
//                 hours: 2,
//                 minutes: 0,
//                 fact: -1
//             }
//         },
//         "Asia/Calcutta": {
//             timezone: 330,
//             shift: 0,
//             start: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: 1
//             },
//             end: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: -1
//             },

//         },
//         "Us/Pacific": {
//             timezone: -480,
//             shift: 60,
//             start: {
//                 month: 3,
//                 adj: 2,
//                 day: 0,
//                 hours: 2,
//                 minutes: 0,
//                 fact: 1
//             },
//             end: {
//                 month: 11,
//                 adj: 1,
//                 day: 0,
//                 hours: 2,
//                 minutes: 0,
//                 fact: -1
//             },
//         },
//         "America/New_York": {
//             timezone: -300,
//             shift: 60,
//             start: {
//                 month: 3,
//                 adj: 2,
//                 day: 0,
//                 hours: 2,
//                 minutes: 0,
//                 fact: 1
//             },
//             end: {
//                 month: 11,
//                 adj: 1,
//                 day: 0,
//                 hours: 2,
//                 minutes: 0,
//                 fact: -1
//             },
//         },
//         "America/Chicago": {
//             timezone: -360,
//             shift: 60,
//             start: {
//                 month: 3,
//                 adj: 2,
//                 day: 0,
//                 hours: 2,
//                 minutes: 0,
//                 fact: 1
//             },
//             end: {
//                 month: 11,
//                 adj: 1,
//                 day: 0,
//                 hours: 2,
//                 minutes: 0,
//                 fact: -1
//             },
//         },
//         "America/Denver": {
//             timezone: -420,
//             shift: 60,
//             start: {
//                 month: 3,
//                 adj: 2,
//                 day: 0,
//                 hours: 2,
//                 minutes: 0,
//                 fact: 1
//             },
//             end: {
//                 month: 11,
//                 adj: 1,
//                 day: 0,
//                 hours: 2,
//                 minutes: 0,
//                 fact: -1
//             },
//         },
//         "America/Los_Angeles": {
//             timezone: -480,
//             shift: 60,
//             start: {
//                 month: 3,
//                 adj: 2,
//                 day: 0,
//                 hours: 2,
//                 minutes: 0,
//                 fact: 1
//             },
//             end: {
//                 month: 11,
//                 adj: 1,
//                 day: 0,
//                 hours: 2,
//                 minutes: 0,
//                 fact: -1
//             },
//         },
//         "America/Anchorage": {
//             timezone: -540,
//             shift: 60,
//             start: {
//                 month: 3,
//                 adj: 2,
//                 day: 0,
//                 hours: 2,
//                 minutes: 0,
//                 fact: 1
//             },
//             end: {
//                 month: 11,
//                 adj: 1,
//                 day: 0,
//                 hours: 2,
//                 minutes: 0,
//                 fact: -1
//             },
//         },
//         "Pacific/Honolulu": {
//             timezone: -600,
//             shift: 0,
//             start: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: 0
//             },
//             end: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: 0
//             },
//         },
//         "Africa/Abidjan": {
//             timezone: 0,
//             shift: 0,
//             start: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: 0
//             },
//             end: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: 0
//             },
//         },
//         "Africa/Cairo": {
//             timezone: 120,
//             shift: 0,
//             start: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: 0
//             },
//             end: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: 0
//             },
//         },
//         "Africa/Johannesburg": {
//             timezone: 120,
//             shift: 0,
//             start: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: 0
//             },
//             end: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: 0
//             },
//         },
//         "Africa/Lagos": {
//             timezone: 60,
//             shift: 0,
//             start: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: 0
//             },
//             end: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: 0
//             },
//         },
//         "Africa/Nairobi": {
//             timezone: 180,
//             shift: 0,
//             start: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: 0
//             },
//             end: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: 0
//             },
//         }, "Pacific/Midway": {
//             timezone: -660,
//             shift: 0,
//             start: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: 0
//             },
//             end: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: 0
//             },
//         }, "Pacific/Nuie": {
//             timezone: -660,
//             shift: 0,
//             start: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: 0
//             },
//             end: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: 0
//             },
//         }, "Pacific/Pago_Pago": {
//             timezone: -660,
//             shift: 0,
//             start: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: 0
//             },
//             end: {
//                 month: 0,
//                 adj: 0,
//                 day: 0,
//                 hours: 0,
//                 minutes: 0,
//                 fact: 0
//             },
//         },






//     }

//     function startDate(timezone, year) {
//         let startDate = global_config[timezone].start.month != 0 ? global_config[timezone].start.adj < 0 ? getDate(year, global_config[timezone].start.month, global_config[timezone].start.day, timezone) : nthWeekdayOfMonth(global_config[timezone].start.day, global_config[timezone].start.adj, new Date(year, global_config[timezone].start.month, 1, 0, 0, 0)) : null
//         return (startDate != null && startDate != "Invalid Date") ? Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), global_config[timezone].start.hours, global_config[timezone].start.minutes, 0) : null
//     }

//     function endDate(timezone, year) {
//         let endDate = global_config[timezone].end.month != 0 ? global_config[timezone].end.adj < 0 ? getDate(year, global_config[timezone].end.month, global_config[timezone].end.day, timezone) : nthWeekdayOfMonth(global_config[timezone].end.day, global_config[timezone].end.adj, new Date(year, global_config[timezone].end.month, 1, 0, 0, 0)) : null
//         return (endDate != null && endDate != "Invalid Date") ? Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), global_config[timezone].end.hours, global_config[timezone].end.minutes, 0) - (global_config[timezone].shift * 60 * 1000) : null
//     }

//     // console.log(startDate("Us/Pacific" , 2023))


//     function lyteTimeConverter(date, month, year, hour, minute = 0, second = 0, timeZone) {

//         this.dstStart = startDate(timeZone, year) != null ? startDate(timeZone, year) + (global_config[timeZone].shift * 60 * 1000) : null
//         this.dstEnd = endDate(timeZone, year) != null ? endDate(timeZone, year) - (global_config[timeZone].shift * 60 * 1000) : null
//         this.date = date
//         this.month = month
//         this.year = year
//         this.hour = hour
//         this.minute = minute
//         this.second = second
//         this.timeZone = timeZone
//         this.offset = global_config[timeZone].timezone
//         this.timeZone = timeZone
//         this.monthDays = {
//             1: 31,  // january
//             2: ((year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)) ? 29 : 28, // february
//             3: 31,  // march
//             4: 30,  // april
//             5: 31,  // may
//             6: 30,  // june
//             7: 31,  // july
//             8: 31,  // august
//             9: 30,  // september
//             10: 31, // october
//             11: 30, // november
//             12: 31  // december
//         }
//         this.milliSeconds = ((second * 1000) + (minute * 60 * 1000) + (hour * 60 * 60 * 1000) + ((date - 1) * 24 * 60 * 60 * 1000) + (this.getDaysFromMonthObj(month) * 24 * 60 * 60 * 1000) + (((year) - 1970) * 365 * 24 * 60 * 60 * 1000) + (this.leapNum(year - 1) * 24 * 60 * 60 * 1000))
//         if (this.dstStart != null && this.dstEnd != null) { if (this.dstStart <= this.milliSeconds && this.dstEnd > this.milliSeconds) { this.offset += global_config[timeZone].shift } }
//         this.utc = this.milliSeconds - (this.offset * 60 * 1000)

//         // return { 0 : this.milliSeconds}
//     }

//     lyteTimeConverter.prototype.setDate = function (date) {
//         this.milliSeconds = this.milliSeconds - ((this.date) * 24 * 60 * 60 * 1000)
//         this.milliSeconds += (date * 24 * 60 * 60 * 1000)

//         this.updateData(this.milliSeconds)
//         return this.toString()
//     }

//     lyteTimeConverter.prototype.setMonth = function (month) {
//         // back to january of same date
//         this.milliSeconds = this.milliSeconds - (this.getDaysFromMonthObj(this.month) * 24 * 60 * 60 * 1000)

//         let years = Math.floor(Math.abs(month) / 12)
//         let months = month % 12

//         if (month > 0) {
//             // for adding the number of years from input
//             for (let i = 1; i <= years; i++) {
//                 this.milliSeconds = this.milliSeconds + (this.isleapYear(this.year) ? 366 : 365) * 24 * 60 * 60 * 1000 // checking leapyear and adding accordingly
//                 this.year = this.year + 1 // should be automated
//             }
//             this.month = 1 // after changing years
//             // for adding the number of month from input
//             for (let i = 1; i < months; i++) {
//                 this.milliSeconds = this.milliSeconds + ((this.monthDays[i] * 24 * 60 * 60 * 1000))
//             }
//             this.month = months != 0 ? months - 1 : months
//         }

//         if (month < 0) {
//             // for adding the number of years from input
//             for (let i = 1; i <= years; i++) {
//                 this.milliSeconds = this.milliSeconds - (this.isleapYear(this.year) ? 366 : 365) * 24 * 60 * 60 * 1000 // checking leapyear and adding accordingly
//                 this.year = this.year - 1 // should be automated
//             }
//             this.month = 1 // after changing years
//             // for adding the number of month from input

//             for (let i = 0; i < Math.abs(months); i++) {
//                 this.milliSeconds = this.milliSeconds - ((this.monthDays[12 - i] * 24 * 60 * 60 * 1000))
//             }
//             this.month = months != 0 ? 12 - (Math.abs(months) - 1) : 1
//         }
//         this.updateData(this.milliSeconds)
//         return this.toString()
//     }

//     lyteTimeConverter.prototype.setYear = function (year) {
//         // saving the date and subracting to jan for calculation

//         let rem = (this.getDaysFromMonthObj(this.month) * 24 * 60 * 60 * 1000)
//         let isleapYear = this.isleapYear(this.year)

//         this.milliSeconds -= rem
//         if (year == 0) {

//         } else if (year < this.year) {
//             for (let i = Math.abs(this.year); i > year; i--) {
//                 this.milliSeconds = this.milliSeconds - ((this.isleapYear(this.year - 1) ? 366 : 365) * 24 * 60 * 60 * 1000)
//                 this.year = this.year - 1
//             }
//         } else if (year > this.year) {
//             // start adding from current year
//             for (let i = Math.abs(this.year); i < year; i++) {
//                 this.milliSeconds = this.milliSeconds + ((this.isleapYear(this.year) ? 366 : 365) * 24 * 60 * 60 * 1000)
//                 this.year = this.year + 1
//             }
//         } else if (year < 0) {
//             // start adding from current year
//             for (let i = Math.abs(this.year); i > year; i--) {
//                 this.milliSeconds = this.milliSeconds - ((this.isleapYear(this.year - 1) ? 366 : 365) * 24 * 60 * 60 * 1000)
//                 this.year = this.year - 1
//             }
//         }

//         // re-adding the subtracted date 
//         this.milliSeconds += rem != 0 ? ((isleapYear && this.isleapYear(this.year)) || (!isleapYear && !this.isleapYear(this.year))) ? rem : (isleapYear && !this.isleapYear(this.year)) ? (rem - (1 * 24 * 60 * 60 * 1000)) : (rem + (1 * 24 * 60 * 60 * 1000)) : 0
//         // this.isleapYear(this.year) ?  rem 

//         this.updateData(this.milliSeconds)
//         return this.toString()
//     }

//     lyteTimeConverter.prototype.setHour = function (hour) {

//         // bringing the Hour to 00
//         this.milliSeconds = this.milliSeconds - ((this.hour * 60 * 60 * 1000))

//         this.milliSeconds = this.milliSeconds + (hour * 60 * 60 * 1000)

//         this.updateData(this.milliSeconds)
//         return this.toString()
//     }

//     lyteTimeConverter.prototype.setMinute = function (minute) {
//         //bringing the Minute to 00
//         this.milliSeconds = this.milliSeconds - ((this.minute * 60 * 1000))
//         this.milliSeconds = this.milliSeconds + (minute * 60 * 1000)

//         this.updateData(this.milliSeconds)
//         return this.toString()
//     }

//     lyteTimeConverter.prototype.setSecond = function (second) {

//         // bringing the second to 00
//         this.milliSeconds = this.milliSeconds - ((this.second * 1000))
//         this.milliSeconds = this.milliSeconds + (second * 1000)

//         this.updateData(this.milliSeconds)
//         return this.toString()
//     }

//     lyteTimeConverter.prototype.setMillisecond = function (ms) {
//         this.milliSeconds = this.milliSeconds + ms

//         this.updateData(this.milliSeconds)
//         return this.toString()
//     }

//     lyteTimeConverter.prototype.setTimeZone = function (timezone) {
//         this.timeZone = timezone
//         this.dstStart = startDate(this.timeZone, this.year)
//         this.dstEnd = endDate(this.timeZone, this.year)
//         this.offset = global_config[this.timeZone].timezone
//         if (this.dstStart != null && this.dstEnd != null) {
//             if (this.dstStart <= this.milliSeconds && this.dstEnd > this.milliSeconds) {
//                 this.offset += global_config[this.timeZone].shift
//             }
//         }
//         this.milliSeconds = this.utc + (this.offset * 60 * 1000)

//         let seconds = Math.floor(this.milliSeconds / 1000);
//         let minutes = Math.floor(seconds / 60);
//         let hours = Math.floor(minutes / 60);
//         let days = Math.floor(hours / 24);

//         let year = 1970;
//         let daysInYear = 365;
//         while (days >= daysInYear) {
//             days -= daysInYear;
//             year++;
//             daysInYear = this.isleapYear(year) ? 366 : 365;
//         }

//         let month = 0;
//         const daysPerMonth = [31, this.isleapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//         while (days >= daysPerMonth[month]) {
//             days -= daysPerMonth[month];
//             month++;
//         }

//         let day = days + 1;
//         let hour = hours % 24;
//         let minute = minutes % 60;
//         let second = seconds % 60;

//         this.date = day; this.month = month; this.year = year; this.hour = hour; this.minute = minute; this.second = second;


//         return this.toString()
//     }

//     lyteTimeConverter.prototype.updateData = function (milliseconds) {

//         let seconds = Math.floor(milliseconds / 1000);
//         let minutes = Math.floor(seconds / 60);
//         let hours = Math.floor(minutes / 60);
//         let days = Math.floor(hours / 24);

//         let year = 1970;
//         let daysInYear = 365;
//         while (days >= daysInYear) {
//             days -= daysInYear;
//             year++;
//             daysInYear = this.isleapYear(year) ? 366 : 365;
//         }

//         let month = 0;
//         const daysPerMonth = [31, this.isleapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//         while (days >= daysPerMonth[month]) {
//             days -= daysPerMonth[month];
//             month++;
//         }

//         let day = days + 1;
//         let hour = hours % 24;
//         let minute = minutes % 60;
//         let second = seconds % 60;

//         this.date = day; this.month = month; this.year = year; this.hour = hour; this.minute = minute; this.second = second;
//         this.dstStart = startDate(this.timeZone, this.year)
//         this.dstEnd = endDate(this.timeZone, this.year)

//         // this.dstStart = startDate(this.timeZone , this.year)!=null ? startDate(this.timeZone , this.year) + (global_config[this.timeZone].shift*60*1000) : null
//         // this.dstEnd   = endDate  (this.timeZone , this.year)!=null ? endDate  (this.timeZone , this.year) - (global_config[this.timeZone].shift*60*1000) : null
//         this.offset = global_config[this.timeZone].timezone
//         if (this.dstStart != null && this.dstEnd != null) {
//             if (this.dstStart <= this.milliSeconds && this.dstEnd > this.milliSeconds) {
//                 this.offset += global_config[this.timeZone].shift
//             }
//         }
//         this.utc = this.milliSeconds - (this.offset * 60 * 1000)
//     }

//     lyteTimeConverter.prototype.convertMillisecondsToDateTime = function (milliseconds) {

//         let seconds = Math.floor(milliseconds / 1000);
//         let minutes = Math.floor(seconds / 60);
//         let hours = Math.floor(minutes / 60);
//         let days = Math.floor(hours / 24);

//         let year = 1970;
//         let daysInYear = 365;
//         while (days >= daysInYear) {
//             days -= daysInYear;
//             year++;
//             daysInYear = this.isleapYear(year) ? 366 : 365;
//         }

//         let month = 0;
//         const daysPerMonth = [31, this.isleapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//         while (days >= daysPerMonth[month]) {
//             days -= daysPerMonth[month];
//             month++;
//         }

//         let day = days + 1;

//         let hour = hours % 24;
//         let minute = minutes % 60;
//         let second = seconds % 60;

//         return year + "-" + (month + 1).toString().padStart(2, '0') + "-" + day.toString().padStart(2, '0') + "T" + hour.toString().padStart(2, '0') + ":" + minute.toString().padStart(2, '0') + ":" + second.toString().padStart(2, '0') + (this.offset >= 0 ? "+" : "-") + toHoursAndMinutes(Math.abs(this.offset));
//     }

//     lyteTimeConverter.prototype.addDate = function (date) {
//         return this.setDate(this.date + date)
//     }

//     lyteTimeConverter.prototype.addMonth = function (month) {
//         return this.setMonth(this.month + month)
//     }

//     lyteTimeConverter.prototype.addYear = function (year) {
//         return this.setYear(this.year + year)
//     }

//     lyteTimeConverter.prototype.addHour = function (hour) {
//         return this.setHour(this.hour + hour)
//     }

//     lyteTimeConverter.prototype.addMinute = function (minute) {
//         return this.setMinute(this.minute + minute)
//     }

//     lyteTimeConverter.prototype.addSecond = function (second) {
//         return this.setSecond(this.second + second)
//     }


//     lyteTimeConverter.prototype.getDate = function () {
//         return this.date
//     }

//     lyteTimeConverter.prototype.getMonth = function () {
//         return this.month
//     }

//     lyteTimeConverter.prototype.getYear = function () {
//         return this.year
//     }

//     lyteTimeConverter.prototype.getHour = function () {
//         return this.hour
//     }

//     lyteTimeConverter.prototype.getMinute = function () {
//         return this.minute
//     }

//     lyteTimeConverter.prototype.getSecond = function () {
//         return this.second
//     }

//     lyteTimeConverter.prototype.isleapYear = function (year) {
//         return ((year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0))
//     }

//     lyteTimeConverter.prototype.calNum = function (year) {
//         return parseInt(year / 4, 10) - parseInt(year / 100, 10) + parseInt(year / 400, 10);
//     }


//     lyteTimeConverter.prototype.leapNum = function (r) {
//         let l = 1970
//         l--;
//         let num1 = this.calNum(r);
//         let num2 = this.calNum(l);
//         return (num1 - num2)
//     }

//     lyteTimeConverter.prototype.getDaysFromMonthObj = function (month) {
//         let days = 0
//         for (let i = 1; i < month; i++) {
//             days = days + this.monthDays[i]
//         }
//         return days
//     }

//     lyteTimeConverter.prototype.toString = function () {
//         return this.convertMillisecondsToDateTime(this.utc + (this.offset * 60 * 1000))
//     }

//     function getDate(year, month, day, timezone) { // 0 - sunday , 1 - saturday
//         var date = new Date(year, month, 1, 12, 0, 0,);  // change (1 , month , year, 12)
//         let weekday = date.getDay();
//         let dayDiff = weekday === 0 ? 7 : weekday;
//         date.setDate(date.getDate() - dayDiff - day);
//         return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0, 0,);
//     }

//     function toHoursAndMinutes(totalMinutes) {
//         const hours = Math.floor(totalMinutes / 60);
//         const minutes = totalMinutes % 60;
//         return padToTwoDigits(hours) + ":" + padToTwoDigits(minutes);
//     }

//     function padToTwoDigits(num) {
//         return num.toString().padStart(2, '0');
//     }

//     function nthWeekdayOfMonth(weekday, n, date) {
//         var count = 0, i = 0,
//             // idate = new Date(date.getFullYear() , date.getMonth(), 1);
//             idate = new Date(date.getFullYear(), date.getMonth() - 1, 1, 0, 0, 0);
//         while (true && i < 100) {
//             if (idate.getDay() === weekday) {
//                 if (++count == n) {
//                     break;
//                 }
//             }
//             idate.setDate(idate.getDate() + 1);
//             i++
//         }
//         return idate;
//     }
//     window.lyteTimeConverter = lyteTimeConverter;
//     window.convert = lyteTimeConverter.prototype.convertMillisecondsToDateTime


// })();