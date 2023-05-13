const express = require("express");
const jwt = require("jsonwebtoken");
const keys = require("../settings/keys");
const verification = require("../middlewares/auth");

const app = express();
app.set("key", keys.key);

const router = express.Router();

router.get("/info", verification, (req, res) => {
  res.json("Información entregada");
});

router.post("/", async (req, res) => {
  if (req.body.usuario == "admin" && req.body.pass == "12345") {
    const payload = {
      chech: true,
    };
    const token = jwt.sign(payload, app.get("key"), {
      expiresIn: "7d",
    });
    res.json({
      message: "!Autenticación Exitosa!",
      token: token,
    });
  } else {
    res.json({
      message: "Usuario y/o password son incorrectas",
    });
  }
});

module.exports = router;
