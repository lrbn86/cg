import Player from './src/Player.js';
import Projectile from './src/Projectile.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const player = new Player(centerX, centerY, 30, 'blue', c);

const projectiles = [];
const projectileSize = 10;
const projectileColor = 'green';

// const projectile = new Projectile(centerX, centerY, 5, 'red', {x: 1, y: 1}, c);

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	player.update();
	projectiles.forEach((projectile) => {
		projectile.update();
	});
}

window.addEventListener('click', function(event) {
	const mouseX = event.clientX;
	const mouseY = event.clientY;
	const angle = Math.atan2(mouseY - centerY, mouseX - centerX)
	const velocity = {
		x: Math.cos(angle),
		y: Math.sin(angle)
	};
	const projectile = new Projectile(centerX, centerY, projectileSize, projectileColor, velocity, c);
	projectiles.push(projectile);
});

animate();