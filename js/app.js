
let matchedPairs, movesCounter, shuffledCards, pairOfCards;


const deck = document.querySelector('.deck');
const cards = document.querySelectorAll('.card');
const movesPanel = document.querySelector('.moves');
const restartButton = document.querySelector('.restart');


resetGame();


deck.addEventListener('click', function (event) {
    //Get clicked item
    const target = event.target;

    //Check if user clicked a card
    if (cardIsClicked(target)) {
        //Open the card
        openCard(target);

        //Avoid multiple clicks on same card & Add two cards at a time
        if(firstClick(target) && pairOfCards.length < 2) {            
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
                    alert('Finished');
                    alert(`${movesCounter} moves`);
                }
                
            } else {

                closeCards();

                //Empty pairOfCards Array
                pairOfCards = [];
            }

            incrementMovesCounter(); 
        }
    }    
});




//Restart button
restartButton.addEventListener('click', function() {
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

    matchedPairs = 0;
    movesCounter = 0;
    pairOfCards = [];
    movesPanel.textContent = 0;

    shuffledCards = shuffle(Array.from(cards));

    for (card of shuffledCards) {
        card.classList.remove('open', 'show', 'avoid-clicks', 'match');
        //Add each card's HTML to the page
        deck.appendChild(card);
    }
}



function cardIsClicked(tgrt){
    return tgrt.classList.contains('card');
}
function openCard(trgt){
    trgt.classList.add('open', 'show');
}

function firstClick(tgrt){
    //
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