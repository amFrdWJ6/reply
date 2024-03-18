# Reply

## Prod

1. Edit AUTH in .env
2. Generate SQL & create reply.db

```sh
npm run generate
sqlite3 reply.db <drizzle/0*sql
```

3. Compose Up

```sh
docker-compose up -d
```

4. Copy database into volume and apply ownership

```sh
docker cp reply.db reply:/app/data
docker exec --user root -it reply chown nextjs:nodejs data/reply.db
```

5. Restart compose

```sh
docker-compose restart
```

## Dev

```bash
npm run dev
# or
bun dev
```

## FAQ

- Q: Will be deployment more straightforwared?
- A: Yup!

## TODO

- fix: make deployment easier
- feat: add a way to list actions (adding tags or reply) by user
- feat: add metrics (prometheus)
- feat: add a way to authorize users + global rules (i.e.: everyone can add stuff, only someone can delete that)
- maybe: user settings (ignored tags, )
- maybe: pagination on /
