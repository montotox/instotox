const userController = require("../controllers/user");
const followController = require("../controllers/follow");
const publicationController = require("../controllers/publication");
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
    //Publications
    getPublications: (_, { username }) =>
      publicationController.getPublications(username),
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
    //Piblication
    publish: (_, { file }, ctx) => publicationController.publish(file, ctx),
  },
};
module.exports = resolvers;
