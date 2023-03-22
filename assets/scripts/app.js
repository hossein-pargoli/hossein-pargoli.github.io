
// colors

let baseColor = "#c2c2c2"
let attackColor = "#EF3E42"
let defendColor = "#005A9C"


// DOM.box

const boxOne = document.getElementById("one")
const boxTwo = document.getElementById("two")
const boxThree = document.getElementById("three")
const boxFour = document.getElementById("four")
const boxFive = document.getElementById("five")
const boxSix = document.getElementById("six")


// main

const selectMode = document.getElementById("mode")
const selectPattern = document.getElementById("pattern")
let countdownOff, lightOnPerSecond, mode, pattern
let randInt, preRandInt, randColor


function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


function resetBoxColor(color) {
  boxOne.style.backgroundColor = color
  boxTwo.style.backgroundColor = color
  boxThree.style.backgroundColor = color
  boxFour.style.backgroundColor = color
  boxFive.style.backgroundColor = color
  boxSix.style.backgroundColor = color
}


function boxSetColor(boxNumber, boxColor) {
  switch (boxNumber) {
    case 1:
      boxOne.style.backgroundColor = boxColor
      break
    case 2:
      boxTwo.style.backgroundColor = boxColor
      break
    case 3:
      boxThree.style.backgroundColor = boxColor
      break
    case 4:
      boxFour.style.backgroundColor = boxColor
      break
    case 5:
      boxFive.style.backgroundColor = boxColor
      break
    case 6:
      boxSix.style.backgroundColor = boxColor
      break
  }
}


function main() {

  preRandInt = 0
  console.log("wait...")

  setTimeout(() => {
    let mainInterval = setInterval(() => {

      mode = selectMode.value
      pattern = selectPattern.value

      resetBoxColor(baseColor)
      
      if (pattern == "random") {

        if (randInt == undefined) {
          randInt = randomIntFromInterval(1, 6)
        } else {
          preRandInt = randInt
        }
        
        if (randInt === preRandInt) {
          switch (preRandInt) {
            case 1:
              randInt = randomIntFromInterval(2, 6)
              break
            case 2:
              randInt = randomIntFromInterval(3, 6)
              break
            case 3:
              randInt = randomIntFromInterval(4, 6)
              break
            case 4:
              randInt = randomIntFromInterval(1, 3)
              break
            case 5:
              randInt = randomIntFromInterval(1, 4)
              break
            case 6:
              randInt = randomIntFromInterval(1, 5)
              break
          }
        }

      }

      console.log(`${randInt} --> ${mode}`)

      if (mode == "attack")
        boxSetColor(randInt, attackColor)
      else if (mode == "defend")
        boxSetColor(randInt, defendColor)
      else if (mode == "attack-defend") {
        switch (randomIntFromInterval(1, 2)) {
          case 1:
            randColor = attackColor
            break
          case 2:
            randColor = defendColor
            break
        }
        boxSetColor(randInt, randColor)
      }

      if (countdownOff) {
        resetBoxColor(baseColor)
        clearInterval(mainInterval)
      }

    }, 1000 / lightOnPerSecond)
  }, 5000)

}


// timer + start

const timerElement = document.getElementById("timer")
const startButton = document.getElementById("start")
let timeSecond, timeMinutes, time, startMain

function startTimer() {

  countdownOff = false
  startButton.style.visibility = "hidden"

  if (time == undefined) {
    timeSecond = Number(document.getElementById("time-sec").value)
    timeMinutes = Number(document.getElementById("time-min").value)
    time = (timeMinutes * 60) + timeSecond
  }

  lightOnPerSecond = Number(document.getElementById("speed").value)
  
  let counter = 0
  let minute = Math.floor(time / 60)
  let second = time - minute * 60

  let startTimerInterval = setInterval(() => {

    timerElement.innerText = `${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`

    if (second != 0)
      second--
    else {
      minute--
      if (minute != -2)
        second = 59
    }

    counter++
    if (counter == time + 1) {
      timerElement.innerText = "00:00"
      startButton.style.visibility = "visible"
      countdownOff = true
      clearInterval(startTimerInterval)
    }

  }, 1000)
}


// timer overlay setting

const timerOverlayElement = document.getElementById("timer-overlay")

function timerOverlayOn() {
  timerOverlayElement.style.display = "flex";
}

function timerOverlayOff() {
  timerOverlayElement.style.display = "none";
}


// countdown to start overlay

const countdownToStartOverlay = document.getElementById("countdown-to-start-overlay")
const bellAudio = document.getElementById("bell-audio")

function countdownToStart() {

  let counter = 4
  let countdownToStartInterval = setInterval(() => {
    countdownToStartOverlay.style.display = "flex";
    countdownToStartOverlay.innerText = counter - 1

    if (counter == 1) {
      countdownToStartOverlay.innerText = "GO"
      bellAudio.play()
    }
    
    if (counter == 0) {
      counter = 'GO'
      startTimer()
    } else
      counter -= 1
  
    if (counter == 'GO') {
      countdownToStartOverlay.style.display = "none";
      clearInterval(countdownToStartInterval)
    }

  }, 1000)
}
