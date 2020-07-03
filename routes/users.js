const router = require("express").Router();
let User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.route("/register").post(async (req, res) => {
  let { username, password, passwordCheck } = req.body;
  //validate
  if (!username || !password || !passwordCheck)
    return res.status(400).json({ msg: "Not all fields have been entered." });
  if (password.length < 5)
    return res
      .status(400)
      .json({ msg: "The password needs to be at least 5 characters long." });
  if (password !== passwordCheck)
    return res
      .status(400)
      .json({ msg: "Enter the same password twice for verification." });
  const existingUser = await User.findOne({ username: username });
  if (existingUser)
    return res
      .status(400)
      .json({ msg: "An account with this user already exists." });

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  const newUser = new User({
    username,
    password: passwordHash,
  });
  const savedUser = await newUser.save();
  res.json(savedUser);
});

router.route("/login").post(async (req, res) => {
  const { username, password } = req.body;

  // validate
  if (!username || !password)
    return res.status(400).json({ msg: "Not all fields have been entered." });

  const user = await User.findOne({ username: username });
  if (!user)
    return res
      .status(400)
      .json({ msg: "No account with this username has been registered." });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({
    token,
    user: {
      id: user._id,
      username: user.username,
    },
  });
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route("/").get(auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    username: user.username,
    id: user._id,
  });
});

module.exports = router;
