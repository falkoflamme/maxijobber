import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.maxijobber.de'

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/profis`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/mitmachen`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/fuer-profis`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/fuer-unternehmen`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/legal/minijob-guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/impressum`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/datenschutz`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/agb`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ]
}
