function pad(number, length, padChar) {

    if (!padChar) {
        padChar = '0';
    }

    var str = '' + number;
    while (str.length < length) {
        str = padChar + str;
    }
    return str;
}