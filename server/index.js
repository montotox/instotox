const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolvers");
require("dotenv").config({ path: ".env" });

mongoose.connect(
  process.env.DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  },
  (err, _) => {
    //If no use "res", you'd type "_"
    if (err) {
      console.log("Connection Failed");
    } else {
      server();
    }
  }
);
function server() {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
  });
  serverApollo.listen().then(({ url }) => {
    console.log("######################################################");
    console.log(`Playground server run in: ${url}`);
    console.log("######################################################");
  });
}
