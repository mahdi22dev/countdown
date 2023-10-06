export default function sitemap() {
  return [
    {
      url: "https://countdown-phi-seven.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://countdown-phi-seven.vercel.app/movies",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
