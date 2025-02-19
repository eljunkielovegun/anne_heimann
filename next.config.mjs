/** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


  /** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false, // This is the React 18.3 fallback
  }
}

export default nextConfig