import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';


import { resolvers, fragmentReplacements } from './resolvers/index';
import prisma from './prisma';

const pubsub = new PubSub();

//import {the_stuff_you_want} from "myModule";
//Scalar Types:  String, Boolean,  Int,  Float,  ID - Scalar - a single value, a descrete value. opposite of an object or array.
//schema, describes the allowed queries

//Type Definitions (schema)
//operations that can be performed on an API.

// Resolvers
// resolves to the response. 
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    fragmentReplacements,
    context(request) {        
        return {            
            db,
            pubsub,
            prisma,
            request            
        }
    }
})

export {server as default};