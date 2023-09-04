#!/bin/sh
set -e


# Cloud Storage からリストア
litestream restore -if-replica-exists -config /etc/litestream.yml ./database.sqlite3

if [ -f ./database.sqlite3 ]; then
  # リストアに成功したら、リネームしていたファイルを削除
  echo "---- Restored from Cloud Storage ----"
else
  # 初回起動時にはレプリカが未作成であり、リストアに失敗するので、
  # その場合には migrationを実行する
  echo "---- Failed to restore from Cloud Storage ----"
  migrate -database 'sqlite3://database.sqlite3' -path migrations/ up
fi

# メインプロセスに、litestreamによるレプリケーション、
# サブプロセスに Next.js アプリケーションを走らせる
exec litestream replicate -exec "./main" -config /etc/litestream.yml
