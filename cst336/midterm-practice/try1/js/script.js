document.querySelector("#translate-btn").addEventListener("click", translate);
document.querySelector("#bio-btn").addEventListener("click", displayBio);
document.querySelector("#get-quotes-btn").addEventListener("click", getQuotes);

let quote_id;
loadScreen();

async function loadScreen() {
    // Fetch quote data
    let url = "https://csumb.space/api/famousQuotes/getRandomQuote.php"
    let response = await fetch(url);
    let data = await response.json();

    console.log(data);
    quote_id = data.quoteId;
    console.log(quote_id);
    document.querySelector("#quote").innerHTML = data.quoteText;
    document.querySelector("#author").innerHTML = data.firstName + " " + data.lastName;

    document.querySelector("#translate-flag").innerHTML = "<img src='img/english_flag.png'>";

    document.querySelector("#bio-text").innerHTML = data.bio;
    document.querySelector("#bio-image").innerHTML = `<img src=${data.picture}>`

    // Fetch background data
    let back_Url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=flowers";
    let back_Response = await fetch(back_Url);
    let back_Data = await back_Response.json();

    console.log(back_Data);
    let rand_num = Math.floor(Math.random() * 50);
    document.querySelector("body").style.backgroundImage = `url(${back_Data.hits[rand_num].largeImageURL})`;
}

async function translate() {
    let option = document.querySelector("input[name=translate-option]:checked").value;
    let url = `https://csumb.space/api/famousQuotes/translateQuote.php?lang=${option}&quoteId=${quote_id}`;
    let response = await fetch(url);
    let data = await response.json();

    document.querySelector("#quote").innerHTML = data.translation;
    if(option == "EN") {
        document.querySelector("#translate-flag").innerHTML = "<img src='img/english_flag.png'>";
    } else if (option == "ES") {
        document.querySelector("#translate-flag").innerHTML = "<img src='img/esperanto_flag.png'>";
    } else if (option == "FR") {
        document.querySelector("#translate-flag").innerHTML = "<img src='img/french_flag.png'>";
    } else if (option == "SP") {
        document.querySelector("#translate-flag").innerHTML = "<img src='img/spanish_flag.png'>";
    }
}

function displayBio() {
    let display = document.querySelector("#bio-row").style.display;

    if(display == "none" || display == "") {
        document.querySelector("#bio-row").style.display = "flex";
    } else {
        document.querySelector("#bio-row").style.display = "none";
    }
}

async function getQuotes() {
    let value = document.querySelector("#num-quotes").value;

    if(value == "" || value < 1 || value > 5) {
        document.querySelector("#validation").innerHTML = "must have a value between 1 and 5";
        document.querySelector("#validation").style.color = "red";
        return;
    } else {
        document.querySelector("#validation").innerHTML = "";
    }

    let url = `https://csumb.space/api/famousQuotes/getQuotes.php?n=${value}`;
    let response = await fetch(url);
    let data = await response.json();

    console.log(data);

    document.querySelector("#results").innerHTML = "";

    for (let i= 0; i < data.length; i++) {
        document.querySelector("#results").innerHTML += `<br><div class="extra-quote"><div class=extra-quote-text>${data[i].quoteText}</div><div class=extra-quote-author>- ${data[i].firstName} ${data[i].lastName}</div></div>`
    }
}