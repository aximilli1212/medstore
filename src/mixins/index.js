
const mixin = {
    methods:
        {
            findObjectByID: (id,subject) =>
            {
                let foundObject = null;
                subject.forEach(element => {
                    if(element.id == id)
                        foundObject = element;
                });
                return foundObject;
            },

            getObjectDescByID(id,subject,fieldName)
            {
                let foundDesc = '';
                subject.forEach(element => {
                    if(element.id == id)
                        foundDesc = element[fieldName].toLowerCase();
                });
                return foundDesc;
            },
            dateFromPeriod(fperiod)
            {
                const year = fperiod.slice(0,4);
                const month = fperiod.slice(4) - 1;
                return new Date(year, month, 1, 0, 0, 0, 0);
            },

            periodToDate(fperiod)
            {
                const year = fperiod.slice(0,4);
                const month = fperiod.slice(4) - 1;
                let dt = new Date(year, month, 1, 0, 0, 0, 0);

                var m = new Array();
                m[0] = "January";
                m[1] = "February";
                m[2] = "March";
                m[3] = "April";
                m[4] = "May";
                m[5] = "June";
                m[6] = "July";
                m[7] = "August";
                m[8] = "September";
                m[9] = "October";
                m[10] = "November";
                m[11] = "December";

                var mon = m[dt.getMonth()];


                var period = mon+' '+year;


                return period;

            },


            dateToPeriod(dt)
            {
                if(!Date.parse(dt)) return null;
                let mth = (dt.getMonth() + 1).toString();
                let day = dt.getDate().toString();
                if(mth < 10) mth = "0" + mth;
                if(day < 10) day = "0" + day;
                return dt.getFullYear().toString() + mth ;
            },
            date_format(dt)
            {
                if(!Date.parse(dt)) return null;
                let mth = (dt.getMonth() + 1).toString();
                let day = dt.getDate().toString();
                if(mth < 10) mth = "0" + mth;
                if(day < 10) day = "0" + day;
                return dt.getFullYear().toString() + "-" + mth + "-" + day;
            },

            convertTo24(time12h) {

               const [time, modifier] = time12h.split(' ');
              let modif = modifier.toUpperCase();

               let [hours, minutes] = time.split(':');

                if (hours === '12') {
                   hours = '00';
                   }

                   if (modif === 'PM') {
                      hours = parseInt(hours, 10) + 12;
               }

              return hours + ':' + minutes;
}


},

}
export default mixin;