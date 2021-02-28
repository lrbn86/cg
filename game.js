import Player from './src/Player.js';
import Projectile from './src/Projectile.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const x = canvas.width / 2;
const y = canvas.height / 2;
const player = new Player(x, y, 30, 'blue', c);

player.draw();

window.addEventListener('click', function(event) {
	const mouseX = event.clientX;
	const mouseY = event.clientY;
	const projectile = new Projectile(mouseX, mouseY, 5, 'red', null, c);
	projectile.draw();
});
