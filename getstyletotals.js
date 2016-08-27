'use strict';

function getStyleTotals(rows) {

    var styleTotals = [
        {"style": "Burley","grams": 0,"tins": 0},
        {"style": "Burley/KY","grams": 0,"tins": 0},
        {"style": "Semois","grams": 0,"tins": 0},
        {"style": "Virginia","grams": 0,"tins": 0},
        {"style": "Virginia/KY","grams": 0,"tins": 0},
        {"style": "VA/Burley","grams": 0,"tins": 0},
        {"style": "VA/Bur/KY","grams": 0,"tins": 0},
        {"style": "VA/Bur/Per","grams": 0,"tins": 0},
        {"style": "VA/KY/Per","grams": 0,"tins": 0},
        {"style": "VA/Bur/KY/Per","grams": 0,"tins": 0},
        {"style": "Virginia/Per","grams": 0,"tins": 0},
        {"style": "Oriental","grams": 0,"tins": 0},
        {"style": "Oriental/Per","grams": 0,"tins": 0},
        {"style": "Cyprian Latakia","grams": 0,"tins": 0},
        {"style": "Cyprian Lat/Per","grams": 0,"tins": 0},
        {"style": "Cyprian Lat/Oriental","grams": 0,"tins": 0},
        {"style": "Cyprian Lat/Or/Per","grams": 0,"tins": 0},
        {"style": "Syrian Latakia","grams": 0,"tins": 0},
        {"style": "Syrian Latakia/Per","grams": 0,"tins": 0},
        {"style": "Syrian Latakia/Or","grams": 0,"tins": 0},
        {"style": "Syrian Lat/Or/Per","grams": 0,"tins": 0},
        {"style": "Cigar","grams": 0,"tins": 0},
        {"style": "Cigar/Latakia","grams": 0,"tins": 0},
        {"style": "Aromatic","grams": 0,"tins": 0},
        {"style": "Other","grams": 0,"tins": 0}
    ];

    for (var i=0; i<rows.length; i++) {
        if (rows[i].style=="Burley" || rows[i].style=="Burley with Cavendish" || rows[i].style=="Burley with Cavendish, whiskey") {
            styleTotals[0].grams+=rows[i].grams;
            styleTotals[0].tins++;
        } else if (rows[i].style=="Burley with Kentucky" || rows[i].style=="Kentucky with Burley") {
            styleTotals[1].grams+=rows[i].grams;
            styleTotals[1].tins++;
        } else if (rows[i].style=="Semois") {
            styleTotals[2].grams+=rows[i].grams;
            styleTotals[2].tins++;
        } else if (rows[i].style=="Virginia" || rows[i].style=="Virginia with rum") {
            styleTotals[3].grams+=rows[i].grams;
            styleTotals[3].tins++;
        } else if (rows[i].style=="Virginia with Kentucky" || rows[i].style=="Kentucky with Virginia") {
            styleTotals[4].grams+=rows[i].grams;
            styleTotals[4].tins++;
        } else if (rows[i].style=="Virginia with Burley" || rows[i].style=="Burley with Virginia" ||
                   rows[i].style=="Virginia with Burley, rum" || rows[i].style=="Virginia with Cavendish" ||
                   rows[i].style=="Burley with Virginia, Cavendish" || rows[i].style=="Burley with Virginia, molasses" ||
                   rows[i].style=="Virginia with Burley, maple, rum") {
            styleTotals[5].grams+=rows[i].grams;
            styleTotals[5].tins++;
        } else if (rows[i].style=="Burley with Kentucky, Virginia" || rows[i].style=="Virginia with Burley, Kentucky" ||
                   rows[i].style=="Virginia with Burley, Kentucky, whisky") {
            styleTotals[6].grams+=rows[i].grams;
            styleTotals[6].tins++;
        } else if (rows[i].style=="Burley with Virginia, Perique" || rows[i].style=="Virginia with Burley, Perique" ||
                   rows[i].style=="Virginia with Perique, Cavendish, Burley, rum") {
            styleTotals[7].grams+=rows[i].grams;
            styleTotals[7].tins++;
        } else if (rows[i].style=="Virginia with Kentucky, Perique" || rows[i].style=="Virginia with Perique, Kentucky" ||
                   rows[i].style=="Virginia with Cajun Black") {
            styleTotals[8].grams+=rows[i].grams;
            styleTotals[8].tins++;
        } else if (rows[i].style=="Burley with Kentucky, Virginia, Perique" || rows[i].style=="Virginia with Burley, Kentucky, Perique") {
            styleTotals[9].grams+=rows[i].grams;
            styleTotals[9].tins++;
        } else if (rows[i].style=="Virginia with Perique" || rows[i].style=="Perique") {
            // not sure straight perique belongs here
            styleTotals[10].grams+=rows[i].grams;
            styleTotals[10].tins++;
        } else if (rows[i].style=="Burley with Virginia, Kentucky, Oriental" || rows[i].style=="Virginia with Oriental" ||
                   rows[i].style=="Oriental") {
            styleTotals[11].grams+=rows[i].grams;
            styleTotals[11].tins++;
        } else if (rows[i].style=="Burley with Oriental, Perique" || rows[i].style=="Burley with Virginia, Oriental, Perique" ||
                   rows[i].style=="Virginia with Burley, Oriental, Kentucky, Perique" || rows[i].style=="Virginia with Burley, Oriental, Perique" ||
                   rows[i].style=="Virginia with Oriental, Perique") {
            styleTotals[12].grams+=rows[i].grams;
            styleTotals[12].tins++;
        } else if (rows[i].style=="Black Cavendish with Burley, Cavendish, Latakia" || rows[i].style=="Burley with Cavendish, Latakia" ||
                   rows[i].style=="Burley with Latakia" || rows[i].style=="Virginia with Burley, Latakia" ||
                   rows[i].style=="Virginia with Latakia" || rows[i].style=="Virginia with Latakia, whiskey" ||
                   rows[i].style=="Latakia with Kentucky, Cavendish") {
            styleTotals[13].grams+=rows[i].grams;
            styleTotals[13].tins++;
        } else if (rows[i].style=="Burley with Latakia, Perique" || rows[i].style=="Virginia with Burley, Latakia, Kentucky, Perique" ||
                   rows[i].style=="Virginia with Burley, Latakia, Perique" || rows[i].style=="Virginia with Latakia, Perique" ||
                   rows[i].style=="Virginia with Latakia, Perique, Burley") {
            styleTotals[14].grams+=rows[i].grams;
            styleTotals[14].tins++;
        } else if (rows[i].style=="Latakia with Oriental, Burley" || rows[i].style=="Virginia with Latakia, Burley, Oriental" ||
                   rows[i].style=="Virginia with Latakia, Oriental" || rows[i].style=="Virginia with Latakia, Oriental, Cavendish" ||
                   rows[i].style=="Virginia with Oriental, Latakia" || rows[i].style=="Virginia with Oriental, Latakia, Cavendish") {
            styleTotals[15].grams+=rows[i].grams;
            styleTotals[15].tins++;
        } else if (rows[i].style=="Virginia with Latakia, Oriental, Perique" || rows[i].style=="Virginia with Latakia, Oriental, Perique, Burley") {
            styleTotals[16].grams+=rows[i].grams;
            styleTotals[16].tins++;
        } else if (rows[i].style=="Virginia with Syrian Latakia" || rows[i].style=="Virginia with Syrian Latakia, Burley") {
            styleTotals[17].grams+=rows[i].grams;
            styleTotals[17].tins++;
        } else if (rows[i].style=="Virginia with Syrian Latakia, Perique") {
            styleTotals[18].grams+=rows[i].grams;
            styleTotals[18].tins++;
        } else if (rows[i].style=="Virginia with Syrian Latakia, Oriental" || rows[i].style=="Virginia with Syrian Latakia, Oriental, Burley") {
            styleTotals[19].grams+=rows[i].grams;
            styleTotals[19].tins++;
        } else if (rows[i].style=="Burley with Syrian Latakia, Oriental, Kentucky, Perique" || rows[i].style=="Virginia with Syrian Latakia, Oriental, Perique") {
            styleTotals[20].grams+=rows[i].grams;
            styleTotals[20].tins++;
        } else if (rows[i].style=="Burley with cigar leaf" || rows[i].style=="Virginia with Burley, Oriental, cigar leaf" ||
                   rows[i].style=="Virginia with Burley, Oriental, cigar leaf, Perique" || rows[i].style=="Virginia with cigar leaf" ||
                   rows[i].style=="Virginia with Oriental, cigar leaf, Kentucky") {
            styleTotals[21].grams+=rows[i].grams;
            styleTotals[21].tins++;
        } else if (rows[i].style=="Burley with cigar leaf, Latakia, Virginia" || rows[i].style=="Cavendish with cigar leaf, Latakia, Perique, Virginia" ||
                   rows[i].style=="Virginia with Latakia, Oriental, cigar leaf") {
            styleTotals[22].grams+=rows[i].grams;
            styleTotals[22].tins++;
        } else if (rows[i].style.search("cherry")>-1 || rows[i].style.search("vanilla")>-1 || rows[i].style.search("fruit")>-1 ||
                   rows[i].style.search("floral")>-1 || rows[i].style.search("coffee")>-1 || rows[i].style.search("anise")>-1 ||
                   rows[i].style.search("clove")>-1 || rows[i].style.search("deer tongue")>-1 || rows[i].style.search("orange")>-1 ||
                   rows[i].style.search("Irish Creme")>-1 || rows[i].style.search("plum")>-1) {
            styleTotals[23].grams+=rows[i].grams;
            styleTotals[23].tins++;
        } else {
            console.log(rows[i].style);
            styleTotals[24].grams+=rows[i].grams;
            styleTotals[24].tins++;
        }
    }
    return styleTotals;
}

module.exports.getStyleTotals = getStyleTotals;
