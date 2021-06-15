//Check if disclaimer is accepted
if (readCookie('disclaimerAccepted') != 'true') {
    document.location = 'disclaimer';
}

var activeQuestion;
var activeQuestionNumber;
var backBtn;
var nextBtn;

//Check if user has paused quiz by reading disclaimer
if (readCookie('currentQuestion') == null) {
    //new start
    activeQuestion = document.querySelector("[data-number='1']");
    activeQuestionNumber = activeQuestion.dataset.number;
} else if (readCookie('currentQuestion') == 'result') {
    document.location = 'results'
} else {
    //continue from disclaimer
    activeQuestionNumber = readCookie('currentQuestion');
    activeQuestion = document.querySelector("[data-number='" + activeQuestionNumber + "'");

    //set answers
    var solution = [];
    var cookieArray = document.cookie.split(';').sort();

    for (var i = 0; i < cookieArray.length; i++) {
        var cookieElement = cookieArray[i];

        while (cookieElement.charAt(0) === ' ') {
            cookieElement = cookieElement.substring(1);
        }
        if (cookieElement.indexOf('disclaimerAccepted') == -1 && cookieElement.indexOf('currentQuestion') == -1) {
            if (i < 10) {
                var start = 'a0' + i + '=';
            } else
                var start = 'a' + i + '=';
            solution.push(cookieElement.substring(start.length, cookieElement.length))
        }
    }
    var inputSliders = document.querySelectorAll("input[type='range']");
    for (let i = 0; i < inputSliders.length; i++) {
        inputSliders[i].value = solution[i];
    }
}

activeQuestion.classList.add('question--active')
document.getElementById("question__num").textContent = activeQuestionNumber;
nextBtn = document.querySelector('.question__next');
backBtn = document.getElementById('back');


//Next Question
nextBtn.addEventListener('click', function () {
    if (activeQuestion.dataset.number <= 12) {
        activeQuestion.classList.remove('question--active');

        //new Active Question

        activeQuestion = activeQuestion.nextElementSibling;
        activeQuestion.classList.add('question--active');

        activeQuestionNumber = activeQuestion.dataset.number;
        document.getElementById("question__num").textContent = activeQuestionNumber;


        if (activeQuestionNumber > 1) {
            backBtn.style.display = 'flex'
            if (activeQuestionNumber == 13)
                nextBtn.style.display = 'none';
            if (activeQuestionNumber == 13) {
                document.getElementById('controls').style.display = 'none'
            }
        }

    }
});


//Prev Question
document.getElementById('back').addEventListener('click', function () {
    if (activeQuestion.dataset.number != 1) {
        activeQuestion.classList.remove('question--active');

        activeQuestion = activeQuestion.previousElementSibling;
        activeQuestion.classList.add('question--active');

        activeQuestionNumber = activeQuestion.dataset.number;
        document.getElementById("question__num").textContent = activeQuestionNumber;
    }
    if (activeQuestionNumber < 12) {
        nextBtn.style.display = 'flex'
        if (activeQuestionNumber == 1)
            backBtn.style.display = 'none';
    }
});

if (activeQuestionNumber == 1)
    backBtn.style.display = 'none';
else if (activeQuestionNumber == 13)
    nextBtn.style.display == 'none'

//Cookies mit Lösungen setzen
document.getElementById('getSolution').addEventListener('click', function () {
    setResultCookies();
    document.location = 'results';
});

//Go to Disclaimer
var disclaimer = document.getElementById('disclaimer')
disclaimer.addEventListener('click', function () {
    createCookie('currentQuestion', activeQuestionNumber);
    setResultCookies();
});

function setResultCookies() {
    var inputValues = document.querySelectorAll('input[type="range"]');
    console.log(inputValues)

    for (let i = 0; i < inputValues.length; i++) {
        if (i < 9) {
            createCookie('a0' + (i + 1), inputValues[i].value);
        } else
            createCookie('a' + (i + 1), inputValues[i].value);
    }
}