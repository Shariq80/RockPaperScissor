let playerScore = 0
let computerScore = 0
let roundWinner = ""

const scoreMessage = document.getElementById("scoreMessage")
const scoreInfo = document.getElementById("scoreInfo")
const playerScorePara = document.getElementById("playerScore")
const computerScorePara = document.getElementById("computerScore")
const playerSign = document.getElementById("playerSign")
const computerSign = document.getElementById("computerSign")
const endgameModel = document.getElementById("endgameModel")
const endgameMessage = document.getElementById("endgameMessage")
const overlay = document.getElementById("overlay")
const restartBtn = document.getElementById("restartBtn")
const modelImage = document.getElementById("modelImage")

restartBtn.addEventListener("click", restartGame)
overlay.addEventListener("click", closeEndgameModel)

// get Computer's choice
function getComputerChoice(){
    let choices = ["rock", "paper", "scissor"];
    return choices[Math.floor(Math.random() * choices.length)];
}

// to handle player's move from the buttons
const rockBtn = document.getElementById("rock")
const paperBtn = document.getElementById("paper")
const scissorBtn = document.getElementById("scissor")
rockBtn.addEventListener("click", ()=>handleClick("rock"))
paperBtn.addEventListener("click", ()=>handleClick("paper"))
scissorBtn.addEventListener("click", ()=>handleClick("scissor"))

function handleClick(playerMove){
    if(isGameOver()){
        openEndgameModel()
        return
    }
    
    const computerMove = getComputerChoice()
    round(playerMove, computerMove)
    updateChoices(playerMove, computerMove)
    updateScore()

    if(isGameOver()){
        openEndgameModel()
        setFinalMessage()
    }
}

// to check the winner of the Game:
function isGameOver(){
    return playerScore===5 || computerScore===5
}

function round(playerMove, computerMove){
    // if the moves are the same:
    if(playerMove === computerMove){
        roundWinner = "draw"
    }

    // if player wins the round:
    if(
        playerMove==="rock" && computerMove==="scissor" ||
        playerMove==="scissor" && computerMove==="paper" ||
        playerMove==="paper" && computerMove==="rock"
    ){
        playerScore++
        roundWinner = "player"
    }

    // if computer wins the round:
    if(
        computerMove==="rock" && playerMove==="scissor" ||
        computerMove==="scissor" && playerMove==="paper" ||
        computerMove==="paper" && playerMove==="rock"
    ){
        computerScore++
        roundWinner="computer"
    }
    updateScoreMessage(roundWinner, playerMove, computerMove)
}

function updateScoreMessage(winner, playerMove, computerMove){
    if(winner==="player"){
        scoreMessage.textContent = `${capitalizeFirstLetter(playerMove)} beats ${capitalizeFirstLetter(computerMove)}`
        return
    }
    if(winner==="computer"){
        scoreMessage.textContent = `${capitalizeFirstLetter(playerMove)} is beaten by ${capitalizeFirstLetter(computerMove)}`
        return
    }
    scoreMessage.textContent = "It's a Draw"
}

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function updateChoices(playerMove, computerMove){
    switch(playerMove){
        case "rock":
            playerSign.textContent = "🪨"
            break
        case "paper":
            playerSign.textContent = "➣"
            break
        case "scissor":
            playerSign.textContent = "✂️"
    }

    switch(computerMove){
        case "rock":
            computerSign.textContent = "🪨"
            break
        case "paper":
            computerSign.textContent = "➣"
            break
        case "scissor":
            computerSign.textContent = "✂️"
    }
}

function updateScore(){
    playerScorePara.textContent = `Player: ${playerScore}`
    computerScorePara.textContent = `Computer: ${computerScore}`
}

function openEndgameModel(){
    if(playerScore>=5){
        modelImage.src = "./overlay-win.gif"
        endgameModel.append(modelImage)
        endgameModel.append(restartBtn)
        endgameModel.classList.add("active")
        overlay.classList.add("active")
    }
    else if(computerScore>=5){
        modelImage.src = "./overlay-lose.gif"
        endgameModel.append(modelImage)
        endgameModel.append(restartBtn)
        endgameModel.classList.add("active")
        overlay.classList.add("active")
    }
}

function closeEndgameModel(){
    endgameModel.classList.remove("active")
    overlay.classList.remove("active")
}

function setFinalMessage(){
    return playerScore>computerScore ? (endgameMessage.textContent = "You Win") : (endgameMessage.textContent = "You Lose")
}

function restartGame(){
    playerScore = 0
    computerScore = 0
    scoreInfo.textContent = "Choose your Move"
    scoreMessage.textContent = "Let's See who will Win now"
    playerScorePara.textContent = "Player: 0"
    computerScorePara.textContent = "Computer: 0"
    playerSign.textContent = '❔'
    computerSign.textContent = '❔'
    endgameModel.classList.remove("active")
    overlay.classList.remove("active")
}