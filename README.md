# Zone4Build E2E Testing Suite

A standalone Playwright E2E testing framework to test the Zone4Build platform in local development, staging, or production environments.

## 🎯 Mission Description
Our goal is to achieve **100% End-to-End coverage** of critical user journeys across all Zone4Build applications and microservices. 
Instead of testing isolated apps, this suite tests **Feature Epics**—simulating real-world scenarios where a user interacts with multiple platforms (e.g., a Vendor creates a product in the Shop app, and a Customer buys it in the Client app).

## 🌍 Target Environments & Default URLs
By default, tests are configured to run against your local development servers. Ensure the respective apps and APIs are running before executing tests.

| Application | Default Local URL | Production URL |
| :--- | :--- | :--- |
| **Admin App** | `http://localhost:3000` | `https://dashboard.zone4build.com` |
| **Client App** | `http://localhost:3001` | `https://www.zone4build.com` |
| **Shop/Vendor App** | `http://localhost:3002` | `https://shop.zone4build.com` |
| **Delivery App** | `http://localhost:3003` | `https://delivery.zone4build.com` |
| **Tenant App** | `http://localhost:3004` | `https://tenant1.zone4build.com` |
| **Backend APIs** | `http://localhost:4000` | `https://api.zone4build.com` |

*Note: You can override any of these by modifying the `ui/E2E/.env.test` file.*

## 📁 Directory Structure

```text
zone4build-e2e/
├── playwright.config.ts          # config multi-env / multi-device
├── .env.test                     # URLs + credentials test
├── tsconfig.json                 # TypeScript compiler setup
├── package.json                  # project metadata and dependencies
│
├── .github/workflows/
│   └── e2e.yml                   # CI GitHub Actions
│
├── tests/
│   ├── auth/
│   │   ├── login.spec.ts         # login vendor + client
│   │   └── keycloak.spec.ts      # Keycloak SSO flow
│   │
│   ├── live/
│   │   ├── vendor-start.spec.ts  # complete multi-user live commerce flow
│   │   ├── client-join.spec.ts   # client joins the live session
│   │   ├── media-upload.spec.ts  # uploading product media during live
│   │   └── jitsi-fallback.spec.ts# fallback slider when Jitsi meets drop
│   │
│   ├── marketplace/
│   │   ├── shop-discovery.spec.ts# map discovery and store listings
│   │   ├── live-badge.spec.ts    # red active live badge SSE checks
│   │   └── feed.spec.ts          # scroll-based vertical video reels
│   │
│   ├── checkout/
│   │   ├── order-flow.spec.ts    # cart selections to order summaries
│   │   └── stripe.spec.ts        # Stripe payment fields validation
│   │
│   └── mobile/
│       └── responsive.spec.ts    # 375px responsive checks
│
├── fixtures/
│   ├── auth.fixture.ts           # reusable auth fixtures
│   ├── live.fixture.ts           # live toggle setup/teardowns
│   ├── shop.fixture.ts           # static test shop data
│   └── test-product.jpg          # dummy media upload asset
│
└── pages/                        # Page Object Model (POM)
    ├── LivePage.ts
    ├── MarketplacePage.ts
    └── DashboardPage.ts
```

## 🚀 Setup & Execution

### 1. Install Dependencies
```bash
npm install
npx playwright install --with-deps
```

### 2. Set Up Environment
Copy the example environment template and populate it with target credentials:
```bash
cp .env.example .env.test
```

### 3. Run Tests
- **All tests:**
  ```bash
  npm test
  ```
- **Only Live flows:**
  ```bash
  npm run test:live
  ```
- **Interactive UI Mode:**
  ```bash
  npm run test:ui
  ```
- **View HTML Report:**
  ```bash
  npm run test:report
  ```
