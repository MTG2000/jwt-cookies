const jwt = require("jsonwebtoken");
//import jwt from 'jsonwebtoken';

const generateToken = dataToInclude => {
  const token = jwt.sign({ ...dataToInclude }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
  return token;
  //   return res.cookie('token', token, {
  //     expires: new Date(Date.now() + expiration),
  //     secure: false, // set to true if your using https
  //     httpOnly: true,
  //   });
};
module.exports = { generateToken };
