let dice = [];
let lockedDice = [];
let points = [];
let specialPoints = [];
let tkind = false;
let fkind = false;
let yahtzee = false;
let sstraight = false;
let lstraight = false;
let lockedNumbers = 0;
let hallo = "hallo";

let fullhouse = {
    two: false,
    three: false

};

function rollDice() {
    dice = [];
    rollsLeft();
    for (let i = 0; i < 5; i++) {
        let die = document.getElementById("dice-" + (i + 1))
        if (lockedDice.includes('dice-' + (i + 1))) {
            dice.push(parseInt(die.name));
            continue;
        } else {
            let random = randomDice();
            dice.push(random);
            die.name = random;
            die.src = "Dice-" + random + ".png"
        }
    }
    scoreUpdate();

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
        dice.style.border = "3px solid red"
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
    console.log(points);
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
    if (count >= 3) {
        tkind = true;
    }
    if (count >= 4) {
        fkind = true;
    }
    if (count == 5) {
        yahtzee = true;
    }
    if (count === 3) {
        fullhouse.three = true;
    }
    if (count === 2) {
        fullhouse.two = true;
    }
    return count;
}

function checkTkind() {
    let value = document.getElementById('tkindp1');
    if (tkind) {
        value.textContent = dice.reduce((a, b) => a + b, 0);
    } else {
        value.textContent = "0"
    }
}

function checkFkind() {
    let value = document.getElementById('fkindp1');
    if (fkind) {
        value.textContent = dice.reduce((a, b) => a + b, 0);
    } else {
        value.textContent = "0";
    }

}

function checkYahtzee() {
    let value = document.getElementById('yahtzeep1');
    if (yahtzee) {
        value.textContent = 50;
    }
    else {
        value.textContent = 0;
    }
}

function checkFhouse() {
    let value = document.getElementById('fhousep1');
    if (fullhouse.three && fullhouse.two) {
        value.textContent = 25;
    }
    else {
        value.textContent = 0;
    }

}

function checkChance() {
    let value = document.getElementById('chancep1');
    value.textContent = dice.reduce((a, b) => a + b, 0);

}

function checkSstraight() {
    let value = document.getElementById('sstraightp1');
    dice.sort();
    if (/1234|2345|3456/.test(dice.join(''))) {
        sstraight = true;
        value.textContent = 30;
    }
    else {
        value.textContent = 0;
    }
}

function checkLstraight() {
    let value = document.getElementById('lstraightp1');
    dice.sort();
    if (/12345|23456/.test(dice.join(''))) {
        lstraight = true;
        value.textContent = 40;
    }
    else {
        value.textContent = 0;
    }


}

function rollsLeft() {
    const rolls = 3;
    const value = document.getElementById('rolls-Left');
    value.innerHTML--;
    if (value.innerHTML < 0) {
        return value.innerHTML = rolls;
    }
}

function lockNumber(number) {
    let test = document.getElementById(`${number}p1`);
    let total = document.getElementById(`firsttotalp1`);
    let bonus = document.getElementById(`bonusp1`);
    test.name = 'locked';
    test.style.background = 'lightgray';
    lockedNumbers++;
    let totalPoints = points.reduce((a, b) => a + b, 0);
    if (lockedNumbers === 6) total.textContent = totalPoints;
    if (lockedNumbers === 6 && totalPoints >= 63) bonus.textContent = totalPoints + 35;
}