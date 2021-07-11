const { Thought } = require('../models');

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
                path: 'Thought',
                select: '-__v'
            })
            .select('-__v')
            .then(data => res.json(data))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) =>
                User.findOneAndUpdate({}, { $push: { thoughts: _id } }, { new: true })
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
}

module.exports = ThoughtController;