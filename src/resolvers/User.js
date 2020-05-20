    import getUserId from '../utils/getUserId';

    //if a custom type, we need to teach graphql how to get custom type.
    const User = {
/*         posts(parent, args, {db}, info) {

            return db.posts.filter((post) => {
                    return post.author == parent.id
            })

        },
        comments(parent, args, {db}, info) {
            return db.comments.filter((comment) => {
                    return comment.author == parent.id
            })
        } */
        
        /**
         * Shows the use of fragements. 
         * Fragments allow for custom resolution. 
         * Fetches certain user data fields.
         */
        email:  {
            //can call the fragment anything you want. 
            // Provide the fields you want inside the curly braces.
            fragment: 'fragment userId on User { id } ',
            resolve(parent, args, { request }, info)  {
                const userId = getUserId(request, false);            
    
                //only show the email if the user id belongs to them. 
                //You are grabbing this from the {id} above.
                                
                 if(userId == parent.id){
                    return parent.email;
                }else{
                    return null;
                }            
            }
        },
        posts: {
            fragment: 'fragment userId on User { id }',
            resolve(parent, args, {request, prisma}, info) {                                
                return prisma.query.posts({
                    where: {                        
                        published: true,
                        author: {
                            id: parent.id
                        }
                    }
                }, info);
            }
        }

    };

    export {User as default};