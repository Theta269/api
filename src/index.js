// index.js
// This is the main entry point of our application

// MongoDB imports
require('dotenv').config();
const db = require('./db');

// models module import
const models = require('./models');

// GraphQL import
const { ApolloServer, gql } = require('apollo-server-express');

// ExpressJS import
const express = require('express');
const app = express();

// Variable port selection
const port = process.env.PORT || 4000

// Database constant
const DB_HOST = process.env.DB_HOST

// Connect to database at host
db.connect(DB_HOST);

// GraphQL schema definitions
const typeDefs = gql`
    type Query {
        hello: String!
        notes: [Note!]!
        note(id: ID!): Note!
    }

    type Note {
        id: ID!
        content: String!
        author: String!   
    }

    type Mutation {
        newNote(content: String!): Note!
    }
`;

// GraphQL resolver functions
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        notes: async () => {
            return await models.Note.find();
        },
        note: async (parent, args) => {
            // In-memory find of a specific note
            // return notes.find(note => note.id === args.id);

            // Async find of a specific note in MongoDB
            return await models.Note.findById(args.id);
        }
    },
    Mutation: {
        newNote: async (parent, args) => {
            // In-memory mutation of noteValues
            // let noteValue = {
            //     id: String(notes.length +1),
            //     content: args.content,
            //     author: 'Adam Scott'
            // };
            // notes.push(noteValue);
            // return noteValue;

            // Async mutation of noteValues in MongoDB
            return await models.Note.create({
                content: args.content,
                author: 'Adam Scott'
            });
        }
    }   
};

// Apollo server setup
const server = new ApolloServer({ typeDefs, resolvers });

// Temporary GraphQL schema declarations
let notes = [
    { id: '1', content: 'this is a note', author: 'Adam Scott' },
    { id: '2', content: 'this is another note', author: 'Harlow Everly' },
    { id: '3', content: 'this is yet another note', author: 'Riley Harrison' }
];

// Apply GraphQL to middleware on /api path
server.applyMiddleware({ app, path: '/api' });

// "Hello World" code block
// app.get('/', (req, res) => res.send('hello web server!!!'));
// app.listen(port, () => console.log('Listening on port 4000!'));

// GraphQL Playground code block
app.listen({ port }, () => 
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
);
