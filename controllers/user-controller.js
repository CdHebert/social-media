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
                path: 'User',
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
    addFriend({ params, body }, res) {
        console.log(params);
        User.create(body)
     
          .then(data => {
            console.log(data);
            if (!data) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(data);
          })
          .catch(err => res.json(err))
      },

};

module.exports = UserController;