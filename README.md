# 💰 MoneyManager

A modern, AI-powered personal expense tracking application with an intuitive chat interface and beautiful visualizations.

## ✨ Features

- **🤖 AI-Powered Expense Parsing**: Natural language processing to automatically categorize and parse expenses
- **💬 Chat Interface**: Conversational UI for adding expenses naturally
- **📊 Visual Reports**: Interactive charts and graphs for expense analysis
- **🔐 Google OAuth**: Secure authentication with Google accounts
- **📱 Mobile-First Design**: Responsive design optimized for mobile devices
- **⚡ Real-time Updates**: Live data synchronization across all devices
- **🏷️ Smart Categorization**: Automatic expense categorization with AI
- **📈 Monthly/Weekly Reports**: Detailed spending analysis and trends

<img width="398" height="796" alt="image" src="https://github.com/user-attachments/assets/c57565ba-2b98-4f9a-8efd-88bc558addbe" />
<img width="398" height="797" alt="image" src="https://github.com/user-attachments/assets/5c2b1502-0b4c-41e4-b672-7b4681864181" />
<img width="399" height="506" alt="image" src="https://github.com/user-attachments/assets/08d5553c-11ec-451b-ac74-3ee28966fd2b" />
<img width="399" height="793" alt="image" src="https://github.com/user-attachments/assets/c675a6f4-d95f-4cc2-8a47-3275c365cdf4" />


## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 13 with React 18
- **Styling**: Tailwind CSS with custom design system
- **State Management**: SWR for data fetching and caching
- **Charts**: Recharts and ECharts for data visualization
- **Icons**: Lucide React and Heroicons
- **Animations**: Framer Motion and Anime.js

### Backend
- **API**: FastAPI with Python
- **Database**: Google Firestore
- **Authentication**: Google OAuth 2.0
- **AI/NLP**: OpenAI + LangChain for expense parsing
- **Cloud Functions**: Firebase Functions for triggers
- **Speech**: Google Cloud Speech API

### Infrastructure
- **Containerization**: Docker
- **Hosting**: Firebase Hosting (Frontend), Cloud Run (Backend)
- **CI/CD**: GitHub Actions
- **Monitoring**: Firebase Analytics

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Firebase project with Firestore enabled
- Google Cloud project with required APIs enabled

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd moneymanager
   ```

2. **Set up environment variables**
   ```bash
   # Copy environment files
   cp .env.example .env
   cp frontend/.env.local.example frontend/.env.local
   cp backend/.env.example backend/.env
   ```

3. **Configure Firebase**
   - Create a Firebase project
   - Enable Firestore, Authentication, and Hosting
   - Download service account key and place in `backend/credentials-google/`
   - Update Firebase config in frontend

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### Docker Setup (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📁 Project Structure

```
moneymanager/
├── frontend/                 # Next.js React application
│   ├── components/          # Reusable UI components
│   ├── pages/              # Next.js pages and API routes
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API service functions
│   ├── contexts/           # React context providers
│   └── styles/             # Global styles and Tailwind config
├── backend/                 # FastAPI Python application
│   ├── app/                # Application modules
│   │   ├── agents/         # AI/NLP microservice
│   │   ├── expenses/       # Expense CRUD operations
│   │   ├── auth/           # Authentication service
│   │   └── reports/        # Report generation
│   └── requirements.txt    # Python dependencies
├── functions/              # Firebase Cloud Functions
├── docker-compose.yml      # Docker services configuration
└── firebase.json          # Firebase project configuration
```

## 🔧 Configuration

### Firebase Setup
1. Create a new Firebase project
2. Enable Firestore Database
3. Enable Authentication with Google provider
4. Create a web app and copy the config
5. Generate a service account key for backend

### Environment Variables

**Frontend (.env.local)**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

**Backend (.env)**
```env
GOOGLE_APPLICATION_CREDENTIALS=./credentials-google/service-account.json
FIREBASE_PROJECT_ID=your_project_id
OPENAI_API_KEY=your_openai_api_key
```

## 🚀 Deployment

### Frontend (Firebase Hosting)
```bash
cd frontend
npm run build
firebase deploy --only hosting
```

### Backend (Cloud Run)
```bash
cd backend
./be_deployment.sh
```

### Automated Deployment
The project includes GitHub Actions workflows for automated deployment on push to main branch.

## 🎨 Design System

The application features a modern, gradient-based design system with:
- **Color Palette**: Purple-blue gradients with accent colors
- **Typography**: Inter font family with consistent sizing
- **Components**: Highly rounded corners, soft shadows, smooth transitions
- **Mobile-First**: Optimized for touch interactions and mobile usage

## 📊 Database Schema

### Firestore Collections

**users**
```javascript
{
  id: string,
  email: string,
  name: string,
  photoURL: string,
  settings: object
}
```

**expenses**
```javascript
{
  id: string,
  userId: string,
  timestamp: timestamp,
  amount: number,
  currency: string,
  rawText: string,
  category: string,
  tags: array
}
```

**messages**
```javascript
{
  id: string,
  userId: string,
  direction: string,
  text: string,
  intent: string,
  createdAt: timestamp
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [guidelines.md](guidelines.md) for detailed architecture information
2. Review the [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions
3. Open an issue on GitHub

## 🔮 Roadmap

- [ ] Offline support with service workers
- [ ] Multi-currency support
- [ ] Budget planning and alerts
- [ ] Receipt scanning with OCR
- [ ] Export to CSV/PDF
- [ ] Dark mode theme
- [ ] Multi-language support
