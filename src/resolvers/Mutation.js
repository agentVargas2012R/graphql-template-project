import uuidv4 from 'uuidv4';
import bcrypt from 'bcryptjs';

import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';

//parent - good for relational posts.
//args - this contains the information we need.
//context - is very useful for contextual deata.
//info - contains information about info sent along with the server.


//Take in password -> Validate password -> hash password --> Generate Password
//JSON Web Token (JWT)

/* const token = jwt.sign({
    id: 46
}, 'mysecret');

console.log(token);

const decoded = jwt.decode(token);
console.log(decoded);

const decoded2 = jwt.verify(token, 'mysecret');
console.log(decoded2); */
/* const dummy = () => {
    const email = 'Jess2@russianbrides.com';
    const password = 'red1234532';

    const hashPassword = '$2a$10$p7UMpa.4kretCDlMnHeGo.El0bykhasA.z7fePgKyRTQdJPAAuGLm';
    const isMatch = bcrypt.compareSync(password, hashPassword);
    console.log(isMatch);

}

dummy(); */

const Mutation = {
    async login(parent, args, { prisma }, info){

        const user = await prisma.query.user({
            where: {                                    
                email: args.data.email                    
            }
        });
        
        
        if(!user) {
            throw new Error("User Doesnt Exist");
        }

        const matches =  bcrypt.compareSync(args.data.password, user.password);

        if(!matches) {
            throw new Error("Incorrect username or password");
        }
        
        return {
            user: user,
            token: generateToken(user.id)
        }

    },
    async createUser(parent, args, { prisma }, info){

        if(args.data.password.length < 8) {
            throw new Error('Password must be 8 characters or longer.');
        }

        const emailTaken = await prisma.exists.User({email: args.data.email});

        if(emailTaken) {
            throw new Error('Email already taken!');
        }

        //
        const password = hashPassword(args.data.password);

        let payload = {
            ...args.data,
            password
        } ;

        //overrides the argument. 
        const user =  await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        });
                
        return {
            user,
            token: generateToken(user.id)
        }

        /* const emailTaken = db.users.some((user) => {
            return (user.email === args.email)
        })

        if(emailTaken) {
            throw new Error('Email already taken!');
        }


        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user);

        return user; */
    },
    async updateUser(parent, args, {request, prisma}, info) {

        const userId = getUserId(request);

        if(typeof args.data.password == 'String') {
            args.data.password = hashPassword(args.data.password);
        }

        return await prisma.mutation.updateUser({
            data: args.data,
            where: {
                id: userId
            }
        }, info);
        /* const {id, data} = args;
        const user = db.users.find((user) => user.id == id);

        console.log("UPDATING USER....");
        console.log(id);
        console.log(data);

        if(!user) {
            throw new Error("User Not Found!");
        }
        
        if(typeof data.email == 'string')  {
            const emailTaken = db.users.some((user) => {
                return users.email == data.email;
            });

            if(emailTaken) {
                throw new Error('Email Taken');
            }
            console.log("About to assign email...");
            user.email = data.email;
        }      

        if(typeof data.name == 'string') {
            user.name = data.name;
        }

        if(typeof data.age !== 'undefined') {
           user.age = data.age; 
        }

        return user;
 */
    },
    async deleteUser(parent, args, { request, prisma }, info){

        /* const userIndex = db.users.findIndex((user) => {
            return user.id == args.id;
        })
        */ 
       // console.log("About to call get userId...");
        let userId = getUserId(request);
       // console.log("called user id: ");
       // console.log(userId);

        /* const deletedUser = db.users.splice(userIndex, 1);
        
        db.posts = db.posts.filter((post) => {
            const match = post.author == args.id;

            if(match) {
                db.comments = db.comments.filter((comment) => {
                    return comment.post != post.id;
                });
            }

            return !(match);
        });

        db.comments = db.comments.filter((comment) => {
            return comment.author != args.id;
        });

        //remove associated posts, comments
        const user = deletedUser[0];
        return user; */

        return await prisma.mutation.deleteUser({
                where: { id: userId } 
        }, info);
    },
    async createPost(parent, args, { request, prisma, pubsub }, info) {
        //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja2FiYjJ4ZWQwazN0MDc2OWQzdm9iNGFiIiwiaWF0IjoxNTg5NzQwNDI3fQ.w8sJ5ARVxeWHyafzQloORmHkzGGFIdYlUJyRq6xK3To"

        const userId = getUserId(request);

        let user = await prisma.query.user({
            where: {
                id: userId
            }            
        }, info);

        if(!user){
            throw new Error("User Doesn't Exist");
        }

        console.log(user);

        return await prisma.mutation.createPost({
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: user.id
                    }
                }   
            }
        }, info);

        //make sure the author id exists.
