module.exports = {
  database: "ntask_test",
  username: "",
  password: "",
  params: {
    dialect: "sqlite",
    storage: "ntask_test.sqlite",
    logging: process.env.LOGGING ? console.log : false,
    define: {
      underscored: true
    }
  },
  port: process.env.PORT || 4000,
  jwtSecret: "NTASK_TEST",
  jwtSession: { session: false }
};
