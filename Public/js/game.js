
// Deklarasi DOM
const resultBox = document.getElementById("hasil-C");
const resultName = document.getElementById("hasil-P");
const playerBatu = document.getElementById("player_batu");
const playerGunting = document.getElementById("player_gunting");
const playerKertas = document.getElementById("player_kertas");
const comBatu = document.getElementById("com_batu");
const comGunting = document.getElementById("com_gunting");
const comKertas = document.getElementById("com_kertas");

// Pilihan COM
function pilihanbot() {
    const botChoice = Math.floor(Math.random() * 3) + 1;
    if (botChoice == 1) {
        comBatu.style.backgroundColor = "#C4C4C4";
        return "batu";
    } else if (botChoice == 2) {
        comKertas.style.backgroundColor = "#C4C4C4";
        return "kertas";
    } else {
        comGunting.style.backgroundColor = "#C4C4C4";
        return "gunting";
    }
}

// alur game gunting kertas batu 

function rockPaperScissors(pilPlayer, pilCom) {
    if (pilPlayer == pilCom) {
        return "draw";
    }

    if (pilPlayer == "batu") {
        if (pilCom == "kertas") {
            return "com";
        } else { // pilCom == "gunting"
            return "player";
        }
    } else if (pilPlayer == "kertas") {
        if (pilCom == "gunting") {
            return "com";
        } else { // pilCom == "batu"
            return "player";
        }
    } else { // pilPlayer == "gunting"
        if (pilCom == "batu") {
            return "com";
        } else { // pilCom == "kertas"
            return "player";
        }
    }
}

// parameter hasil adalah return value dari function rockPaperScissors
// resultBox dan resultName adalah variabel global
// I.S = ditengah2 tertulis VS
// F.S = ditengah2 tertulsi siapa pemenangnya atau draw
function showHasil(hasil) { // procedure
    resultBox.style.removeProperty("visibility");
    if (hasil=="draw") {   
        resultName.innerText = "DRAW";
        resultBox.className = "teks-hasil";
        console.log("Hasil Pertandingan = Draw");
    } else if (hasil=="com") {
        resultName.innerText = "COM\nWIN";
        resultBox.className = "teks-hasil";
        console.log("Hasil Pertandingan = Com Win");
    } else { //hasil=="player"  
        resultName.innerText = "PLAYER 1\nWIN";
        resultBox.className = "teks-hasil";
        console.log("Hasil Pertandingan = Player 1 Win");
    }
}


// ----------- ====== onclick function ====== ----------


// resultBox, (player/com)(Batu/Gunting/Kertas) adalah variabel global
// I.S = apapun
// F.S = ditengah2 tertulsi VS, semua highlight ilang
function reset() {
    resultBox.classList.remove('teks-hasil');
    resultName.innerText = "VS";
    playerBatu.style.removeProperty("background-color");
    playerKertas.style.removeProperty("background-color");
    playerGunting.style.removeProperty("background-color");
    comBatu.style.removeProperty("background-color");
    comKertas.style.removeProperty("background-color");
    comGunting.style.removeProperty("background-color");
}

// resultBox, (player/com)(Batu/Gunting/Kertas) adalah variabel global
// I.S = apapun
// F.S = player memilih batu. Highlight pilihan player, acak pilihan com, highlight pilihan com, tulis result
function chooseBatu() {
    reset();
    playerBatu.style.backgroundColor = "#C4C4C4";
    let player = "batu"
    console.log("Pilihan Player 1 = " + player);
    com = pilihanbot();
    console.log("Pilihan Computer = " + com);
    result = rockPaperScissors(player, com);
    showHasil(result);
}

// resultBox, (player/com)(Batu/Gunting/Kertas) adalah variabel global
// I.S = apapun
// F.S = player memilih kertas. Highlight pilihan player, acak pilihan com, highlight pilihan com, tulis result
function chooseKertas() {
    reset();
    playerKertas.style.backgroundColor = "#C4C4C4";
    let player = "kertas"
    console.log("Pilihan Player 1 = " + player);
    com = pilihanbot();
    console.log("Pilihan Computer = " + com);
    result = rockPaperScissors(player, com);
    showHasil(result);
}

// resultBox, (player/com)(Batu/Gunting/Kertas) adalah variabel global
// I.S = apapun
// F.S = player memilih gunting. Highlight pilihan player, acak pilihan com, highlight pilihan com, tulis result
function chooseGunting() {
    reset();
    playerGunting.style.backgroundColor = "#C4C4C4";
    let player = "gunting"
    console.log("Pilihan Player 1 = " + player);
    com = pilihanbot();
    console.log("Pilihan Computer = " + com);
    result = rockPaperScissors(player, com);
    showHasil(result);
}