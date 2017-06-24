import bodyParser from "body-parser";

module.exports = app => {
  const PORT = process.env.PORT || 3000;
  app.set("port", PORT);
  app.set("json s[aces", 4);
  app.use(bodyParser.json());
  app.use(app.auth.initialize());
  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });
};
