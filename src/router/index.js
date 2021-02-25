const Router = require("koa-router");
const router = new Router();

require("./user")(router);
const helloWorld = require("../controller/hello_world");

router.get("/", helloWorld);

module.exports = router;
