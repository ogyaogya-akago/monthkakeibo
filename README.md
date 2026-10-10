# 家計簿

自分用の家計簿Webアプリです(単一の `index.html` だけで動きます)。

## 主な機能
- 出費・入金の記録(タグ付け、メモ)/ タグの追加・編集・削除
- 浮いたお金(我慢した出費)の記録(収支とは別に集計)
- 月間カレンダー(月曜始まり)に、入金・出費・浮いたお金を表示
- タグ別の月次集計、日別・週別・月別の折れ線グラフ
- 月ごとの出費目標と達成状況
- 記録時のエフェクト(5種)とモチベーション画像
- 7種類のデザイン切り替え
- データの書き出し/読み込み(JSON)、月ごとのCSV保存

## GitHub Pagesで公開する手順
1. GitHubで新しいリポジトリを作る(例: `kakeibo`)。無料プランでPagesを使うには **Public** にします。
2. このフォルダの フォルダ内のすべてのファイル(`index.html` `manifest.webmanifest` `sw.js` `icon-192.png` `icon-512.png` `apple-touch-icon.png` `README.md` `.gitignore`)をアップロードする(「Add file」→「Upload files」)。
3. リポジトリの **Settings → Pages** を開く。
4. 「Build and deployment」で **Deploy from a branch**、Branchは **main** / **(root)** を選んで Save。
5. 1〜2分後、`https://<ユーザー名>.github.io/<リポジトリ名>/` で開けます。

コマンドで行う場合:

```bash
cd kakeibo
git init
git add .
git commit -m "家計簿アプリ"
git branch -M main
git remote add origin https://github.com/<ユーザー名>/<リポジトリ名>.git
git push -u origin main
```

## スマホにアプリとして追加する(PWA)
公開したURLをスマホで開いて、ホーム画面に追加します。アプリのように全画面で起動し、オフラインでも開けます。

- **iPhone(Safari)**: 共有ボタン → 「ホーム画面に追加」
- **Android(Chrome)**: メニュー(︙)→ 「ホーム画面に追加」または「アプリをインストール」

メモ:
- 必ずHTTPSのURL(GitHub Pagesなら自動でHTTPS)で開いてください。
- iPhoneでは、**ホーム画面に追加したアプリとSafariでは、保存されるデータが別々**になります。追加後のアプリでは、「設定」タブの「読み込む」からバックアップを読み込み直してください。
- アプリを更新したいときは、`index.html` を差し替えてpushします。次に開いたとき(オンライン時)に新しい内容になります。反映されないときは、一度アプリを閉じて開き直してください。
- ファイル構成: `index.html`(本体)/ `manifest.webmanifest`(アプリ情報)/ `sw.js`(オフライン用)/ `icon-*.png` `apple-touch-icon.png`(アイコン)

## データについて
- 記録・タグ・目標・画像・デザインの設定は、**使っているブラウザの中(localStorage)** に保存されます。サーバーには送られません。
- 端末やブラウザが変わるとデータは引き継がれません。「設定」タブの **データのバックアップ → 書き出す / 読み込む** で移せます。
- ブラウザのデータを消す操作をすると記録も消えます。ときどき書き出しておくと安心です。
- 登録した画像もブラウザ内に保存され、リポジトリには含まれません(縮小して保存されるため、枚数が多いと容量が足りなくなることがあります)。
- バックアップファイル(`kakeibo-backup*.json`)には家計の記録が入っています。**リポジトリにはアップロードしないでください**(`.gitignore` で除外済みです)。
