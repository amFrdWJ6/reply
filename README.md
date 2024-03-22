# Reply

## Self-hosting

1. Generate SQL & create reply.db

```sh
git clone https://github.com/amFrdWJ6/reply.git && cd reply
docker run --rm -it -v $(pwd):/reply node:20-alpine sh -c "cd /reply && npm ci && npm run generate"
sqlite3 reply.db <drizzle/000*sql
```

2. Edit `.env` & `next.config.mjs`, then spin it up

- all enviroment variables in `.env` have to be set
- edit `remotePatterns` to fit your use-case; otherwise, you won't see any uploaded replies

```sh
docker-compose up -d
```

3. Copy database into volume and change ownership

```sh
docker cp reply.db reply:/app/data
docker exec --user root -it reply chown nextjs:nodejs data/reply.db
```

4. Restart compose

```sh
docker-compose restart
```

## Features to implement

- feat: add a way to list actions (adding tags or reply) by user
- feat: add metrics (prometheus)
- feat: add a way to authorize users + global rules (i.e.: everyone can add stuff, only someone can delete that)
- maybe: user settings (ignored tags, )
