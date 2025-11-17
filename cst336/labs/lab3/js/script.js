document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#password").addEventListener("click", suggestPwd)
document.querySelector("#confirmPassword").addEventListener("change", checkPwd)
document.querySelector("#signupForm").addEventListener("submit", function(event) {
    validateForm(event);
});

getStates();

function validateForm(e) {
    let isValid = true;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let confirmPassword = document.querySelector("#confirmPassword").value;
    if (username.length == 0) {
        document.querySelector("#usernameError").innerHTML = "Username required";
        isValid = false;
    }
    if (password.length < 6) {
        document.querySelector("#passwordError").innerHTML = "Password must be at least 6 characters";
        document.querySelector("#passwordError").style.color = "red";
        isValid = false;
    } else if (password != confirmPassword) {
        document.querySelector("#passwordError").innerHTML = "Passwords do not match";
        document.querySelector("#passwordError").style.color = "red";
        isValid = false;
    }
    if (!isValid) {
        e.preventDefault();
    }
}

function checkPwd() {
    let confirmPassword = document.querySelector("#confirmPassword").value;
    let password = document.querySelector("#password").value;
    if(confirmPassword == password) {
        document.querySelector("#passwordError").innerHTML = "Passwords match";
        document.querySelector("#passwordError").style.color = "green";
    }
}

async function suggestPwd() {
    let suggestedPwd = document.querySelector("#suggestedPwd");
    if(suggestedPwd.innerHTML != "") {
        return;
    }
    let url = "https://csumb.space/api/suggestedPassword.php?length=10"
    let response = await fetch(url);
    let data = await response.json();
    suggestedPwd.innerHTML = data.password;
    suggestedPwd.style.color = "gray";
}

async function getStates() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    let stateList = document.querySelector("#state");
    for (let i=0; i < data.length; i++) {
        stateList.innerHTML += `<option value=${data[i].usps}> ${data[i].state} </option>`;
    }
}

async function displayCity() {
    document.querySelector("#zipValid").innerText = "";

    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    if(!data){
        document.querySelector("#zipValid").innerText = "Zip code not found";
        document.querySelector("#zipValid").style.color = "red";
        document.querySelector("#city").innerText = data.city;
        document.querySelector("#city").style.color = "red";
        document.querySelector("#lat").innerText = data.latitude;
        document.querySelector("#lat").style.color = "red";
        document.querySelector("#long").innerText = data.longitude;
        document.querySelector("#long").style.color = "red";
        return;
    }

    document.querySelector("#zipValid").innerText = "Zip code found";
    document.querySelector("#zipValid").style.color = "green";

    document.querySelector("#city").innerText = data.city;
    document.querySelector("#city").style.color = "green";
    document.querySelector("#lat").innerText = data.latitude;
    document.querySelector("#lat").style.color = "green";
    document.querySelector("#long").innerText = data.longitude;
    document.querySelector("#long").style.color = "green";
}

async function displayCounties() {
    document.querySelector("#county").innerHTML = "";
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    for (let i=0; i < data.length; i++) {
        countyList.innerHTML += `<option> ${data[i].county} </option>`;
    }
}

async function checkUsername() {
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError");
    if(data.available){
        usernameError.innerHTML = " Username available!";
        usernameError.style.color = "green";
    } else {
        usernameError.innerHTML = " Username taken";
        usernameError.style.color = "red";
    }
}