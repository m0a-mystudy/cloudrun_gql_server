# cloudrun/litestream/sqlite3/sqlboiler/gqlgen の組み合わせてgqlserverを作るテスト

https://zenn.dev/m0a/scraps/18f63fe1ca3af6


# terraformでやること

firebase authの有効化
gcsバケットの作成
clopudbuildを使ってdepolyする仕組み

# cloudrunの内部構成

litestreamを使ってdbの永続化
なのでdbはsqlite3

サーバサイドの構成

db: sqlite3  
db lib: sqlboiler  
gqlserver: gqlgen


上記組み合わせで行く


