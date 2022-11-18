const pokeFoto = document.querySelector("#Imagen");
let Perror = document.querySelector("#errorMensaje");
let peso = document.querySelector("#Peso");
let altura = document.querySelector("#Altura");
let tipo = document.querySelector("#Tipo");
let hp = document.querySelector(".hp");
let attack = document.querySelector(".attack");
let defense = document.querySelector(".defense");
let sattack = document.querySelector(".sattack");
let sdefense = document.querySelector(".sdefense");
let speed = document.querySelector(".speed");

const fetchPokemon = () =>{
    const pokeNameInput = document.getElementById("PantallaV");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) =>{
        if(res.status != "200"){
            console.log(res);
            errores();
        }else{
            return res.json();
        }
    }).then((data) =>{
        if(data){
        console.log(data);
        let pokeImg = data.sprites.front_default;
        peso.textContent = "Peso: " + (data.weight / 10) + " kg";
        altura.textContent = "Altura: " + (data.height / 10) + " m";
        let cant = 0;
        let datos = "";
        cant = data.types.length;
        for(let i = 0; i<=cant -1; i++){
            datos = datos + " " + data.types[i].type.name + ".";
        }
        tipo.textContent = "Tipo: " + datos;
        pokeImage(pokeImg);
        console.log(pokeImg);
        Perror.textContent = "#" + data.id + " " + data.name;
        Perror.classList.add('info');
        stats(data.stats);
        }
        
    })
}

const pokeImage = (url) =>{
    
    pokeFoto.classList.remove("imagen");
    pokeFoto.classList.add("imagenInternet");
    Perror.textContent = "";
    Perror.classList.remove("menError");
    pokeFoto.src = url;
}

const stats = (stat) =>{
    hp.textContent = "HP: " + stat[0].base_stat;
    attack.textContent = "Attack: " + stat[1].base_stat;
    defense.textContent = "Defense: " + stat[2].base_stat;
    sattack.textContent = "S. Attack: " + stat[3].base_stat;
    sdefense.textContent = "S. Defense: " + stat[4].base_stat;
    speed.textContent = "Speed: " + stat[5].base_stat;
}

const errores =  () =>{
    console.log("Desde errores");
    pokeImage("./img/Error.png");
    pokeFoto.classList.add("imagen");
    pokeFoto.classList.remove("imagenInternet");
    Perror.classList.remove('info')
    Perror.textContent = "No se encontro el pokemon.";
    Perror.classList.add("menError");
    peso.textContent = "Peso: "; 
    tipo.textContent = "Tipo: ";
    hp.textContent = "HP: ";
    attack.textContent = "Attack: ";
    defense.textContent = "Defense: ";
    sattack.textContent = "S. Attack: ";
    sdefense.textContent = "S. Defense: ";
    speed.textContent = "Speed: ";
}