const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
            .then(dbThoughtdata => res.json(dbThoughtdata))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    getThoughtById({ params }, res) {


        Thought.findOne({ _id: params.id }).populate({
            path: 'username',
            select: '-__v'
        })
            .select('-__v')
            .then(dbThoughtdata => {
                console.log('FIND ONE =================>>>>>>>>>>>>', dbThoughtdata)
                if (!dbThoughtdata) {
                    res.status(404).json({ message: `No user was found with that id` });
                    return;
                }
                res.json(dbThoughtdata)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });


    },

    addThought({ params, body }, res) {

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
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });




    },

    updateThought({ params, body }, res) {

        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true },
        ).then(dbThoughtdata => {
            console.log('UPDATE ONE =================>>>>>>>>>>>>', dbThoughtdata)
            if (!dbThoughtdata) {
                res.status(404).json({ message: `No user was found with that id` });
                return;
            }

            res.json(dbThoughtdata)
        })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });



    },

    deleteThought({ params }, res) {

        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deleteThought => {
                if (!deleteThought) {
                    res.status(404).json({ message: `No user was found with that id` });
                    return;
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );

            }).then(dbThoughtdata => {
                if (!dbThoughtdata) {
                    res.status(404).json({ message: `No user was found with that id` });
                    return;
                }
                res.json(dbThoughtdata);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });


    }
}

module.exports = thoughtController;