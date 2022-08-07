// generate a table

const size = 5
const array = ['dead', 'alive', 'alive']

// get random class - alive or dead
let randomClass = () => {
  let randomEl = array[Math.floor(Math.random() * array.length)]
  return randomEl
}

function createRandomBoard(size) {
  for (let y = 1; y <= size; y++) {
    newTR = document.createElement('tr')
    newTR.setAttribute('id', 'row' + y)
    document.getElementById('game-board').appendChild(newTR)
    for (let x = 1; x <= size; x++) {
      newTD = document.createElement('td')
      newTD.setAttribute('id', 'x' + x + 'y' + y)
      newTD.innerHTML = 'o'
      let newClass = randomClass()
      newTD.classList.add(newClass)
      document.getElementById('row' + y).appendChild(newTD)
    }
  }
}

createRandomBoard(size)

function isExist(x, y) {
  if (
    document.getElementById(`x${x}y${y}`) == undefined ||
    x > size ||
    y > size
  ) {
    return false
  } else return true
}

//console.log(isExist(5, 6))

function getCoorAround(x, y) {
  let around = []
  //console.log(x, y)
  if (isExist(x - 1, y - 1)) {
    around.push(`x${x - 1}y${y - 1}`)
  }
  if (isExist(x, y - 1)) {
    around.push(`x${x}y${y - 1}`)
  }
  if (isExist(x + 1, y - 1)) {
    around.push(`x${x + 1}y${y - 1}`)
  }
  if (isExist(x - 1, y)) {
    around.push(`x${x - 1}y${y}`)
  }
  if (isExist(x + 1, y)) {
    around.push(`x${x + 1}y${y}`)
  }
  if (isExist(x - 1, y + 1)) {
    around.push(`x${x - 1}y${y + 1}`)
  }
  if (isExist(x, y + 1)) {
    around.push(`x${x}y${y + 1}`)
  }
  if (isExist(x + 1, y + 1)) {
    around.push(`x${x + 1}y${y + 1}`)
  }
  //console.log(around, around.length)
  return around
}

let counterAlive = 0

function countAlive(around) {
  let state
  let deadAliveArr = around
    .map((elem) => {
      counterAlive = 0
      if (document.getElementById(elem)) {
        //console.log(state)
        state = document.getElementById(elem).classList.contains('alive')
      }
      if (state === undefined) {
        state = 0
      }
      //console.log(state)
      if (state) {
        counterAlive = counterAlive + 1
        //console.log('I am here ', elem, counterAlive)
      }
      return state
    })
    .reduce((acc, current) => acc + current, 0)

  return deadAliveArr
}

let newStatesArr = []

// creates an array with the new states
function getNewStates() {
  let around = 0
  let aliveAround = 0
  let isAlive = false
  let currentCell
  // for each element count alive around
  for (let y = 1; y <= size; y++) {
    for (let x = 1; x <= size; x++) {
      //console.log('here')
      currentCell = document.getElementById('x' + x + 'y' + y)
      //console.log(currentCell)
      around = getCoorAround(x, y)
      aliveAround = countAlive(around)
      //console.log("mark alive")
      currentCell.innerHTML = aliveAround
      isAlive = currentCell.classList.contains('alive')
      //console.log(x, y, isAlive)

      if (isAlive && aliveAround < 2) {
        newStatesArr.push(false)
      }
      if (isAlive && aliveAround > 3) {
        newStatesArr.push(false)
      }

      if (isAlive && (aliveAround === 2 || aliveAround === 3)) {
        newStatesArr.push(true)
      }

      if (!isAlive && aliveAround === 3) {
        newStatesArr.push(true)
      }

      if (!isAlive && aliveAround !== 3) {
        newStatesArr.push(false)
      }
    }
  }
  return newStatesArr
}

// let arr = getNewStates()
// console.log(arr, arr.length)

function getNewBoard(newStatesArr) {
  document.getElementById('game-board').innerHTML = ''
  let i = 0
  for (let y = 1; y <= size; y++) {
    newTR = document.createElement('tr')
    newTR.setAttribute('id', 'row' + y)
    document.getElementById('game-board').appendChild(newTR)
    for (let x = 1; x <= size; x++) {
      newTD = document.createElement('td')
      newTD.setAttribute('id', 'x' + x + 'y' + y)
      newTD.innerHTML = 'O'
      //console.log(newStatesArr)
      if (newStatesArr[i]) {
        i++
        newTD.classList.add('alive')
      } else {
        i++
        newTD.classList.add('dead')
      }
      document.getElementById('row' + y).appendChild(newTD)
    }
  }
}

function renewBoard() {
  newStatesArr = []
  let arr = getNewStates()

  getNewBoard(arr)
}

//getNewBoard()
let arr = getNewStates()
//setTimeout(renewBoard(), 5000)
