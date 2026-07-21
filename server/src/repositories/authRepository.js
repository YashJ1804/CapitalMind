const User = require("../models/User");

class AuthRepository {
    async findByEmail(email) {
        return User.findOne({ email });
    }

    async findById(id) {
        return User.findById(id);
    }

    async create(userData) {
        return User.create(userData);
    }

    async save(user) {
        return user.save();
    }
}

module.exports = new AuthRepository();