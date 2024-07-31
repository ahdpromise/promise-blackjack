// challenge 1; you age in Days 
function ageInDays(){
    var birthYear = prompt('what year were you born?');
    var ageInDayss = (2021- birthYear)* 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageInDayss+ ' days old');
    h1.setAttribute('id' , 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);

}

function reset () {

    document.getElementById('ageInDays').remove();
}

// challenge 2; Cat Generator

function  generatCat() {
var image = document.createElement('img');
var div = document.getElementById('flex-cat-gen');
image.src ="https://i.kym-cdn.com/photos/images/original/002/205/305/eb5.gif";
div.appendChild(image);
}










// Challange 3: rock paper , scissors

function rpsGame(yourChoice) {
 console.log(yourChoice);

var humanChoice , botChoise; 
humanChoice = yourChoice.id;

botChoise = numberToChoice (randToRpsInt());
console.log('computer Choice',botChoise);

results = decideWinner(humanChoice,botChoise); // [0,1] human lost | bot won
console.log(results);

message = finalMessage(results); //{ 'message': "you won" ! , ' color': 'green'" }
console.log(message);

rpsFrontEnd(yourChoice.id,botChoise, message);

}


function randToRpsInt() {
return Math.floor(Math.random() * 3);   // Code  V 3:16
}

function numberToChoice(number){
    return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
var rpsDatabase= {
  'rock': {'scissors':1 , 'rock': 0.5, 'paper':0},
  'paper':{'rock':1, 'paper':0.5,'scissors':0 },
 'scissors':{'paper':1, 'scissors':0.5,'rock':0 },
};

var yourScore= rpsDatabase[yourChoice][computerChoice];
var computerScore = rpsDatabase[computerChoice][yourChoice];
return[yourScore,computerScore];
}



function finalMessage([yourScore, computerScore]) {
if (yourScore=== 0){
return {'message':'You lost' , 'color': 'red'};

}else if (yourScore === 0.5){
return {'message':'You Tied! ' , 'color': 'yellow'};

} else {
return  {'message':'You won ! ' , 'color': 'green'};
}
}

