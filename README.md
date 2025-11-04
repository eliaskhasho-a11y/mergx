
# MergX v8.54 — Foundation (Next.js App Router)

## Snabbstart
```bash
npm i
npm run dev
# öppna http://localhost:3000
```

## Innehåll
- React/Next.js 14 (App Router)
- Dashboard med sök, 4 KPI, ekonomi-chart, AI‑rail (karta/chatt/analys)
- Mockade API‑routes:
  - `GET /api/orders`
  - `POST /api/invoices/draft`
  - `POST /api/shipping/book`
  - `POST /api/receipts/ocr`
  - `POST /api/finance/send`
  - `GET /api/supervisor/report`

## Deploy på Vercel
Pusha repo → skapa projekt i Vercel → `npm run build`/`next build` körs automatiskt.

## Nästa steg
- Koppla riktiga integrationer (carrier, finans, maps, OCR).
- Lägg till CRM/Ekonomi/AI‑Nav sidor i `src/components` och routerlogik i `page.tsx`.
