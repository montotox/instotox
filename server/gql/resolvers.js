const userController = require("../controllers/user");
const resolvers = {
  Query: {
    //User
    getUser: (_, { id, username }) => userController.getUser(id, username),
    search: (_, { search }) => userController.search(search),
  },
  Mutation: {
    //User
    register: (_, { input }) => userController.register(input),
    login: (_, { input }) => userController.login(input),
    //Update Avatar
    updateAvatar: (_, { file }, ctx) => userController.updateAvatar(file, ctx),
    //Delete Avatar
    deleteAvatar: (_, {}, ctx) => userController.deleteAvatar(ctx),
    //Update User
    updateUser: (_, { input }, ctx) => userController.updateUser(input, ctx),
  },
};
module.exports = resolvers;
