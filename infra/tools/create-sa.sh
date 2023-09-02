#!/bin/bash

# プロジェクトIDを取得
PROJECT_ID=$(gcloud config get-value project)
if [ $? -ne 0 ]; then
  echo "エラー: プロジェクトIDの取得に失敗しました。"
  exit 1
fi

TERRAFORM_SA_NAME="terraform"
TERRAFORM_SA="$TERRAFORM_SA_NAME@$PROJECT_ID.iam.gserviceaccount.com"

echo "プロジェクトID: $PROJECT_ID"
echo "サービスアカウント名: $TERRAFORM_SA"

# サービスアカウントが存在するか確認
if ! gcloud iam service-accounts describe $TERRAFORM_SA &> /dev/null; then
  # サービスアカウントを作成
  gcloud iam service-accounts create $TERRAFORM_SA_NAME \
    --display-name "Terraform admin account" --quiet 2>&1
  if [ $? -ne 0 ]; then
    echo "警告: サービスアカウントの作成に失敗しました。既に存在する可能性があります。"
  fi
fi

# サービスアカウントに権限を付与
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member "serviceAccount:$TERRAFORM_SA" \
  --role "roles/owner" --quiet 2>&1
if [ $? -ne 0 ]; then
  echo "エラー: サービスアカウントに権限を付与するのに失敗しました。"
  exit 1
fi

# サービスアカウントのキーを生成
gcloud iam service-accounts keys create ./terraform-sa-${PROJECT_ID}.json --iam-account=$TERRAFORM_SA --quiet 2>&1
if [ $? -ne 0 ]; then
  echo "エラー: サービスアカウントのキー生成に失敗しました。"
  exit 1
fi

echo "成功: サービスアカウントの設定が完了しました。"
