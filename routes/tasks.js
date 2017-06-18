module.exports = app => {
	const Tasks = app.models.tasks;
	app.get("/tasks", (req, res) => {
		Tasks.findAll({title: "foo", "req": req}, (tasks) => {
			res.json({tasks: tasks});
		});
	});
};
