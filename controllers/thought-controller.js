const { db } = require('../models/Thought');
const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
    async getAllThought(req, res) {
        try {
            const dbThought = await Thought.find({});
            res.json(dbThought);

        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }

    },

    async getThoughtById({ params }, res) {

        try {
            const dbThought = await Thought.findById(params.thoughtId);
            const thought = res.json(dbThought);

            if (!thought) {
                return res.status(404).json({ message: `No user was found with that id` });
            }

        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }


    },

    async addThought({ params, body }, res) {
        try {
            const dbThought = await Thought.create(body);
            const { _id } = dbThought;
            await User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
            const thought = res.json(dbThought)
            if (!thought) {
                return res.status(404).json({ message: `No user was found with that id` });
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }

    },

    async updateThought({ params, body }, res) {
        try {
            const dbThought = await Thought.findByIdAndUpdate(
                { _id: params.thoughtId },
                body,
                { new: true, runValidators: true }
            );

            const thought = res.json(dbThought);
            if (!thought) {
                return res.status(404).json({ message: `No user was found with that id` });
            }

        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async deleteThought({ params }, res) {
        try {
            const dbThought = await Thought.findOneAndDelete({ _id: params.thoughtId });
            await User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
            const thought = res.json(dbThought)
            if (!thought) {
                return res.status(404).json({ message: `No user was found with that id` });
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async addReaction({ params, body }, res) {
        try {
            const dbThought = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            );
            const thought = res.json(dbThought);
            if (!thought) {
                return res.status(404).json({ message: `No user was found with that id` });
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async deleteReaction({ params }, res) {
        try {
            const dbThought = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true }
            );
            const thought = res.json(dbThought);
            if (!thought) {
                return res.status(404).json({ message: `No user was found with that id` });
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }


    }
}

module.exports = thoughtController;