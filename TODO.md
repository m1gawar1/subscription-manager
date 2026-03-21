# やることリスト

## Codemagicでアプリをビルドする

### Android（まずこれから）

- [ ] [codemagic.io](https://codemagic.io) を開く
- [ ] GitHubアカウントでログイン済みか確認
- [ ] `subscription-manager` プロジェクトを開く
- [ ] 「Start new build」をクリック
- [ ] ワークフロー「**Android Build**」を選択して「Start build」
- [ ] 15〜20分待つ
- [ ] `tim1209136@gmail.com` にAPKが届いたか確認
- [ ] AndroidスマホにAPKをインストールして動作確認

### iOS（Androidの後）

- [ ] Codemagicで「**iOS Build**」ワークフローを実行
- [ ] App Storeで配布する場合はApple Developer登録が必要（年¥12,900）
  - 個人利用・テストのみなら不要

---

## メモ

- GitHubリポジトリ: https://github.com/m1gawar1/subscription-manager
- 通知メール: tim1209136@gmail.com
- アプリID: `com.subscmanager.app`
- Codemagic無料枠: 月500分まで
