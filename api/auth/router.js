const express = require("express");
const router = express.Router();
const auth = require("./controller");
const passport = require("passport");
const upload = require("../../middlewares/multer");

//
const signInStrategy = passport.authenticate("local", { session: false });
const jwtStrategy = passport.authenticate("jwt", { session: false });

//
router.post("/register", upload.single("image"), auth.register);
router.post("/login", signInStrategy, auth.login);
router.put("/profile", jwtStrategy, upload.single("image"), auth.updateProfile);
router.get("/me", jwtStrategy, auth.me);
router.get("/users", jwtStrategy, auth.users);
router.get("/user/:id", auth.user);

module.exports = router;
