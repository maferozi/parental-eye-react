# Parental Eye — Frontend (React)

Parental Eye is a real-time child/vehicle location-tracking platform. This repository is the **web frontend** — a role-based dashboard for Super Admins, Admins, Guardians (parents), Drivers, and Children, plus a public marketing site. It pairs with the [Parental Eye backend](https://github.com/maferozi/parental-eye-express) (Express/PostgreSQL API).

🔗 Live demo: [parental-eye-react.vercel.app](https://parental-eye-react.vercel.app)

## Overview

A GPS tracking device is attached to a child or a vehicle. This app subscribes to that device's live location stream (via MQTT) and displays it on an interactive map, alongside geofence status, notifications, and historical reports — with the exact data and permissions shown depending on the logged-in user's role.

## Features

- **Role-based dashboards** — separate views and permissions for Super Admin, Admin, Guardian, Driver, and Child accounts, enforced via route/role guards.
- **Live location tracking** — real-time device positions on a Leaflet map, streamed over MQTT (HiveMQ) and Socket.IO.
- **Geofencing** — draw and manage safe zones (circle, polygon area, or route) with `leaflet-draw`, and get alerted when a device leaves them.
- **Device management** — add, assign, and unassign tracking devices to parents, children, or drivers; device requests workflow.
- **User management** — invite and manage guardians, drivers, and children; approve/reject/pending status flows.
- **Notifications** — real-time alerts (geofence exits, danger signals) with a notification center.
- **Reports & history** — location history views and printable/exportable reports (`react-to-print`, data tables).
- **Authentication** — login, registration, email verification, forgot/reset password, JWT-based sessions.
- **Public marketing site** — Home, Features, Support, and Contact Us pages for visitors.

## Tech Stack

- **Framework:** React 18 + Vite
- **Routing:** React Router v6
- **UI:** Bootstrap 5, React-Bootstrap, Reactstrap, Framer Motion
- **Data fetching:** Axios, TanStack Query, TanStack Table / react-data-table-component
- **Forms:** Formik + Yup
- **Maps:** Leaflet, React-Leaflet, Leaflet-Draw
- **Real-time:** MQTT.js (HiveMQ broker), Socket.IO client
- **Charts:** Recharts, react-circular-progressbar, react-countup
- **Other:** SweetAlert2, react-toastify, react-qr-code, react-select, react-datepicker

## Project Structure

```
src/
├── api/                # Axios API calls (auth, device, geofence, location, notification, invitedUser)
├── assets/             # Images, fonts, static styles
├── components/          # Shared components (Header, SideBar, Layout, route/role guards, DataTable...)
├── constants/          # App-wide constants (roles, statuses, base URL)
├── context/            # AuthContext, MqttContext (React Context providers)
├── hook/ & hooks/       # Custom hooks (useMqtt, useFetchReport)
├── utills/              # Helpers (pagination, socket client, local user storage)
├── views/
│   ├── Auth/            # Login, Register, Forget/Reset Password, Verify Email
│   ├── Admin/           # Admin dashboard, device/user management, geofence, reports
│   ├── SuperAdmin/      # Super Admin dashboard, device/user management, reports
│   ├── Gardian/         # Guardian (parent) dashboard, history, notifications, reports
│   ├── Driver/          # Driver dashboard, history, notifications, reports
│   ├── Child/           # Child dashboard, history, notifications, reports
│   └── child-tracking-ui/ # Public marketing site (Home, Features, Support, Contact)
└── main.jsx / App.jsx  # App entry point and root component
```

## Getting Started

### Prerequisites

- Node.js 20.x
- A running instance of the [Parental Eye backend](https://github.com/maferozi/parental-eye-express)
- A HiveMQ (or other MQTT broker) connection string

### Installation

```bash
git clone https://github.com/maferozi/parental-eye-react.git
cd parental-eye-react
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
VITE_BASE_URL=http://localhost:3000/api
VITE_HIVEMQ_CONNECTION_STRING=wss://<your-hivemq-broker-url>
```

| Variable | Description |
|---|---|
| `VITE_BASE_URL` | Base URL of the backend API |
| `VITE_HIVEMQ_CONNECTION_STRING` | WebSocket connection string for the MQTT broker used for live device tracking |

### Run in development

```bash
npm run dev
```

### Build for production

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
npm run lint:fix
```

### Docker

A `Dockerfile` is included for a production build served via `serve`:

```bash
docker build -t parental-eye-react .
docker run -p 3000:3000 parental-eye-react
```

## Roles

| Role | Description |
|---|---|
| Super Admin | Top-level oversight of all admins, devices, and users |
| Admin | Manages guardians, drivers, children, and devices under their scope |
| Guardian (Parent) | Views and tracks their assigned children/devices |
| Driver | Views assigned children/devices for transport tracking |
| Child | Own device/location view (limited access) |

## Related Repository

- Backend API: [parental-eye-express](https://github.com/maferozi/parental-eye-express)

## License

No license specified.
