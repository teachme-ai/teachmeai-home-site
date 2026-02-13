import { getAllPosts } from "@/content/blog-posts"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Blog — AI Coaching Insights & Frameworks | teachmeai",
    description: "Practical guides on AI coaching, career development with AI, and proven frameworks for AI adoption. Actionable insights from 19+ years of IT experience.",
    openGraph: {
        title: "Blog — AI Coaching Insights & Frameworks | teachmeai",
        description: "Practical guides on AI coaching, career development with AI, and proven frameworks for AI adoption.",
        url: "https://teachmeai.in/blog",
        type: "website",
        images: [{ url: '/images/og/blog.png', width: 1200, height: 630, alt: 'teachmeai Blog' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog — AI Coaching Insights & Frameworks | teachmeai',
        description: 'Practical guides on AI coaching, career development with AI, and proven frameworks for AI adoption.',
        images: ['/images/og/blog.png'],
    },
}

export default function BlogPage() {
    const posts = getAllPosts()

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "teachmeai Blog",
        description: "Practical guides on AI coaching, career development, and proven frameworks for AI adoption.",
        url: "https://teachmeai.in/blog",
        publisher: {
            "@type": "Organization",
            name: "teachmeai",
            url: "https://teachmeai.in",
        },
        blogPost: posts.map(post => ({
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { "@type": "Person", name: post.author },
            url: `https://teachmeai.in/blog/${post.slug}`,
        })),
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="bg-gradient-to-br from-brand-primary/10 via-white to-brand-primary/5 py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/" className="text-sm text-brand-primary hover:text-sky-600 transition-colors mb-6 inline-block">
                            ← Back to home
                        </Link>
                        <p className="text-xs font-semibold tracking-wide uppercase text-slate-500 mb-3">
                            teachmeai Blog
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
                            Insights & Frameworks
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl">
                            Practical guides on AI coaching, career development, and proven methodologies. No hype — just actionable intelligence.
                        </p>
                    </div>
                </div>

                {/* Posts grid */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="space-y-8">
                        {posts.map((post, index) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                                <article className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 hover:border-brand-primary/40 hover:shadow-lg hover:shadow-brand-primary/5 transition-all duration-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-xs font-semibold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full">
                                            {post.category}
                                        </span>
                                        <span className="text-xs text-slate-400">{post.readingTime}</span>
                                        <span className="text-xs text-slate-400">
                                            {new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
                                        </span>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-brand-primary font-semibold">
                                        Read article
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* CTA at bottom */}
                <div className="bg-slate-50 py-12">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-2xl font-bold text-brand-dark mb-3">
                            Ready to put these insights into practice?
                        </h2>
                        <p className="text-sm text-slate-600 mb-6 max-w-xl mx-auto">
                            Take the free AI Skills Diagnostic and get a personalized roadmap in 2 minutes.
                        </p>
                        <Link
                            href="/ai-diagnostic"
                            className="inline-block bg-gradient-to-r from-brand-primary to-sky-500 hover:from-sky-600 hover:to-brand-primary text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-150"
                        >
                            Start Free AI Diagnostic
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
