const router = require("express").Router();
const contactMessagesController = require("../controllers/contact_messages.controller");
const validateBody = require("../filters/validate.body");
const contactMessage = require("../models/contact_message");

module.exports = router;

// api routes ===========================================================
router.get("/", contactMessagesController.readAll);
router.get("/:id([0-9a-fA-F]{24})", contactMessagesController.readById);
router.post(
	"/",
	validateBody(contactMessage),
	contactMessagesController.create
);
router.put(
	"/:id([0-9a-fA-F]{24})",
	validateBody(contactMessage),
	contactMessagesController.update
);
router.delete("/:id([0-9a-fA-F]{24})", contactMessagesController.delete);
