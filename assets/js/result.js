//stores solution in order
if (readCookie('disclaimerAccepted') != 'true') {
    goToDisclaimer();
}

var solution = [];
var cookieArray = document.cookie.split(';').sort();
for (var i = 0; i < cookieArray.length; i++) {
    var cookieElement = cookieArray[i];

    while (cookieElement.charAt(0) === ' ') {
        cookieElement = cookieElement.substring(1);
    }
    // console.log('cooie elem ' + cookieElement)
    if (cookieElement.indexOf('a') == 0) {
        if (i < 10) {
            var start = 'a0' + i + '=';
        } else
            var start = 'a' + i + '=';
        solution.push(cookieElement.substring(start.length, cookieElement.length))
    }
}

//calc risk
var sum = 0;
for (let i = 0; i < solution.length; i++) {
    sum += parseInt(solution[i]) - 1;
}
var risk = Math.round(sum / 36 * 100);
document.querySelector('.percentage').innerHTML = risk + '%';

createCookie('points', sum);
createCookie('percentage', risk);


//stores question numers of no-goes
var noGoes = [];
for (let i = 0; i < solution.length; i++) {
    if (solution[i] == 1) {
        if (i + 1 < 10) {
            noGoes.push('0' + (i + 1));
        } else
            noGoes.push(i + 1);
    }
}
if (noGoes.length == 0) {
    for (let i = 0; i < solution.length; i++) {
        if (solution[i] == 2) {
            if (i + 1 < 10) {
                noGoes.push('0' + (i + 1));
            } else
                noGoes.push(i + 1);
        }
    }
    var type = document.querySelectorAll('.type')
    type[0].innerHTML = 'eher ein';
    type[1].innerHTML = 'eher'
    type[2].innerHTML = 'wahrscheinlich nicht'
}
if(noGoes.length > 0){
    var noNoGoesText = document.querySelectorAll('.no-no-go-text');
    console.log(noNoGoesText)
    for (let i = 0; i < noNoGoesText.length; i++) {
        noNoGoesText[i].style.display = 'none'
    }
    if(noGoes.length == 1){
        document.querySelector('.countSideEffect').innerHTML = 'ist nur eine'
    }
}
console.log(noGoes)
if (noGoes.length == 0) {
    var noGoesText = document.querySelectorAll('.no-go-text');
    for (let i = 0; i < noGoesText.length; i++) {
        noGoesText[i].style.display = 'none'
    }
}

//Show No Goes
for (let i = 0; i < noGoes.length; i++) {
    var span = document.createElement('span');
    var img = document.createElement('img');
    span.classList.add('no-go__item');
    span.appendChild(img);
    document.getElementById('no-go_element').appendChild(span);
    img.setAttribute('src', '../assets/img/sideeffect_' + noGoes[i] + '.svg');

    if (noGoes[i] == 1) {
        span.setAttribute('data-sideeffect', 'Kopfschmerzen')
    } else if (noGoes[i] == 2) {
        span.setAttribute('data-sideeffect', 'Gewichtszunahme')
    } else if (noGoes[i] == 3) {
        span.setAttribute('data-sideeffect', 'Stimmungsver??nderung')
    } else if (noGoes[i] == 4) {
        span.setAttribute('data-sideeffect', 'Depression')
    } else if (noGoes[i] == 5) {
        span.setAttribute('data-sideeffect', 'Verminderte Libido')
    } else if (noGoes[i] == 6) {
        span.setAttribute('data-sideeffect', 'Hautausschlag')
    } else if (noGoes[i] == 7) {
        span.setAttribute('data-sideeffect', 'Ausfallende Monatsblutung')
    } else if (noGoes[i] == 8) {
        span.setAttribute('data-sideeffect', 'Schmerzende Brust')
    } else if (noGoes[i] == 9) {
        span.setAttribute('data-sideeffect', 'Wassereinlagerungen')
    } else if (noGoes[i] == 10) {
        span.setAttribute('data-sideeffect', 'Trockene Augen')
    } else if (noGoes[i] == 11) {
        span.setAttribute('data-sideeffect', 'Schlafst??rungen')
    } else if (noGoes[i] == 12)
        span.setAttribute('data-sideeffect', 'Thrombose')

}

//Go to Disclaimer
var disclaimer = document.getElementById('disclaimerBtn')
disclaimer.addEventListener('click', function () {
    goToDisclaimer();
})

function goToDisclaimer() {
    createCookie('currentQuestion', 'result');
    document.location = '/disclaimer'
}