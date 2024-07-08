//Above Blank
    //ba = blankAbove
    for (let ba = 0; ba < startDay; ba++) {
        eval("cal_" + i).rows[1].cells[ba].innerHTML = "__";
        calCount++;
    }
    //First Week
    //fw = firstWeek
    for (let fw = startDay; fw <= 6; fw++) {
        dateCount++;
        eval("cal_" + i).rows[Math.floor(calCount / 7) + 1].cells[fw].innerHTML = dateCount;
        calCount++;
    }
    //Middle Week
    //mw = middleWeek
    for (let mw = 0; 1 <= Math.floor((endDateCount - dateCount) / 7); mw++) {
        for (let j = 0; j < 7; j++) {
            dateCount++;
            eval("cal_" + i).rows[Math.floor(calCount / 7) + 1].cells[j].innerHTML = dateCount;
            calCount++;
        }
    }
    //Last Week
    //lw = lastWeek
    for (let lw = 0; dateCount < endDateCount; lw++) {
        dateCount++;
        eval("cal_" + i).rows[Math.floor(calCount / 7) + 1].cells[lw].innerHTML = dateCount;
        calCount++;
    }
    //Last Week Blank
    //lwb = lastWeekBlank
    for (let lwb = calCount % 7; lwb < 7; lwb++) {
        eval("cal_" + i).rows[Math.floor(calCount / 7) + 1].cells[lwb].innerHTML = "__";
        calCount++;
    }
    //Below Blank
    //bb = blankBelow
    for (calCount; calCount < 42;) {
        //eb = endBlank
        for (let eb = 0; eb < 7; eb++) {
            eval ("cal_" + i).rows [Math.floor(calCount / 7) + 1].cells[eb].innerHTML = "__";
            calCount++;
        }
    }