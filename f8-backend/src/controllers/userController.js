require('dotenv').config();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken, hashToken } = require("../utils");
var parser = require("ua-parser-js");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const Token = require("../models/tokenModel");

const crypto = require("crypto");
const Cryptr = require("cryptr");


const { OAuth2Client } = require("google-auth-library");

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all the required fields.");
  }
  
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters.");
  }
  
  // Check if user exists
  const userExists = await User.findOne({ email });
  console.log(userExists);
  if (userExists) {
    res.status(400);
    throw new Error("Email already in use.");
  }
  
  // Get UserAgent
  const ua = parser(req.headers["user-agent"]);
  const userAgent = [ua.ua];

  //   Create new user
  const user = await User.create({
    name,
    email,
    password,
    userAgent,
  });

  // Generate Token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    req.session.user = user;
    const { _id, name, email, phone, bio, photo, role, isVerified } = user;
    res.status(200).send({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      isVerified,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
}

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //   Validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found, please signup");
  }
  
  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  if (!passwordIsCorrect) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  // Trgger 2FA for unknow UserAgent
  const ua = parser(req.headers["user-agent"]);
  const thisUserAgent = ua.ua;
  const allowedAgent = user.userAgent.includes(thisUserAgent);
  if (!allowedAgent) {
    // Genrate 6 digit code
    const loginCode = Math.floor(100000 + Math.random() * 900000);

    // Encrypt login code before saving to DB
    const encryptedLoginCode = cryptr.encrypt(loginCode.toString());

    // Delete Token if it exists in DB
    let userToken = await Token.findOne({ userId: user._id });
    if (userToken) {
      await userToken.deleteOne();
    }

    // Save Tokrn to DB
    await new Token({
      userId: user._id,
      lToken: encryptedLoginCode,
      createdAt: Date.now(),
      expiresAt: Date.now() + 60 * (60 * 1000), // 60mins
    }).save();

    res.status(500);
    throw new Error("New browser or device detected");
  }

  // Generate Token
  const token = generateToken(user._id);
  
  // console.log(customers);

  if (user && passwordIsCorrect) {
    // Send HTTP-only cookie
    res.setCookie("token", token, {
      //domain:".testdomain.com",
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    req.session.user=user;

    const { _id, name, email, phone, bio, photo, role, isVerified } = user;

    res.status(200).send({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      isVerified,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Something went wrong, please try again");
  }
}

// Send Login Code
const sendLoginCode = async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Find Login Code in DB
  let userToken = await Token.findOne({
    userId: user._id,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired token, please login again");
  }

  const loginCode = userToken.lToken;
  const decryptedLoginCode = cryptr.decrypt(loginCode);

  // const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

  // Send Login Code
  const subject = "Login Access Code - OrganEase";
  const send_to = email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = process.env.EMAIL_USER;
  const template = "loginCode";
  const name = user.name;
  const link = decryptedLoginCode;

  try {
    const result = await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    console.log(result);
    res.status(200).send({ message: `Access code sent to ${email}`, error:`${result}` });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
}

// Login With Code
const loginWithCode = async (req, res) => {
  const { email } = req.params;
  const { loginCode } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Find user Login Token
  const userToken = await Token.findOne({
    userId: user.id,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token, please login again");
  }

  const decryptedLoginCode = cryptr.decrypt(userToken.lToken);

  if (loginCode !== decryptedLoginCode) {
    res.status(400);
    throw new Error("Incorrect login code, please try again");
  } else {
    // Register userAgent
    const ua = parser(req.headers["user-agent"]);
    const thisUserAgent = ua.ua;
    user.userAgent.push(thisUserAgent);
    await user.save();

    // Generate Token
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.setCookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      // domain:"0.0.0.0",
      secure: true,
    });

    req.session.user= user;
    const { _id, name, email, phone, bio, photo, role, isVerified } = user;

    res.status(200).send({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      isVerified,
      token,
    });
  }
}

// Send Verification Email
const sendVerificationEmail = async (req, res) => {
  // const {user} = req.body;
  // console.log(req.user);
  // const user = await User.findById(req.user._id);
console.log(user);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error("User already verified");
  }

  // Delete Token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  //   Create Verification Token and Save
  const verificationToken = crypto.randomBytes(32).toString("hex") + user._id;

  // Hash token and save
  const hashedToken = hashToken(verificationToken);
  await new Token({
    userId: user._id,
    vToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000), // 60mins
  }).save();

  // Construct Verification URL
  const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

  // Send Email
  const subject = "Verify Your Account - OrganEase";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = "organ.ease1@outlook.com";
  const template = "verifyEmail";
  const name = user.name;
  const link = verificationUrl;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).send({ message: "Verification Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
}

// Verify User
const verifyUser = async (req, res) => {
  const { verificationToken } = req.params;

  const hashedToken = hashToken(verificationToken);

  const userToken = await Token.findOne({
    vToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  // Find User
  const user = await User.findOne({ _id: userToken.userId });

  if (user.isVerified) {
    res.status(400);
    throw new Error("User is already verified");
  }

  // Now verify user
  user.isVerified = true;
  await user.save();

  res.status(200).send({ message: "Account Verification Successful" });
}

// Logout User
const logoutUser = async (req, res) => {
  
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // 1 day
    sameSite: "none",
    secure: true,
  });
  // req.sessionStore.destroy(req.session.sessionId, ()=>{res.redirect(process.env.FRONTEND_URL);});
  // await req.session.destroy();
  return res.status(200).send({ message: "Logout successful" });
}

const getUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, name, email, phone, bio, photo, role, isVerified } = user;

    res.status(200).send({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      isVerified,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
}

// Update User
const updateUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, phone, bio, photo, role, isVerified } = user;

    user.email = email;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;
    user.photo = req.body.photo || photo;

    const updatedUser = await user.save();

    res.status(200).send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
      photo: updatedUser.photo,
      role: updatedUser.role,
      isVerified: updatedUser.isVerified,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
}

