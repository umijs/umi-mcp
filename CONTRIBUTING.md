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
$ npm run dev:takumi
```

![](https://cdn.jsdelivr.net/gh/sorrycc-bot/images@main/uPic/5650zH.png)

### Add new tool

1. Edit `src/cli.ts`, add a new tool to `server.addTool()`.
2. Extract the tool logic to new file if it's complex, and add test case if needed.
3. It's designed for simple, which may be refactored in the future.

## Build

```bash
$ npm run build
```

## Release

Release with @umijs/tools.

```bash
$ npm run release
```
