const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");

lettersArray.forEach(letter => {
  let span = document.createElement("span");
  let theLetter = document.createTextNode(letter);
  span.appendChild(theLetter);
  span.className = 'letter-box';
  lettersContainer.appendChild(span);
});

const words = {
  programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
  movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
  people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];
console.log( randomValueValue );
document.querySelector(".game-info .category span").innerHTML = randomPropName;

let lettersGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomValueValue);
let correctGuesses = 0;

lettersAndSpace.forEach(letter => {
  let emptySpan = document.createElement("span");
  if (letter === ' ') {
    emptySpan.className = 'with-space';
    correctGuesses++; // Spaces are considered correct by default
  }
  lettersGuessContainer.appendChild(emptySpan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");
let wrongAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {
  let theStatus = false;

  if (e.target.className === 'letter-box' && !e.target.classList.contains('clicked')) {
    e.target.classList.add("clicked");
    e.target.style.pointerEvents = "none"; // Disable further clicks

    let theClickedLetter = e.target.innerHTML.toLowerCase();
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, WordIndex) => {
      if (theClickedLetter === wordLetter) {
        theStatus = true;
        correctGuesses++;

        guessSpans.forEach((span, spanIndex) => {
          if (WordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    function triggerFireworks() {
      const container = document.querySelector('.fireworks-container');
    
      for (let i = 0; i < 50; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
    
        // Set random position
        firework.style.left = Math.random() * window.innerWidth + 'px';
        firework.style.top = Math.random() * window.innerHeight + 'px';
    
        // Generate a random color
        firework.style.background = getRandomColor();
    
        // Append firework to container
        container.appendChild(firework);
    
        // Remove firework after animation ends
        firework.addEventListener('animationend', () => {
          firework.remove();
        });
      }
    }
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    if (!theStatus) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      if(wrongAttempts < 8){
      document.getElementById("fail").play();
      }
      else if (wrongAttempts === 8) {
        endGame(`Game Over, The Word Is ${randomValueValue}`);
        document.getElementById("gameover").play();
        lettersContainer.classList.add("finished");
      }
    } else {
      if (correctGuesses === lettersAndSpace.length) {
        document.getElementById("win").play();
        endGame("Congratulations! You Win!");
        lettersContainer.classList.add("finished");
        triggerFireworks();
      }else{
      document.getElementById("success").play();
      }
    }
  }
});

function endGame(message) {
  let div = document.createElement("div");
  let divText = document.createTextNode(message);
  div.appendChild(divText);
  div.className = 'popup';
  document.body.appendChild(div);

  // Add Restart Button
  let restartButton = document.createElement("button");
  restartButton.innerHTML = "Play Again";
  restartButton.className = "restart-btn";
  restartButton.onclick = restartGame;
  div.appendChild(restartButton);
}

function restartGame() {
  window.location.reload(); // Simple page reload to restart the game
}