// Delete User
const deleteUser = async (req, res) => {
  const user = User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.remove();
  res.status(200).send({
    message: "User deleted successfully",
  });
}

// Get Users
const getUsers = async (req, res) => {
  const users = await User.find().sort("-createdAt").select("-password");
  if (!users) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.status(200).send(users);
}

// Get Login Status
const loginStatus = async (req, res) => {
  if(req.session.user) res.status(200).send({user:req.session.user});
  else res.status(500).send(false);

  // const token = req.cookies.token;
  // if (!token) { 
  //   return res.status(500).send(false);
  // } 
  
  // // Verify token
  // let verified;
  // try{
  //   verified = jwt.verify(token, process.env.JWT_SECRET);
  // } catch (err){
  //   res.status(500).send(err);
  //   return;
  // }
  // if (verified) {
  //   return res.status(200).send(true);
  // }
  // return res.status(500).send(false);
}

const upgradeUser = async (req, res) => {
  const { role, id } = req.body;

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.role = role;
  await user.save();

  res.status(200).send({
    message: `User role updated to ${role}`,
  });
}

// Send Automated emails
const sendAutomatedEmail = async (req, res) => {
  const { subject, send_to, reply_to, template, url } = req.body;

  if (!subject || !send_to || !reply_to || !template) {
    res.status(500);
    throw new Error("Missing email parameter");
  }

  // Get user
  const user = await User.findOne({ email: send_to });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const sent_from = process.env.EMAIL_USER;
  const name = user.name;
  const link = `${process.env.FRONTEND_URL}${url}`;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).send({ message: "Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
}

// Forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("No user with this email");
  }

  // Delete Token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  //   Create Verification Token and Save
  const resetToken = crypto.randomBytes(32).toString("hex") + user._id;

  // Hash token and save
  const hashedToken = hashToken(resetToken);
  await new Token({
    userId: user._id,
    rToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000), // 60mins
  }).save();

  // Construct Reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/auth/resetPassword/${resetToken}`;

  // Send Email
  const subject = "Password Reset Request - OrganEase";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = "organ.ease1@outlook.com";
  const template = "forgotPassword";
  const name = user.name;
  const link = resetUrl;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).send({ message: "Password Reset Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
}

// Reset Password
const resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  const hashedToken = hashToken(resetToken);

  const userToken = await Token.findOne({
    rToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  // Find User
  const user = await User.findOne({ _id: userToken.userId });

  // Now Reset password
  user.password = password;
  await user.save();

  res.status(200).send({ message: "Password Reset Successful, please login" });
}

// Change Password
const changePassword = async (req, res) => {
  const { oldPassword, password } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please enter old and new password");
  }

  // Check if old password is correct
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // Save new password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();

    res
      .status(200)
      .send({ message: "Password change successful, please re-login" });
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
}

const loginWithGoogle = async (req, res) => {
  const { userToken } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: userToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { name, email, picture, sub } = payload;
  const password = Date.now() + sub;

  // Get UserAgent
  const ua = parser(req.headers["user-agent"]);
  const userAgent = [ua.ua];

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    //   Create new user
    const newUser = await User.create({
      name,
      email,
      password,
      photo: picture,
      isVerified: true,
      userAgent,
    });

    if (newUser) {
      // Generate Token
      const token = generateToken(newUser._id);

      // Send HTTP-only cookie
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
      });

      const { _id, name, email, phone, bio, photo, role, isVerified } = newUser;

      res.status(201).send({
        _id,
        name,
        email,
        phone,
        bio,
        photo,
        role,
        isVerified,
        token,
      });
    }
  }

  // User exists, login
  if (user) {
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    const { _id, name, email, phone, bio, photo, role, isVerified } = user;

    res.status(201).send({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      isVerified,
      token,
    });
  }
}


const roleUpgrade = async (req, res) =>{
  const { user, upgradingRole} = req.body;

  try{
    const userToUpgrade = await User.findById(user._id);

    userToUpgrade.openAIKey = upgradingRole;
    const result = await userToUpgrade.save();

    res.status(200).send({
      message:"Successfully Upgraded!",
      result:result
    })
  } catch (err) {
    res.status(500).send({
      message:"Some errors occured in beta server",
      error:err
    })
  }
}
const saveAPIKey = async (req, res) =>{
  const { user, apiKey} = req.body;

  try{
    const userToSave = await User.findById(user._id);

    userToSave.openAIKey = apiKey;
    const result = await userToSave.save();

    res.status(200).send({
      message:"Successfully Saved!",
      result:result
    })
  } catch (err) {
    res.status(500).send({
      message:"Some errors occured",
      error:err
    })
  }
}
const saveModel = async (req, res) =>{
  const { user, model} = req.body;

  try{
    const userToSave = await User.findById(user._id);

    userToSave.openAIModel = model;
    const result = await userToSave.save();

    res.status(200).send({
      message:"Successfully Saved!",
      result:result
    })
  } catch (err) {
    res.status(500).send({
      message:"Some errors occured",
      error:err
    })
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
  loginStatus,
  upgradeUser,
  sendAutomatedEmail,
  sendVerificationEmail,
  verifyUser,
  forgotPassword,
  resetPassword,
  changePassword,
  sendLoginCode,
  loginWithCode,
  loginWithGoogle,
  saveAPIKey,
  saveModel,
};
