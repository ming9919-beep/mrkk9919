# 把 ABA001 打包成 iOS App / .ipa

工程已经用 **Capacitor 8** 包好，Xcode 工程在 `ios/App/App.xcodeproj`。
`.ipa` 的编译和签名只能在 **macOS + Xcode 16** 上完成（Linux / Windows 都做不到），
下面是要在那台 Mac 上执行的步骤。

## 0. 前置
- macOS 14+，Xcode 16+（App Store 安装后执行 `sudo xcode-select -s /Applications/Xcode.app`）
- Node 22 + pnpm 11
- Apple ID（免费账号即可真机调试 7 天），要长期安装/上架需要付费开发者账号（$99/年）

## 1. 拉代码 + 生成 Web 资源
```bash
git clone https://github.com/mrkk9919/ABA001.git && cd ABA001
pnpm install
pnpm build:ios          # = BASE_PATH=./ vite build + cap sync ios
```

> `BASE_PATH=./` 很关键：Capacitor 用 WKWebView 从 App 包内读文件，
> 绝对路径 `/assets/...` 会 404。网页版仍用 `/ABA001/` 构建，二者互不影响。

## 2. 打开工程、跑真机
```bash
pnpm ios:open           # 打开 Xcode
```
Xcode 里：
1. 选中 `App` target → **Signing & Capabilities**
2. `Team` 选你的 Apple ID，必要时改 `Bundle Identifier`（默认 `com.mrkk9919.abamobile`）
3. 插上 iPhone（需在手机上信任电脑 + 开启开发者模式）→ 选设备 → ▶︎ Run

## 3a. 出 .ipa（图形界面）
`Product → Archive` → Organizer 里 `Distribute App` →
- 上架 / Ad Hoc：选对应方式，导出得到 `ABA Mobile.ipa`
- 自己设备装：选 **Development**，导出 `ipa`，用 Xcode 或 Apple Configurator 安装

## 3b. 出 .ipa（命令行）
```bash
xcodebuild -project ios/App/App.xcodeproj \
  -scheme App -configuration Release -sdk iphoneos \
  -archivePath build/ABA.xcarchive archive \
  DEVELOPMENT_TEAM=<你的TeamID> CODE_SIGN_STYLE=Automatic

cat > build/ExportOptions.plist <<'PLIST'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>method</key><string>development</string>
  <key>teamID</string><string>你的TeamID</string>
  <key>signingStyle</key><string>automatic</string>
</dict></plist>
PLIST

xcodebuild -exportArchive -archivePath build/ABA.xcarchive \
  -exportOptionsPlist build/ExportOptions.plist -exportPath build/ipa
# → build/ipa/ABA Mobile.ipa
```

### 只要一个未签名 .ipa（自签/越狱/侧载工具用）
```bash
xcodebuild -project ios/App/App.xcodeproj -scheme App \
  -configuration Release -sdk iphoneos \
  -derivedDataPath build CODE_SIGNING_ALLOWED=NO build
mkdir -p build/Payload && cp -R build/Build/Products/Release-iphoneos/App.app build/Payload/
cd build && zip -r ABA-unsigned.ipa Payload
```
未签名包在正常 iPhone 上装不了，必须用 Sideloadly / AltStore / TrollStore 之类重签。

## 4. 改了网页代码之后
```bash
pnpm build:ios     # 重新构建 + 同步进 ios/App/App/public
```
再 Archive 一次即可，不用动 Xcode 工程。

## 5. 当前容器配置
- appId：`com.mrkk9919.abamobile`
- appName：`ABA Mobile`
- webDir：`dist/public`
- 图标 / 启动图：`ios/App/App/Assets.xcassets`（已用 ABA 官方青底白字标 1024×1024 + 2732 启动图替换）
- 应用内会调用 `https://cambet89.online/api/khmer-tts`（播声），首次播报需要用户手势解锁音频，逻辑沿用网页版。

## 6. 已知限制
- 仓库的 GitHub Actions 被账号账单锁住（job 不会启动），所以不能靠 Actions 的 macOS runner 出包；
  能用了之后可以直接跑 `macos-14` runner + 上面的 xcodebuild 命令。
- 免费 Apple ID 签的包 7 天过期，需重装。
