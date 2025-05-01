# StakeScope – Solana Staking Health Dashboard

## Overview

**StakeScope** is a modern, production-ready web dashboard for monitoring the health and performance of the Solana staking ecosystem. It provides real-time insights into network metrics, validator performance, stake distribution, and actionable alerts, all wrapped in a visually intuitive and responsive UI.

---

## Features

### 1. Real-Time Network Metrics
- **Total Stake:** Displays the total amount of SOL staked on the network.
- **Active Validators:** Shows the current number of active validators.
- **Network Participation:** Calculates and displays the participation rate.
- **Average Commission:** Shows the average commission rate across all validators.

### 2. Stake Distribution
- Visualizes how stake is distributed among validators in different brackets (e.g., 0-100K SOL, 100K-500K SOL, etc.) using a pie chart.

### 3. Validator Performance
- Provides a time series chart of validator performance metrics (e.g., vote credits) over the last 24 hours.

### 4. Top Validators Leaderboard
- **Leaderboard Table:** Lists the top validators by stake, including their address, commission, and rank.
- **Search & Sort:** Users can search for validators by name or address and sort the leaderboard by stake or commission.
- **Copy Address:** Easily copy validator addresses to the clipboard.

### 5. Alerts System
- **Dynamic Alerts:** The Alerts page displays simulated, dynamic alerts such as:
  - "X validators recently dropped below 95% uptime"
  - "New validator with 0% commission joined"
  - "Stake redistribution recommended to maintain decentralization"
- **Metrics:** Shows the number of active, critical, and resolved alerts, as well as average response time.
- **Alert History:** Displays a log of resolved alerts.
- **Trends & Insights:** Provides insights into alert trends, response times, and resolution rates.

### 6. Navigation & Layout
- **Sidebar Navigation:** Quick access to Overview, Validators, Network, and Alerts pages.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.
- **Modern UI:** Built with Next.js and Tailwind CSS for a clean, professional look.

### 7. Backend & API Integration
- **Secure API Key Handling:** Uses environment variables to securely manage the Helius API key.
- **Custom API Routes:** Next.js API routes fetch and process data from the Solana blockchain using the Helius endpoint.

### 8. Error Handling & Loading States
- **Skeleton Loaders:** Displayed while data is loading for a smooth user experience.
- **User-Friendly Errors:** Clear error messages if data fetching fails.

---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Framer Motion
- **Backend/API:** Next.js API routes, Helius RPC for Solana
- **State/Data:** React Query for data fetching and caching
- **UI Components:** Custom, reusable components for cards, tables, charts, and alerts

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/stakescope.git
   cd stakescope
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env.local` file in the root directory:
     ```
     NEXT_PUBLIC_HELIUS_API_KEY=your_helius_api_key
     HELIUS_RPC_URL=https://mainnet.helius-rpc.com/?api-key=${NEXT_PUBLIC_HELIUS_API_KEY}
     NEXT_PUBLIC_APP_URL=http://localhost:3000
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## Customization & Extensibility

- **Alerts:** The Alerts page uses mock data for demonstration. You can connect it to real monitoring logic or expand the types of alerts.
- **Validator Data:** Easily extend the leaderboard and performance pages with more metrics or custom filters.
- **Theming:** The theme toggle has been removed for simplicity, but dark/light mode is still supported via Tailwind's dark mode.

---

## Security

- **API Keys:** All sensitive keys are stored in environment variables and are never exposed in the codebase or version control.
- **.gitignore:** The project is configured to ignore all `.env` files.

---

## Roadmap / Future Improvements

- Integrate real-time alerting and notification system.
- Add wallet connection and user authentication.
- Enable custom alert rules and user preferences.
- Expand analytics and historical data views.
- Add support for more Solana clusters (e.g., Devnet).

---

## License

MIT

---

**StakeScope** empowers Solana stakers, validators, and ecosystem participants with actionable insights and a delightful user experience.  
If you have questions or want to contribute, feel free to open an issue or pull request!
