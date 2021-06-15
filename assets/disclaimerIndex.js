var checkbox = document.getElementById('checkboxDisclaimer')
var start = document.getElementById('start');

checkbox.addEventListener('click', function () {
    start.classList.toggle('button--disabled')
    if (checkbox.checked == true) {
        console.log(true)
    } else {
        console.log(false);
    }
});


start.addEventListener("click", function () {
    if (document.getElementById('checkboxDisclaimer').checked == true) {
        createCookie('disclaimerAccepted', 'true');
        document.location = '../';
        document.querySelector('label').classList.remove('error')

    } else {
        document.querySelector('label').classList.add('error')
    }
});



//disclaimer from Quiz
if (readCookie('disclaimerAccepted') == 'true') {
    var continueBtn = document.getElementById('continue');
    //remove old stuff
    start.style.display = 'none';
    document.querySelector('label').style.display = 'none'
    //shoe new stuff
    document.getElementById('leave').style.display = 'block';
    continueBtn.style.display = 'block';

    continueBtn.addEventListener('click', function () {
        if (readCookie('currentQuestion') == 'result')
            document.location = '../results';
        else
            document.location = '../'
    });
}





function createCookie(cookieName, cookieValue) {
    document.cookie = cookieName + '=' + cookieValue + '; path=/;';
    console.log('Cookie created: ' + document.cookie);
}

function readCookie(object) {
    var element = object + '=';
    var cookieArray = document.cookie.split(';');

    for (var i = 0; i < cookieArray.length; i++) {
        var cookieElement = cookieArray[i];
        while (cookieElement.charAt(0) === ' ') {
            cookieElement = cookieElement.substring(1);
        }
        if (cookieElement.indexOf(element) === 0) {
            return cookieElement.substring(element.length, cookieElement.length);
        }
    }
}