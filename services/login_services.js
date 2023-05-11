const faker = require("faker");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");

class LoginService {
  constructor() {
    this.users = [];
  }

  async create(data) {
    const newUsers = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.users.push(newUsers);
    return newUsers;
  }

  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.users);
      }, 3000);
    });
  }

  async findOne(id) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw boom.notFound("user not found");
    }
    return user;
  }
}

module.exports = LoginService;
