let CountriesDataset;

function setup() {
    createCanvas(500, 300);
    textSize(18);
    ReadCSV();
}

function preload() {
    CountriesDataset = loadTable('./data/currency_countries.csv', 'csv', 'header');
}

function ReadCSV() {

    for (let row of CountriesDataset.rows) {
        ShowOnPage(row, "country1");
        ShowOnPage(row, "country2");
    }
}

function ShowOnPage(rows, id) {
    var node = document.createElement("option");
    node.setAttribute("value", rows.get('CurrencyCode'));
    var textnode = document.createTextNode(rows.get('CurrencyName'));
    node.appendChild(textnode);
    document.getElementById(id).appendChild(node);
}

var CurrencyConverted = () => {
    let amount1 = document.getElementById("amount1").value;
    let amount2 = document.getElementById("amount2");
    let country1 = document.getElementById("country1").value;
    let country2 = document.getElementById("country2").value;
    let query = `${country1}_${country2}`;
    if (country1 == "" || country2 == "") {
        alert("Not selected Country")
        return
    }
    let callingAPI = 'https://free.currconv.com/api/v7/convert?q=' + query +
        '&compact=ultra&apiKey=fc6c65d3b5d84e0137b9';
    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open('GET', callingAPI, true);
    req.onload = function () {
        if (req.status == 200) {
            var loc = JSON.parse(req.responseText);
            let originalAmount = Number(amount1) * loc[query];
            amount2.value = originalAmount;
        };
        req.onerror = function () {
            if (req.status == 0) {
                alert('Please disable your ad-blocker');
            }
        };
    }
    req.send(null);

};