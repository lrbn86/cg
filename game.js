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

let animationId; // Contains the current frame

// Render Loop
function animate() {
	animationId = requestAnimationFrame(animate);
	c.fillStyle = "rgba(0, 0, 0, 0.3)";
	c.fillRect(0, 0, canvas.width, canvas.height); // Clear the screen
	player.update(); // Draw and update player

	// Loop through projectile array and draw and update each projectile 
	// Each projectile moves independently of each other
	// and we can have multiple projectile at the same time on screen instead of just one projectile
	projectiles.forEach((projectile, projectileIndex) => {
		projectile.update();

		// Remove projectiles that are off screen
		setTimeout(() => {
			if (projectile.x + projectile.radius < 0 ||
				  projectile.x - projectile.radius > canvas.width ||
					projectile.y + projectile.radius < 0 ||
					projectile.y - projectile.radius > canvas.height) {
				projectiles.splice(projectileIndex, 1);
			}
		}, 0) ;
	});

	// Loop through enemies array and draw and update each projectile
	// Each enemy moves independently of each other
	// similar to projectiles
	enemies.forEach((enemy, enemyIndex) => {
		enemy.update();
		setTimeout(() => {
			if (enemy.x - enemy.radius < 0) {
				enemies.splice(enemyIndex, 1);
			}
		}, 0);

		const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);

		// Detect collision between player and enemy
		// Freeze frame upon contact indicating game over
		if (distance - player.radius - enemy.radius < 1) {
			cancelAnimationFrame(animationId);
			endGame();
		}
		projectiles.forEach((projectile, projectileIndex) => {
			const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
			// Upon contact between enemy and projectile, remove both
			if (distance - enemy.radius - projectile.radius < 1) {
				// Wait until the very last frame to remove from array
				// This prevents flickering
				setTimeout(() => {
					enemies.splice(enemyIndex, 1);
					projectiles.splice(projectileIndex, 1);
				}, 0);
			}
		});
	});

}

// Spawn an enemy based on enemySpawnRate
// 1 second = 1000 milliseconds
function spawnEnemies() {
	setInterval(function() {
		let enemyX;
		let enemyY;

		// The size of the enemy is random in radius within the interval [20, 40]
		const enemyRadius = Math.random() * (40 - 20) + 20; 

		// The enemy will spawn randomly on the edges of the window on a 50/50 chance
		// Math.random() returns a value between 0 and, but not including, 1 (i.e. [0, 1))
		if (Math.random() < .5) {
			// There's a chance that the enemy spawns either on the left or right of the window
			enemyX = Math.random() < .5 ? 0 - enemyRadius : canvas.width + enemyRadius;

			// At the same time, the enemy's y is random between the top and bottom of the window
			enemyY = Math.random() * canvas.height;
		} else {

			// The enemy's x will be between the left and right of the window
			enemyX = Math.random() * canvas.width;

			// There's a chance that the enemy spawns either on the top or bottom of the window
		  enemyY = Math.random() < .5 ? 0 - enemyRadius : canvas.height + enemyRadius;
		}

		const enemyColor = 'red';
		const angle = Math.atan2(player.y - enemyY, player.x - enemyX);
		const enemyVelocity = {
			x: Math.cos(angle), y: Math.sin(angle)
		};

		const enemy = new Enemy(enemyX, enemyY, enemyRadius, enemyColor, enemyVelocity, c);
		enemies.push(enemy)
	}, enemySpawnRate);
}

// Listen to clicks on the browser window
function windowListener(event) {
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
}

// Initialize and start the game
// Maybe add loading/splash screen or something here...
function startGame() {
	animate();
	spawnEnemies();
	if ('ontouchstart' in window) {
		window.addEventListener('touchstart', windowListener);
		console.log("MOBILE");
	} else {
		window.addEventListener('click', windowListener);
		console.log("DESKTOP");
	}
}

function endGame() {
	if (alert('Game over, press OK to play again!')) {
	} else {
		window.location.reload();
	}
}

startGame();
