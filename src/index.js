// index.js
// This is the main entry point of our application

/**
 * External Dependencies Etart
 */
// ExpressJS import
const express = require('express');
const app = express();

// Apollo Server Import
const { ApolloServer } = require('apollo-server-express');

// MongoDB imports
require('dotenv').config();
/**
 * External Dependencies End
 */

/**
 * Local Modules Start
 */
const db = require('./db');

// models module import
const models = require('./models');

// Import schema definitions from src/schema.js
const typeDefs = require('./schema');

// Import schema resolvers from src/resolvers
const resolvers = require('./resolvers')
/**
 * Local Modules End
 */

// Variable port selection
const port = process.env.PORT || 4000

// Database constant
const DB_HOST = process.env.DB_HOST

// Connect to database at host
db.connect(DB_HOST);

// Apollo server setup
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: () => {
        // Add the db models to the context
        return { models };
    }
});

// // Temporary GraphQL schema declarations
// let notes = [
//     { id: '1', content: 'this is a note', author: 'Adam Scott' },
//     { id: '2', content: 'this is another note', author: 'Harlow Everly' },
//     { id: '3', content: 'this is yet another note', author: 'Riley Harrison' }
// ];

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
