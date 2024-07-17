const { Router } = require("express");
const { getAllUsers, getUserById, createNewUser, updateUser, deleteUser } = require("../controllers/user.controller");

const router = Router();

// Get All users
router.get("/", getAllUsers)

// Get a user by ID
router.get('/:userId', getUserById);

// Create New A User
router.post('/', createNewUser);

router.put("/:userId", updateUser);

// Deleting A User
router.delete("/:userId", deleteUser);

module.exports = router;