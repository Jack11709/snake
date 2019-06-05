import './style.scss'

class Game {
  constructor() {
    this.width = 20
    this.grid = []
    this.snakeIndex = 50
    this.snake = []
    this.timer = null
    this.direction = 'right'
    this.lost = false
    this.foodEaten = 0
    this.score = 0
    this.init()
  }

  renderSnake() {
    this.grid.forEach(item => item.classList.remove('snake'))
    if (this.grid[this.snakeIndex].classList.contains('food')) {
      this.grid[this.snakeIndex].classList.remove('food')
      this.foodEaten++
      this.score += 1000
      setTimeout(this.generateFood.bind(this), 1000)
    }
    if (this.snake.indexOf(this.snakeIndex) !== -1) this.gameOver()
    this.grid[this.snakeIndex].classList.add('snake')
    for (let i = 0; i < this.snake.length; i++) {
      this.grid[this.snake[i]].classList.add('snake')
    }
    this.scoreDisplay.innerText = this.score
  }

  gameOver() {
    this.lost = true
    clearInterval(this.timer)
    console.log('loss')
  }

  generateFood() {
    this.grid[Math.floor(Math.random() * this.width * this.width)].classList.add('food')
  }

  handleDirection() {
    return {
      right: () => this.snakeIndex % this.width < this.width - 1 ?  this.snakeIndex++ : this.gameOver(),
      left: () => this.snakeIndex % this.width > 0 ? this.snakeIndex-- : this.gameOver(),
      down: () => this.snakeIndex + this.width < this.width * this.width ? this.snakeIndex += this.width: this.gameOver(),
      up: () => this.snakeIndex - this.width >= 0 ? this.snakeIndex -= this.width: this.gameOver()
    }[this.direction]()
  }

  moveSnake() {
    this.score += 10
    this.snake.unshift(this.snakeIndex)
    this.snake = this.snake.splice(0, this.foodEaten)
    this.handleDirection()
    if (!this.lost) this.renderSnake()
  }

  handleKeys({ keyCode }) {
    this.direction = {
      37: this.direction === 'right' ? 'right' : 'left',
      39: this.direction === 'left' ? 'left': 'right',
      40: this.direction === 'up' ? 'up' : 'down',
      38: this.direction === 'down' ? 'down': 'up'
    }[keyCode] || this.direction
  }

  init() {
    this.main = document.querySelector('main.grid')
    this.scoreDisplay = document.querySelector('span.score')

    for (let i = 0; i < this.width * this.width; i++) {
      const square = document.createElement('div')
      square.setAttribute('class', 'grid-item')
      this.grid = [...this.grid, square]
      this.main.appendChild(square)
    }

    this.grid[this.snakeIndex].classList.add('snake')
    this.timer = setInterval(this.moveSnake.bind(this), 100)
    this.generateFood()
    window.addEventListener('keydown', this.handleKeys.bind(this))
  }
}

new Game()
