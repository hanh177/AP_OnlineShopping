const app = require("./src/app");

const PORT = process.env.PORT;

const server = app.listen(PORT || 4001, () => {
  console.log(`User service starts with port ${PORT}`);
});

// ctrl + c: close server
process.on("SIGINT", () => {
  server.close(() => console.log("Exit server"));
});
