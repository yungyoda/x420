# x402 Proxy | Demo

This serves as a demo for testing out endpoints by adding an x402 enabled paywall

<img src="public/og-image.png" alt="x402 Proxy Page"/>
<hr/>

![Next.js](https://img.shields.io/badge/-Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Coinbase](https://img.shields.io/badge/Coinbase-0052FF?style=for-the-badge&logo=Coinbase&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)


A full-stack Next.js application for managing crypto payments and invoices using Coinbase's infrastructure.

## Prerequisites

- Git
- Node.js (v22 or higher)
- Upstash 

## Environment Variables

Create a `.env` file in the root directory and fill in the variables:
```sh
mv .example.env .env
```

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
