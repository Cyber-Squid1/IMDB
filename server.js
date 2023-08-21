const path = require('path');
const express = require('express');
const { buildSchema } = require('graphql');
const { ApolloServer } = require('apollo-server-express');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mongoConnect }=require('./mongo');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typesArray = loadFilesSync('**/*', {
    extensions: ['graphql'],
});
const resolversArray = loadFilesSync('**/*', {
    extensions: ['resolvers.js'],
});

async function startApolloServer() {
    const app = express();
    await mongoConnect();
    const schema = makeExecutableSchema({
        typeDefs: typesArray,
        resolvers: resolversArray
    });

    const server = new ApolloServer({
        schema
    });
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    app.listen(4000, () => {
        console.log('Running Apollo GraphQL server...');
    });
}

startApolloServer();