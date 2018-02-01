//
// GLOBAL VARIABLES
//
let width;
let height;

// TODO: The lists should be made to work, and the unicorns need to be added in.

let particles;
let ctx;

let update = () => {
	width = $(window).width();
	height = $(window).height();

	ctx.canvas.width = width;
	ctx.canvas.height = height;
	ctx.clearRect(0, 0, width, height);
	for (let i = particles.length - 1; 0 <= i; i--) {
		let p = particles[i];
		p.update(0.05);
		p.draw(ctx);
		if (height * 1.1 < p.pos.y) {
			particles.splice(i, 1);
		}
	}
};

let toggle_task_menu = () => {
	let name = $("#add-task-menu").css("animation-name");
	if (name == "move_down") {
		$("#add-task-menu").css("animation-name", "move_up")
		$("#task_name").blur();
	} else {
		$("#add-task-menu").css("animation-name", "move_down")
		$("#task_name").focus();
	}
}

let load = () => {
	storage = window.localStorage;

	load_tasks();


	setInterval(update, 50);

	display_tasks();

	// Setup canvas.
	ctx = $("#canvas")[0].getContext("2d");
	
	particles = new Array();
};

document.addEventListener('deviceready', load, false);

/*
 * Things this app will do:
 * - Let you set tasks.
 * - Say how often they should repeat.
 * - Reward with unicorn "stickers" when they're beaten.
 * - Sum up these stickers and maybe have some way of looking at stats.
 */
