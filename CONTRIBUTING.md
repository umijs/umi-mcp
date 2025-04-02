# CONTRIBUTING

## Prepare

1. Make sure your pnpm version is 8.x .
2. Install dependencies:

```bash
$ pnpm install
```

## Development

### Debug with test

```bash
$ npm test
```

### Debug with @modelcontextprotocol/inspector

```bash
$ npm run dev
```

Open http://localhost:5173/, then "Connect", "List Tools" and "Run Tool" with args.

![](https://cdn.jsdelivr.net/gh/sorrycc-bot/images@main/uPic/OF8dz3.png)

### Debug with takumi (llm)

Copy `.env.example` to `.env` and set `GROQ_API_KEY` which you can get the free key from [Groq](https://console.groq.com/keys).

```bash
$ npm run dev:takumi <your-prompt>
```

![](https://cdn.jsdelivr.net/gh/sorrycc-bot/images@main/uPic/5650zH.png)

### Add new tool

1. Create file in `src/tools`, add a new tool to `server.addTool()`.
2. Register the tool in `src/cli.ts`.
3. Add test case in `src/cli.test.ts` for the tool.

## Build

```bash
$ npm run build
```

## Release

Release with @umijs/tools.

```bash
$ npm run release
```
