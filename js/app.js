
let numberOfMatches = 0;
let cardsToMatch = [];

let deck = document.querySelector('.deck');
/*
 * Create a list that holds all of your cards
 */
let cards = document.querySelectorAll('.card');


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let shuffledCards = shuffle(Array.from(cards));

for (card of shuffledCards) {
    deck.appendChild(card);
}


deck.addEventListener('click', function (event) {
    //Get clicked card
    let target = event.target;

    //Check if user clicked a card
    if (target.classList.contains('card')) {
        //Open the card
        displayCard(target);

        //Avoid multiple clicks on same card
        if(!target.classList.contains('avoid-clicks')) {
            //Add only two cards
            if(cardsToMatch.length !== 2) {
                addTocardsToMatch();
                //console.log(cardsToMatch);
            } 
        }

        if(cardsToMatch.length === 2){
            if(cardsToMatch[0].firstElementChild.className === cardsToMatch[1].firstElementChild.className) {
                keepCardsOpen();
                
                cardsToMatch = [];
                numberOfMatches++;

                if(numberOfMatches === 8) 
                    alert('Finished');
                
            } else {
                cardsToMatch[0].classList.remove('open', 'show', 'avoid-clicks');
                cardsToMatch[1].classList.remove('open', 'show', 'avoid-clicks');
                cardsToMatch = [];
            }
        }

    }    
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


function displayCard(trgt){
    trgt.classList.add('open', 'show');
}

function addTocardsToMatch(trgt){
    cardsToMatch.push(trgt);      
    console.log(trgt);      
    trgt.classList.add('avoid-clicks');
}

function keepCardsOpen() {
    cardsToMatch[0].classList.add('match');
    cardsToMatch[1].classList.add('match');
}