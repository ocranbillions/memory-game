
//Variables
let matchedPairs, movesCounter, shuffledCards, cardList, clockActive, time, minutes, seconds, clockID;

//Constants
const deck = document.querySelector('.deck');
const cards = document.querySelectorAll('.card');
const movesPanel = document.querySelector('.moves');
const stars = document.querySelectorAll('.stars i');
const restartIcon = document.querySelector('.restart');
const clock = document.querySelector('.clock');
const modal = document.querySelector('.modal_container');
const playAgain = document.querySelector('.btn');

resetGame();

//Listen for a click on the deck
deck.addEventListener('click', function (event) {

    //Start timer
    if(clockActive === false){
        clockActive = true;
        startClock();
    }    

    //Get clicked item
    const target = event.target;

    //Avoid multiple clicks on same card & Add two cards at a time
    if(cardIsClicked(target) && cardList.length < 2 && firstClick(target)) {     
        showCard(target);       
        addCard(target);
    }

    if(cardList.length === 2){

        if(match(cardList)) {

            keepCardsOpen();

            //Count number of matched pairs
            matchedPairs++;

            if(matchedPairs === 8) {
                //Stop clock
                clearTimeout(clockID);

                //Delay .5 sec then show congratulatory message
                setTimeout(function() {
                    //Show Modal
                    modal.classList.remove('hide');

                    //Get the html section to write winning details
                    const winDetails = document.querySelector('.win_details');

                    //Get the html section to write time spent
                    const timeSpent = document.querySelector('.time_spent');

                    //Write winning details on modal
                    winDetails.textContent = `With ${movesCounter++} moves and ${countStars()} star(s)`;
                    timeSpent.textContent = document.querySelector('.clock').textContent;
                }, 500);                
            }
            
        } else {            
            //  
            cardList[0].classList.add('animated', 'shake');
            cardList[1].classList.add('animated', 'shake');
            
            //Show mismatch pair for 0.5 sec before closing
            setTimeout(function (){
                closeCards();
            }, 400);             
        }

        incrementMovesCounter(); 

        //Star rating
        switch(movesCounter){
            case 13:
            case 16:
            case 19:
            case 20:
                hideStar();
                break;
        }
    } 
});

//Restart game on click
restartIcon.addEventListener('click', function() {
    resetGame(); 
});

//Restarts game after a win
playAgain.addEventListener('click', function() {
    resetGame();     
    modal.classList.add('hide');
});



function resetGame(){
    //Only show modal when theres a WIN
    modal.classList.add('hide');   

    //Reset timer
    time = 0;
    clockActive = false;
    clock.innerHTML = '0:00';

    //Clear clock from previous game (if any)
    clearTimeout(clockID);

    //reset variables
    matchedPairs = 0;
    movesCounter = 0;
    cardList = [];
    movesPanel.textContent = 0;

    //Reset game board
    shuffledCards = shuffle([...cards]);
    for (card of shuffledCards) {
        card.classList.remove('open', 'show', 'avoid-clicks', 'match', 'animate', 'rubberBand');
        deck.appendChild(card);
    }

    //reset stars 
    showAllStars();
}

function cardIsClicked(tgrt){
    return tgrt.classList.contains('card');
}
function showCard(trgt){
    trgt.classList.add('open', 'show');
}

function firstClick(tgrt){
    //Returns true if card hasnt been clicked previously
    return !tgrt.classList.contains('avoid-clicks');
}

function addCard(trgt){
    cardList.push(trgt);      
    trgt.classList.add('avoid-clicks');
}

function match(cards) {
    return cards[0].firstElementChild.className === cards[1].firstElementChild.className;
}

function keepCardsOpen() {
    cardList[0].classList.add('match', 'animated', 'rubberBand');
    cardList[1].classList.add('match', 'animated', 'rubberBand');   
    cardList = [];           
}

function closeCards() {
    cardList[0].classList.remove('animated', 'shake', 'open', 'show', 'avoid-clicks');
    cardList[1].classList.remove('animated', 'shake', 'open', 'show', 'avoid-clicks');  
    cardList = [];   
}

function incrementMovesCounter() {
    movesCounter++;                
    movesPanel.textContent = movesCounter;
}

function hideStar() {
    for(star of stars){
        if(star.style.display != 'none') {
            star.style.display = 'none';
            break;
        }
    }
}

function showAllStars() {
    for(star of stars){
        if(star.style.display == 'none')
            star.style.display = 'inline-block';
    }
}

function startClock() {    
    clockID =  setInterval(function(){        
        time++;
        minutes = Math.floor(time / 60);
        seconds = time % 60;
        if(seconds > 9){
            clock.innerHTML = `${minutes}:${seconds}`;
        }else{
            clock.innerHTML = `${minutes}:0${seconds}`;
        }
    }, 1000);
}

function countStars() {
    let starRating = 0;
    for(star of stars){
        if(star.style.display != 'none')
            starRating++;
    }
    return starRating;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
