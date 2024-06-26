let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [{
    name:"stick",
    power:5,
},{
    name:"dagger",
    power:30,
},
{
    name:"claw hammer",
    power:50,
},
{
    name:"sword",
    power:100,
}];

const monsters = [{
    name : "slime",
    level : 2,
    health : 15
},{
    name : "fanged beast",
    level  : 8,
    health : 60
},{
    name : "dragon",
    level :20,
    health : 300

}];

const locations = [{

    name:"town square",
    "button text":["Go to store","Go to cave","Fight dragon"],
    "button functions":[goStore,goCave,fightDragon],
    text:"You are in the town square. You see a sign that says \"Store\"."
},{
    name:"store",
    "button text":["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth,buyWeapon,goTown],
    text:"You enter the store."
},
{
    name:"cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
},{
    name:"fight",
    "button text":["Attack","Dodge","Run"],
    "button functions":[attack, dodge, goTown],
    text:"You are fighting a monster."
},{
    name:"kill monster",
    "button text":["Go to town square","Go to town square","Go to town square"],
    "button functions":[goTown,goTown,easterEgg],
    text:'The monster screams "Arg!" as it dies. You gain experience points and find gold.'


  },{
    name:"lose",
    "button text":["REPLAY?","REPLAY?","REPLAY?"],
    "button functions":[restart,restart,restart],
    text:"You die. &#x2620;",
  },{
    name:"win",
    "button text":["REPLAY?","REPLAY?","REPLAY?"],
    "button functions":[restart,restart,restart],
    text:"You defeat the dragon! YOU WIN THE GAME! &#x1F389;",
  },
{
    name: "easter egg",
    "button text" : ["2", "8", "Go to town square?"],
    "button functions":[pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
}];

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick=location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerHTML = location.text;
    /*
    The innerHTML property allows you to access or modify the content inside an HTML element using JavaScript.

Here is an example of updating the content for this paragraph element using the innerHTML property.

<p id="demo">This is a paragraph.</p>
document.querySelector("#demo").innerHTML = "Hello, innerHTML!";
    */

}

function goTown(){
    update(locations[0]);
}

function goStore(){
update(locations[1]);
}

function goCave(){
    update(locations[2]);
}

function buyHealth(){
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
      }else{
        text.innerText = "You do not have enough gold to buy health.";
      }


}

function buyWeapon(){
    if(currentWeapon < weapons.length - 1)//arrays have a length property that returns the number of items in the array. You may want to add new values to the weapons array in the future.
    //You now have an error to fix. The currentWeapon variable is the index of the weapons array, but array indexing starts at zero. The index of the last element in an array is one less than the length of the array.
    if (gold >=30){
        gold -= 30;
        currentWeapon ++;
        goldText.innerText= gold;
        let newWeapons = weapon[currentWeapon].name;
        inventory.push(newWeapons);  //push() method helps to add items in the inventory array
        text.innerText = "You now have a new weapon.";
        text.innerText += " In your inventory you have: " + inventory;
    }else {
        text.innerText = "You do not have enough gold to buy a weapon.";
    }
    }else{
        text.innerText = "You already have the most powerful weapon!"

        button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
      }
}

function sellWeapon(){
    if (inventory.length > 1) {
        gold += 15
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();//The shift() method on an array removes the first element in the array and returns it.
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
      }else{
        (inventory.length > 1)
        text.innerText = "Don't sell your only weapon!"
      }

}
function fightSlime(){

    fighting = 0;
    goFight();

}
function fightBeast(){

    fighting = 1;
    goFight();
}

function fightDragon(){
    fighting = 2;
    goFight();
}

function goFight(){
update(locations[3]);
monsterHealth = monster[fighting].health;
monsterStats.style.display = "block";

monsterName.innerText = monsters[fighting].name ;
  monsterHealthText.innerText = monsterHealth;
}

function attack(){

    text.innerText =  "The " + monsters[fighting].name + " attacks." ;
    text.innerText += " You attack it with your " + weapons[currentWeapon].name+".";
    health -= getMonsterAttackValue(monsters[fighting].level);
    if(isMonsterHit()){
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
        //The Math object in JavaScript contains static properties and methods for mathematical constants and functions. One of those is Math.random(), which generates a random number from 0 (inclusive) to 1 (exclusive). Another is Math.floor(), which rounds a given number down to the nearest integer.

// Using these, you can generate a random number within a range. For example, this generates a random number between 1 and 5: Math.floor(Math.random() * 5) + 1;

    }else {
        text.innerText += " You miss."
    }

healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;

  if (health <= 0){
    lose();
  }else if (monsterHealth <= 0){
    if (fighting === 2 ){

        winGame();
    } else {
        defeatMonster();
    }
  }
  if(Math.random() <= .1 && inventory.length !== 1){
    text.innerText += " Your " + inventory.pop() + " breaks.";
    return inventory.pop();
    currentWeapon --;
    
    
  }
}

function getMonsterAttackValue(level){
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    
    // ternary operator
return hit > 0 ? hit : 0;
/*
*The ternary operator is a conditional operator and can be used as a one-line if-else statement. The syntax is: condition ? expressionIfTrue : expressionIfFalse.

Here is an example of returning a value using an if-else statement and a refactored example using a ternary operator:

// if-else statement
if (score > 0) {
  return score
} else {
  return default_score
}

// ternary operator
return score > 0 ? score : default_score
 */
}
function isMonsterHit(){
    ireturn (Math.random() > .2);
    return(Math.random() >.2 || health < 20);
}

function dodge(){

    text.innerText = "You dodge the attack from the " + monsters[fighting].name;

}

function defeatMonster(){

    gold += Math.floor(monsters[fighting].level * 6.7);
    goldText.innerText = gold;
  xpText.innerText = xp;

  update(locations[4]);

}
function lose(){
    update(locations[5]);
  
}
function winGame(){
    update(locations[6]);
}

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
  }

function easterEgg(){
    update(locations[7]);
}
function pickTwo(){

    pick(2);

}

function pickEight(){
pick(8);
}

function pick(guess){
numbers = [];

while (numbers.length < 10){
    /**
     * A while loop accepts a condition, and will run the code in the block until the condition is no longer true.


     */
  numbers.push(Math.floor(Math.random() * 11));th.floor(Math.random() * 11);
}
text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
for (let i = 0; i < 5; i++) {
    /**
     * for loops are declared with three expressions separated by semicolons. for (a; b; c), where a is the initialization expression, b is the condition, and c is the final expression.

The initialization expression is executed only once, before the loop starts, and is often used to define and set up the loop variable. Think of it like declaring a counter to use in your loop.

Many for loops use i as the counter and start from 0, so change let x = 1; to let i = 0;.
     */

text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {

    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;

  }else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    if(health <= 0){
        lose();
      }
    healthText.innerText = health;
  }

}
