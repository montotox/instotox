const Publication = require("../models/publication");
const User = require("../models/user");
const awsUploadImagen = require("../../server/utils/aws-upload-image");
const { v4: uuidv4 } = require("uuid");

async function publish(file, ctx) {
  const { id } = ctx.user;
  const { createReadStream, mimetype } = await file;
  const extension = mimetype.split("/")[1];
  const fileName = `publication/${uuidv4()}.${extension}`;
  const fileData = createReadStream();

  try {
    const result = await awsUploadImagen(fileData, fileName);
    const publication = new Publication({
      idUser: id,
      file: result,
      typeFile: mimetype.split("/")[0],
      createAt: Date.now(),
    });
    publication.save();
    return {
      status: true,
      urlFile: result,
    };
  } catch (error) {
    return {
      status: null,
      urlFile: "",
    };
  }
}

async function getPublications(username) {
  const user = await User.findOne({ username });
  console.log(user);
  if (!user) throw new Error("User not found");
  const publications = await Publication.find()
    .where({ idUser: user._id })
    .sort({ createAt: -1 });
  return publications;
}

module.exports = {
  publish,
  getPublications,
};
