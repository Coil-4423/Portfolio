import "./globals.css";

export const metadata = {
  title: "Takehito Sumimura | Web Developer Portfolio",
  description:
    "Explore the portfolio of Takehito Sumimura, a web developer specializing in React, TypeScript, and front-end technologies.",
  keywords:
    "Takehito Sumimura, web developer, React, TypeScript, portfolio, front-end development, JavaScript, developer portfolio, modern web design",
  icon: "/take.png", // Directly pass the icon path as a string
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Meta Title and Description */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* Meta Keywords for SEO */}
        <meta name="keywords" content={metadata.keywords} />

        {/* Favicon*/}
        <link rel="icon" href={metadata.icon} type="image/svg+xml" />
        <meta name="theme-color" content="#130f8a" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.icon} />
        <meta property="og:url" content="https://sumitake.ca" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.icon} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
