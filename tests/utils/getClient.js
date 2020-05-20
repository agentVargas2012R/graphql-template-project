import ApolloBoost from 'apollo-boost';
import {gql} from 'apollo-boost';
import { uuid } from 'uuidv4';

const getClient = (jwt) => {
    return new ApolloBoost ({
        uri: 'http://localhost:4000',
        request(operation) {
            if(jwt) {
                //console.log("found jwt token, setting up header: " + jwt);
                
                operation.setContext({
                    headers: {
                        'Authorization' : `Bearer ${jwt}`
                    }
                });
            }
        }
    })    
}

export { getClient as default};