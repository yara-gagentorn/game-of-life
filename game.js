// generate a table

const size = 10
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

function getCoorAround(x, y) {
  // get current class alive? dead?

  // get array of around
  let around = []
  around.push(`x${x - 1}y${y - 1}`)
  around.push(`x${x}y${y - 1}`)
  around.push(`x${x + 1}y${y - 1}`)
  around.push(`x${x - 1}y${y}`)
  around.push(`x${x + 1}y${y}`)
  around.push(`x${x - 1}y${y + 1}`)
  around.push(`x${x}y${y + 1}`)
  around.push(`x${x + 1}y${y + 1}`)
  return around
}

let aroundN = getCoorAround(1, 5)
let counterAlive = 0
function countAlive(around) {
  let state
  let deadAliveArr = around
    .map((elem) => {
      if (document.getElementById(elem)) {
        state = document.getElementById(elem).classList.contains('alive')
      }
      if (state === undefined) {
        state = 0
      }
      //console.log(state)
      if (state) {
        counterAlive = counterAlive + 1
        //console.log(counterAlive)
      }
      return state
    })
    .reduce((acc, current) => acc + current, 0)

  //console.log(counterAlive)
  //console.log(deadAliveArr)
  return deadAliveArr
}

countAlive(aroundN)

function getNewBoard() {
  let around
  let aliveAround
  let isAlive
  let currentCell
  // for each element count alive around
  for (let y = 1; y <= size; y++) {
    for (let x = 1; x <= size; x++) {
      currentCell = document.getElementById('x' + x + 'y' + y)
      //console.log(currentCell)
      around = getCoorAround(x, y)
      aliveAround = countAlive(around)
      currentCell.innerHTML = aliveAround
      console.log(currentCell.classList.contains('alive'))
      isAlive = currentCell.classList.contains('alive')
      console.log(isAlive)
      if (isAlive && aliveAround <= 2) {
        currentCell.classList.remove('alive')
        currentCell.classList.add('dead')
      }
      if (isAlive && aliveAround >= 3) {
        currentCell.classList.remove('alive')
        currentCell.classList.add('dead')
      }
      if (!isAlive && aliveAround === 3) {
        currentCell.classList.add('alive')
        currentCell.classList.add('dead')
      }
    }
  }
}

//getNewBoard()

setInterval(getNewBoard(), 5000)
