import getUserId from '../utils/getUserId';

const Query =  {                
    users(parent, args, { prisma }, info) {
        
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        };

        if(args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }]
            }
        }

        //possible to provie arguments: nothing, a string and object
        //nothing returns SCALAR fields
        return prisma.query.users(opArgs, info);


        /* if(!args.query) {
            return db.users;
        }

        return db.users.filter((user) => {
            return user.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase());
        }) */
        
    },
    posts(parent , args, { prisma }, info) {

        let optArgs = {
            first: args.first,
            skip: args.skip,            
            after: args.after,
            orderyBy: args.orderBy,
            where: {
                published: true
            }
        };

        if(args.query) {
            optArgs.where.OR = [{
                        title_contains: args.query
                    },
                    {
                        body_contains: args.query                        
                    }
            ]
        }
        

        return prisma.query.posts(optArgs, info);


       /*  if(!args.query) {
            return db.posts;
        }

        return db.posts.filter((post) => {
                return ( 
                    post.title.toLocaleLowerCase().includes(args.query.toLocaleLowerCase()) || 
                    post.body.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
                ); 
        }); */

    },
    async myPosts(parents, args, { request, prisma }, info) {
        
        const userId = getUserId(request);

        //console.log("About to get my posts: ");
        //console.log(userId);

        let optArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy,
            where:{
                author:{
                  id: userId
                }
            }
        }

        if(args.query)  {
            optArgs.where.OR = [{
                title_contains: args.query
            },
            {
                body_contains: args.query
            }];
        }
         
        //console.log("OPT Args");
        //console.log(optArgs);

        return await prisma.query.posts(optArgs, info);

    },
    comments(parent, args, {prisma}, info) {
        
        let optArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy,
        };

        if(args.query) {
            
            optArgs.where = {
                text_contains: args.query
            }

        }
        
        return prisma.query.comments(optArgs, info);

    },
    add(parent, args, {db}, info) {
        let numbers = 0;
        for(let i of args.numbers) {
            numbers += i;
        }
        return numbers;
    },
    greeting(parent, args, {db}, info) {
        console.log(args);
        return 'Hello ' + args.name;
    },
    grades(parent, args, {db}, info) {
        return [99, 80, 93];
    },
    async me(parent, args, {prisma, request}, info) {

        //ckaecgx3t0rot0769fpug6a03        
        const userId = getUserId(request);


        //console.log(">>>>>>>>>>about to call me operation with userId...<<<<<<<<<<<<<<<<<<<<<<");
        //console.log(userId); 


        const user = await prisma.query.user({
            where: {
                id: userId
            }
        }, info);

        //console.log("MEL >>>>");
        //console.log(user);
        
        return user;
        /* return {
            id: '123098',
            name: "Mike",
            email: "mike@example.com",
            age: 28
        } */
/* 
        if(this.users.length === 0) {
            throw new Error("This ain't me.");
        }
        return users[0]; */

    },
    async post(parent, args, {request, prisma}, info) {

        const userId = getUserId(request, false);

        //check if a post is published OR if the user owns the post.
        const posts = await prisma.query.posts({
            where: {
                id: args.id,
                OR: [{
                    published: true
                },
                {
                    author: {
                      id:  userId         
                    }
                }]
            }
        }, info);

        if(posts.length === 0) {
            throw new Error('Post not found');
        }

        return posts[0];

      /*   return {
            id: "1234481",
            title: "This is cool!",
            body: "This is pretty cool!",
            published: 2020
        } */
    }
};

export {Query as default};