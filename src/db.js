let users = [
    {
        "id": 1,
        "name" : "Andrew",
        "email" : "andrew@example.com",
        "age" : 27,
        "comments" : [1, 2]
    },
    {
        "id" : 2,
        "name" : "Mike",
        "email" : "mike@example.com",
        "age" : 23,
        "comments" : [1, 2]
    },
    {
        "id" : 3,
        "name" : "Sarah",
        "email" : "sarah@example.com",
        "comments" : [3]
    }
];

let posts = [
    {
        "id" : 1,
        "title": "Murder Hornets",
        "body" : "FB AI Backfiring",
        "published": true,
        "author" : 1,
        "comments" : [1, 2]
    },
    {
        "id" : 2,
        "title": "Man Bear Pig",
        "body" : "FB AI Backfiring Spawned",
        "published": true,
        "author" : 1,
        "comments" : [3]
    },
    {
        "id" : 3,
        "title": "COVID-19",
        "body" : "How to get covid-19.",
        "published": false,
        "author" : 2,
        "comments" : [2]
    }
];

let comments = [
    {
        "id": 1,
        "text": "An  unimportant comment",
        "author" : 1,
        "post" : 2
    },
    {
        "id": 2,
        "text": "A politically incorrect comment here.",
        "author" : 1,
        "post" : 2
    },
    {
        "id": 2,
        "text": "I care about what I look like comment..",
        "author" : 2,
        "post" : 1
    }
];

const db = {
    comments, 
    posts, 
    users
};

export {db as default};