const size = 80
const array = ['dead', 'alive']

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

function getCoorAround(x, y) {
  let around = []
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
  return around
}

let counterAlive = 0

function countAlive(around) {
  let state
  let deadAliveArr = around
    .map((elem) => {
      counterAlive = 0
      if (document.getElementById(elem)) {
        state = document.getElementById(elem).classList.contains('alive')
      }
      if (state === undefined) {
        state = 0
      }
      if (state) {
        counterAlive = counterAlive + 1
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
      currentCell = document.getElementById('x' + x + 'y' + y)
      around = getCoorAround(x, y)
      aliveAround = countAlive(around)
      isAlive = currentCell.classList.contains('alive')
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
  console.log('i am here')
  let arr = getNewStates()
  getNewBoard(arr)
}

let arr = getNewStates()
setInterval(renewBoard, 200)
