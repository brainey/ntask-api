import logger from "./logger.js";

module.exports = {
  database: "ntask",
  username: "",
  password: "",
  params: {
    dialect: "sqlite",
    storage: "ntask.sqlite",
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`);
    },
    define: {
      underscored: true
    }
  },
  port: process.env.PORT || 8080,
  jwtSecret: "bso5izn7Hr",
  jwtSession: { session: false }
};
