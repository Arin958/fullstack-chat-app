import express from "express";
import protectRoute from "../middleware/authMiddleware.js";
import { getUsersForSidebar, getMessage, sendMessage } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getMessage);

messageRouter.post("/send/:userId", protectRoute, sendMessage);

export default messageRouter;