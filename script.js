const rollsText = document.getElementById('rolls-Left');

let dice = [];
let rolls = 3;
let lockedDice = [];
let points = [];
let specialPoints = [];
let tkind = false;
let fkind = false;
let yahtzee = false;
let sstraight = false;
let lstraight = false;
let grandTotal = 0;

let fullhouse = {
    two: false,
    three: false
};

let special = {
    tkind: 1,
    fkind: 2,
    fhouse: 3,
    sstraight: 4,
    lstraight: 5,
    yahtzee: 6,
    chance: 7
}

function rollDice() {
    if (rolls === 0) return;
    dice = [];
    for (let i = 0; i < 5; i++) {
        let die = document.getElementById("dice-" + (i + 1))
        if (lockedDice.includes('dice-' + (i + 1))) {
            dice.push(parseInt(die.name));
            continue;
        } else {
            let random = randomDice();
            dice.push(random);
            die.name = random;
            die.src = "Images/Dice-" + random + ".png"
        }
    }
    scoreUpdate();
    rolls--;
    rollsText.innerHTML = rolls;
}

function randomDice() {
    const randomDice = Math.floor(Math.random() * 6) + 1;
    return randomDice;
}

function lockDice(die) {
    let dice = document.getElementById(die);
    if (lockedDice.includes(die)) {
        lockedDice.splice(lockedDice.indexOf(die), 1);
        dice.style.border = "none"
    } else {
        lockedDice.push(die);
        dice.style.border = "5px outset black"
    }
}

function scoreUpdate() {
    tkind = false;
    fkind = false;
    yahtzee = false;
    fullhouse = {
        two: false,
        three: false
    }
    sstraight = false;
    lstraight = false;
    for (let i = 0; i < 6; i++) {
        const value = document.getElementById(`${i + 1}p1`);
        if (value.name === "locked") continue;
        let number = checkNumber(i + 1);
        value.textContent = number * (i + 1);
        points[i] = number * (i + 1);
    }
    checkTkind();
    checkFkind();
    checkYahtzee();
    checkFhouse();
    checkChance();
    checkSstraight();
    checkLstraight();
}

function checkNumber(number) {
    let count = 0;
    for (let i = 0; i < 5; i++) {
        if (number == dice[i]) {
            count++
        }
    }
    if (count >= 3) tkind = true;
    if (count >= 4) fkind = true;
    if (count == 5) yahtzee = true;
    if (count === 3) fullhouse.three = true;
    if (count === 2) fullhouse.two = true;
    return count;
}

function checkTkind() {
    let value = document.getElementById('tkindp1');
    if (value.name === "locked") return;
    if (tkind) {
        value.textContent = dice.reduce((a, b) => a + b, 0);
        specialPoints[0] = dice.reduce((a, b) => a + b, 0);
    } else {
        value.textContent = "0"
        specialPoints[0] = 0;
    }
}

function checkFkind() {
    let value = document.getElementById('fkindp1');
    if (value.name === "locked") return;
    if (fkind) {
        value.textContent = dice.reduce((a, b) => a + b, 0);
        specialPoints[1] = dice.reduce((a, b) => a + b, 0);
    } else {
        value.textContent = "0";
        specialPoints[1] = 0;
    }

}

function checkFhouse() {
    let value = document.getElementById('fhousep1');
    if (value.name === "locked") return;
    if (fullhouse.three && fullhouse.two) {
        value.textContent = 25;
        specialPoints[2] = 25;
    }
    else {
        value.textContent = 0;
        specialPoints[2] = 0;
    }
}

function checkSstraight() {
    let value = document.getElementById('sstraightp1');
    if (value.name === "locked") return;
    dice.sort();
    if (/1234|2345|3456/.test(dice.join(''))) {
        value.textContent = 30;
        specialPoints[3] = 30;
    }
    else {
        value.textContent = 0;
        specialPoints[3] = 0;
    }
}

function checkLstraight() {
    let value = document.getElementById('lstraightp1');
    if (value.name === "locked") return;
    dice.sort();
    if (/12345|23456/.test(dice.join(''))) {
        value.textContent = 40;
        specialPoints[4] = 40;
    }
    else {
        value.textContent = 0;
        specialPoints[4] = 0;
    }
}


function checkYahtzee() {
    let value = document.getElementById('yahtzeep1');
    if (value.name === "locked") return;
    if (yahtzee) {
        value.textContent = 50;
        specialPoints[5] = 50;
    }
    else {
        value.textContent = 0;
        specialPoints[5] = 0;
    }
}

function checkChance() {
    let value = document.getElementById('chancep1');
    if (value.name === "locked") return;
    value.textContent = dice.reduce((a, b) => a + b, 0);
    specialPoints[6] = dice.reduce((a, b) => a + b, 0);
}

function lockNumber(number) {
    let numbers = document.getElementById(`${number}p1`);
    if (numbers.name === "locked") return;
    dice = [];
    rolls = 3;
    rollsText.innerHTML = rolls;
    for (let i = 0; i < 5; i++) {
        let die = document.getElementById("dice-" + (i + 1))
        die.style.border = "none";
        die.src = "";
    }
    lockedDice = [];
    numbers.name = 'locked';
    numbers.style.background = 'rgb(144,238,144)';
    numbers.style.border = '3px groove black';
    calculateTotal();
    calculateSpecialTotal();
    scoreUpdate();
}

function calculateTotal() {
    let lockedNumbers = 0;
    let firstTotal = document.getElementById("firsttotalp1");
    let grandTotal = document.getElementById("grandtotalp1");
    let bonus = document.getElementById("bonusp1");
    let total = points.reduce((a, b) => a + b, 0);
    for (let i = 0; i < 6; i++) {
        let numbers = document.getElementById(`${i + 1}p1`);
        if (numbers.name === "locked") {
            lockedNumbers++;
        }
    }
    if (lockedNumbers === 6) {
        firstTotal.textContent = total;
        if (total >= 63) bonus.textContent = total += 35;
        grandTotal += total;
        
    }
}

function calculateSpecialTotal() {
    let lockedNumbers = 0;
    let specialTotal = document.getElementById("secondtotalp1");
    let total1 = points.reduce((a, b) => a + b, 0);
    let total = specialPoints.reduce((a, b) => a + b, 0);
    for (let i = 0; i < 7; i++) {
        let specials = Object.keys(special)[i];
        let numbers = document.getElementById(`${specials}p1`);
        if (numbers.name === "locked") {
            lockedNumbers++;
            console.log(lockedNumbers);
        }
    }
    if (lockedNumbers === 7) {
        specialTotal.textContent = total;
        document.getElementById("grandtotalp1").innerText = total + total1;
    }
    if (total1 >= 63) {
        document.getElementById("grandtotalp1").innerText = total + total1 + 35;
    }
 
}

