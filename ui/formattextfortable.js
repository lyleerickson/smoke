function formatTextForTable(text, maxLength, includeEllipses) {

    var s = '';

    if (text) {
        s = text;
    }

    if (maxLength && s.length > maxLength) {
        s = s.substring(0,maxLength);
        if (includeEllipses) {
            s +="...";
        }
    }

    return s;
}