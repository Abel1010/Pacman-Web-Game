const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
console.log(context);
//Selecting canvas from html file and establishing a 2d drawing environment in it

canvas.width = innerWidth;
canvas.height = innerHeight;
//Set the canvas to match the window size (take up full screen)

class Boundary {
    static　width = 40
    static height = 40
    constructor({position}) {
        this.position = position
        this.width = 40
        this.height = 40
    }
    draw() {
        context.fillStyle = 'blue';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
//Create the square used to build the boundary walls for the map, setting size, color, and position

class Player {
  constructor({position, velocity}) {
    this.position = position
    this.velocity = velocity
    this.radius = 15
  }
  
  draw() {
    context.beginPath()
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    context.fillStyle = "yellow"
    context.fill()
    context.closePath()
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}
//Creates the player's appearance as a circle, sets color, size, position and updates position


/* class playerFire {
    constructor({position, velocity}) {
      this.position = position
      this.velocity = velocity
      this.radius = 8
    }
  }
*/
//WIP code for player controlled projectile fire

const boundaries = []

const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2
  },
  velocity: {
    x: 0,
    y: 0 
  }
})

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

let lastKey = ''

const map  = [
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-','-'], 
  ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','-'],
  ['-', ' ', '-', ' ', '-', ' ', '-', ' ', '-', ' ', '-', ' ', '-', '-', '-', '-', '-', ' ', '-', '-', '-', '-', '-', ' ', '-', '-', '-', '-', '-', '-', '-', '-', ' ','-'],
  ['-', ' ', '-', ' ', '-', ' ', '-', ' ', '-', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', '-', ' ', ' ', ' ','-'], 
  ['-', ' ', '-', ' ', '-', ' ', '-', ' ', '-', ' ', '-', ' ', '-', '-', ' ', '-', '-', '-', '-', '-', ' ', '-', '-', '-', ' ', ' ', ' ', '-', ' ', ' ', ' ', '-', ' ','-'], 
  ['-', ' ', '-', ' ', ' ', ' ', '-', ' ', '-', ' ', '-', ' ', '-', '-', ' ', ' ', ' ', ' ', '-', '-', ' ', ' ', ' ', '-', '-', '-', '-', '-', '-', '-', '-', '-', ' ','-'], 
  ['-', ' ', '-', '-', '-', '-', '-', ' ', ' ', ' ', '-', ' ', '-', '-', '-', '-', '-', ' ', '-', '-', '-', '-', ' ', '-', '-', '-', '-', '-', '-', '-', ' ', ' ', ' ','-'],
  ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', '-', '-', '-', ' ', ' ', ' ', '-', ' ', '-', '-','-'], 
  ['-', '-', '-', ' ', '-', '-', '-', '-', '-', '-', '-', ' ', '-', ' ', '-', ' ', '-', '-', '-', '-', ' ', '-', ' ', '-', '-', '-', ' ', ' ', ' ', '-', ' ', ' ', ' ','-'],
  ['-', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', '-', '-', ' ', '-', ' ', '-', ' ', ' ', ' ', ' ', '-', ' ', '-', ' ', '-', '-', '-', ' ', ' ', ' ', '-', '-', '-', ' ','-'], 
  ['-', ' ', '-', '-', '-', ' ', '-', '-', '-', ' ', ' ', ' ', '-', ' ', '-', '-', '-', '-', ' ', '-', ' ', ' ', ' ', '-', '-', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ','-'], 
  ['-', ' ', '-', '-', '-', ' ', '-', '-', '-', ' ', '-', ' ', '-', ' ', '-', '-', '-', '-', ' ', '-', '-', ' ', '-', '-', '-', '-', ' ', '-', '-', '-', ' ', '-', ' ','-'],
  ['-', ' ', '-', '-', '-', ' ', '-', '-', '-', ' ', '-', ' ', '-', ' ', '-', '-', '-', '-', ' ', '-', '-', ' ', '-', '-', '-', '-', ' ', '-', ' ', ' ', ' ', '-', ' ','-'], 
  ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', '-', ' ', '-', '-', '-', ' ', ' ', '-', ' ', ' ', '-', '-', '-', '-', ' ', '-', ' ', '-', '-', '-', ' ','-'],
  ['-', ' ', '-', '-', ' ', '-', '-', '-', '-', '-', '-', ' ', '-', ' ', '-', '-', '-', ' ', '-', '-', ' ', '-', '-', '-', ' ', ' ', ' ', '-', ' ', ' ', ' ', '-', ' ','-'],
  ['-', ' ', '-', ' ', ' ', '-', ' ', ' ', ' ', '-', '-', ' ', '-', ' ', '-', '-', '-', ' ', '-', '-', ' ', '-', '-', '-', ' ', '-', '-', '-', '-', '-', ' ', '-', ' ','-'],
  ['-', ' ', '-', ' ', ' ', '-', ' ', '-', ' ', '-', '-', ' ', '-', ' ', '-', '-', '-', ' ', '-', '-', ' ', '-', '-', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', '-', ' ','-'],
  ['-', ' ', '-', '-', '-', '-', ' ', '-', ' ', '-', '-', ' ', '-', ' ', '-', '-', '-', ' ', '-', '-', ' ', '-', '-', '-', '-', '-', '-', '-', ' ', '-', ' ', '-', ' ','-'],
  ['-', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ','-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-','-']
]

  map.forEach((row, i) => {
    row.forEach((symbol, j) => {
      switch (symbol) {
        case '-': 
          boundaries.push(new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            }  
          })
        )
          break;
      }
    })
  })

function circleCollidesWithRect({
  circle, 
  rectangle
}) {
  return (
  circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&  circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x && circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y && circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width)
}

function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, innerWidth, innerHeight)
  
    if(keys.w.pressed && lastKey === 'w') {
      for(let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if(circleCollidesWithRect({
      circle: {...player, velocity: {
        x: 0,
        y: -5
      }
    },
      rectangle: boundary
    })) {
        player.velocity.y = 0
        break
    } else {
        player.velocity.y = -5
    }
  }
  } else if (keys.a.pressed && lastKey === 'a') {
    for(let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if(circleCollidesWithRect({
      circle: {...player, velocity: {
        x: -5,
        y: 0
      }
    },
      rectangle: boundary
    })) {
        player.velocity.x = 0
        break
    } else {
        player.velocity.x = -5
    }
  }
  } else if (keys.s.pressed && lastKey === 's') {
    for(let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if(circleCollidesWithRect({
      circle: {...player, velocity: {
        x: 0,
        y: 5
      }
    },
      rectangle: boundary
    })) {
        player.velocity.y = 0
        break
    } else {
        player.velocity.y = 5
    }
  }
  } else if (keys.d.pressed && lastKey === 'd') {
    for(let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
        if(circleCollidesWithRect({
        circle: {...player, velocity: {
          x: 5,
          y: 0
        }
      },
        rectangle: boundary
      })) {
          player.velocity.x = 0
          break
      } else {
          player.velocity.x = 5
      }
    }
  }
  
  boundaries.forEach((boundary) => {
    boundary.draw()

    if (circleCollidesWithRect({
      circle: player,
      rectangle: boundary
    })) {
      console.log('we are colliding')
      player.velocity.x = 0
      player.velocity.y = 0
    }
  })
  player.update()

  // player.velocity.x = 0
  // player.velocity.y = 0
}

animate()
//Moves the player around by adjusting velocity in corresponding directions to key presses


window.addEventListener('keydown', ({key}) => {
  switch (key) {
    case 'w':
      keys.w.pressed = true
      lastKey = 'w'
      player.velocity.y = -5
      break
    case 'a':
      keys.a.pressed = true
      lastKey = 'a'
      player.velocity.x = -5
      break
    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      player.velocity.x = 5
      break
    case 's':
      keys.s.pressed = true
      lastKey = 's'
      player.velocity.y = 5
      break
    case 'e':
      keys.e.pressed = true
      lastKey = 'e'
  }
})
//Sets controls for the game and checks if specified keys are being pressed

window.addEventListener('keyup', ({key}) => {
  switch (key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
  }
})
//Checks if specified keys are not being pressed