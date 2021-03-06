import logger from "./logger.js";

module.exports = {
  database: "ntask_dev",
  username: "",
  password: "",
  params: {
    dialect: "sqlite",
    storage: "ntask_dev.sqlite",
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`);
    },
    define: {
      underscored: true
    }
  },
  port: process.env.PORT || 3000,
  jwtSecret: "Nta$K-d3v-AP1",
  jwtSession: { session: false }
};
