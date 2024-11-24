# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

```
calendar-app/
├── backend/
│   ├── .env
│   ├── index.js
│   ├── prisma/
│   │   ├── schema.prisma
│   ├── package.json
│   └── node_modules/
├── client/
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── EventList.js
│   │   │   └── AddEditEvent.js
│   │   ├── services/
│   │   │   ├── AuthService.js
│   │   │   └── EventService.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── App.css
│   ├── .env
│   ├── package.json
│   └── node_modules/
├── README.md
└── .gitignore
