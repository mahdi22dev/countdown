# Countdown

Users Can create custom countdown, and also count days to thier favorite upcoming show.

First, run the development server:

```bash
npm  npm install
# and
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` = "mongo db url"

`NEXTAUTH_SECRET` = "generate sercet for nextauth "

`NEXTAUTH_UR` = "localhost:3000"

`TMDB_API_KEY` = "themoviedb.org api key"

## Docker

mongodb dockerfile => ./mongodb/db.Dockerfile

countdown dockerfile => ./Dockerfile

the root folder contains docker-compose.yml to build and run next js app and mongodb server in a single container , to start the build use:

```bash
docker compose -f "docker-compose.yml" up -d --build
```

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://mahdi22dev.vercel.app)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/elmahdi-elidrissi/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/mahdiidris60201)