function rpsFrontEnd (humanImageChoice, botImageChoice, finalMessage){
var imagesDatabase = {

   'rock': document.getElementById('rock').src,
   'paper': document.getElementById('paper').src,
   'scissors': document.getElementById('scissors').src

}


// lets remove all the images

document.getElementById('rock').remove();
document.getElementById('paper').remove();
document.getElementById('scissors').remove();

var humanDiv = document.createElement('div');
var botDiv = document.createElement('div');
var messageDiv = document.createElement('div');

humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "'heigth=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
messageDiv.innerHTML= "<h1 style='color: " + finalMessage['color'] + ": font-size:60px; padding: 30px; '>" + finalMessage ['message'] + "</h1>"
botDiv.innerHTML = "<img src=' " + imagesDatabase[botImageChoice] + "'heigth=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"

document.getElementById('flex-box-rps-div').appendChild(humanDiv);
document.getElementById('flex-box-rps-div').appendChild(messageDiv);
document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

// Challange 4: Change the color of all Buttons

var all_buttons = document.getElementsByTagName('button');
var copyAllButtons= [];
for (let i=0; i< all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}

// console.log(copyAllButtons);  to Show all buttons in cosole in Browser


function buttonColorChange(buttonThingy){
   // console.log(buttonThingy.value);   Ex write in console in browser
   if (buttonThingy.value === 'red') {
       buttonRed();
   }else if (buttonThingy.value === 'green') {
    buttonGreen();
   }else if (buttonThingy.value === 'reset') {
    buttonReset();
}else if (buttonThingy.value === 'random') {
    randomColors();
}
}

function buttonRed(){
    for(let i=0; i<all_buttons.length; i++){

    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-danger');
}
}

function buttonGreen(){
    for(let i=0; i<all_buttons.length; i++){

    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success');
}
}

function buttonReset(){
    for(let i=0; i<all_buttons.length; i++){

    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
}
}

function randomColors(){
var choices = ['btn-primary','btn-danger' ,'btn-warning' ,'btn-success']

  for (let i=0; i<all_buttons.length; i++) {
let randomNumber= Math.floor(Math.random()*4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
}
}


////////66666//666666////// Challeng 5: BlackJack  ////////666////666////////////////////////

let blackjackGame ={
    'you':    {'scoreSpan': '#your-blackjack-result', 'div': '#your-box','score':0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box','score':0},
    ///   5:58 ----- Show random card when I 'hit' button 
    'cards' : ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    // SCORE //
    'cardsMap' : {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    // score table
    'wins' : 0,
    'losses':0,
    'draws': 0,
    'isStand':false,
    'turnsOver': false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']
const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal); 

function blackjackHit(){
if (blackjackGame['isStand']=== false){
    let card= randomCard(); ///   5:58 ----- Show random card when I 'hit' button 
                                //  console.log(card),     
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
                                // console.log(YOU['score']);
   // showCard(DEALER);
}
}
///   5:58 ----- Show random card when I 'hit' button 

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame ['cards'][randomIndex];
}



function showCard(card,activePlayer) {
                                                 // alert('YOU JUST CLIKED ME!')
if (activePlayer['score'] <=21) {                                            
  let cardImage= document.createElement('img');
  cardImage.src = `images/${card}.png`; //cardImage.src = 'images/Q.png'; // for 1 card 
  document.querySelector(activePlayer['div']).appendChild(cardImage);  //complex (activePlayer)
  hitSound.play();
}
}  
// to reomve card (button deal) 

function blackjackDeal() {
 if (blackjackGame['turnsOver']=== true){
        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');   //(1)
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img'); // (2)
                // manually       //console.log(yourImages); //yourImages[0].remove();   REMOVE each one                                 
    // for all remove card   For Loop   
    // (1)
    for (i=0; i< yourImages.length; i++){
        yourImages[i].remove();
    }       
    // (2)
    for (i=0; i< dealerImages.length; i++){
        dealerImages[i].remove();
    }       

    // reset score to 0
    YOU['score'] = 0;
    DEALER['score'] =0;

     document.querySelector('#your-blackjack-result').textContent =0;
     document.querySelector('#dealer-blackjack-result').textContent =0;

     document.querySelector('#your-blackjack-result').style.color = '#ffffff';
     document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

     document.querySelector('#blackjack-result').textContent= "Let's play";
     document.querySelector('#blackjack-result').style.color= 'black';

     blackjackGame['turnsOver'] = true;
} 
}  

// SCORE //
   function updateScore(card, activePlayer) {

    // if adding 11 keeps ,e below 21 , add 11. otherwise, add 1 
    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <=21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
        } else {

            activePlayer['score'] += blackjackGame['cardsMap'][card];  

    }
    }

    function showScore(activePlayer) {
// to stop acount more 21 
if (activePlayer ['score'] >21) {
    document.querySelector(activePlayer['scoreSpan']).textContent= 'BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color= 'yellow ';

} else{
     document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}
// Adding Second Player 
async function dealerLogic() {
    blackjackGame['isStand']= true; 
    while(DEALER['score']<16 && blackjackGame['isStand']=== true){

        let card = randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
 }
// to math with  dealar autmatic
    blackjackGame['turnsOver'] = true;
    let winner = computerWinner();
    showResult(winner);
}


// computer winner and return who just won
// update the wins , draws and losses 
function computerWinner(){
    let winner;
    if (YOU ['score']<=21 ){
        //condition: higher score than dealer or when dealer busts but you're 21 or under
        if (YOU['score']> DEALER['score'] || (DEALER['score'] >21)){
            blackjackGame['wins'] ++;
            winner= YOU;
       } else if (YOU ['score']<DEALER['score']){
        blackjackGame['losses'] ++;
        winner= DEALER;

       } else if (YOU ['score'] === DEALER['score']){
        blackjackGame['draws'] ++;
    }



// condation when user busts but dealer doesn't 
    } else if (YOU ['score']> 21 && DEALER['score']<=21){

        blackjackGame['losses'] ++;
        winner= DEALER;


// condition : when you AND the dealer busts

    } else if  (YOU ['score']>21 && DEALER['score']>21 ){
        blackjackGame['draws'] ++;
    } 
    console.log(blackjackGame);
    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver']=== true){

        if (winner === YOU)  {
            document.querySelector('#wins').textContent=blackjackGame['wins'];
            message= 'You won!';
            messageColor= 'green';
            winSound.play();

        } else if (winner === DEALER){
            document.querySelector('#losses').textContent=blackjackGame['losses'];
            message= 'You lost!';
            messageColor= 'red';
            lossSound.play();

        } else  {
            document.querySelector('#draws').textContent=blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'black';  
        }
        document.querySelector('#blackjack-result').textContent= message;
        document.querySelector('#blackjack-result').style.color= messageColor;
    }
   }

