# Indonesians Who Design

[Indonesians Who Design](https://indonesianswhodesign.dae.ng) celebrates the work of talented Indonesian designers and showcases it to the world.

The website uses Google Sheets, Next.js, and Vercel.

## Forking this project

We encourage you to create a directory featuring professionals relevant to your community. The project is open source, and these instructions will help you run it locally.

### Link your spreadsheet

1. Duplicate [this spreadsheet template](https://docs.google.com/spreadsheets/d/12LLA-NoHin0zQfmpEblgMjd260bmriLMowBAH1QDOhI/edit).
2. Copy the spreadsheet ID between `/spreadsheets/d/` and `/edit` in its URL.
3. Update the spreadsheet ID and range in `lib/getDesigners.js`.
4. Configure `GOOGLE_CLIENT_EMAIL` and `GOOGLE_PRIVATE_KEY` in your local environment and deployment settings.
5. Give the Google service account access to the spreadsheet.

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Create a production build

```bash
npm run build
```

### Deploy

The production website is deployed on [Vercel](https://vercel.com/) from the `main` branch.
