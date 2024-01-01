# Countdown

Users Can create custom countdown, and also count days to thier favorite upcoming show.

# Dev mode

First, run the development server:

```bash
npm run install
# and
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` = "mongo db url"

`NEXTAUTH_SECRET` = "generate sercet for nextauth "

`NEXTAUTH_UR` = "localhost:3000"

`TMDB_API_KEY` = "themoviedb.org api key"

## Docker

mongodb dockerfile => ./Docker/db.Dockerfile

countdown dockerfile => ./Dockerfile

the root folder contains docker-compose.yml to build and run next js app and mongodb server in a single container , to start the build use:

```bash
docker compose -f "docker-compose.yml" up -d --build
```

## 🚀 About Me

I'm a front-end junior developer , i use React js , Next js to build sample web apps

check my portfolio :  
https://mahdi22dev.vercel.app/
