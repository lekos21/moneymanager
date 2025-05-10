1. Architettura complessiva
Frontend

Framework: Next.js (React + routing / SSR/SSG out-of-the-box)

Layout mobile-first, con navbar/tab bar in basso e transizioni "app-like"

Backend

FastAPI in Python, containerizzato (Docker)

Microservizi distinti:

Agent NLP / AI: espongono endpoint /parse-expense, /suggest-category, ecc.

Expense Service: CRUD su Firestore

Auth Service: /login/google, /refresh-token

Database

Firestore: collections users, expenses, messages, aggregates

Cloud Functions per trigger di classificazione e aggiornamento subtotali

Hosting / Infra

Frontend: Vercel o Firebase Hosting

Backend: Cloud Run / Kubernetes on GCP

CI/CD: GitHub Actions (build & test + deploy su push a main)

2. Frontend (Next.js + React)
Structure

Cartella pages/ con:

/ → splash / onboarding

/home → dashboard con grafici

/chat → chat AI + lista spese

/reports → report settimanali/mensili

/account → profilo, impostazioni

Componente Layout che include la bottom tab bar (Icone: Home, Chat, +, Reports, Account)

Styling

Tailwind CSS + variabili di design (gradient backgrounds, colori vivaci)

Spigoli arrotondati (rounded-2xl), ombre morbide (shadow-lg), transizioni rapide (transition-all duration-200)

Grafici

Recharts o Chart.js + React wrapper

Dati ottenuti tramite SWR o React Query (caching + polling per live update)

Performance

Code-splitting automatico di Next.js

Immagini ottimizzate (next/image)

Lazy-load per moduli non critici (e.g. report mensili)

3. Backend (FastAPI + Firestore)
Struttura progetto

bash
Copy
Edit
/app
  /agents          # microservizio NLP/AI
  /expenses        # logica CRUD + Firestore client
  /auth            # OAuth Google
  /reports         # scheduler report
  main.py          # mount router
Firestore

users: { id: string, email, name, photoURL, settings }

expenses: { id, userId, timestamp, amount, currency, rawText, category, tags }

messages: { id, userId, direction, text, intent, createdAt }

aggregates: { userId, periodKey, groupLabel, total } (aggiornato da trigger)

Cloud Functions

On-create expenses: chiama AI Agent per classificazione → aggiorna category + aggregates

API

/api/expenses (GET, POST, DELETE)

/api/parse (POST rawText → { amount, date, category })

/api/reports/:period (GET PDF/JSON)

/api/auth/google (POST tokenId → JWT back)

4. Autenticazione
OAuth2 with Google:

Frontend ottiene id_token da Google SDK

POST /api/auth/google (FastAPI)

Verifica token, crea/recupera utente in Firestore, restituisce JWT

JWT usato nelle chiamate successive via Authorization header

Refresh: endpoint /api/auth/refresh con refresh token in HttpOnly cookie

5. UI Design Guidelines
### Color Palette

**Primary Gradients:**
- Purple-Blue Gradient: `bg-gradient-to-r from-blue-400 to-purple-500` (similar to the main balance card)
- Pink-Orange Gradient: `bg-gradient-to-r from-pink-400 to-orange-400` (for accent buttons and highlights)
- Blue-Teal Gradient: `bg-gradient-to-r from-blue-400 to-teal-400` (for secondary elements)

**Solid Colors:**
- Background: Light gradient background `bg-gradient-to-br from-purple-50 to-pink-50`
- Card Background: White `bg-white`
- Text: Dark gray `text-gray-800` for primary text, `text-gray-500` for secondary text
- Accent Icons: Category-specific colors (Food: orange, Shopping: purple, Entertainment: red, etc.)

### Typography

- Font Family: Inter or similar modern sans-serif
- Headings: Semi-bold (600) with larger sizes (text-xl to text-3xl)
- Card Titles: Medium (500) with size text-lg
- Body Text: Regular (400) with size text-base or text-sm
- Amounts: Bold (700) for emphasis, especially on expense amounts

### Components

**Cards:**
- Highly rounded corners `rounded-3xl` (24px+)
- Clean white background `bg-white`
- Soft shadow `shadow-md shadow-gray-100/60`
- Generous padding `p-5` to `p-6`
- Content organized with clear visual hierarchy
- Category icons with colored circular backgrounds

**Main Balance Card:**
- Gradient background (blue to purple)
- Large, bold white text for the amount
- Subtle transparency effects for sub-elements
- Income/expense indicators with up/down arrows

**Transaction Cards:**
- Clean white background with ample padding
- Category icon on left in colored circle
- Transaction details in middle (name, date)
- Amount on right, aligned and bold
- Consistent spacing between items

**Buttons:**
- Primary: Gradient background with full rounded corners `rounded-full`
- Secondary: White with colored border or subtle gray background
- Icon buttons: Circular with proper padding
- Consistent hover and active states with subtle transitions

**Input Fields:**
- Clean, minimal design with rounded corners `rounded-xl`
- Light background or subtle border
- Clear focus states with gradient highlights
- Properly sized for touch interactions

**Charts and Graphs:**
- Clean, minimal design with rounded bars/lines
- Consistent color scheme matching the app's palette
- Proper spacing and padding
- Clear labels and values

### Layout & Spacing

- Consistent spacing system using Tailwind's spacing scale
- Generous whitespace between elements
- Card grid with proper gap spacing `gap-4` or `gap-5`
- Proper hierarchy with section titles and subtitles

### Animation & Interaction

- Subtle hover effects on cards and buttons
- Smooth transitions for state changes (150-200ms)
- Loading states with skeleton UI or subtle pulse animations
- Micro-interactions for important actions (adding expenses, completing tasks)

### Icons

- Consistent icon set (Lucide React)
- Category-specific colored icons
- Proper sizing and alignment
- Color-coded for different categories

6. Performance & UX
Realtime: Firestore listeners in React Query → update istantanei di grafici e chat

Pre-fetching: dati di home/report pre-caricati in background

Skeleton UI: placeholder animati durante caricamenti

Accessibilità: contrasto sufficiente, focus ring visibile, labels per screen reader