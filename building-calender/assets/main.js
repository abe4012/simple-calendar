'use strict';

//Get currentTime
const currentTime = new Date();

//Calendar display months
//1months = 0, 2months = 1
const calDispM = 1;

//Set for using Date
let calDate = [];
let calYear = [];
let calMonth = [];
let calStartDay = [];
let calEndDate = [];
for (let i = 0; i <= calDispM; i++) {
    calDate.push(new Date(currentTime.getFullYear(), currentTime.getMonth() + i, 1));
    calYear.push(calDate[i].getFullYear());
    calMonth.push(calDate[i].getMonth());
    calStartDay.push(calDate[i].getDay());
    calEndDate.push(new Date(calDate[i].getFullYear(), calDate[i].getMonth() + 1, 0).getDate());
}

//dateArray for process
let dateArray = [];



//Generate Calendar
for (let i = 0; i <= calDispM; i++) {
    const month = ("0" + (calMonth[i] + 1)).slice(-2);
    //Fill calendarLabel
    document.querySelector("#calLabel_" + i).innerHTML = calYear[i] + "年" + month + "月";

    //Days CountVariable
    let calCount = 1;
    let dateCount = 1;

    //Write days in calendar
    for (let w = 1; w <= 6; w++) {
        for (let d = 0; d < 7; d++) {
            if (calStartDay[i] < calCount && dateCount <= calEndDate[i]) {
                document.getElementById("cal_" + i).rows[w].cells[d].innerHTML = dateCount;
                dateCount++;
            } else {
                document.getElementById("cal_" + i).rows[w].cells[d].innerHTML = "__";
            }
            calCount++;
        }
    }
}


//Combine array of holidays into dateArray
if (typeof dateArray_1 === 'undefined') {
} else if (dateArray_1 === null) {
} else {dateArray = dateArray.concat(dateArray_1);}
if (typeof dateArray_2 === 'undefined') {
} else if (dateArray_2 === null) {
} else {dateArray = dateArray.concat(dateArray_2);}
if (typeof dateArray_3 === 'undefined') {
} else if (dateArray_3 === null) {
} else {dateArray = dateArray.concat(dateArray_3);}
//Remove duplicates
dateArray = Array.from(new Set(dateArray));


//DateValue to Position in Calendar
const dateValueToPosInCal = (value) => {
    const day = value % 100;
    let month = (value - day) / 100 % 100;
    const categ = (value - (month * 100) - day) / 10000;
    month--;

    let calUse = 0;
    for (let i = 0; i <= calDispM; i++) {
        if (month === calMonth[i]) {
            calUse = i;
            break;
        }
        if (i >= calDispM) {return(void(0));}
    }

    let row = Math.ceil((calStartDay[calUse] + day) / 7);
    let cell = (calStartDay[calUse] + day) % 7;
    0 < (calStartDay[calUse] + day) % 7 ? cell-- : cell = 6;

    return ({categ, calUse, row, cell});

}


//Add closedDays to calendar
for (let k = 0; k < dateArray.length; k++) {
    let posData = dateValueToPosInCal(dateArray[k]);
    if (typeof posData === 'undefined') {continue;}

    let closedCateg = "";
    switch (posData.categ) {
        case 1:
            closedCateg = "storeclosed";
            break;
        case 2:
            closedCateg = "compclosed";
            break; 
    }

    document.getElementById("cal_" + posData.calUse).rows[posData.row].cells[posData.cell].classList.add(closedCateg);

}
