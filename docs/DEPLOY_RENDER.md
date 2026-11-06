# Deploy 到 Render.com

仓库根已有 `render.yaml`（Static Site 蓝图），不需要手工填构建命令。

## 一次配置

1. 打开 https://dashboard.render.com/ → **New** → **Blueprint**
2. 选仓库 `mrkk9919/ABA001`，分支 `main`
3. Render 读到 `render.yaml` 后点 **Apply**，等 2–4 分钟首次构建
4. 构建命令实际执行：
   `corepack enable && pnpm install --no-frozen-lockfile && PORT=5173 BASE_PATH=/ pnpm build`
   产物目录 `dist/public`
5. 站点地址形如 `https://aba001.onrender.com`（名字可在 Render 面板改）

## 关键点

- **BASE_PATH 必须是 `/`**：GitHub Pages 用 `/ABA001/`，Render 是根域名，两个 base 不通用。
- `render.yaml` 里 `routes: /* -> /index.html` 是 SPA 回退，`/accounts`、`/transfer/send` 这类深路由才不会 404。
- 免费实例会休眠，首次访问冷启动约 10–30 秒；升级付费版可常驻。
- 播声服务不依赖 Render：前端直接 POST `https://cambet89.online/api/khmer-tts`（`src/lib/tts.ts` 里的 `SERVER_TTS_ENDPOINT`），跨域已放开；不可达时自动回退浏览器 TTS。
- 每次 push 到 `main`，Render 会自动重新构建部署（Auto-Deploy）。
