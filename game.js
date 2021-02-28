import Player from './src/Player.js';
import Projectile from './src/Projectile.js';

/* SET UP CANVAS */
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');


/* BEGIN GAME CODE */

const centerX = canvas.width / 2; // The center of canvas on x-axis
const centerY = canvas.height / 2; // The center of canvas on y-axis

const player = new Player(centerX, centerY, 30, 'blue', c); // Player object

const projectiles = []; // Array of projectiles
const projectileSize = 10; // The projectile's radius
const projectileColor = 'green'; // The color of the projectile

// Render Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height); // Clear the screen
	player.update(); // Draw and update player

	// Loop through projectile array and draw and update each projectile 
	// Each projectile moves independently of each other
	// and we can have multiple projectile at the same time on screen instead of just one projectile
	projectiles.forEach((projectile) => {
		projectile.update();
	});
}

window.addEventListener('click', function(event) {
	const mouseX = event.clientX; // The position of where the mouse clicked on the x-axis
	const mouseY = event.clientY; // The position of where the mouse clicked on the y-axis
	const angle = Math.atan2(mouseY - centerY, mouseX - centerX) // Calculate angle

	// Calculate velocity
	const velocity = {
		x: Math.cos(angle),
		y: Math.sin(angle)
	};

	// Create a new projectile that is initially in the center of the screen
	// and follows where the mouse last clicked
	const projectile = new Projectile(centerX, centerY, projectileSize, projectileColor, velocity, c);

	projectiles.push(projectile); // Store projectile into projectiles array
});

animate();