const Thought = require('../models/Thought');

const thoughtController = {
    async getAllThought(req, res) {
        try {
            const dbThoughtdata = await Thought.find();
            await res.json(dbThoughtdata);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async getThoughById({ params }) {
        try {
            const dbThoughtdata = await Thought.findOne({ _id: params.id });
            const userThought = await res.json(dbThoughtdata);

            if (!userThought) {
                res.status(404).json({ message: `No user found with the id ${{ _id: params.id }}` });
                return;
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async addThought({ params, body }, res) {
        try {
            const dbThoughtdata = await Thought.create(body);
            const { _id } = await res.json(dbThoughtdata);
            const userThought = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { thoughts: _id } },
                { new: true }
            );

            if (!userThought) {
                res.status(404).json({ message: `No user found with the id ${{ _id: params.id }}` });
                return;
            }

        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }

    }
}

module.exports = thoughtController;