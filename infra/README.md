
事前にgcpにプロジェクトを作っておきます。


```
gcloud auth login
gcloud projects list
gcloud config set project <project_name>
cd tools
./create-sa.sh
```


生成されたjsonをrenameしてクレデンシャル情報としてローカルに保存



tfstateの作成

```
export PROJECT_ID=$(gcloud config get-value project)
gsutil mb gs://${PROJECT_ID}-tfstate
gsutil versioning set on gs://${PROJECT_ID}-tfstate

```


手動で有効化  

1. https://console.cloud.google.com/apis/api/cloudresourcemanager.googleapis.com/

2. https://console.cloud.google.com/customer-identity/providers


terraformの実行

```
cd terraform
GOOGLE_APPLICATION_CREDENTIALS=~/gcloud/terraform-sa-m0a-dev.json terraform init
GOOGLE_APPLICATION_CREDENTIALS=~/gcloud/terraform-sa-m0a-dev.json terraform apply
```


上記実行後にadminsdk用のserviceaccountが取得できる

tools配下に戻って以下を実行

```
cd ../tools
./create-adminsdk-key.sh
```

生成されたキーを何処かに保存