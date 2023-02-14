# NavigationTiming API を使ってみる

JavaScript にコードを埋め込む形でパフォーマンス測定可能な  
NavigationTimingAPI を使ってみました。
他のタイマーと異なる点は、HTML の前処理段階から、DNS や TCP 通信の測定を自動的に実施してくれます。
