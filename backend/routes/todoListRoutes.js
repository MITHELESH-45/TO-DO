const express = require("express");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  createList,
  getLists,
  renameList,
  deleteList,
  generateShareLink,
  getPublicList,
  getStats
} = require("../controllers/todoListController");

const router = express.Router();

router.post("/", authMiddleware, createList);

router.get("/", authMiddleware, getLists);

router.put("/:id", authMiddleware, renameList);

router.delete("/:id", authMiddleware, deleteList);

router.post("/share/:id", authMiddleware,generateShareLink);

router.get("/public/:shareId",getPublicList);

router.get("/stats/:id",authMiddleware,getStats);
  

module.exports = router;