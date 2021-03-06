const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const awsUploadImage = require("../utils/aws-upload-image");

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
async function getUser(id, username) {
  let user = null;
  if (id) user = await User.findById(id);
  if (username) user = await User.findOne({ username });
  if (!user) throw new Error("User not found");
  return user;
}
async function updateAvatar(file, ctx) {
  const { id } = ctx.user;
  const { createReadStream, mimetype } = await file;
  const extension = mimetype.split("/")[1];
  const imageName = `avatar/${id}.${extension}`;
  const fileData = createReadStream();
  try {
    const result = await awsUploadImage(fileData, imageName);
    await User.findByIdAndUpdate(id, { avatar: result });
    return {
      status: true,
      urlAvatar: result,
    };
  } catch (error) {
    return {
      status: false,
      urlAvatar: null,
    };
  }
}
async function deleteAvatar(ctx) {
  const { id } = ctx.user;
  try {
    await User.findByIdAndUpdate(id, { avatar: "" });
    return true;
  } catch (error) {
    console.log(erro);
    return false;
  }
}
async function updateUser(input, ctx) {
  const { id } = ctx.user;
  try {
    if (input.currentPassword && input.newPassword) {
      const userFound = await User.findById(id);
      const passwordSuccess = await bcryptjs.compare(
        input.currentPassword,
        userFound.password
      );
      if (!passwordSuccess) throw new Error("Incorrect password");
      const salt = await bcryptjs.genSaltSync(10);
      const newPasswordCrypt = await bcryptjs.hash(input.newPassword, salt);
      await User.findByIdAndUpdate(id, { password: newPasswordCrypt });
    } else {
      await User.findByIdAndUpdate(id, input);
    }
    return true;
  } catch (error) {
    console.log(error);
    return falser;
  }
}
module.exports = {
  register,
  login,
  getUser,
  updateAvatar,
  deleteAvatar,
  updateUser,
};
