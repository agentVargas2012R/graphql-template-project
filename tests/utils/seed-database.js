import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateToken from '../../src/utils/generateToken';
import {gql} from 'apollo-boost';
import prisma from '../../src/prisma';
import { uuid } from 'uuidv4';

let userOne = {
    input: {
        name: 'Jen',
        email: 'jen@jen.com',
        password: bcrypt.hashSync('password')
    },
    user: undefined,
    jwt: undefined
};

let postOne = {
    input: {
        title: "My published post",
        body: "...",
        published: true,
    },
    post: undefined
};

/**
 * This is abstracted to another file which uses es6, not requirejs (which you dont know how to use).
 * 
 * This method uses prisma, NOT APOLLO BOOST, api to create the objects in the database.
 */
const seedDatabase = async  (flush = true) => {
    
    if(flush) {
        await prisma.mutation.deleteManyUsers();    
        await prisma.mutation.deleteManyPosts();
    }
    //await prisma.mutation.deleteManyPosts();    

    userOne.user = await prisma.mutation.createUser({
        data: {
            name: 'Jen',
            email: 'jen' + uuid() +'@jen.com',
            password: bcrypt.hashSync('password')
        }
    })

    if(!userOne.jwt) {
        userOne.jwt = generateToken(userOne.user.id);
        //console.log("GENERATED JWT LOGIN FOR PRISMA DB USER:");
        //console.log(userOne.jwt);
    }
    
    //create post1
    postOne.post = await prisma.mutation.createPost({
        data: {
            ...postOne.input,
            author: {
                connect: { 
                    id: userOne.user.id 
                }
            }
        }
    })

    //create post2;
    await prisma.mutation.createPost({
        data: {
            title: "My unpublished post",
            body: "...",
            published: false,
            author: {
                connect: { 
                    id: userOne.user.id 
                }
            }
        }
    })

    /*
        
        await prisma.mutation.deleteManyComments();
    */
};

export {seedDatabase as default, userOne, postOne};