# Catalog Manager (CCM)

A modern web application for managing product catalogs with seamless integration for Shopify and WooCommerce platforms.

## 📋 Overview

Catalog Manager is a comprehensive catalog subscription and management platform built with Vue.js and Quasar Framework. It enables users to subscribe to catalogs, manage products, sync with e-commerce platforms, and handle catalog subscriptions efficiently.

## ✨ Features

- **User Authentication & Authorization**
  - Secure login and signup
  - Password reset functionality
  - Email verification
  - Role-based access control

- **Catalog Management**
  - Subscribe to multiple catalogs
  - Manage catalog feeds
  - Track subscription history
  - Automated catalog syncing

- **E-commerce Integration**
  - Shopify integration
  - WooCommerce integration
  - Product synchronization
  - Real-time inventory updates

- **Account Management**
  - User profile management
  - Billing and invoices
  - Subscription plans
  - Address management
  - Timezone configuration

- **Product Management**
  - View and manage products
  - Supplier management
  - Product history tracking
  - Subscription management

- **Settings & Configuration**
  - App integrations
  - User roles and permissions
  - Team management
  - Customizable configurations

- **Support Features**
  - Knowledge base
  - FAQs
  - Contact support
  - Help documentation

## 🛠️ Tech Stack

- **Framework:** [Quasar Framework](https://quasar.dev/) v2.6.1
- **Frontend:** Vue.js 3 with Vuex for state management
- **HTTP Client:** Axios
- **Form Validation:** Vee-Validate
- **UI Features:** Drag & Drop (vue3-draggable)
- **PDF Generation:** jsPDF
- **Payment Processing:** Credit card validation
- **Build Tool:** Quasar CLI
- **Styling:** SCSS with Quasar variables

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js:** >= 12.22.1
- **npm:** >= 6.13.4 (or)
- **Yarn:** >= 1.21.1

## 🚀 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CCM
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## 💻 Development

Start the development server with hot-reload:

```bash
npm start
# or
quasar dev
```

The application will open automatically at `http://localhost:8080`

## 🏗️ Build Commands

Build the application for different environments:

### Development Build
```bash
npm run build:dev
```

### Staging Build
```bash
npm run build:stage
```

### Production Build
```bash
npm run build:prod
```

## 📁 Project Structure

```
CCM/
├── public/                 # Static assets
│   ├── icons/             # Favicon and app icons
│   └── favicon.ico
├── src/
│   ├── assets/            # Images, fonts, and static resources
│   ├── boot/              # Boot files (axios configuration)
│   ├── components/        # Reusable Vue components
│   │   ├── features/      # Feature-specific components
│   │   │   ├── auth/      # Authentication components
│   │   │   ├── home/      # Home page components
│   │   │   ├── products/  # Product management
│   │   │   ├── settings/  # Settings components
│   │   │   └── ...
│   │   └── restate/       # Shared UI components
│   ├── css/               # Global styles
│   ├── layouts/           # Layout components
│   │   ├── auth/          # Auth layout
│   │   ├── home/          # Main app layout
│   │   └── login/         # Login layout
│   ├── pages/             # Page components
│   │   ├── account/       # Account pages
│   │   ├── auth/          # Authentication pages
│   │   ├── home/          # Home pages
│   │   ├── products/      # Product pages
│   │   ├── settings/      # Settings pages
│   │   └── ...
│   ├── router/            # Vue Router configuration
│   ├── store/             # Vuex store modules
│   │   ├── auth/          # Authentication state
│   │   ├── common/        # Common state
│   │   ├── home/          # Home state
│   │   ├── products/      # Products state
│   │   ├── shopify/       # Shopify integration state
│   │   └── woocommerce/   # WooCommerce integration state
│   └── App.vue            # Root component
├── babel.config.js        # Babel configuration
├── quasar.conf.js         # Quasar configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## 🔧 Environment Configuration

The application uses environment-based API endpoints configured in `quasar.conf.js`:

- **Development:** Local and staging APIs
- **Staging:** Testing environment APIs
- **Production:** Production APIs

### Available APIs:
- **CCMAPI:** Main catalog manager API
- **WooCommerceAPI:** WooCommerce integration API
- **ShopifyAPI:** Shopify integration API
- **UtilityAPI:** Utility services API
- **StripeAPI:** Payment processing API
- **CatalogAPI:** Catalog management API

## 🎨 Customization

### Styling
- Global styles: `src/css/app.scss`
- Quasar variables: `src/css/quasar.variables.scss`
- Custom fonts: `src/assets/fonts/`

### Icons
The project uses:
- Material Icons
- MDI (Material Design Icons) v5
- Custom SVG icons in `src/assets/`

## 📱 Platform Support

The application is optimized for:
- Desktop browsers (Chrome, Firefox, Edge, Safari, Opera)
- Mobile browsers (Android Chrome, iOS Safari, Firefox Android)
- Responsive design for all screen sizes

## 🔐 Security Features

- JWT-based authentication
- Secure password reset flow
- Email verification
- Role-based access control
- Encrypted payment processing
