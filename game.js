import Player from './src/Player.js';
import Enemy from './src/Enemy.js';
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

const enemies = []; // Array of enemies
const enemySpawnRate = 1000;

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

	enemies.forEach((enemy) => {
		enemy.update();
	})
}

// Spawn an enemy based on enemySpawnRate
// 1 second = 1000 milliseconds
function spawnEnemies() {
	setInterval(function() {
		let x;
		let y;
		const radius = 30;

		if (Math.random() < .5) {
			x = Math.random() < .5 ? 0 - radius : canvas.width + radius;
			y = Math.random() * canvas.height;
		} else {
			x = Math.random() * canvas.width;
		  y = Math.random() < .5 ? 0 - radius : canvas.height + radius;
		}

		const color = 'red';
		const angle = Math.atan2(player.y - y, player.x - x);
		const velocity = {
			x: Math.cos(angle), y: Math.sin(angle)
		};

		const enemy = new Enemy(x, y, radius, color, velocity, c);
		enemies.push(enemy)
	}, enemySpawnRate);
}

// Listen to clicks on the browser window
window.addEventListener('click', function(event) {
	const mouseX = event.clientX; // The position of where the mouse clicked on the x-axis
	const mouseY = event.clientY; // The position of where the mouse clicked on the y-axis
	const angle = Math.atan2(mouseY - player.y, mouseX - player.x); // Calculate angle

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

// Initialize and start the game
// Maybe add loading/splash screen or something here...
function startGame() {
	animate();
	spawnEnemies();
}

startGame();
