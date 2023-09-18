#!/bin/ash
set -e

# Cloud Storage からリストア
litestream restore -if-replica-exists -config ./litestream.yml ./database.sqlite3

if [ -f ./database.sqlite3 ]; then
  # リストアに成功したら、リネームしていたファイルを削除
  echo "---- Restored from Cloud Storage ----"
else
  # 初回起動時にはレプリカが未作成であり、リストアに失敗するので、migrationを実行してDBを作成
  echo "---- Failed to restore from Cloud Storage ----"
  migrate -database 'sqlite3://database.sqlite3' -path migrations/ up
fi

echo 'run echo $PATH'
echo $PATH

# メインプロセスに、litestreamによるレプリケーション、
# サブプロセスに アプリケーションを走らせる
exec litestream replicate -exec "./app" -config ./litestream.yml
