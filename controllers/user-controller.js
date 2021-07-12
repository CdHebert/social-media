const { User, Thought } = require('../models');

const UserController = {

    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(data => res.json(data))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(data => res.json(data))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    createUser({ body }, res) {
        User.create(body)
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },

    // sub document friends
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true }
        )
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No friend with this id!' });
                    return;
                }

                User.findOneAndUpdate(
                    { _id: params.friendId },
                    { $addToSet: { friends: params.userId } },
                    { new: true }
                )

                    .then(data => {
                        if (!data) {
                            res.status(404).json({ message: 'No friend with this id!' });
                        }
                        res.json(data);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json(err);

                    })
            }
            )


    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No friend with this id!' });
                    return;
                }

                User.findOneAndUpdate(
                    { _id: params.friendId },
                    { $pull: { friends: params.userId } },
                    { new: true }
                )

                    .then(data => {
                        if (!data) {
                            res.status(404).json({ message: 'No friend with this id!' });
                        }
                        res.json(data);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json(err);

                    })
            }
            )


    },
}

module.exports = UserController;