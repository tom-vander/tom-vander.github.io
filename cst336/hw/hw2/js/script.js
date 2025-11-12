document.querySelector("#submitBtn").addEventListener("click", gradeQuiz);

var score = 0;
var attempts = localStorage.getItem("total_attempts");

displayChoices();

function displayChoices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    let q7ChoicesArray = ["US 20", "I-90", "US 30", "I-80"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
    q7ChoicesArray = _.shuffle(q7ChoicesArray);

    for(let i = 0; i < q4ChoicesArray.length; i++) {
        document.querySelector("#q4Choices").innerHTML += `<input type="radio" name="q4" id="${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}">${q4ChoicesArray[i]}</label> `;
    }

    for(let i = 0; i < q7ChoicesArray.length; i++) {
        document.querySelector("#q7Choices").innerHTML += `<input type="radio" name="q7" id="${q7ChoicesArray[i]}" value="${q7ChoicesArray[i]}"> <label for="${q7ChoicesArray[i]}">${q7ChoicesArray[i]}</label> `;
    }
}

function isFormValid() {
    let isValid = true;
    if(document.querySelector("#q1").value == "") {
        isValid = false;
    } else if(document.querySelector("#q2").value == "") {
        isValid = false;
    } else if(!document.querySelector("#Jefferson").checked && !document.querySelector("#Roosevelt").checked
        && !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked) {
        isValid = false;
    } else if(!document.querySelector('input[name="q4"]:checked')){
        isValid = false;
    } else if(document.querySelector("#q5").value == "") {
        isValid = false;
    } else if(document.querySelector("#q6").value == "") {
        isValid = false;
    } else if(!document.querySelector('input[name="q7"]:checked')){
        isValid = false;
    } else if(!document.querySelector("#Erie").checked && !document.querySelector("#Huron").checked
        && !document.querySelector("#Michigan").checked && !document.querySelector("#Superior").checked
        && !document.querySelector("#Ontario").checked) {
        isValid = false;
    } else if(document.querySelector("#q9").value == "") {
        isValid = false;
    } else if(document.querySelector("#q10").value == "") {
        isValid = false;
    }

    if(!isValid){
        document.querySelector("#validationFbk").innerHTML = "One or more questions were was not answered";
    }
    return isValid;
}

function rightAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='Checkmark'> ";
    score += 10;
}

function wrongAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='Xmark'> ";
}

function gradeQuiz() {
    console.log("Grading quiz...");
    document.querySelector("#validationFbk").innerHTML = "";
    if(!isFormValid()) {
        return;
    }

    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q4Response = document.querySelector("input[name=q4]:checked").value;
    let q5Response = document.querySelector("#q5").value;
    let q6Response = document.querySelector("#q6").value;
    let q7Response = document.querySelector("input[name=q7]:checked").value;
    let q9Response = document.querySelector("#q9").value.toLowerCase();
    let q10Response = document.querySelector("#q10").value;
    console.log(q1Response);

    if(q1Response == "sacramento") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }

    if(q2Response == "mo") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }

    if(document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked
    && !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked) {
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    if(q4Response == "Rhode Island") {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    if(q5Response == 5) {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    if(q6Response == "hi") {
        rightAnswer(6);
    } else {
        wrongAnswer(6);
    }

    if(q7Response == "US 20") {
        rightAnswer(7);
    } else {
        wrongAnswer(7);
    }

    if(document.querySelector("#Erie").checked && document.querySelector("#Huron").checked
        && document.querySelector("#Michigan").checked && document.querySelector("#Superior").checked
        && !document.querySelector("#Ontario").checked) {
        rightAnswer(8);
    } else {
        wrongAnswer(8);
    }

    if(q9Response == "denali") {
        rightAnswer(9);
    } else {
        wrongAnswer(9);
    }

    if(q10Response == "1906") {
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }

    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}/100`;
    if(score < 80){
        document.querySelector("#totalScore").className = "text-danger";
    } else {
        document.querySelector("#totalScore").className = "text-success";
    }

    if(score > 80) {
        document.querySelector("#totalScore").innerHTML += "<br> Congratulations!";
    }
    console.log( "Total score: " + score)
    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
    localStorage.setItem("total_attempts", attempts);
}