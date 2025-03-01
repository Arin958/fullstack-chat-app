const express = require("express");
const protectRoute = require("../middleware/authMiddleware");
const {getUsersForSidebar, getMessage, sendMessage} = require("../controllers/messageController");

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getMessage);

messageRouter.post("/send/:userId",protectRoute ,sendMessage)

module.exports = messageRouter;
