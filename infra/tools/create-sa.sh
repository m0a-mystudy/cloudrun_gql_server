PROJECT_ID=$(gcloud config get-value project)
TERRAFORM_SA_NAME="terraform"
TERRAFORM_SA="$TERRAFORM_SA_NAME@$PROJECT_ID.iam.gserviceaccount.com"

# Create the service account if it doesn't exist.
if ! gcloud iam service-accounts describe $TERRAFORM_SA &> /dev/null; then
  gcloud iam service-accounts create $TERRAFORM_SA_NAME \
    --display-name "Terraform admin account"
fi

# Grant permissions to the service account.
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member serviceAccount:$TERRAFORM_SA \
  --role roles/owner


gcloud iam service-accounts keys create ./terraform-sa-${PROJECT_ID}.json --iam-account=$TERRAFORM_SA