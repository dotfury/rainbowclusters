window.onload = () => {
	const canvas = document.getElementById('canvas');
	const context = canvas.getContext("2d");
	const width = canvas.width = window.innerWidth;
	const height = canvas.height = window.innerHeight;

	let centerY = height / 2;
	let centerX = width / 2;
	const speed = 0.01;
	const clusters = [];
	const clusterCount = 100;
	const velocity = 5;

	const randomRange = (min, max) => (Math.random() * (max - min) + min);
	const randomRangeNegative = () => {
			let num = (Math.random() * velocity);
			num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
			return num;
	}

	class Cluster {
		constructor() {
			this.numObjects = 10;
			this.baseRadius = 10;
			this.radius = 50;
			this.slice = (Math.PI * 2) / this._numObjects;
			this.centerX = centerX;
			this.centerY = centerY;
			this.dx = 0;
			this.dy = 0;
			this.x = 0;
			this.y = 0;
			this.angle = 0;
			this.rAngle = 0;
			this.velX = randomRangeNegative();
			this.velY = randomRangeNegative();
		}

		// GETTERS
		get numObjects() {
			return this._numObjects;
		}

		get baseRadius() {
			return this._baseRadius;
		}

		get radius() {
			return this._radius;
		}

		get slice() {
			return this._slice;
		}

		get centerX() {
			return this._centerX;
		}

		get centerY() {
			return this._centerY;
		}

		get dx() {
			return this._dx;
		}

		get dy() {
			return this._dy;
		}

		get x() {
			return this._x;
		}

		get y() {
			return this._y;
		}

		get angle() {
			return this._angle;
		}

		get rAngle() {
			return this._rAngle;
		}

		get velX() {
			return this._velX;
		}

		get velY() {
			return this._velY;
		}

		// SETTERS
		set numObjects(n) {
			this._numObjects = n;
		}

		set baseRadius(r) {
			this._baseRadius = r;
		}

		set slice(s) {
			this._slice = s;
		}

		set radius(r) {
			this._radius = r;
		}

		set centerX(x) {
			this._centerX = x;
		}

		set centerY(y) {
			this._centerY = y;
		}

		set dx(x) {
			this._dx = x;
		}

		set dy(y) {
			this._dy = y;
		}

		set x(x) {
			this._x = x;
		}

		set y(y) {
			this._y = y;
		}

		set angle(angle) {
			this._angle = angle;
		}

		set rAngle(angle) {
			this._rAngle = angle;
		}

		set velX(x) {
			this._velX = x;
		}

		set velY(y) {
			this._velY = y;
		}

		// METHODS
		updateDistance() {
			this._centerX += this._velX;
			this._centerY += this._velY;
			this._dx = Math.abs(centerX - this._centerX);
			this._dy = Math.abs(centerY - this._centerY);
		}

		checkBounds() {
			if ((this._centerX > width || this.centerX < 0) || (this._centerY > height || this.centerY < 0)) {
				const index = clusters.indexOf(this);
				clusters.splice(index, 1);
				clusters.push(new Cluster());
			}
		}

		draw() {
			for (let i = 0; i < this._numObjects; i++) {
				this._radius = this._baseRadius + Math.sin(this._rAngle) + (Math.sqrt(this._dx * this._dx + this._dy * this._dy) / 24);
				this._y = this._radius * Math.sin(this._angle);
				this._x = this._radius * Math.cos(this._angle);

				const red = Math.round(randomRange(50, 255));
				const green = Math.round(randomRange(50, 255));
				const blue = Math.round(randomRange(50, 255));

				context.lineWidth = 1;
				context.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
				context.beginPath();
				context.arc((this._centerX + this._x), (this._centerY + this._y), 10, 0, Math.PI * 2, false);
				context.stroke();

				this._angle += this._slice;
				this._rAngle += speed;
			}
		}
	}

	for (let i = 0; i < clusterCount; i++) {
		clusters[i] = new Cluster();
	}

	const render = () => {
		context.clearRect(0, 0, width, height);
		context.fillStyle = '#000000';
		context.fillRect(0, 0, width, height);

		clusters.map((c) => {
			c.updateDistance();
			c.checkBounds();
			c.draw();
		});

		requestAnimationFrame(render);
	};

	document.body.addEventListener('mousemove', e => {
		centerX = e.clientX;
		centerY = e.clientY;
	});

	render();
};
