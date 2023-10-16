const express = require("express");
const router = express.Router();
const passport = require("passport");
const transactions = require("./controller");
const upload = require("../../middlewares/multer");

const jwtStrategy = passport.authenticate("jwt", { session: false });

router.get("/my", jwtStrategy, transactions.getMyTransacations);
router.put("/deposit", jwtStrategy, transactions.deposit);
router.put("/withdraw", jwtStrategy, transactions.withdraw);
router.put("/transfer/:username", jwtStrategy, transactions.transfer);

module.exports = router;
