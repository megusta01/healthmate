/** @type {import('next').NextConfig} */
const API_URL = process.env.API_URL ?? 'http://localhost:3333'

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  /**
   * O navegador fala só com o próprio front (/api/...), e o Next repassa para a API.
   * Assim os cookies de sessão são "first-party" (funcionam em qualquer navegador)
   * e não há problema de CORS.
   */
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${API_URL}/api/:path*` }]
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ]
  },
}

export default nextConfig
