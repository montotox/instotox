const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    username: String
    email: String
    avatar: String
    siteWeb: String
    description: String
    password: String
    createAt: String
  }
  type Token {
    token: String
  }
  type UpdateAvatar {
    status: Boolean
    urlAvatar: String
  }
  input UserInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  input UserUpdateInput {
    name: String
    email: String
    currentPassword: String
    newPassword: String
    siteWeb: String
    description: String
  }
  type Query {
    #User
    getUser(id: ID, username: String): User
    search(search: String): [User]
    #Follow
    isFollow(username: String!): Boolean
    getFollowers(username: String!): [User]
  }
  type Mutation {
    #User
    register(input: UserInput): User
    login(input: LoginInput): Token
    #Update Avatar
    updateAvatar(file: Upload): UpdateAvatar
    #Delete Avatar
    deleteAvatar: Boolean
    #Update User
    updateUser(input: UserUpdateInput): Boolean
    #Follow
    follow(username: String!): Boolean
    #Unfollow
    unFollow(username: String!): Boolean
  }
`;

module.exports = typeDefs;
