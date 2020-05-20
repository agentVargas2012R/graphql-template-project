 import ApolloBoost, {gql} from 'apollo-boost';
import 'cross-fetch/polyfill';

import seedDatabase, {userOne, postOne} from  './utils/seed-database';
import getClient from './utils/getClient';
import prisma from '../src/prisma';
import generateToken from '../src/utils/generateToken';
import {getPosts, myPosts, updatePost, deletePost } from './utils/operations';

const client = getClient();



test('it should return a single post with scalar fields and there should be one', async () => {
    await seedDatabase();

    
    const response = await client.query({
        query: getPosts
    });

    expect(response.data.posts.length).toBe(1);
    //console.log(response.data.posts[0]);

    expect(response.data.posts[0].title).toBe('My published post');
    expect(response.data.posts[0].published).toBe(1);

})


test('Should fetch users posts', async() => {

    await seedDatabase(false);

   let client = await getClient(userOne.jwt) ;


   const { data } = await client.query({query: myPosts});
   expect(data.myPosts.length).toBe(2);

}); 


test('test should be able to create, update and delete a post', async () => {    
    let currentUser = userOne;
    currentUser.jwt = generateToken(userOne.user.id);

    let client = await getClient(currentUser.jwt) ;

    let newPost = await prisma.mutation.createPost({
        data: {
            title: "My unpublished post",
            body: "...",
            published: true,
            author: {
                connect: { 
                    id: currentUser.user.id 
                }
            }
        }
    })

    //console.log("New Post ID");
    //console.log(newPost.id);
    

    //id: "${newPost.id}"
    //published: false
    let variables = {
        id: newPost.id,
        data: {
            published: false
        }
    }
    
    const {data} = await client.mutate({mutation: updatePost, variables});
    expect(data.updatePost.published).toBe(0) ;

    variables = {
        id: newPost.id                   
    }
    
    const removedData = await client.mutate({mutation: deletePost, variables});

    const exists = await prisma.exists.Post({
        id: newPost.id
    });

    expect(exists).toBe(false);

});