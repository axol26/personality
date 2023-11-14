let questions = [
    {
        number: 1,
        question: "You went to a party last night and when you arrived to school the next day, everybody is talking about something you didn't do. What will you do?",
        choices: [
            { text1: "a) Avoid everything and go with your friends", choice: "A" },
            { text2: "b) Go to the party", choice: "B" },
            { text3: "c) Go to the party and do something else", choice: "C" }
        ]
    },
    {
        number: 2,
        question: "What quality do you excel the most?",
        choices: [
            { text1: "a) Empathy", choice: "A" },
            { text2: "b) Curiosity", choice: "B" },
            { text3: "c) Perseverance", choice: "C" }
        ]
    },
    {
        number: 3,
        question: "You are walking down the street when you see an old lady trying to cross, what will you do?",
        choices: [
            { text1: "a) Go and help her", choice: "A" },
            { text2: "b) Go for a policeman and ask him for help", choice: "B" },
            { text3: "c) Keep walking ahead", choice: "C" }
        ]
    },
    {
        number: 4,
        question: "You had a very difficult day at school, you will maintain a ____ attitude",
        choices: [
            { text1: "a) Depends on the situation", choice: "A" },
            { text2: "b) Positive", choice: "B" },
            { text3: "c) Negative", choice: "C" }
        ]
    },
    {
        number: 5,
        question: "You are at a party and a friend of yours comes over and offers you a drink, what do you do?",
        choices: [
            { text1: "a) Say no thanks", choice: "A" },
            { text2: "b) Drink it until it is finished", choice: "B" },
            { text3: "c) Ignore him and get angry at him", choice: "C" }
        ]
    },
    {
        number: 6,
        question: "You just started in a new school, you will...",
        choices: [
            { text1: "a) Go and talk with the person next to you", choice: "A" },
            { text2: "b) Wait until someone comes over to you", choice: "B" },
            { text3: "c) Not talk to anyone", choice: "C" }
        ]
    },
    {
        number: 7,
        question: "In a typical Friday, you would like to..",
        choices: [
            { text1: "a) Go out with your close friends to eat", choice: "A" },
            { text2: "b) Go to a social club and meet more people", choice: "B" },
            { text3: "c) Invite one of your friends to your house", choice: "C" }
        ]
    },
    {
        number: 8,
        question: "Your relationship with your parents is..",
        choices: [
            { text1: "a) I like both equally", choice: "A" },
            { text2: "b) I like both equally", choice: "B" },
            { text3: "c) I like my Mom the most", choice: "C" }
        ]
    }
]

var results = [
    {
        result: "C",
        main: "Self-Management",
        desc: "You manage yourself well; You take responsibility for your own behavior and well-being."
    },
    {
        result: "A",
        main: "Empathy",
        desc: "You are emphatic. You see yourself in someone else's situation before doing decisions. You tend to listen to other's voices."
    },
    {
        result: "B",
        main: "Self-Awareness",
        desc: "You are conscious of your own character, feelings, motives, and desires. The process can be painful but it leads to greater self-awareness."
    },
] 

var answer = {
    A: 0,
    B: 0,
    C: 0
}

const questionElem = $("#question");
const quesNum = $("#quesID");
const choiceElem = $("#choice");
const choice1Elem = $("#choice1");
const choice2Elem = $("#choice2");
const choice3Elem = $("#choice3");
const btnElem = $("#btn");
const lineElem = $("#line");
const finalElem = $("#final");
const descElem = $("#description");

function submit() {
    if (questions.length == 8) { // start
        btnElem.html("Submit");
        choiceElem.removeClass("hidden");
        quesNum.removeClass("hidden");
        questionElem.removeClass("hidden");
        lineElem.removeClass("hidden");
        let randomIndex = Math.floor(Math.random() * questions.length);
        let currentQuestion = questions.splice(randomIndex, 1);
        showQuestion(currentQuestion);
        
    } else if (questions.length > 0) { //ongoing answering
        let ans = { value: true };
        storeAnswer(ans);
        if (ans["value"]) {
            let randomIndex = Math.floor(Math.random() * questions.length);
            let currentQuestion = questions.splice(randomIndex, 1);
            showQuestion(currentQuestion);
        }

    } else { // all answered
        let ans = { value: true };
        storeAnswer(ans);
        if (ans["value"]) {
            end();
        }
        
    }
}

function showQuestion(question) {
    questionElem.html(question[0]["question"]);
    $("#quesNum").html(question[0]["number"]);
    choice1Elem.html(question[0]["choices"][0]["text1"]);
    choice2Elem.html(question[0]["choices"][1]["text2"]);
    choice3Elem.html(question[0]["choices"][2]["text3"]);
}

function storeAnswer(check) {
    let selectedChoice = $("input[name='choice']:checked");
    if (selectedChoice.val() == undefined) {
        alert("Please select an answer");
        check.value = false;
        return;
    } else {
        for (const element in answer) {
            if (element == selectedChoice.val()) {
                answer[element]++;
                break;
            }
        }
    }
    selectedChoice.prop("checked", false);
}

function end() {
    finalElem.removeClass("hidden");
    descElem.removeClass("hidden");
    btnElem.addClass("hidden");
    choiceElem.addClass("hidden");
    questionElem.addClass("hidden");
    quesNum.addClass("hidden");
    $("#refresh").removeClass("hidden");
    let max = 0;
    let maxAns = [];
    for (const element in answer) { // check max letter count
        if (answer[element] > max) {
            max = answer[element];
            maxAns = [element];
        } else if (answer[element] == max) {
            maxAns.push(element);
        }
    }
    if (maxAns.length == 2) { // check if two max letters
        if (maxAns[0] == "B" || maxAns[1] == "B") {
            maxAns = ["B"];
        } else {
            maxAns = ["A"];
        }
    }
    for (const element in results) { // output
        if (results[element]["result"] == maxAns[0]) {
            $("#result").html(results[element]["main"]);
            descElem.html(results[element]["desc"]);
        } 
    }
}