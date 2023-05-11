const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/error_handler");

const app = express();
const port = 3000;

const jwt = require("jsonwebtoken");
const keys = require("./settings/keys");

app.set("key", keys.key);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HOLA MUNDO");
});

const whitelist = ["http://localhost:3000", "https://myapp.co"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};

app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hola mi server en express");
// });
// app.get("/nueva-ruta", (req, res) => {
//   res.send("Hola, soy una nueva ruta");
// });

app.post("/login", (req, res) => {
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

const verificacion = express.Router();

verificacion.use((req, res, next) => {
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

app.get("/info", verificacion, (req, res) => {
  res.json("Información Importante Entregada");
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.listen(port, () => {
  console.log("Mi port" + port);
});
