import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.SALT, { expiresIn: "2 days" });
   // console.log("GENERATED TOKEN");
   // console.log(token);
    return token;
}

export { generateToken as default};