'use strict';

var AsciiTime = {
    50: ['*       ',
         '*       ',
         '*       ',
         '*       ',
         '******  '
    ],

    10: [
        '*    *  ',
        ' *  *   ',
        '  **    ',
        ' *  *   ',
        '*    *  '
    ],

    5: [
        '*        *  ',
        ' *      *   ',
        '  *    *    ',
        '   *  *     ',
        '    **      '
    ],

    1: [
        '*****  ',
        '  *    ',
        '  *    ',
        '  *    ',
        '*****  '
    ],

    0: [
        '*   *  ',
        '**  *  ',
        '* * *  ',
        '*  **  ',
        '*   *  '
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
    50: 'L',
    10: 'X',
    5: 'V',
    1: 'I',
    0: 'N',
    ':': ':'
};

var arabicNumbers = [1, 5, 10, 50];
var resultStr = '';
var result = [];

/**
 * @param {String} time – время в формате HH:MM (например, 09:05)
 * @returns {String} – время римскими цифрами (IX:V)
 */
function romanTime(time) {
    var timeInStr = time.match(/(\d){1,2}:(\d){1,2}/);
    var hours = timeInStr[0].split(':')[0];
    var minutes = timeInStr[0].split(':')[1];

    resultStr = '';
    result = [];
    if (isTimeValid(hours, minutes)) {
        parseToRomanNum(hours);
        parseToRomanNum(':');
        parseToRomanNum(minutes);
        showRomanTime();

        return resultStr;
    }
}

function isTimeValid(hours, minutes) {
    if (isNaN(parseInt(hours)) || isNaN(parseInt(minutes))) {
        throw new TypeError('Данное значение не является числом!');
    } else if (isTimeInLimit(hours, minutes)) {
        return true;
    }

    throw new TypeError('Значение выходит за пределы значений времени!');
}

function isTimeInLimit(hours, minutes) {
    if (Number(hours) > 23 || Number(minutes) > 59 || Number(hours) < 0 || Number(minutes) < 0) {
        return false;
    }

    return true;
}

function showRomanTime() {
    var lineForShow = '';

    for (var j = 0; j < AsciiTime[1].length; j++) {

        for (var k = 0; k < result.length; k++) {
            lineForShow += result[k][j];
        }

        lineForShow += '\n';
    }

    console.log(lineForShow);
}

function parseToRomanNum(num) {
    if (num === '00' || num === '0') {
        result.push(AsciiTime[0]);
        resultStr += RomanNumbers[0];

        return;
    } else if (num === ':') {
        result.push(AsciiTime[':']);
        resultStr += RomanNumbers[':'];

        return;
    }

    for (var i = arabicNumbers.length - 1; i >= 0; i--) {
        num = pushAndReturnNewArabicNumber(Number(num), i);
    }
}

function pushAndReturnNewArabicNumber(num, i) {
    while (num >= arabicNumbers[i]) {
        if (num + 1 === arabicNumbers[i + 1]) {
            result.push(AsciiTime[arabicNumbers[i + 1] - num]);
            result.push(AsciiTime[arabicNumbers[i + 1]]);
            resultStr += RomanNumbers[arabicNumbers[i + 1] - num];
            resultStr += RomanNumbers[[arabicNumbers[i + 1]]];
            num -= arabicNumbers[i + 1] - ([arabicNumbers[i + 1] - num]);
            continue;
        }

        result.push(AsciiTime[arabicNumbers[i]]);
        resultStr += RomanNumbers[arabicNumbers[i]];
        num -= arabicNumbers[i];
    }

    return num;
}

module.exports = romanTime;
