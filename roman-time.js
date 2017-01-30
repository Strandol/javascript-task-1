'use strict';

var AsciiTime = {
    0: [
        '*   *  ',
        '**  *  ',
        '* * *  ',
        '*  **  ',
        '*   *  '
    ],

    1: [
        '*****  ',
        '  *    ',
        '  *    ',
        '  *    ',
        '*****  '
    ],

    5: [
        '*        *  ',
        ' *      *   ',
        '  *    *    ',
        '   *  *     ',
        '    **      '
    ],

    10: [
        '*    *  ',
        ' *  *   ',
        '  **    ',
        ' *  *   ',
        '*    *  '
    ],

    50: ['*       ',
         '*       ',
         '*       ',
         '*       ',
         '******  '
    ],

    ':': [
        '    ',
        '**  ',
        '    ',
        '**  ',
        '    '
    ]
};

var RomanNumbers = {
    0: 'N',
    1: 'I',
    5: 'V',
    10: 'X',
    50: 'L',
    ':': ':'
};

var arabicNumbers = [1, 5, 10, 50];

/**
 * @param {String} time – время в формате HH:MM (например, 09:05)
 * @returns {String} – время римскими цифрами (IX:V)
 */
function romanTime(time) {
    var hours = parseInt(time.match(/(\d{1,2}):/)[1]);
    var minutes = parseInt(time.match(/:(\d{1,2})/)[1]);

    if (!isTimeValid(hours, minutes)) {
        throw new TypeError('Enter correct value of time!');
    }

    var romTime = parseToRomanNum(hours).concat(parseToRomanNum(':'), parseToRomanNum(minutes));
    renderToAscii(romTime);

    return toRomanString(hours, minutes);
}

function isTimeValid(hours, minutes) {
    if (isNaN(parseInt(hours)) || isNaN(parseInt(minutes))) {
        return false;
    } else if (isTimeInLimit(hours, minutes)) {
        return true;
    }

    return false;
}

function isTimeInLimit(hours, minutes) {
    return hours < 24 && minutes < 60 && hours >= 0 && minutes >= 0;
}

function getStrRepOfRomanNum(num) {
    var resultArr = [];
    var resultStr = '';

    if (!num) {
        return RomanNumbers[0];
    }

    pushArabicNumbers(resultArr, RomanNumbers, num, arabicNumbers.length - 1);

    for (var k = 0; k < resultArr.length; k++) {
        resultStr += resultArr[k];
    }

    return resultStr;
}

function parseToRomanNum(num) {
    var arrayOfNum = [];

    if (!num) {
        arrayOfNum.push(AsciiTime[0]);
    } else if (num === ':') {
        arrayOfNum.push(AsciiTime[':']);
    }

    pushArabicNumbers(arrayOfNum, AsciiTime, Number(num), arabicNumbers.length - 1);

    return arrayOfNum;
}

function pushArabicNumbers(resultArr, numArr, num, i) {
    if (!num) {
        return;
    }

    while (num >= arabicNumbers[i]) {
        if (num + 1 === arabicNumbers[i + 1]) {
            resultArr.push(numArr[arabicNumbers[i + 1] - num]);
            resultArr.push(numArr[arabicNumbers[i + 1]]);
            num -= arabicNumbers[i + 1] - ([arabicNumbers[i + 1] - num]);
            continue;
        }

        resultArr.push(numArr[arabicNumbers[i]]);
        num -= arabicNumbers[i];
    }

    pushArabicNumbers(resultArr, numArr, num, --i);
}

function renderToAscii(romanNum) {
    var lineForShow = '';

    for (var i = 0; i < AsciiTime[1].length; i++) {
        for (var j = 0; j < romanNum.length; j++) {
            lineForShow += romanNum[j][i];
        }

        lineForShow += '\n';
    }

    console.log(lineForShow);
}

function toRomanString(hours, minutes) {
    return getStrRepOfRomanNum(hours) + ':' + getStrRepOfRomanNum(minutes);
}

module.exports = romanTime;
