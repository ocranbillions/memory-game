
let matchedPairs, movesCounter, shuffledCards, pairOfCards, clockActive, time, minutes, seconds, clockID;

const deck = document.querySelector('.deck');
const cards = document.querySelectorAll('.card');
const movesPanel = document.querySelector('.moves');
const stars = document.querySelectorAll('.stars i');
const restartIcon = document.querySelector('.restart');
const clock = document.querySelector('.clock');

resetGame();

deck.addEventListener('click', function (event) {
    
    //Start timer
    if(clockActive === false){
        clockActive = true;
        startClock();
    }    

    //Get clicked item
    const target = event.target;

    //Avoid multiple clicks on same card & Add two cards at a time
    if(cardIsClicked(target) && pairOfCards.length < 2 && firstClick(target)) {     
        openCard(target);       
        addCard(target);
    }

    if(pairOfCards.length === 2){

        if(match(pairOfCards)) {

            keepCardsOpen();
            
            //Empty pairOfCards Array
            pairOfCards = [];

            //Count number of matched pairs
            matchedPairs++;

            if(matchedPairs === 8) {
                clearTimeout(clockID);
                setTimeout(function() {
                    alert('Finished');
                    alert(`${movesCounter} moves`);
                }, 0);                
            }
            
        } else {
            //Display mismatch cards for .5 secs before closing
            //setTimeout(function (){                
                closeCards();
                pairOfCards = [];
            //}, 500);
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

function resetGame(){
    /*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - 
 */
    //Reset timer
    time = 0;
    clearTimeout(clockID);
    clockActive = false;
    clock.innerHTML = '0:00';

    matchedPairs = 0;
    movesCounter = 0;
    pairOfCards = [];
    movesPanel.textContent = 0;

    //Reset game board
    shuffledCards = shuffle([...cards]);
    for (card of shuffledCards) {
        card.classList.remove('open', 'show', 'avoid-clicks', 'match');
        deck.appendChild(card);
    }

    //reset stars 
    showAllStars();
}

function cardIsClicked(tgrt){
    return tgrt.classList.contains('card');
}
function openCard(trgt){
    trgt.classList.add('open', 'show');
}

function firstClick(tgrt){
    return !tgrt.classList.contains('avoid-clicks');
}

function addCard(trgt){
    pairOfCards.push(trgt);      
    trgt.classList.add('avoid-clicks');
}

function match(cards) {
    return cards[0].firstElementChild.className === cards[1].firstElementChild.className;
}

function keepCardsOpen() {
    pairOfCards[0].classList.add('match');
    pairOfCards[1].classList.add('match');
}

function closeCards() { 
    pairOfCards[0].classList.remove('open', 'show', 'avoid-clicks');
    pairOfCards[1].classList.remove('open', 'show', 'avoid-clicks');     
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