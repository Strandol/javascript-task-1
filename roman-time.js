'use strict';

/**
 * @param {String} time – время в формате HH:MM (например, 09:05)
 * @returns {String} – время римскими цифрами (IX:V)
 */
function romanTime(time) {
    var hours = time.split(':')[0];
    var minutes = time.split(':')[1];

    if (isTimeValid(hours, minutes)) {
        return convertNumber(hours) + ':' + convertNumber(minutes);
    }
}

function isTimeValid(hours, minutes) {
    if (isNaN(parseInt(hours)) || isNaN(parseInt(minutes))) {
        throwError();

        return false;
    } else if (isTimeInLimit(hours, minutes) && hours.length === 2 && minutes.length === 2) {
        return true;
    }

    return false;
}

function isTimeInLimit(hours, minutes) {
    if (Number(hours) > 23 || Number(minutes) > 59 || Number(hours) < 0 || Number(minutes) < 0) {
        throwError();

        return false;
    }

    return true;
}

function convertNumber(num) {
    if (num === '00' || num === '0') {
        return 'N';
    }

    var isDecade = true;
    var decadePart = Number(num.slice(0, 1));
    var singlePart = Number(num.slice(1, 2));

    num = convertDigitPart(decadePart, isDecade);
    num += convertDigitPart(singlePart, !isDecade);

    return num;
}

function convertDigitPart(digitPart, isDecade) {
    var num = '';
    var digits;

    if (isDecade) {
        digits = {
            one: 'X',
            four: 'XL'
        };
    } else {
        digits = {
            one: 'I',
            four: 'IV'
        };
    }

    if (digitPart < 4) {
        num += addRomanOne(num, digitPart, digits);
    } else if (digitPart === 4) {
        num += digits.four;
    } else if (isDecade) {
        num += 'L';
    } else if (digitPart < 9) {
        num += 'V';
        num += addRomanOne(num, num - 5);
    } else {
        num += 'IX';
    }

    return num;
}

function addRomanOne(num, limit, digits) {
    for (var i = 0; i < limit; i++) {
        num += digits.one;
    }

    return num;
}

function throwError() {
    throw new TypeError('Введите корректный формат времени');
}

module.exports = romanTime;
