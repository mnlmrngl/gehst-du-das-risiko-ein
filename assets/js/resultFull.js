var points = readCookie('points');
var risk = readCookie('percentage');

document.getElementById('points').innerHTML = points;
document.querySelector('.percentage').innerHTML = risk + '%';

var itemPointPlaceces = document.querySelectorAll('.highlight');

var solution = [];
var cookieArray = document.cookie.split(';').sort();
console.log('coolieArray '+cookieArray)
for (var i = 0; i < cookieArray.length; i++) {
    var cookieElement = cookieArray[i];

    while (cookieElement.charAt(0) === ' ') {
        cookieElement = cookieElement.substring(1);
    }
    if (cookieElement.indexOf('a') == 0) {
        if (i < 10) {
            var start = 'a0' + i + '=';
            console.log('<10 '+i)

        } else{
            var start = 'a' + i + '=';
            console.log('>10 '+i)
        }
        solution.push(cookieElement.substring(start.length, cookieElement.length))
    }
}

console.log(solution.length)

for (let i = 0; i < itemPointPlaceces.length; i++) {
    itemPointPlaceces[i].innerHTML = solution[i]-1 + '/3';
}

document.getElementById('disclaimerBtn').addEventListener('click', function(){
    createCookie('currentQuestion', 'resultFull');
    document.location = '/disclaimer'
});