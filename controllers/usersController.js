const User = require("../models/User");
const { signupValidation, loginValidation } = require("../helpers/validation");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(200).json({ success: false, msg: err });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginValidation(req.body);

  if (error)
    return res
      .status(200)
      .json({
        success: false,
        msg: error.details[0].message,
        isLoggedIn: false,
      });

  const checkdUser = await User.findOne({ email });
  if (!checkdUser)
    return res
      .status(200)
      .json({
        success: false,
        msg: `no user with email ${email} exists`,
        isLoggedIn: false,
      });

  if (!checkdUser.isAdmin)
    return res
      .status(200)
      .json({
        success: false,
        msg: "you will be allowed to login as soon as your request gets approved.",
        isLoggedIn: true,
      });

  const validPass = await bcrypt.compare(password, checkdUser.password);
  if (!validPass)
    return res
      .status(200)
      .json({
        success: false,
        msg: "invalid email or password",
        isLoggedIn: false,
      });

  try {
      const token = jwt.sign({ _id: checkdUser._id, isLoggedIn: true },  'haider1234$');
      // res.status(200).json({ success: true, data: token, isLoggedIn: true })
    res.status(200).json({ success: true, data: checkdUser, isLoggedIn: true });
  } catch (err) {
    res.status(200).json({ success: false, data: err, isLoggedIn: false });
  }
};

const signupUser = async (req, res) => {
  const { name, email, password, avatar } = req.body;
  const { error } = signupValidation(req.body);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  if (error) {
    // req.file && fs.unlinkSync(req.file.path)
    return res
      .status(200)
      .json({ success: false, msg: error.details[0].message });
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res
      .status(200)
      .json({ success: false, msg: `${email} already exists` });
  }

  try {
    const user = new User({
      name,
      email,
      password: hashedPassword,
      isSuperUser: false,
      isAdmin: false,
      avatar,
    });

    const newUser = await user.save();
    res.status(200).json({ success: true, data: newUser });
  } catch (err) {
    res.status(200).json({ success: false, msg: err });
  }
};

const approveUser = async (req, res) => {
  const { isAdmin, isSuperUser, _id } = req.body;

  try {
    let user = await User.findByIdAndUpdate(_id, {
      isAdmin,
      isSuperUser,
    });

    user = await User.find();

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(200).json({ success: false, msg: err });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findByIdAndDelete(id);
    user = await User.find();
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(200).json({ success: false, msg: err });
  }
};

module.exports = {
  loginUser,
  signupUser,
  getAllUsers,
  approveUser,
  deleteUser,
};
