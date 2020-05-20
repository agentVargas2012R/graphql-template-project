Next steps:

  1. Open folder: cd prisma
  2. Start your Prisma server: docker-compose up -d
  3. Deploy your Prisma service: prisma deploy
  4. Read more about Prisma server:
     http://bit.ly/prisma-server-overview


Your Prisma endpoint is live:

  HTTP:  http://localhost:4466
  WS:    ws://localhost:4466

You can view & edit your data here:

  Prisma Admin: http://localhost:4466/_admin

# Primsa Schema Generation
Creating a Primsa GraphQL Schema Generation
- npm i -s graphql-binding graphql-cli  

Configure .graphqlconfig
- create prisma.graphql file

Add NPM SCript
- graphql-cli get-schema

# Prisma Commands
- prisma delete --force
- prisma deploy 

# Prod PRISMA CLOUD URLS
## Prisma Cloud


- Services: https://app.prisma.io/michael-vargas-e9c1c0/services
- Account: agentVargas2012R
- DB Browser: https://app.prisma.io/michael-vargas-e9c1c0/services/mv-blog-51820/mv-blog-51820/prod/databrowser
- Heroku Dashboard: https://dashboard.heroku.com/apps/mv-blog-51820-1ab5a850d5/resources
- Heroku: https://data.heroku.com/datastores/9b4d6e37-f3b0-4db5-8050-c6e951687a1c#administration

### Test 
- DB: dcnjoe7r6pjqrs
- User: ooqiilaktwrbnj

Navigating Around With DataBrowser:
- Click "try Prisma" on prisma.io/cloud
- Login
- Click Service
- Dashboard

Navigating Around in PGAdmin:
- Click "try Prisma" on prisma.io/cloud
- Login
- Select "Servers" at top
- Click "server" then select "View On Heroku"
- Select "Hosted..."
- Select "View ..."
- Configure PGAdmin to use these.

Heroku Prod URL:
- https://still-chamber-65465.herokuapp.com/

Heroku Build
- git push -u heroku master