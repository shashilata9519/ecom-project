const Server = require("./src/server");

const Utils = require("./src/utills/utills");

const server = new Server().app;

const port = process.env.PORT || 8000;



// console.log(Utils.generateVerificationToken(6));
server.listen(port, () => {
  console.log(`==> Open server running on http://localhost:${port}`);
});
