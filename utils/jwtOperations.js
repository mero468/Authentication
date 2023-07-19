const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtAccessGenerator(payload) {
  
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}
function jwtRefreshGenerator(payload){
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
}

module.exports = {jwtAccessGenerator, jwtRefreshGenerator};