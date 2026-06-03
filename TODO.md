# Zone4Build E2E Testing TODO

This document tracks the progress of implementing End-to-End test coverage across all Zone4Build applications (Admin, Client, Shop, Delivery, Tenant, Mobile). Tests are organized by Feature Epics to mirror real user journeys.

## 1. Auth Epic
- [x] Implement Page Object Model (`AuthPage.ts`)
- [x] Set up authentication fixture (`auth.fixture.ts`)
- [x] Basic Login & SSO (`login.spec.ts`, `keycloak.spec.ts`)
- [x] Registration Flow (`signup.spec.ts`)
- [x] Password Recovery (`reset-password.spec.ts`)
- [x] Google SSO (`google-login.spec.ts`)

## 2. Client & Marketplace Epic
- [x] Shop Discovery Map & Listings (`shop-discovery.spec.ts`)
- [x] Vertical Video Reels Feed (`feed.spec.ts`)
- [x] Live Session Client Join (`client-join.spec.ts`)
- [ ] Implement `ClientPage.ts` POM
- [ ] Browse Products & Filter Categories (`browse.spec.ts`)
- [ ] View User Profile & Order History (`profile.spec.ts`)
- [ ] Wishlists functionality (`wishlists.spec.ts`)
- [ ] Digital Downloads flow (`downloads.spec.ts`)
- [ ] Referral programs (`referral.spec.ts`)
- [ ] Static pages rendering: Terms, Privacy, Help, Contact (`static-pages.spec.ts`)

## 3. Checkout Epic
- [x] Basic Order Flow / Cart (`order-flow.spec.ts`)
- [x] Stripe Payment Validation (`stripe.spec.ts`)
- [ ] Implement `CheckoutPage.ts` POM
- [ ] Apply Promo Codes / Discounts (`discounts.spec.ts`)
- [ ] Failed Payment Handling (`failed-payment.spec.ts`)

## 4. Shop / Vendor Epic
- [x] Start Live Session (`vendor-start.spec.ts`)
- [x] Upload Media to Live (`media-upload.spec.ts`)
- [x] Live Badge & Jitsi Fallback (`live-badge.spec.ts`, `jitsi-fallback.spec.ts`)
- [ ] Implement `ShopDashboardPage.ts` POM
- [ ] Catalog Management: Create/Edit/Delete Product (`catalog.spec.ts`)
- [ ] Order Fulfillment: Accept Order & Update Status (`fulfillment.spec.ts`)
- [ ] Coupon Generator flow (`coupon-generator.spec.ts`)
- [ ] Handle Customer Refunds (`refunds.spec.ts`)
- [ ] View Financials: Wallet & Reports (`vendor-financials.spec.ts`)

## 5. Delivery Epic
- [ ] Implement `DeliveryPage.ts` POM
- [ ] Setup Delivery Fixture (`delivery.fixture.ts`)
- [ ] View Available Deliveries (`available-deliveries.spec.ts`)
- [ ] Accept Delivery & Update to Picked Up (`pickup.spec.ts`)
- [ ] Complete Delivery to Client (`delivery-complete.spec.ts`)
- [ ] Delivery tracking interface from Client view (`delivery-tracker.spec.ts`)

## 6. Admin Epic
- [ ] Implement `AdminPage.ts` POM
- [ ] User Management: Create, Edit, Ban Users (`user-management.spec.ts`)
- [ ] Shop Approval Flow: Review & Approve new vendor (`shop-approval.spec.ts`)
- [ ] System Config: Manage Categories, Attributes, Tags, Groups (`catalog-config.spec.ts`)
- [ ] Logistics Config: Manage Shippings, Taxes, Order Statuses (`logistics-config.spec.ts`)
- [ ] Partner Config: Manage Manufacturers, Authors (`partner-config.spec.ts`)
- [ ] Communication: Push notifications & testing (`notifications.spec.ts`)
- [ ] Admin Financials: Wallet overview (`admin-financials.spec.ts`)

## 7. Tenant Epic
- [ ] Tenant Branding Customization (`tenant-settings.spec.ts`)
- [ ] Tenant-specific authentication (`tenant-auth.spec.ts`)

## 8. Mobile Experience Epic
- [x] Core Responsive Checks (`responsive.spec.ts`)
- [ ] Mobile Navigation Menu (`mobile-nav.spec.ts`)
- [ ] Touch gestures (Swipe to close cart, etc.) (`touch-gestures.spec.ts`)

## 9. Backend API Epic
- [ ] Create `tests/api/` directory structure
- [ ] Implement `commerce-api.spec.ts` (Product fetch, inventory updates, order endpoints)
- [ ] Implement `notification-api.spec.ts` (Webhook payloads, email/SMS triggers)
- [ ] Implement `doc-api.spec.ts` (Document generation/fetching endpoints)
- [ ] Implement `core-api.spec.ts` (Auth validation, config fetching)

---
**How to use this file:**
As you implement new Page Object Models in `pages/` and new test specifications in `tests/`, mark them off with `[x]` in this document to track your overall platform test coverage!
