var state = {
    questions: [
        {
            question: 'In the 2016 film "Zootopia", Judy Hopps is relegated to what duty on her first day as a police officer?',
            answer: ['Traffic Control', 'Office Filing', 'Parking Duty', 'Domestic Disturbance'],
            correct: 2,
            userAnswer: ''
        },
        {
            question: 'Which 2016 adult CGI-animated film is a parody of Disney, Pixar, DreamWorks Animation and Illumination Entertainment animated films? ',
            answer: ['Henchmen', 'Moana', 'Norm of the North', 'Sausage Party'],
            correct: 3,
            userAnswer: ''
        },
        {
            question: "In what year was Alfred Hitchcock's psychological thriller Psycho released?",
            answer: ['1959', '1960', '1961', '1962'],
            correct: 1,
            userAnswer: ''
        },
        {
            question: 'Who played the female lead role in the 1986 sci-fi movie Aliens?',
            answer: ['Kim Basinger', 'Kelly McGillis', 'Sigourney Weaver', 'Geena Davis'],
            correct: 2,
            userAnswer: ''
        },
        {
            question: 'Which one of these is from 101 Dalmatians?',
            answer: ['Roo', 'Roger', 'Rabbit', 'Rafiki'],
            correct: 1,
            userAnswer: ''
        }

    ],
    question: 0,
    score: 0
}


// render
function renderQuestions(state) {
    var html = `<div><h2 class="h2"></h2>
    <div class="answer1"></div>
    <div class="answer2"></div>
    <div class="answer3"></div>
    <div class="answer4"></div>
    <p class="answerVerdict"></p>
    <button class="submit">Submit Answer</button>
    <button class="continue">Continue</button></div>`;
    var questionHtml = $(html);
    var questionCount = state.question;
    var questions = state.questions[questionCount];
    questionHtml.find('h2').html(questions.question);
    questionHtml.find('.answer1').html(questions.answer[0]).click(answerSelect(0));
    questionHtml.find('.answer2').html(questions.answer[1]).click(answerSelect(1));
    questionHtml.find('.answer3').html(questions.answer[2]).click(answerSelect(2));
    questionHtml.find('.answer4').html(questions.answer[3]).click(answerSelect(3));
    questionHtml.find('.submit').click(submitAnswer);
    $('.questionPage').html(questionHtml);
}

function renderTotal(state) {
    var html = `<div><h2 class="results"></h2>
    <button class="submit">Restart</button></div>`;
    var resultHtml = $(html);
    var score = state.score;
    var total = state.question;
    resultHtml.find('.results').html(`You got ${score} questions right out of ${total} possible.`);
    resultHtml.find('.submit').click(restart);
    $('.resultPage').html(resultHtml);

}

function renderNav (state) {
    var html = `<div><div class="score"></div>
    <div class="questionNumber"></div></div>`;
    var navHtml = $(html);
    if (state.score <= 1) {
        navHtml.find('.score').html(`You got ${state.score} point.`);
    }
    else {
        navHtml.find('.score').html(`You got ${state.score} points.`);
    }
    navHtml.find('.questionNumber').html(`Question ${state.question + 1} out of ${state.questions.length}`);
    $('nav').html(navHtml);
}
// html

function start () {
    $('.start').on('click', function () {
        $('.frontPage').hide();
        $('.questionPage').show();
        renderNav(state);
        renderQuestions(state);
    });
}

function answerSelect(answer) {
    return function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        state.questions[state.question].userAnswer = answer;
        console.log(answer)
    };
}

function submitAnswer() {
    if (!state.questions[state.question].userAnswer){
        alert('Chose an answer.');
        return
    }
    var question = state.questions[state.question];
    if (state.questions[state.question].userAnswer === state.questions[state.question].correct){
        $('.answerVerdict').text(`Correct!, the right answer is ${question.answer[state.questions[state.question].correct]}.`);
        state.score++;
    }
    else {
        $('.answerVerdict').text(`That is incorrect, the correct answer is ${question.answer[state.questions[state.question].correct]}.`);
    }
    state.question++;
    if (state.question < state.questions.length){
        $('.submit').hide();
        $('.continue').css('display', 'block');
        $('.continue').click(function () {
            renderQuestions(state);
            renderNav(state);
            $('.continue').hide();
            $('.submit').show();
        })


    }
    else {
        $('.questionPage').hide();
        $('.resultPage').show();
        renderTotal(state);
        $('nav').hide();
    }

    ;
}

function restart() {
    state.score = 0;
    state.question = 0;
    $('.resultPage').hide();
    $('.frontPage').show();

}

$(function () {
    start();
})