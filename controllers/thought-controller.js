const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
    async getAllThought(req, res) {
        try {
            const dbThoughtdata = await Thought.find();
            res.json(dbThoughtdata);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async getThoughtById({ params }, res) {

        try {
            const dbThoughtdata = await Thought.findOne({ _id: params.id });
            const userThought = res.json(dbThoughtdata);

            if (!userThought) {
                res.status(404).json({ message: `No user was found with that id` });
                return;
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    addThought({ params, body }, res) {
        console.log('THIS PARAMS======================>>>>', params)
        try {
            Thought.create(body)
                .then(({ _id }) => {
                    return User.findOneAndUpdate(
                        { _id: params.userId },
                        { $push: { thoughts: _id } },
                        { new: true },
                    )
                }).then(dbThoughtdata => {
                    if (!dbThoughtdata) {
                        res.status(404).json({ message: `No user was found with that id` });
                        return;
                    }
                    res.json(dbThoughtdata)
                })


        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }

    },

    async updateThought({ params, body }, res) {
        try {
            const dbThoughtdata = await Thought.findOneAndUpdate(
                { _id: params.id },
                body,
                { new: true },
            );
            if (!dbThoughtdata) {
                res.status(404).json({ message: `No user was found with that id` });
                return;
            }
            res.json(dbThoughtdata)
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async deleteThought({ params }, res) {
        try {
            const dbThoughtdata = await Thought.findOneAndDelete({ _id: params.id });

            if (!dbThoughtdata) {
                res.status(404).json({ message: `No user was found with that id` });
                return;
            }
            res.json(dbThoughtdata)
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
}

module.exports = thoughtController;