import jwt from 'jsonwebtoken';

//set a default value. 
const getUserId = (request, requireAuth = true) => {
    
    //console.log("INSIDE GET USER ID....");

    const header = (request.request) ?
        request.request.headers.authorization
            : request.connection.context.Authorization;
    
    if(header) {
        const token = header.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SALT);

        console.log(decoded);    
        return decoded.userId;   
    }

    if(requireAuth) {
        throw new Error("authentication required!");
    }
    
    return null;
}

export {getUserId as default};