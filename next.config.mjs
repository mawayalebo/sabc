/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['admango.cdn.mangomolo.com'],
        remotePatterns: [
            {
              protocol: 'https', 
              hostname: 'admango.cdn.mangomolo.com', 
              port: '', 
              pathname: '/images/*', 
            },
        ]
    },
};

export default nextConfig;
