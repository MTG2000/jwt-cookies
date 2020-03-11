const router = require("express").Router();
const authService = require("../services/auth");
const authMiddleware = require("../middleware/auth");
const users = [
  {
    name: "mtg",
    pwd: "123",
    role: "admin"
  },
  {
    name: "ahmad",
    pwd: "123",
    role: "doctor"
  },
  {
    name: "nizar",
    pwd: "123",
    role: "user"
  }
];

router.post("/login", (req, res) => {
  //Verify credentials
  const { name, pwd } = req.body;
  const user = users.filter(u => u.name === name && u.pwd === pwd)[0];
  if (!user)
    //User Doesn't exist or wrong credentials
    return res.status(500).json("Incorrect Credentials");

  const token = authService.generateToken({ name: user.name, role: user.role });

  //set cookie with the token
  res
    .cookie("token", token, {
      secure: false, // set to true if your using https
      httpOnly: true
    })
    .status(200)
    .send("Successfully login");
});

router.get("/private", authMiddleware, (req, res) => {
  res.send(req.user);
});

module.exports = router;
