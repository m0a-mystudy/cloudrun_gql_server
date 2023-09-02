#!/bin/bash

# 1. プロジェクトIDを取得
PROJECT_ID=$(gcloud config get-value project)
if [ $? -ne 0 ]; then
  echo "エラー: プロジェクトIDの取得に失敗しました。"
  exit 1
fi

# 2. "firebase-adminsdk"というdisplay nameを持つサービスアカウントのemailを取得
SERVICE_ACCOUNT_EMAIL=$(gcloud iam service-accounts list --format="value(email)" --filter="displayName:firebase-adminsdk")
if [ $? -ne 0 ]; then
  echo "エラー: サービスアカウントの一覧取得に失敗しました。"
  exit 1
fi

if [ -z "$SERVICE_ACCOUNT_EMAIL" ]; then
  echo "エラー: displayNameが 'firebase-adminsdk' のサービスアカウントが見つかりませんでした。"
  exit 1
fi

# 3. サービスアカウントのキーを生成
gcloud iam service-accounts keys create ./firebase-adminsdk-${PROJECT_ID}.json --iam-account=${SERVICE_ACCOUNT_EMAIL} 
if [ $? -ne 0 ]; then
  echo "エラー: サービスアカウントのキー生成に失敗しました。"
  exit 1
fi

echo "成功: サービスアカウントのキーが生成されました。"
