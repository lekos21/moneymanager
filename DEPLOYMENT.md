# MoneyManager Deployment Guide

## Quick Update Commands

### Update Existing Backend on Cloud Run

```bash
# Update backend only
cd /home/alex/moneymanager && \
gcloud builds submit backend --tag gcr.io/moneymanager-f7891/moneymanager-backend && \
gcloud run services update moneymanager-backend \
  --image gcr.io/moneymanager-f7891/moneymanager-backend \
  --region europe-west6
```

### Update Existing Frontend on Firebase

```bash
# Frontend deployment with directory cleanup
cd /home/alex/moneymanager/frontend && \
rm -rf .next && \
npm run build && \
cd .. && \
firebase deploy --only hosting
```

### Complete Update (Backend + Frontend)

```bash
# Update both backend and frontend with directory cleanup
cd /home/alex/moneymanager && \
gcloud builds submit backend --tag gcr.io/moneymanager-f7891/moneymanager-backend && \
gcloud run services update moneymanager-backend \
  --image gcr.io/moneymanager-f7891/moneymanager-backend \
  --region europe-west6 && \
cd frontend && \
sudo rm -rf .next && \
npm run build && \
cd .. && \
firebase deploy --only hosting
```

## Environment Variables

### Update Backend Environment Variables

```bash
gcloud run services update moneymanager-backend \
  --region europe-west6 \
  --set-env-vars="OPENAI_API_KEY=your-api-key-here"
```

## Important URLs

- **Frontend**: https://moneymanager-f7891.web.app
- **Backend API**: https://moneymanager-backend-qwbwl7ldoa-oa.a.run.app
- **API Documentation**: https://moneymanager-backend-qwbwl7ldoa-oa.a.run.app/docs
- **Backend Logs**: https://console.cloud.google.com/run/detail/europe-west6/moneymanager-backend/logs
- **Firebase Console**: https://console.firebase.google.com/project/moneymanager-f7891
