const app = require("./server");
const connection = require("./config/db");

const port = process.env.PORT || 3000;
connection.once("open", () => {
  app.listen(port, () => {
    console.log(`Server is up and running on: http://localhost:${port}`);
  });
});
