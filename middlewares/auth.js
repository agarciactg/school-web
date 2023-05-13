const express = require("express");
const jwt = require("jsonwebtoken");
const verification = express.Router();

const app = express();
const keys = require("../settings/keys");

app.set("key", keys.key);

verification.use((req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    res.status(401).send({
      error: "Es necesario un token de autentificación",
    });
    return;
  }
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
    console.log(token);
  }
  if (token) {
    jwt.verify(token, app.get("key"), (error, decoded) => {
      if (error) {
        return res.json({
          message: "El token no es válido",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
});

module.exports = verification;
