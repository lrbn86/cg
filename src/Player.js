function Player(x, y, radius, color, c) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius,0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}
}

export default Player;
