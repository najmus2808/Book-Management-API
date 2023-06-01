const express = require("express");
const {
  createHandler,
  readHandler,
  readByIdHandler,
  updateHandler,
  deleteHandler,
} = require("../controllers/books");
const { requireSignin, isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/books", requireSignin, isAdmin, createHandler);
router.get("/books", readHandler);
router.get("/books/:id", readByIdHandler);
router.put("/books/:id", requireSignin, isAdmin, updateHandler);
router.delete("/books/:id", requireSignin, isAdmin, deleteHandler);

module.exports = router;
