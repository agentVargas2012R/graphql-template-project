//name export - has  aname, have a as manyu as needed.
//default export - has no name, you can only have on.e


//named
const message = "hello world!";
const location = "Phili";

const getGreeting = (name) =>  {
    console.log("welcome to the course, " + name);
    
}

//default export, it must be only one
export { message, location as default,  getGreeting};
