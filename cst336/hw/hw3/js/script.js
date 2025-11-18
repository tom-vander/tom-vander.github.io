document.querySelector("#searchNum").addEventListener("change",getPokemonData);

document.querySelector("#searchNum").value = 1;
getPokemonData();

async function getPokemonData() {
    let entryNum = document.querySelector("#searchNum").value;
    let isValid = validateEntry(entryNum);
    if(!isValid) {
        return;
    }

    let url = `https://pokeapi.co/api/v2/pokemon/${entryNum}/`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    document.querySelector("#pokemonCryContainer").innerHTML =
        `<audio id="pokemonCry" autoplay hidden><source src=${data.cries.latest}></audio>`;
    document.querySelector("#pokemonCry").volume = 0.15;
    let cappedName = data.name.charAt(0).toUpperCase() + data.name.slice(1);


    document.querySelector("#typesDisplay").innerHTML = "";
    for (let i of data.types) {
        document.querySelector("#typesDisplay").innerHTML +=
            `<span class="${i.type.name}TypeDisplay typeDisplay">${i.type.name}</span>`;
    }

    document.querySelector("#pokemonName").innerHTML = cappedName;
    document.querySelector("#pokemonImg").innerHTML =
        `<img class=double-size-sprite src=${data.sprites.front_default} alt="Pokemon Sprite">`;

    document.querySelector("#height").innerHTML = `${data.height/10}`;
    document.querySelector("#weight").innerHTML = `${data.weight/10}`;

    let url2 = `https://pokeapi.co/api/v2/pokemon-species/${data.name}/`;
    let response2 = await fetch(url2);
    let data2 = await response2.json();

    console.log(data2);

    document.querySelector("#habitatContainer").className = `${data2.habitat.name}Habitat`;
    document.querySelector("#habitat").innerHTML = `${data2.habitat.name}`;
}

function validateEntry(entryNum) {
    let isValid = true;
    if(entryNum < 1 || entryNum > 151) {
        document.querySelector("#searchNum").value = "";
        isValid = false;
    }
    return isValid;
}