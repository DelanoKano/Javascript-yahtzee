let dice = [];
let lockedDice = [];
let tkind = false;
let fkind = false;
let yahtzee = false;


let fullhouse = {
    two: false,
    three: false

};


function rollDice() {
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
    for (let i = 0; i < 6; i++) {
        const value = document.getElementById(`${i + 1}p1`);
        let number = checkNumber(i + 1);
        value.textContent = number * (i + 1);
    }
    checkTkind();
    checkFkind();
    checkYahtzee();
    checkFhouse();
    checkChance();
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

function checkTkind(count) {
    let value = document.getElementById('tkindp1');
    if (tkind) {
        value.textContent = dice.reduce((a, b) => a + b, 0);
    } else {
        value.textContent = "0"
    }
}

function checkFkind(count) {
    let value = document.getElementById('fkindp1');
    if (fkind) {
        value.textContent = dice.reduce((a, b) => a + b, 0);
    } else {
        value.textContent = "0";
    }

}

function checkYahtzee(count) {
    let value = document.getElementById('yahtzeep1');
    if (yahtzee) {
        value.textContent = 50;
    }
    else {
        value.textContent = 0;
    }
}

function checkFhouse(count) {
    let value = document.getElementById('fhousep1');
    if (fullhouse.three && fullhouse.two) {
        value.textContent = 25;
    }
    else {
        value.textContent = 0;
    }

}

function checkChance(count) {
    let value = document.getElementById('chancep1');
    value.textContent = dice.reduce((a, b) => a + b, 0);

}