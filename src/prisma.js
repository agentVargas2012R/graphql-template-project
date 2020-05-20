import { Prisma } from 'prisma-binding';
import {fragmentReplacements} from './resolvers/index';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    fragmentReplacements
});

//primsa.query prisma.mutation prisma.subscription prisma.exists


/* prisma.exists.Comment({
    id: "cka85icdy00wd0769stnmorag"
}).then((exists) => {
    console.log(exists);
}); */


/* const createPostForUser = async (authorId, data) => {

    const userExists = await prisma.exists.User({
        id: authorId
    });

    if(!userExists) {
        throw new Error('User Does Not Exists!');
    }

    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ id author { id name email posts { id title published } }  }')

    return post.author;
}

createPostForUser('cka84c0bm00hz0769rpeq4y9r', {
    title: "the books to read",
    body: "The war of art",
    published: true
}).then((user) =>{
    console.log("createPostForUser");
    console.log(JSON.stringify(user, undefined, 2));
}).catch((err)=> {
    console.log(err);
})
 */

/* 
 const updatePostForUser = async (postId, data) => {

    const postExists = await prisma.exists.Post({
        id: postId
    });

    if(!postExists){
        throw new Error("Post Doesnt Work!");
    }

    const post = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data
    }, '{ author { id name email } }');
  
    return post.author;
}

updatePostForUser("cka85i1r000w00769rygtp41h", {    
    published: true
}).then((user)=> {
    console.log(JSON.stringify(user, undefined, 2));
}).catch((err)=> {
    console.log(err);
})
 */

//primsa.query   prisma.mutation    prisma.subscription   prisma.exists
/* prisma.query.users(null, '{ id name email posts { id title } }').then((data) => {
    console.log("USERS>>>>>>>>");
    console.log(JSON.stringify(data, undefined, 2));    
});  */

/* prisma.query.comments(null, '{ id  text author { id name } }').then((data) => {
    console.log("COMMENTS>>>>>>>>");
    console.log(JSON.stringify(data, undefined, 2));
})
 */

/* prisma.mutation.createPost({
    data: {
        title: "This is the title",
        body: "This is the body of the post.",
        published: true,
        author: {
            connect: {
                id:  "cka8562qy00ob076902ey59nm"
            }
        }
    }
}, '{ id title body published }').then((data) => {
    console.log("CREATING POST....");
    console.log(JSON.stringify(data, undefined, 2));
    return prisma.query.comments(null, '{ id  text author { id name } }');
}).then((data) => {
    console.log(JSON.stringify(data, undefined, 2));
}); */

//cka8562qy00ob076902ey59nm
/* prisma.mutation.updatePost({
    where: {
        id: "cka84vspm00m20769bcr08hp6"
    },
    data: {
        body: "NO, THIS IS REALLY HOW TO GET STARTED WITH GraphQL...",
        published: true
    }
}, '{ id }').then((data) => {
    return prisma.query.posts(null, '{ id  title body published }');
}) .then((data) => {
    console.log("UPDATED QUERY RUN: ");
    console.log(data);
});
*/

export {prisma as default};