const User = require('../models/User');

const userController = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const dbUserdata = await User.find({})
            await res.json(dbUserdata);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }


    },

    // get one user by id
    async getUserById({ params }, res) {
        try {

            const dbUserdata = await User.findOne({ _id: params.id })
            const user = await res.json(dbUserdata);
            if (!user) {
                res.status(404).json({ message: `No user was found with the id ${{ _id: param.id }}` });
                return;
            }
        }
        catch (err) {
            res.status(404).json(err);
        }



    },

    // create user
    async createUser({ body }, res) {
        try {
            const dbUserdata = await User.create(body);
            await res.json(dbUserdata);

        }
        catch (err) {
            res.status(404).json(err);
        }

    },

    // update user
    async updateUser({ params, body }, res) {
        try {
            const dbUserdata = await User.findByIdAndUpdate({ _id: params.id }, body, { new: true, runValidators: true });
            const user = await res.json(dbUserdata);

            if (!user) {
                res.status(404).json({ message: `No user was found with the id ${{ _id: param.id }}` });
                return;
            }
        }
        catch (err) {
            res.status(404).json(err);
        }

    },

    // delete user
    async deleteUser({ params }, res) {
        try {
            const dbUserdata = await User.findOneAndDelete({ _id: params.id });
            const user = await res.json(dbUserdata);

            if (!user) {
                res.status(404).json({ message: `No user was found with the id ${{ _id: param.id }}` });
                return;
            }
        }
        catch (err) {
            res.status(404).json(err);
        }
    }
}

module.exports = userController;