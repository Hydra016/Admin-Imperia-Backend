const User = require('../models/User');
const { signupValidation, loginValidation } = require('../helpers/validation');
const fs = require('fs')
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const { error } = loginValidation(req.body);
  
    if (error)
      return res
        .status(200)
        .json({ success: false, msg: error.details[0].message, isLoggedIn: false });
  
    const checkdUser = await User.findOne({ email });
    if (!checkdUser)
      return res
        .status(200)
        .json({ success: false, msg: `no user with email ${email} exists`, isLoggedIn: false });
  
    const validPass = await bcrypt.compare(password, checkdUser.password);
    if (!validPass)
      return res
        .status(200)
        .json({ success: false, msg: "invalid email or password", isLoggedIn: false });

    try{
      res.status(200).json({ success: true, data: checkdUser, isLoggedIn: true })
    } catch(err) {
      res.status(200).json({ success: false, data: err, isLoggedIn: false })
    }

  };

const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    const { error } = signupValidation(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  console.log(req.file)
    if (error){
    req.file && fs.unlinkSync(req.file.path)
    return res.status(200).json({ success: false, msg: error.details[0].message });
    }
 
    const userExist = await User.findOne({ email });
    if (userExist) {
      req.file && fs.unlinkSync(req.file.path)
      return res.status(200).json({ success: false, msg: `${email} already exists` });
    }
    
    try {
      if(req.file) {
        const user = new User({
          name,
          email,
          password: hashedPassword,
          avatar: req.file.filename
      })
  
      const newUser = await user.save()
      res.status(200).json({ success: true, data: newUser })
      } else {
        const user = new User({
          name,
          email,
          password: hashedPassword,
          avatar: null
      })
  
      const newUser = await user.save()
      res.status(200).json({ success: true, data: newUser })
      }
        
    } catch(err) {
        res.status(200).json({ success: false, msg: err })
    }
    
}

module.exports = {
    loginUser,
    signupUser
}