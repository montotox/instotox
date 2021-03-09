const userController = require("../controllers/user");
const followController = require("../controllers/follow");
const resolvers = {
  Query: {
    //User
    getUser: (_, { id, username }) => userController.getUser(id, username),
    search: (_, { search }) => userController.search(search),
    //Follow
    isFollow: (_, { username }, ctx) =>
      followController.isFollow(username, ctx),
    getFollowers: (_, { username }) => followController.getFollowers(username),
    getFollowing: (_, { username }) => followController.getFollowing(username),
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
    //Follow
    follow: (_, { username }, ctx) => followController.follow(username, ctx),
    //Unfollow
    unFollow: (_, { username }, ctx) =>
      followController.unFollow(username, ctx),
  },
};
module.exports = resolvers;
