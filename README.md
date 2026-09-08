# Bilibel in Astro

De 17 openbare pagina’s van bilibel.nl worden statisch gegenereerd door Astro.
De originele HTML, CSS, beelden en responsive stijlen zijn overgenomen. Er draait geen WordPress-server.

## Lokaal bekijken

`docker compose up -d --build`

Open http://localhost:4322.

## Opbouw

- `src/data/original.json`: oorspronkelijke pagina-inhoud, met lokale links en assets.
- `src/pages/[...path].astro`: statische Astro-routes voor alle geïmporteerde pagina’s.
- `public/original`: lokale oorspronkelijke CSS, afbeeldingen en lettertypen.
- `public/replica.js`: mobiele navigatie, submenu’s, reviews en fotovenster.
- `scripts/import-original.mjs`: herhaalbare import van intern gelinkte openbare pagina’s en assets. Gebruik bewust: dit vernieuwt de broninhoud.
- `src/data/import-report.json`: geïmporteerde routes, assetaantal en downloadfouten.

## Verschillen die een externe koppeling vereisen

De WordPress-formulierbackend is niet lokaal aanwezig. Contact- en kadobonformulieren openen daarom een e-mailconcept; er wordt geen fictieve verzendbevestiging getoond. Rechtstreekse verzending vereist SMTP of een formulierdienst.

De oorspronkelijke site verwijst voor fonts naar www.bilibel.nl; die bestanden worden in de browser geblokkeerd en de site toont sans-serif fallback. De replica bewaart die zichtbare weergave. Fontbestanden zijn wel lokaal beschikbaar.

Analytics en WordPress-tracking worden niet uitgevoerd. Google Maps blijft een externe embed, zoals op de oorspronkelijke site. De originele bron bevat ook verouderde tarieven/voorbeeldtekst onder Algemene Voorwaarden; die zijn bij deze letterlijke overname behouden.

Controle: `npm run build`.
