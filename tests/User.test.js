import gql from './utils/operations';
import 'cross-fetch/polyfill';

import prisma from '../src/prisma';


import {getUsers, getProfile, login, createUser} from './utils/operations';
import seedDatabase, {userOne, clearRecodInDB} from  './utils/seed-database';
import getClient from './utils/getClient';

const client = getClient();

test('it shouldnt allow a bad login', async () => {
        const variables = {
            data: {
                email: 'bad@badcredit.com',
                password: "bad"
            }
        };

        await expect(client.mutate({mutation: login, variables})).rejects.toThrow();
})

test('should create a new user',  async () => {
    
    const variables = {
        data: {
            name:  "Mike",
            email:  "Mike@Mike.com",
            password: "password"

        }
    }
    
    const  response = await client.mutate({
        mutation: createUser,
        variables
    });

    const exists = await prisma.exists.User({
        id: response.data.createUser.user.id   
    })
    expect(exists).toBe(true);
}) 

test('should fetch the profile if logged in',  async () => { 
    await seedDatabase();
    //this returns an authenticated profile which has a jwt token
    const authClient = getClient(userOne.jwt);

    //we then use the token, which means, we're logged in, to look up the posts we wrote.
    //for userOne, we should have the profile logged in.
   
    const {data} = await authClient.query({query: getProfile});
    expect(data.me.id).toBe(userOne.user.id);
    expect(data.me.email).toBe(userOne.user.email);

});