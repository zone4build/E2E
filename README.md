# Zone4Build E2E Testing Suite

A standalone Playwright E2E testing framework to test the Zone4Build platform in local development, staging, or production environments.

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
