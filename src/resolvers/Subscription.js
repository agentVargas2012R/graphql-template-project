import getUserId from "../utils/getUserId";
const Subscription = {
    count: {
        subscribe(parent, { postId }, {prisma}, info){
            return prisma.subscription.comment({
                where: {
                    node: {
                        post: {
                            id: postId
                        }
                    }
                }
            }, info);

            /* let count = 0;
            setInterval(()=> {
                count++;               
                pubsub.publish('count', {
                    count
                })                
            }, 2000);

            return pubsub.asyncIterator('count'); */
        }
    },
    post: {
        subscribe(parent, args, {prisma, pubsub}, info) {
            
            return prisma.subscription.post({
                where: {
                    node: {
                        post: {
                            published: true
                        }
                    }
                }
            }, info);

            
            //return pubsub.asyncIterator('post');
        }
    },
    comment: {
        subscribe(parent, args, {db, pubsub}, info) {
            
            let {postId} = args;

            const post = db.posts.find((post) => {
                return post.id == postId
                    && post.published;
            });

            if(!post) {
                throw new Error("post not found!");
            }

            return pubsub.asyncIterator(`comment ${postId}`);
        }
    }, 
    myPost: {

        subscribe(parent, args, {request, prisma}, info) {            
            let getUserId = getUserId(request);
            
            return prisma.subscription.post({
                where: {
                    node: {
                        author: {
                            id: userId
                        }
                    }
                }
            }, info); 

        }
    }
}

export {Subscription as default};