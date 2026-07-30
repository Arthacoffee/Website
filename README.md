# Artha Speciality Coffee — Website

Static site for Artha Speciality Coffee, a specialty coffee house and full-meal
vegetarian restaurant on Defence Colony Road, Sainikpuri, Secunderabad.

## Structure

- `index.html` — Home
- `menu.html` — Full menu (brew bar, brunch, Andhra, Italian, Indo-Chinese, tandoor, bistro, desserts)
- `about.html` — Story, founders, sustainability
- `visit.html` — Location, hours, map, reservation form
- `journal.html` + `journal/*.html` — Journal articles
- `css/style.css` — Design system (colors, type, components)
- `js/main.js` — Mobile nav toggle, footer year, reservation form handling
- `assets/favicon.svg` — Site icon

## Running locally

Any static file server works, e.g.:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080/index.html`.

## Notes for going live

- **Reservation form**: currently front-end only (shows a confirmation message,
  sends nothing). Wire it to a form backend (Formspree, a serverless function,
  or a simple mail API) before relying on it for real bookings.
- **Map embed**: `visit.html` uses a keyless Google Maps embed
  (`google.com/maps?...&output=embed`). For a more robust, quota-tracked
  embed, switch to the Google Maps Embed API with an API key.
- **Images**: all visuals are CSS/SVG placeholders in the brand palette. Swap
  in real photography (café interior, rooftop, brew bar, dishes) via the
  `.art-block` / `.hero__art` / `.card__art` containers in each page.
- **Instagram link**: the footer's Instagram icon currently points to `#` —
  update it once the account exists.
