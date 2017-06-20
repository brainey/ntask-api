module.exports = app => {
	const Tasks = app.db.models.Tasks;
	app.get("/tasks", (req, res) => {
		Tasks.findAll({title: "foo", "req": req}).then(tasks => {
			res.json({tasks: tasks});
		});
	});
};
