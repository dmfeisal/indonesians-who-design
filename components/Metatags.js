const SITE_URL = "https://indonesianswhodesign.dae.ng";

export default function MetaTags() {
  const description =
    "A repository to celebrate the work of talented Indonesian designers and showcase it to the world.";

  return (
    <>
      <meta name="viewport" content="width=device-width,initial-scale=1" />

      <meta name="title" content="Indonesians Who Design" />
      <meta name="description" content={description} />
      <link rel="canonical" href={SITE_URL} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content="Indonesians Who Design" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${SITE_URL}/img/preview.png`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={SITE_URL} />
      <meta name="twitter:title" content="Indonesians Who Design" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}/img/preview.png`} />

      <meta name="theme-color" content="#D11149" />
    </>
  );
}
