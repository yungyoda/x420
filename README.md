# x402 Proxy | Digital Drug Bazaar

This project extends the baseline x402 paywall template with a tongue-in-cheek "digital drug" marketplace. Agents can purchase playful prompt simulations (no real substances involved) that temporarily alter their personality. The API conforms to the stricter `x402scan` schema requirements so listings appear on the public scanner.

<img src="public/og-image.png" alt="x402 Proxy Page"/>
<hr/>

![Next.js](https://img.shields.io/badge/-Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Coinbase](https://img.shields.io/badge/Coinbase-0052FF?style=for-the-badge&logo=Coinbase&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)


A full-stack Next.js application for managing crypto payments and invoices using Coinbase's infrastructure.

## Digital Drug Endpoints

| Slug | Title | Price (USDC) | Description |
|------|-------|--------------|-------------|
| `w33d` | Digital Joint | `0.20` | Relaxed, cozy persona with stretched vowels and snack talk |
| `c0k3` | Digital 8 Ball | `0.80` | Hyper-focused hype speech with rapid-fire delivery |
| `shr00ms` | Digital Mushroom Flight | `0.50` | Psychedelic introspection with technicolor metaphors |

### How the System Works

1. **Menu discovery** – Agents call `GET /api/digital-experiences`. The endpoint returns an `x402Version`, Base mainnet payout wallet, supported asset (`USDC`), and each product’s structured metadata (intensities, soundtrack, safety notes, timeout, etc.). The response follows the `x402scan.md` schema so the scanner can list the services.
2. **Payment gate** – When an agent wants a session, they hit `POST /api/digital-experiences/{slug}` (e.g. `/w33d`, `/c0k3`, `/shr00ms`). Requests flow through `paymentMiddleware` from `x402-next`. That middleware verifies a Base mainnet payment equal to the price label returned by the listing. If payment fails, the user receives an HTTP 402 response with instructions from x402.
3. **Session payload** – After payment, the request body (optional `alias`, `intensity`, `context`) is sanitized and passed to `buildDigitalDrugSession`. The response includes a unique session ID, the selected intensity preset, the role-play prompt, soundtrack guidance, vibes, safety notes, and an echo of the extra context. Agents can immediately use the prompt to temporarily alter their behavior.
4. **Expiry & controls** – Each offering includes `maxTimeoutSeconds` and recommended duration so consuming agents can time-box the experience. Everything is fictional; the `safetyNotes` remind consumers that the effects are simulated and reversible.

### Listing Endpoint

```
GET /api/digital-experiences
```

Response structure matches the stricter scanner schema and includes:

- `x402Version`: numeric version identifier
- `wallet`: wallet address receiving payments
- `network`: x402 network (defaults to `base`)
- `asset`: accepted asset (defaults to `USDC`)
- `offerings`: array of available digital drugs, each with price label, endpoint path, intensity presets, vibes, soundtrack inspiration, safety notes, and max timeout seconds

### Purchase Endpoints

```
POST /api/digital-experiences/w33d
POST /api/digital-experiences/c0k3
```

Both routes share the same JSON payload shape (all fields optional):

```json
{
  "alias": "string",
  "intensity": "string",
  "context": "string"
}
```

Successful payment returns:

- `x402Version`: numeric version identifier
- `session`: object containing prompt instructions, intensity data, soundtrack inspiration, vibes, and safety reminders the consuming agent can adopt

**HTTP 402** responses indicate payment is required or insufficient. The `x402-next` middleware enforces pricing automatically using the configured wallet and network.

## Prerequisites

- Git
- Node.js (v22 or higher)
- Upstash 

## Environment Variables

Create a `.env` file in the root directory and fill in the variables:
```sh
mv .example.env .env
```

Add the following keys for the digital drug marketplace:

- `DIGITAL_WALLET` – USDC receiving wallet (falls back to `X402_WALLET` if omitted)
- `DIGITAL_DRUG_ASSET` – Asset symbol exposed to clients (defaults to `USDC`)
- `DIGITAL_DRUG_BASE_URL` – Optional override for fully qualified endpoint URLs (defaults to `https://0xtheplug.xyz`)

> **Note**: The digital marketplace is pinned to Base mainnet and cannot be switched via env vars.

## Getting Started

1. Clone the repository:
```sh
git clone https://github.com/heimlabs/coinbase-x402-proxy.git
cd coinbase-x402-proxy
```

2. Install dependencies:
```sh
pnpm install
```

3. Set up your environment variables as described above.

4. Start the development server:
```sh
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Building for Production

```sh
pnpm build
```

To start the production server:
```sh
pnpm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
