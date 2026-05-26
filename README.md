# CultureFlow Frontend

Angular 18 + TypeScript

## Ejecutar local

```bash
npm install
npm start
# http://localhost:4200
```

## Build producción

```bash
npm run build
# dist/cultureflow-frontend/browser/
```

## Configurar API

Editar `src/environments/environment.ts`:
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

## Despliegue en Vercel

1. Conectar repositorio GitHub
2. Framework: Angular
3. Build command: `npm run build`
4. Output: `dist/cultureflow-frontend/browser`
5. El archivo `vercel.json` ya configura el SPA routing

## Roles y accesos

| Pantalla | ADMIN | DIRECTOR | JURADO | INTEGRANTE |
|---|---|---|---|---|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| Colectivos | ✅ | ✅ | ❌ | ❌ |
| Eventos | ✅ | ✅ | ✅ | ✅ |
| Ensayos | ✅ | ✅ | ❌ | ✅ |
| Escenas | ✅ | ✅ | ❌ | ✅ |
| Presentaciones | ✅ | ✅ | ✅ | ✅ |
| Calificar | ❌ | ❌ | ✅ | ❌ |
| Usuarios | ✅ | ❌ | ❌ | ❌ |
