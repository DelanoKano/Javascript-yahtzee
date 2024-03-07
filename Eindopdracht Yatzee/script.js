let dice = [];
let lockedDice = [];
let tkind = false;
let fkind = false;



function rollDice() {
    dice = [];
    for (let i = 0; i < 5; i++) {
        let die = document.getElementById("dice-" + (i + 1))
        if (lockedDice.includes('dice-' + (i + 1))) {
            dice.push(parseInt(die.name));
            console.log(lockedDice);
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
        dice.style.border = "2px solid red"
    }
}

function scoreUpdate() {
    for (let i = 0; i < 6; i++) {
        const value = document.getElementById(`${i + 1}p1`);
        let number = checkNumber(i + 1);
        value.textContent = number * (i + 1);
    }
}

function checkNumber(number) {
    let count = 0;
    for (let i = 0; i < 5; i++) {
        if (number == dice[i]) {
            count++
        }

        if (count == 3) {
            for (let i = 0; i < dice.length; i++) {
                if (dice[i] == dice[i + 1] && (dice[i] == dice[i + 2])) {
                    tkind = true;
                    let value = document.getElementById('tkindp1');
                    value.textContent = `hello`;
                }
            }
        }
        else if (count == 4) {
            for (let i = 0; i < dice.length - count; i++) {
                if ((dice[i] == dice[i + 1])
                    && (dice[i] == dice[i + 2])
                    && (dice[i] == dice[i + 3])) {
                    fkind = true;
                    console.log(fkind);
                }
            }
        }
    }

    return count;
}

