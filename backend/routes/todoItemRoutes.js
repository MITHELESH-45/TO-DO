const express = require("express");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  createItem,
  getItems,
  toggleComplete,
  renameItem,
  deleteItem
} = require("../controllers/todoItemController");

const router = express.Router();

router.post("/",authMiddleware,createItem);

router.get("/:listId",authMiddleware,getItems);

router.patch(
  "/toggle/:id",
  authMiddleware,
  toggleComplete
);

router.put("/:id", authMiddleware, renameItem);

router.delete("/:id", authMiddleware, deleteItem);

module.exports = router;