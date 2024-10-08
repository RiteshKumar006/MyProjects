const canvas = document.querySelector('canvas')
const a = canvas.getContext('2d')
canvas.width = innerWidth;
canvas.height = innerHeight
console.log(a)
class Boundary{
    static height = 40;
    static width = 40;
    constructor({position}) {
        this.position = position
        this.height = 40
        this.width= 40

    }

    draw(){
        a.fillStyle = 'blue'
        a.fillRect(this.position.x, this.position.y, this.width,this.height)
    }
}

class Player{
    constructor({position, velocity}){
        this.position= position
        this.velocity = velocity
        this.radius = 15
    }
    draw(){ 
        a.beginPath()
        a.arc(this.position.x, this.position.y,this.radius,0, Math.PI * 2)
        a.fillStyle = 'yellow'
        a.fill()
        a.closePath()
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y 
    }
}

    // const htec = new Boundary({position:{
    //     x:60, y:90
    // }})
    // console.log(htec)




const boundries = [];
const player = new Player({
    position: {
        x:Boundary.width + Boundary.width/2,
        y:Boundary.height + Boundary.height/2
    },
    velocity:{
        x:0,
        y:0
    }
})


const keys = {
    w:{
        pressed:false
    },
    s:{
        pressed:false
    },
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
}

const map = [
    ['-','-','-','-','-','-','-'],
    ['-',' ',' ',' ',' ',' ','-'],
    ['-',' ','-',' ','-',' ','-'],
    ['-',' ','-',' ','-',' ','-'],
    ['-',' ',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-','-']
]


map.forEach((row, i)=>{
    console.log(row)
    row.forEach((symbol, j) => {
        switch(symbol){
            case '-':
                boundries.push(
                    new Boundary({
                        position:{
                            x:Boundary.width * j,
                            y:Boundary.height * i
                        }
                    })
                )
                break
        }
    })
})

function circleCollidingwithRectangle({circle, rectangle}){
    return (
        circle.position.y - circle.radius +circle.velocity.y <= rectangle.position.y + rectangle.height &&
        circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x && 
        circle.position.y+ circle.radius + circle.velocity.y >= rectangle.position.y &&
        circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width
    )
}

function animate() {
    requestAnimationFrame(animate)
    // console.log("first")
    a.clearRect(0,0,canvas.width, canvas.height)
    boundries.forEach((boundary) => {
        boundary.draw()
        if(circleCollidingwithRectangle({circle: player, rectangle: boundary}) ){
            // console.log("colliding the radius")
            player.velocity.x = 0;
            player.velocity.y =0
        }
    })

    


    player.update();
    // player.velocity.x = 0;
    // player.velocity.y = 0;

    if(keys.w.pressed){
        player.velocity.y = -5
    } else if(keys.a.pressed){
        player.velocity.x=-5
    } else if(keys.s.pressed){
        player.velocity.y=5
    }else if(keys.d.pressed){
        player.velocity.x=5
    }
 }

animate()


addEventListener('keydown', ({key}) =>{
    // console.log("down key", event)
    switch(key){
        case 'w' :
            keys.w.pressed = true
            // player.velocity.y = -5
            break;
        case 'a':
            keys.a.pressed = true
            // player.velocity.x = -5
            break;    
        case 's':
            keys.s.pressed = true
            // player.velocity.y= 5    
            break;
        case 'd':
            keys.d.pressed = true
            // player.velocity.x = 5
            break;    
    }
})

addEventListener('keyup', ({key}) =>{
    // console.log("down key", event)
    switch(key){
        case 'w' :
            keys.w.pressed = false
            player.velocity.y = 0
            break;
        case 'a':
            keys.a.pressed = false
            player.velocity.x = 0
            break;    
        case 's':
            keys.s.pressed = false
            player.velocity.y= 0   
            break;
        case 'd':
            keys.d.pressed = false
            player.velocity.x = 0
            break;    
    }
})