const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = []; //stores particles created
let hue = 0;

/**
 * Create a rectangle that automatically keeps the same size 
 * and fill when resizing the window.
 */
// window.addEventListener('resize', function() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     ctx.fillStyle = 'white';
//     ctx.fillRect(10, 10, 150, 50);
// })

// ctx.fillStyle = 'white';
// ctx.fillRect(10, 10, 50, 50)

/**
 * Create a circle that automatically keeps the same size 
 * and fill when resizing the window.
 */

// window.addEventListener('resize', function() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// });
// ctx.fillStyle = 'blue';
// ctx.strokeStyle = 'red';
// ctx.lineWidth = 15;
// ctx.beginPath();
// ctx.arc(100, 100, 50, 0, Math.PI * 2);
// ctx.stroke();
// ctx.fill();
// console.log(ctx);


/**
 * Create a mouse...
 */

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/** 
 * store mouse x and y coords
 * starts as undefined for a blank canvas
 * 
*/ 
const mouse = {
    x: undefined,
    y: undefined,
}

/** 
 * updates the updated mouse location coords when mouse clicked
 * draws a circle where the mouse was clicked
*/ 
canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;    
    // mouse click makes 10 particles using for loop
    for (let i = 0; i < 10; i++){
    particlesArray.push(new Particle());    
    }
})

/**
 * track the mouse movement
 */
canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;  
    // mouse movement makes 10 particles using for loop
    // lower value of i to make the trail smaller
    for (let i = 0; i < 5; i++){
        particlesArray.push(new Particle());    
        }
})

// /**
//  * draw a circle using a 360 arc of PI * 2 to complete the circle
//  */
// function drawCircle(){
//     ctx.fillStyle = 'blue';
//     ctx.beginPath();
//     ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
//     ctx.fill();
// }

/**
 * Creates a Particle object on the mouse and flow in random direction
 */
class Particle {
    constructor(){
        this.x = mouse.x //sets initial partical to mouse x position
        this.y = mouse.y //sets initial partical to mouse y position
        this.size = Math.random() * 16 + 1; //random size between 1 and value set
        this.speedX = Math.random() * 3 - 1.5; //random number between 1.5 and -1.5
        this.speedY = Math.random() * 3 - 1.5; //random number between 1.5 and -1.5
        this.color = 'hsl(' + hue + ', 100%, 50%)'; //keeps original color of particle at creation
    }
    // method that updates the speed of the particle to keep it moving
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1; //reduces the size of the particle with each frame
    }
    // method that takes this.x, this.y and this.size to pass to canvas arc method 
    // to draw a circle representing the particle
    draw(){
        ctx.fillStyle = this.color; //sets base color of particle using hue, saturation and lightness
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}


function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();        
        for (let j = i; j < particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[j].x; //calculate distance between particle in x axis
            const dy = particlesArray[i].y - particlesArray[j].y; //calculate distance between particle in y axis
            const distance = Math.sqrt(dx * dx + dy * dy); //calculate distance using pythagorean thorem
            // check if distance is under 100 pixels
            if (distance < 100){
                ctx.beginPath(); //begin line draw
                ctx.strokeStyle = particlesArray[i].color; //sets color of stroke line
                ctx.lineWidth = particlesArray[i].size/10; //adjust the width of the stroke line relative to circle radius
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y); //start draw location
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y); //end draw location
                ctx.stroke(); //draw the line on canvas
                ctx.closePath();
            }
        }
        if (particlesArray[i].size <= 0.3){
            particlesArray.splice(i, 1); //remove particle at index if it is <= 0.3
            console.log(particlesArray.length)
            i--; //decrement index if element was deleted
        }
    }
}

/**
 * animates using drawCircle
 * loops over itself endlessly
 * clears the animation on each loop
 */
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); //this clears the entire canvas on each refresh
    // ctx.fillStyle = 'rgba(0,0,0,0.01)'; // gives opacity to particles
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue+=2; // increment hue for each animation step, can increase for faster color change
    requestAnimationFrame(animate); //calls the animate function and loops it because animate calls itself
}
animate(); //starts the loop

