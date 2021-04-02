var currentQuestionIndex = 0;
let time = questions.length * 15;
var timeLeft = 75;
var timeInterval;
//array to push to
var count = [];
var listScores = document.querySelector("#list-scores");
var insertText = document.querySelector("#questions p");
var complyBtn = document.querySelector("#submit");
var backBtn = document.querySelector("#back");
var gameEnd = document.querySelector('#end-screen');
var beginScreen= document.querySelector('#start-screen');
var beginBtn = document.querySelector("#start");
var inquiryElement = document.querySelector("#questions");
var timeEl = document.querySelector("#time");
var questionOptions = document.querySelector("#choices");
 // selected div to work with element
 var highscores = document.querySelector("#highscores");
backBtn.onclick = points; 

// complyBtn.onclick = submitScores;
// calling the highpoints function whenever a tag is clicked
highscores.addEventListener("click", function() {
    highPoints()
})

beginBtn.addEventListener("click", function() {
    console.log("clicky clicky");
    startQuiz()
})

complyBtn.addEventListener("click", function (e) {
    submitScores(e)
})


function startQuiz() {
    beginScreen.setAttribute('class', "hide");
    // hides start screen and shows questions
    inquiryElement.removeAttribute("class");
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
    questionOptions.innerHTML = "";
    for (var i = 0; i < currentQuestion.choice.length; i++) {
        var userDecision = document.createElement("button");
        userDecision.setAttribute("class", "choice")
        userDecision.setAttribute("value", currentQuestion.choice[i])
        userDecision.textContent = i + 1 + "." + currentQuestion.choice[i];
        userDecision.id = (i + 1);
        userDecision.onclick = getAnswer;

        questionOptions.appendChild(userDecision);
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
    gameEnd.setAttribute('class', "show");
    document.querySelector("#final-score").textContent= timeLeft;
    if(timeInterval) {
        clearInterval(timeInterval);
    }
    timeEl.textContent = timeLeft;
}




function setTime() {

    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
     timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timeEl.textContent = timeLeft + ' seconds remaining';
            // Decrement `timeLeft` by 1
            timeLeft--;
        } else if (timeLeft === 1) {
            // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
            timeEl.textContent = timeLeft + ' second remaining';
            timeLeft--;
        } else {
            // Once `timeLeft` gets to 0, set `timerEl` to an empty string
            timeEl.textContent = '';
            // Use `clearInterval()` to stop the timer
            clearInterval(timeInterval);
              // Call the `endGame` function
              endGame();          
        }
    }, 1000);
}

function highPoints() {
    // highscores will be showing
    highscores.setAttribute("class", "show");
    //
    beginScreen.setAttribute('class', "hide");
    //
    inquiryElement.setAttribute('class', "hide");
    //
    gameEnd.setAttribute('class', "hide");
}

function points() {
    highscores.setAttribute("class", "hide");
    //
    beginScreen.setAttribute('class', "");
    // Refreshes the page
    location.reload();
}

function submitScores(event) {
    // preventing page from refeshing
    event.preventDefault();
    var initials = document.querySelector("#initials");
    //retrieves items in storage. parse taking string and turns back into array or single object
    var storageLocal = JSON.parse(localStorage.getItem("scoresHigh")) || [];
    console.log(storageLocal);
    // object
    var userScore = {
        // takes value of input field and assigns to name inside object
        name: initials.value,
        score: timeEl.textContent
    };
        console.log(userScore);
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
    var storageLocal = JSON.parse(localStorage.getItem("scoresHigh")) || [];
    console.log(storageLocal[0].name);
    for (i = 0; i < userScore.length; i++) //when for goes to 3, no 4th item. 
    {
        var listItems = document.createElement("LI")
        listItems.textContent = storageLocal[i].name + " " + storageLocal[i].score;
        document.getElementById("list-scores").append(listItems);
        console.log("done")
    }  
    highPoints();
}

// function called when click view Highscores
// parse  objects
// var for highscores to hook into anchor id=view-scores hook in via querey seclector
// add event listenor for click use .onClick
// for loop to apphend list items to highscore list
