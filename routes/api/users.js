const router = require('express').Router();
const { getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser, 
    addFriend} = require('../../controllers/user-controller');

// api users 
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// api users by id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route(':userId/friends/:friendId')
    .post(addFriend)

module.exports = router;