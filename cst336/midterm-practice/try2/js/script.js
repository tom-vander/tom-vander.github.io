document.querySelector("#bio-btn").addEventListener("click", getBio);
document.querySelector("#translate-btn").addEventListener("click", translate);
document.querySelector("#num-quotes").addEventListener("change", messageUser);
document.querySelector("#get-quotes-btn").addEventListener("click", getQuotes);

let idNum;
load();

async function load() {
    let url = "https://csumb.space/api/famousQuotes/getRandomQuote.php";
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    idNum = data.quoteId;
    document.querySelector("#quote").innerHTML = data.quoteText;
    document.querySelector("#author").innerHTML = "- " + data.firstName + " " + data.lastName;
    document.querySelector("#bio-text").innerHTML = data.bio;
    document.querySelector("#bio-image").innerHTML = `<img src=${data.picture}>`;

    document.querySelector("#translate-flag").innerHTML = "<img src='img/english_flag.png'>";
    displayOptions();

    let url2 = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=flowers"
    let response2 = await fetch(url2);
    let data2 = await response2.json();

    console.log(data2);
    document.querySelector("body").style.backgroundImage = `url(${data2.hits[Math.floor(Math.random() * 50)].largeImageURL})`;
}

function getBio() {
    display = document.querySelector("#bio").style.display;
    if(display == "none" || display == "") {
        document.querySelector("#bio").style.display = "flex";
    } else {
        document.querySelector("#bio").style.display = "none";
    }
}

function displayOptions() {
    let choices = ["English", "Spanish", "French", "Esperanto"];
    choices = _.shuffle(choices);

    for (let i = 0; i < choices.length; i++) {
        document.querySelector("#translate-choice").innerHTML +=
            `<input type="radio" name="userOption" id="${choices[i]}" value="${choices[i]}"><label for="${choices[i]}">${choices[i]}</label>`;

    }

    document.querySelector("#English").checked = true;
}

async function translate() {
    let option = document.querySelector("input[name=userOption]:checked").value;
    let url;

    if(option == "English") {
        document.querySelector("#translate-flag").innerHTML = "<img src='img/english_flag.png'>";
        url = `https://csumb.space/api/famousQuotes/translateQuote.php?lang=EN&quoteId=${idNum}`;
    } else if (option == "Esperanto") {
        document.querySelector("#translate-flag").innerHTML = "<img src='img/esperanto_flag.png'>";
        url = `https://csumb.space/api/famousQuotes/translateQuote.php?lang=ES&quoteId=${idNum}`;
    } else if (option == "French") {
        document.querySelector("#translate-flag").innerHTML = "<img src='img/french_flag.png'>";
        url = `https://csumb.space/api/famousQuotes/translateQuote.php?lang=FR&quoteId=${idNum}`;
    } else if (option == "Spanish") {
        document.querySelector("#translate-flag").innerHTML = "<img src='img/spanish_flag.png'>";
        url = `https://csumb.space/api/famousQuotes/translateQuote.php?lang=SP&quoteId=${idNum}`;
    }

    let response = await fetch(url);
    let data = await response.json();

    console.log(data);
    document.querySelector("#quote").innerHTML = data.translation;
}

function messageUser() {
    let value = document.querySelector("#num-quotes").value;
    if(value < 1 || value > 5 || value == "") {
        document.querySelector("#validation").innerHTML = "must have a value between 1 and 5";
        document.querySelector("#validation").style.color = "red";
    } else {
        document.querySelector("#validation").innerHTML = "";
    }
}

async function getQuotes() {
    document.querySelector("#results").innerHTML = "";
    let value = document.querySelector("#num-quotes").value;
    if(value == "" || value < 1 || value > 5) return;
    let url = `https://csumb.space/api/famousQuotes/getQuotes.php?n=${value}`;
    let response = await fetch(url);
    let data = await response.json();

    for (let i= 0; i < data.length; i++) {
        document.querySelector("#results").innerHTML +=
            `<div class="extra-quote"><span class="extra-quote-text">${data[i].quoteText}</span> - <span class="extra-quote-author">${data[i].firstName} ${data[i].lastName}</span></div>`;
    }
}