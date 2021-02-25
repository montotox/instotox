const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function createToken(user, SECRET_KEY, expiresIn) {
  const { id, username, name, email } = user;
  const payload = {
    id,
    username,
    email,
    name,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function getUser() {
  console.log("Getting user");
  return null;
}

async function register(input) {
  const newUser = input;
  newUser.email = newUser.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();

  const { email, username, password } = newUser;
  console.log(newUser);
  //Check mail exist
  const foundEmail = await User.findOne({ email });
  if (foundEmail) throw new Error("Email already exist");
  //Check username exist
  const foundUsername = await User.findOne({ username });
  if (foundUsername) throw new Error("Username already exist");
  //Encrypt password
  const salt = bcryptjs.genSaltSync(10);
  newUser.password = await bcryptjs.hash(password, salt);
  try {
    const user = new User(newUser);
    user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
}
async function login(input) {
  const { email, password } = input;
  const userFound = await User.findOne({ email: email.toLowerCase() });
  if (!userFound) throw new Error("Invalid mail or password");
  const passwordSuccess = await bcryptjs.compare(password, userFound.password);
  if (!passwordSuccess) throw new Error("Invalid mail or password");
  return {
    token: createToken(userFound, process.env.SECRET_KEY, "10h"),
  };
}
module.exports = {
  register,
  login,
};
