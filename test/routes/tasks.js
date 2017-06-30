import jwt from "jwt-simple";

describe("Route: Tasks", () => {
  const db = app.db;
  const Users = app.db.models.Users;
  const Tasks = app.db.models.Tasks;
  const jwtSecret = app.libs.config.jwtSecret;
  let token;
  let fakeTask;
  beforeEach(done => {
    db.sequelize.sync({force: true})
      .then(() => {
        Users
          .create({
            name: "John",
            email: "john@mail.net",
            password: "12345"
          })
          .then(user => {
            Tasks.bulkCreate([{
                id: 1,
                title: "Work",
                user_id: user.id
              }, {
                id: 2,
                title: "Study",
                user_id: user.id
              }, {
                id: 3,
                title: "Eat",
                user_id: user.id
              }, {
                id: 4,
                title: "Sleep",
                user_id: user.id
              }])
              .then(tasks => {
                fakeTask = tasks[0];
                token = jwt.encode({id: user.id}, jwtSecret);
                done();
              });
          });
      });
  });
  describe("GET /tasks", () => {
    describe("status 200", () => {
      it("returns a list of tasks done", done => {
        request.get("/tasks")
          .set("Authorization", `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            res.status.should.equal(200);
            expect(res.body).to.have.length(4);
            expect(res.body[0].title).to.eql("Work");
            expect(res.body[1].title).to.eql("Study");
            expect(res.body[2].title).to.eql("Eat");
            expect(res.body[3].title).to.eql("Sleep");
            done(err);
          });
      });
    });
  });
  describe("POST /tasks/", () => {
    describe("status 200", () => {
      it("creates a new task", done => {
        request.post("/tasks")
          .set("Authorization", `JWT ${token}`)
          .send({title: "Run"})
          .expect(200)
          .end((err, res) => {
            res.status.should.to.equal(200);
            expect(res.body.title).to.eql("Run");
            expect(res.body.done).to.be.false;
            done(err);
          });
      });
    });
  });
  describe("GET /tasks/:id", () => {
    describe("status 200", () => {
      it("returns one task", done => {
        request.get(`/tasks/${fakeTask.id}`)
          .set("Authorization", `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            if (err) {
              console.log(err);
            }
            res.status.should.to.equal(200);
            expect(res.statusCode).to.equal(200);
            expect(res.body.title).to.eql("Work");
            done(err);
          });
      });
    });
    describe("status 404", () => {
      it("throws error when task does not exist", done => {
        request.get("/tasks/0")
          .set("Authorization", `JWT ${token}`)
          .expect(404)
          .end((err, res) => done(err));
      });
    });
  });
  describe("PUT /tasks/:id", () => {
    describe("status 204", () => {
      it("updates a task", done => {
        request.put(`/tasks/${fakeTask.id}`)
          .set("Authorization", `JWT ${token}`)
          .send({
            title: "Travel",
            done: true
          })
          .expect(204)
          .end((err, res) => {
             request.get(`/tasks/${fakeTask.id}`)
                .set("Authorization", `JWT ${token}`)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    res.status.should.to.equal(200);
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.title).to.eql("Travel");
                    expect(res.body.done).to.be.true;
                    done(err);
                });
          });
      });
    });
    // should a 404 or something for task not found go here ?
  });
  describe("DELETE /tasks/:id", () => {
    describe("status 204", () => {
      it("remove a task", done => {
        request.delete(`/tasks/${fakeTask.id}`)
          .set("Authorization", `JWT ${token}`)
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });
});
