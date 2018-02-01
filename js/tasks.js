// Storage
const TASKS_KEY = "##tasks_key";
const META_DATA_KEY = "##meta_data_key"

let storage;
let tasks;
let meta;

let load_tasks = () => {
	// Load the tasks.
	let tasks_data = storage.getItem(TASKS_KEY);
	if (!tasks_data) {
		tasks = new Array();
	} else {
		tasks = JSON.parse(tasks_data);
	}

	// Load the meta data.
	let meta_data = storage.getItem(META_DATA_KEY);
	if (!meta_data) {
		meta = {
			total_unicorns : 0,
			last_completed_task : "",
		};
	} else {
		meta = JSON.parse(meta_data);
	}
};

let store_tasks = () => {
	// Store the tasks in the browser.
	storage.setItem(TASKS_KEY, JSON.stringify(tasks));
	storage.setItem(META_DATA_KEY, JSON.stringify(meta));
};

let convert_to_unicorns = (number) => {
	let string = number.toString(2);
	let out = "";

	let len = Math.min(string.length, 9);
	for (let i = 0; i < len; i++) {
		if (string.charAt(i) == "1") {
			let id = len - i - 1;
			out += `<img class="unicorn" src="img/Unicorns/${id}.png"/>`;
		}
	}
	return out;
};

let display_tasks = () => {
	let el = $("#active-task-list");
	el.text("");

	let current_date = (new Date());

	tasks.forEach((task, i, tasks) => {
		let unicorns = convert_to_unicorns(task.completions);
		el.append(`
			<li class="list-group-item">
				<div class="col"><button class="btn btn-primary w-100" onclick="complete_task('${task.name}')">${task.name}(${task.completions})</button></div>
				<div class="col">${unicorns}</div>
			</li>`);
	});

	$("#total-unicorns").text(`Total Unicorns: ${meta.total_unicorns}`);
};

let add_task_from_form = () => {
	let task_name = $("#task_name").val();

	if (task_name.length == 0) {
		return;
	}

	add_task(task_name);

	$("#task_name").val("");
}

let remove_task_from_form = () => {
	let task_name = $("#task_name").val();

	if (task_name.length == 0) {
		return;
	}

	remove_task(task_name);

	$("#task_name").val("");
}

let find_task = (name) => {
	let task = tasks.find((e) => e.name == name);
	if (!task) {
		console.log(`Cannot find task: "${name}"`);
	}
	return task;
}

let remove_task = (name) => {
	tasks = tasks.filter((t) => t.name.toLowerCase() != name.toLowerCase());

	store_tasks();
	display_tasks();
}

let add_task = (name) => {
	// If "repeat_interval" is set to 0, it doesn't repeat.
	let task = {
		'name' : name, 
		'completions' : 0,
		'last_completed' : new Date(0),
	};

	tasks.push(task);
	store_tasks();
	display_tasks();
};

let complete_task = (name) => {
	let task = find_task(name);
	if (!task) {
		return;
	}
	task.completions++;
	task.last_completed = new Date();

	meta.last_completed = name;
	meta.total_unicorns++;

	store_tasks();
	display_tasks();

	console.log(meta.total_unicorns, meta.total_unicorns % 13);
	if (meta.total_unicorns % 13 == 0) {
		fire_sparkles();
	}
}
