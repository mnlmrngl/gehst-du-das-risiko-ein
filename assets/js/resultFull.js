var points = readCookie('points');
var risk = readCookie('percentage');

document.getElementById('points').innerHTML = points;
document.querySelector('.percentage').innerHTML = risk + '%';

var itemPointPlaceces = document.querySelectorAll('.highlight');

var solution = [];
var cookieArray = document.cookie.split(';').sort();
for (var i = 0; i < cookieArray.length; i++) {
    var cookieElement = cookieArray[i];

    while (cookieElement.charAt(0) === ' ') {
        cookieElement = cookieElement.substring(1);
    }
    if (cookieElement.indexOf('a') == 0) {
        if (i < 10) {
            var start = 'a0' + i + '=';
        } else {
            var start = 'a' + i + '=';
        }
        solution.push(cookieElement.substring(start.length, cookieElement.length))
    }
}


for (let i = 0; i < itemPointPlaceces.length; i++) {
    itemPointPlaceces[i].innerHTML = solution[i] - 1 + '/3';
    itemPointPlaceces[i].nextElementSibling.innerHTML = getExplenation(solution[i]-1)
}


function getExplenation(risk) {
    if (risk == 0)
        return ' - du gehst das Risiko auf keinen Fall ein';
    else if (risk == 1)
        return ' - du gehst das Risiko ungern ein';
    else if (risk == 2)
        return ' - du gehst das Risiko eher ein';
    else if (risk == 3)
        return ' - du gehst das Risiko auf jeden Fall ein';
}

document.getElementById('disclaimerBtn').addEventListener('click', function () {
    createCookie('currentQuestion', 'resultFull');
    document.location = '/disclaimer'
});


document.getElementById('downloadResult').addEventListener('click', function () {
    const result = document.getElementById('resultToDownload');
    console.log(result)
    html2pdf().from(result).save();
});