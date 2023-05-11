const express = require("express");
const LoginService = require("./../services/login_services");

const router = express.Router();
const service = new LoginService();

router.get("/", async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
    if (req.body.usuario == 'admin' && req.body.pass == '12345') {
        const payload = {
            check: true
        }
    }
    const body = req.body;
  const newUser = await service.create(body);
  res.status(201).json(newUser);
});

module.exports = router;
