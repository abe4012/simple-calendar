'use strict';

//officeClosedCategory
const sat = 6;
const satTxt = String( sat );
const sun = 0;
const sunTxt = String( sun );
const storeTxt = "store";
const compTxt = "comp";

const store = 1;
const comp = 2;

//className for inputForm
const text = "text";
//Get currentTime
const currentTime = new Date();

//Set for using Date
const thisYear = currentTime.getFullYear();
const thisMonth = currentTime.getMonth();

//dateArray for output
let dateArray = [];

//Error Detect
let errDetect = 0;


const addForm = (categTxt) => {
    const arrayNum = document.getElementsByClassName("month_" + categTxt).length - 1;
    const formEdit = document.getElementById('form_area_' + categTxt);

    if (arrayNum < 100) {
        //Create inputForm
        const inputMonth = document.createElement('input');
        inputMonth.type = 'number';
        inputMonth.classList.add('month_' + categTxt);

        //Create <p>
        const pMonth = document.createElement("p");
        pMonth.classList.add(text + "_month_" + categTxt);

        //Create Text(月)
        const textMonth = document.createTextNode("月 ");
        pMonth.appendChild(textMonth);

        //Add inputForm and Text
        formEdit.appendChild(inputMonth);
        formEdit.appendChild(pMonth);

        //For Closed & CompletelyClosed
        if (categTxt === "store" || categTxt === "comp") {
            const inputDay = document.createElement('input');
            inputDay.type = 'number';
            inputDay.classList.add('day_' + categTxt);

            const pDay = document.createElement("p");
            pDay.classList.add(text + "_day_" + categTxt);

            const textDay = document.createTextNode("日");
            pDay.appendChild(textDay);

            formEdit.appendChild(inputDay);
            formEdit.appendChild(pDay);
        }
        //Create <br>
        const br = document.createElement('br');
        br.className = "br_" + categTxt;
        formEdit.appendChild(br);

    }  else {
        alert("これ以上入力欄を増やせません。");
    }
}


const removeForm = (categTxt) => {
    const arrayNum = document.getElementsByClassName("month_" +categTxt).length - 1;
    const formEdit = document.getElementById('form_area_' + categTxt);

    //Remove inputForm and Text
    if (arrayNum >= 0) {
        formEdit.removeChild(document.getElementsByClassName("month_"+ categTxt)[arrayNum]);
        formEdit.removeChild(document.getElementsByClassName(text + "_month_" + categTxt)[arrayNum]);
        if (categTxt === storeTxt || categTxt === compTxt) {
            formEdit.removeChild(document.getElementsByClassName("day_" + categTxt)[arrayNum]);
            formEdit.removeChild(document.getElementsByClassName(text + "_day_" + categTxt)[arrayNum]);
        }
        formEdit.removeChild(document.getElementsByClassName("br_" + categTxt)[arrayNum]);
    } else {
        alert("入力欄が0になりました。");
    }
}



//Generate array of "month and days" from "month and weekDay" 
const monthToDate = (month,categ,closedCateg) => {
    if (1 <= month && month <= 12) {
        let closedYear = 0;
        month < thisMonth + 1 ? closedYear = thisYear + 1 : closedYear = thisYear;

        const firstWeekDay = new Date(closedYear, month - 1, 1).getDay();
        const endDate = new Date(closedYear, month, 0).getDate();

        let firstCategDay = 0;
        firstWeekDay > categ ? firstCategDay = 7 - firstWeekDay + categ + 1 : firstCategDay = categ - firstWeekDay + 1;

        let monthToDate_array = [];
        for (let i = firstCategDay; i <= endDate; i += 7) {
            monthToDate_array.push(closedCateg * 10000 + month * 100 + i);
        }

        return(monthToDate_array);
    } else if (month == "") {
        return(void(0));
    } else {
        errDetect++;
        alert("入力された値が不正です。");
        return(void(0));
    }
}


//Generate array of "date" from "month and day"
const dateValueToDateArray = (month,day,closedCateg) => {
    let closedYear = 0;
    month < thisMonth + 1 ? closedYear = thisYear + 1 : closedYear = thisYear;

    const endDate = new Date(closedYear, month, 0).getDate();

    if (1 <= month && month <= 12 && 1 <= day && day <= endDate) {
        let date = [];
        date.push(closedCateg * 10000 + month * 100 + day);
        return(date);
    } else if (month == "" || day == "") {
        return(void(0));
    } else {
        errDetect++;
        alert("入力された値が不正です。");
        return(void(0));
    }
}


//Generate dateArray
const genDateArray = (categ) => {
    let categTxt = 0;
    let closedCateg = 0;
    switch (categ) {
        case sat:
            categTxt = satTxt;
            closedCateg = store;
            break;
        case sun:
            categTxt = sunTxt;
            closedCateg = comp;
            break;
        case store:
            categTxt = storeTxt;
            closedCateg = store;
            break;
        case comp:
            categTxt = compTxt;
            closedCateg = comp;
            break;
    }
    const arrayLength = document.getElementsByClassName("month_" + categTxt).length - 1;
    if (categTxt === satTxt || categTxt === sunTxt) {
        for (let i = 0; i <= arrayLength; i++) {
            dateArray = dateArray.concat(monthToDate(Number(document.getElementsByClassName("month_" + categTxt).item(i).value),categ,closedCateg));
        }

    } else if (categTxt === storeTxt || categTxt === compTxt) {
        for (let i = 0; i <= arrayLength; i++) {
            dateArray = dateArray.concat(dateValueToDateArray(Number(document.getElementsByClassName("month_" + categTxt).item(i).value),Number(document.getElementsByClassName("day_" + categTxt).item(i).value),closedCateg));
        }

    } else {
        alert("入力された値が不正です。");
    }
    dateArray = dateArray.filter(v => v)
    return(dateArray);

}


const saveFile = () => {
    dateArray.length = 0;
    let array = [sat, sun, store, comp];
    for ( let i = 0; i < array.length; i++) {
        genDateArray(array[i]);
    }

    if (errDetect === 0) {
        const thisMonth = currentTime.getMonth() +1;
        const varName = "dateArray";
        let dateArrayNum = "";
        let fileName = "";
        switch (thisMonth % 3) {
            case 0:
                dateArrayNum = "var " + varName + "_3 = ["
                fileName = varName + "_3.js";
                break;
            case 1:
                dateArrayNum = "var " + varName + "_1 = ["
                fileName = varName + "_1.js";
                break;
            case 2:
                dateArrayNum = "var " + varName + "_2 = ["
                fileName = varName + "_2.js";
                break;
        }

        let txtBlob = new Blob([dateArrayNum + dateArray + "];"],{type:"text/plan"});
        let txtLink = document.createElement('a');
        txtLink.href = URL.createObjectURL(txtBlob);
        txtLink.download = fileName;
        txtLink.click();
    } else {
        alert("エラーのため保存出来ませんでした。");
    }
}
