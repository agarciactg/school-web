const faker = require("faker");
const boom = require("@hapi/boom");

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name,
        address: faker.address,
      });
    }
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

  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound("user not found");
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound("user not found");
    }
    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = UsersService;
