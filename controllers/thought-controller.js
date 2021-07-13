const { Thought, User } = require('../models');

const ThoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(data => res.json(data))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'thought',
                select: '-__v'
            })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(data => res.json(data))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) =>
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true })
            )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { runValidators: true, new: true }
        )
            .then(data => {
                if (!data) {
                    return res.status(404).json({ message: 'No reactions with this id!' });
                }
                res.json(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    
    removeReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: body } },
            { new: true }
        )
            .then(data => {
                if (!data) {
                    return res.status(404).json({ message: 'No reactions with this id!' });
                }
                res.json(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

}

module.exports = ThoughtController;