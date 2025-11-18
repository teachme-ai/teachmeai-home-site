export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  if (!items || items.length === 0) return null
  
  try {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    }

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    )
  } catch (error) {
    console.error('Error generating breadcrumb schema:', error)
    return null
  }
}