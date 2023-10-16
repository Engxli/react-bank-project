const User = require("../../models/User");
const generateToken = require("../../utils/generateToken");
const getTheseFromObject = require("../../utils/getTheseFromObject");
const hashPassword = require("../../utils/hashPassword");

const login = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);

    if (req.file) {
      req.body.image = req.file.path;
    }

    const user = await User.create(req.body);
    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const thingsToBeUpdated = ["firstName", "lastName", "image"];
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    const profile = getTheseFromObject(thingsToBeUpdated, req.body);
    if (Object.keys(profile).length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }
    await req.user.updateOne(profile);
    res
      .status(200)
      .json({ message: "Profile updated successfully", fields: profile });
  } catch (error) {
    next(error);
  }
};
const users = async (req, res, next) => {
  try {
    const allUsers = await User.find().select("username image balance");
    return res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};
const user = async (req, res, next) => {
  try {
    const thingsToSelect = ["image", "username", "balance"];

    const theUser = await User.findById(req.params.id);
    return res.status(200).json(getTheseFromObject(thingsToSelect, theUser));
  } catch (error) {
    next(error);
  }
};
const me = async (req, res, next) => {
  const thingsToSelect = ["image", "username", "balance"];
  try {
    const me = getTheseFromObject(thingsToSelect, req.user);
    res.status(200).json(me);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
  updateProfile,
  me,
  users,
  user,
};
