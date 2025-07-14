import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backendv1.monsbah.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "monsbah-s3-shared-bucket.s3.me-south-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "monsbah-s3-shared-bucket.s3.me-south-1.amazonaws.com",
        pathname: "/uploads/products2/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
