
事前にgcpにプロジェクトを作っておきます。


```
gcloud auth login
gcloud projects list
gcloud config set project <project_name>
cd tools
./create-sa.sh
```


生成されたjsonをrenameしてクレデンシャル情報としてローカルに保存





