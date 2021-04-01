var currentQuestionIndex = 0;
let time = questions.length * 15;
var timeLeft = 75;
var timeInterval;
//array to push to
var count = [];
var listScores = document.querySelector("#list-scores")
var insertText = document.querySelector("#questions p");
var submitBtn = document.querySelector("#submit");
var backBtn = document.querySelector("#back");
var endScreen = document.querySelector('#end-screen');
var startScreen = document.querySelector('#start-screen');
var startBtn = document.querySelector("#start");
var questionsElement = document.querySelector("#questions");
var timerElement = document.querySelector("#time");
var questionChoices = document.querySelector("#choices");
 // selected div to work with element
 var highscores = document.querySelector("#highscores");
backBtn.onclick = points; 

// submitBtn.onclick = submitScores;
// calling the highpoints function whenever a tag is clicked
highscores.addEventListener("click", function() {
    highPoints()
})

startBtn.addEventListener("click", function() {
    console.log("clicky clicky");
    startQuiz()
})

submitBtn.addEventListener("click", function () {
    submitScores()
})


function startQuiz() {
    startScreen.setAttribute('class', "hide");
    // hides start screen and shows questions
    questionsElement.removeAttribute("class");
    getCurrentQuestion();
    setTime();
}


function getCurrentQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
        return endGame();
    }
    var titleElement = document.querySelector("#question-title")
    titleElement.textContent = currentQuestion.title;
    questionChoices.innerHTML = "";
    for (var i = 0; i < currentQuestion.choice.length; i++) {
        var userChoice = document.createElement("button");
        userChoice.setAttribute("class", "choice")
        userChoice.setAttribute("value", currentQuestion.choice[i])
        userChoice.textContent = i + 1 + "." + currentQuestion.choice[i];
        userChoice.id = (i + 1);
        userChoice.onclick = getAnswer;

        questionChoices.appendChild(userChoice);
    }
    insertText.textContent = "";
    
}

function getAnswer() {
    console.log(this);

    if (this.value[0] === questions[currentQuestionIndex].answer[0]) {
        insertText.textContent = 'Good Job!';
        currentQuestionIndex++;
        setTimeout(getCurrentQuestion, 1000);
    }
    else {
        insertText.textContent = 'Try Again';
        timeLeft = Math.max(0, timeLeft - 15);
    }

}




function endGame() {
    var questions = document.querySelector('#questions')
    questions.setAttribute('class', "hide");
    endScreen.setAttribute('class', "show");
    document.querySelector("#final-score").textContent= timeLeft;
    if(timeInterval) {
        clearInterval(timeInterval);
    }
    timerElement.textContent = "";
}




function setTime() {

    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
     timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerElement.textContent = timeLeft + ' seconds remaining';
            // Decrement `timeLeft` by 1
            timeLeft--;
        } else if (timeLeft === 1) {
            // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
            timerElement.textContent = timeLeft + ' second remaining';
            timeLeft--;
        } else {
            // Once `timeLeft` gets to 0, set `timerEl` to an empty string
            timerElement.textContent = '';
            // Use `clearInterval()` to stop the timer
            clearInterval(timeInterval);
              // Call the `endGame` function
              endGame();          
        }
    }, 1000);
}

function highPoints() {
    // highscores will be showing
    highscores.removeAttribute("class", "hide");
    //
    startScreen.setAttribute('class', "hide");
    //
    questionsElement.setAttribute('class', "hide");
    //
    endScreen.setAttribute('class', "hide");
}

function points() {
    highscores.setAttribute("class", "hide");
    //
    startScreen.setAttribute('class', "");
    // Refreshes the page
    location.reload();
}

function submitScores(event) {
    // preventing page from refeshing
    event.preventDefault();
    var initials = document.querySelector("#initials");
    //retrieves items in storage. parse taking string and turns back into array or single object
    var storageLocal = JSON.parse(localStorage.getItem("scoresHigh"));
    console.log(storageLocal);
    // object
    var userScore = {
        // takes value of input field and assigns to name inside object
        name: initials.value,
        score: timeLeft.value
    };
    // if item from storage has value, will execute what's inside if statment
    if (storageLocal !== null) {
        // if storageLocal has something in it, then count will become whatever is inside of storage local
        count = storageLocal;
    }
    // taking current score submitted and adding to the array count at the end
    count.push(userScore);
    // stringify turns anything into a string
    localStorage.setItem("scoresHigh", JSON.stringify(count));
    console.log("stored");
    for (i = 0; i < 5; i++) {
        var listItems = document.createElement("LI")
        listItems.textContent = storageLocal[i]
        document.getElementById("list-scores").appendChild(listItems);
        console.log("done")
    }  
}

// function called when click view Highscores
// parse  objects
// var for highscores to hook into anchor id=view-scores hook in via querey seclector
// add event listenor for click use .onClick
// for loop to apphend list items to highscore list