/*         const userExists = db.users.some((user) => {                
            return user.id == args.data.author;
        })

        if(!userExists) {
            throw new Error("User not found!");
        }

        const post = {
            id: uuidv4(),
            ...args.data
        };
     
        db.posts.push(post);

        if(post.published) {
            pubsub.publish('post', {
                post: {
                    mutation: "CREATED",
                    data: post
                }
            });
        }   

        return post;
 */
    },
    async updatePost(parent, args, {request, prisma, pubsub}, info) {
        //check what we need to update.
        let {id, data} = args;
        const userId = getUserId(request);

        console.log("Trying to find newly created post");
        console.log(id);

        console.log("Data: ");
        console.log(data);
        
        let postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        });
        
        if(!postExists) {
            throw new Error("Unable to update post!");
        }

        let postPublished = await prisma.exists.Post({
            id: args.id,
            published: true
        });

        if(!args.data.published && postPublished) {
            const removedComments = await prisma.mutation.deleteManyComments({
                where: {
                    post: {
                        id: args.id
                    }
                }
            }, info);
        }

        return await prisma.mutation.updatePost({
            data,
            where: {
                id: args.id
            }
        }, info);

        //check if post exists
        /* const postIndex = db.posts.findIndex((post) => {
            return post.id == id;
        });

        if(postIndex == -1) {
            throw new Error('Post Doesnt Exist!');
        }

        let updatePost = db.posts[postIndex];
        const originalPost = { ...updatePost};

        if(typeof data.title === 'string') {
            updatePost.title = data.title;
        }

        if(typeof data.body === 'string') {
            updatePost.body = data.body;
        }

        if(typeof data.published === 'boolean') {
            updatePost.published = data.published;

            console.log("Original Post: ");
            console.log(originalPost.published);

            console.log("Updated  Post: ");
            console.log(updatePost.published);

            if(originalPost.published &&
                            !updatePost.published) {
                      //deleted          
                      console.log("DELETE POST");
                      pubsub.publish('post', {
                          post: {
                              mutation: 'DELETED',
                              data: originalPost
                          }
                      })          
            } else if(!originalPost.published 
                    && updatePost.published) {

                    console.log("CREATE POST");
                    //create event
                    pubsub.publish('post', {
                        post: {
                            mutation: 'CREATED',
                            data: updatePost
                        }
                    })    
            }
        }else if (updatePost.published) {
                //updated
                console.log("UPDATE POST");
                pubsub.publish('post', {
                    post: {
                        mutation: 'UPDATED',
                        data: updatePost
                    }
                })
        }

        db.posts[postIndex] = updatePost;
        return updatePost;
 */
    },
    async deletePost(parent, args, { prisma, request, pubsub }, info){

        let userId = getUserId(request);

        let postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        });

        if(!postExists) {
            throw new Error('Unable to delete post.');
        }


        return await prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info);

        /* const postIndex = db.posts.findIndex((post) => {                    
                return post.id == args.id;
            });

            if(postIndex == -1) {
                throw new Error('Post Does Not Exist!');                    
            }

            const [deletedPost] = db.posts.splice(postIndex, 1);
            
            //Remove and return the post
            db.posts = db.posts.filter((post) => {
                   const match = db.posts.id == args.id;                       

                   //remove all comments belonging to that post.          
                   if(match) {
                        db.comments = db.comments.filter((comment) => {
                            return db.comments.post == args.id
                        });
                   } 

                   return !(match);
            });
                           
            db.comments = db.comments.filter((comment) => {
                return comment.post != args.id
            });
            
            if(deletedPost.published) {               

                pubsub.publish('post',  {
                    post: {
                        mutation: "DELETED",
                        data: deletedPost
                    }
                })

            }

            return deletedPost;
 */            
    },
    async createComment(parent, args, { request, prisma, pubsub }, info) {

        let userId = getUserId(request);

        //critical thinking:  
        const postPublished = prisma.exists.Post({
                id: args.data.post,
                published: true
        }); 
        
        if(!postPublished) {
            throw new Error('Post not published!');
        }

        return await prisma.mutation.createComment({
            data: {
                text: args.data.text,
                author: {
                    connect: {
                       id:  userId
                    }
                },
                post: {
                    connect: {                    
                        id: args.data.post
                    }
                }
            }
        }, info);

        //check if users exists
        /* const userExists = db.users.some((user) => {                
            return user.id == args.data.author;
        });

        if(!userExists) {
            throw new Error('User Doesnt Exist');
        }

        //check if post exists and is published
        const postExists = db.posts.some((post) => {
            return (post.id == args.data.post 
                            && post.published);
        });

        if(!postExists){
            throw new Error("Post doesnt exist or hasn't been published yet.");
        }

        const comment = {
            id: uuidv4(),
            ...args.data
        };

        db.comments.push(comment);
        pubsub.publish(`comment ${args.data.post}`, { 
            comment: {
                mutation: 'CREATED',
                data: comment
            }
        });

        return comment;
 */
    }, 
    async updateComment(parent, args, {request, prisma, pubsub}, info) {
        
        let {id, data}  = args;
        //the author should be able to update only their comments, not others.
        //to do that, we need to get the userId to make sure it belongs to them
        const userId  = getUserId(request);

        //next, we can only update a comment if it belongs to the user.
        //check against the id of the comment and the userid and if it exists,
        //we update it, otherwise, we through an error.
        const commentExists = await prisma.exists.Comment({
            id,
            author: {
                id: userId
            }
        });

        //if the users exists, they can update the comment, otherwise, we through an error
        if(!commentExists) {
            throw new Error("Can't update comment.");
        }

        return await prisma.mutation.updateComment({
            where: {
                id
            },
            data
        }, info);

        /* let comment = db.comments.find((co) => {
            return co.id == id;
        });

        if(!comment) {
            throw new Error('Comment Doesnt Exist');
        }
        
        if(typeof data.text === 'string') {
            comment.text = data.text;    
            pubsub.publish(`comment ${comment.post}`, {
                comment: {
                    mutation: 'UPDATED',
                    data: comment
                }
            })

            
        }
        
        return comment;
 */
    },
    async deleteComment(parent, args, { request, prisma, pubsub }, info) {

        /**
         * Delete a comment if it belongs to the user
         */
        const userId = getUserId(request);

        /**
         * check if the comment exists first.
         */
        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })

        if(!commentExists) {
            throw new Error('Comment Doesnt Exist!');
        }
        
        return await prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        } , info);
        
        /* const commentIndex = db.comments.findIndex((comment) => {
                return comment.id == args.id;
        });

        if(commentIndex == -1) {
            throw new Error('Comment Does Not Exist!');
        }

        const [deletedComment] = db.comments.splice(commentIndex, 1);
        db.comments.filter((comment) => {
            return comment.post != args.id
        });
        
        pubsub.publish(`comment ${deletedComment.post}`, {
            comment: {
                mutation: "DELETED",
                data: deletedComment
            }
        })

        return deletedComment; */

    }
};

export {Mutation as default};