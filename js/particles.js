let Particle;

let fire_sparkles = (ammount) => {
	let loop_max = ammount || 50;
	for (let i = 0; i < loop_max; i++) {
		particles.push(new Particle());
	}
};

(() => {
	let t = 0;

	let random_range = (min, max) => {
		return Math.random() * (max - min) + min;
	};

	let hsl = (h, s, l) => {
		return `hsl(${h}, ${s}%, ${l}%)`;
	};

	Particle = class {
		constructor() {
			this.pos = {x : random_range(width * 0.45, width * 0.55), y : height};

			this.vel = {
				x : random_range(-width * 0.75, width * 0.75), 
				y : random_range(-height * 0.70, -height * 0.85)
			};

			this.max_fall = random_range(90, 130);
			this.drag = random_range(280, 320);

			this.angle = 0;
			this.angle_vel = random_range(-Math.PI, Math.PI);

			this.color = hsl(
				random_range(0, 360), 
				random_range(55, 88), 
				random_range(60, 80)
			);
		}

		update(delta) {
			this.vel.x *= (1 - delta) * 0.95;
			this.vel.x += delta * random_range(-100, 100);
			this.vel.y = Math.min(this.vel.y + this.drag * delta, this.max_fall);

			this.pos.x += this.vel.x * delta;
			this.pos.y += this.vel.y * delta; 

			this.angle += this.angle_vel * delta;
		}

		draw(ctx) {
			ctx.save();

			ctx.translate(this.pos.x, this.pos.y);
			ctx.rotate(this.angle);

			ctx.fillStyle = this.color;
			ctx.fillRect(-13, -6, 13, 6);

			ctx.restore();
		}
	};
})();
