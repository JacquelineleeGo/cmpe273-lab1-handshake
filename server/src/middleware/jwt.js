const expressJwt = require("express-jwt");
const { secretKey } = require("../constants");

const jwtAuth = expressJwt({ secret: secretKey }).unless({
  path: ["/api/user/login", "/api/user/register"]
});

module.exports = jwtAuth;