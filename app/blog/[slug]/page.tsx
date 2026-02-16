import { getAllPosts, getPostBySlug } from "@/content/blog-posts"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export async function generateStaticParams() {
    const posts = getAllPosts()
    return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const post = getPostBySlug(slug)
    if (!post) return { title: "Post Not Found" }

    return {
        title: `${post.title} | teachmeai Blog`,
        description: post.excerpt,
        keywords: post.keywords,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://teachmeai.in/blog/${post.slug}`,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
        },
    }
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    const allPosts = getAllPosts().filter(p => p.slug !== slug).slice(0, 2)

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: {
            "@type": "Person",
            name: post.author,
            url: "https://teachmeai.in/about",
        },
        publisher: {
            "@type": "Organization",
            name: "teachmeai",
            url: "https://teachmeai.in",
        },
        mainEntityOfPage: `https://teachmeai.in/blog/${post.slug}`,
        keywords: post.keywords.join(", "),
    }

    return (
        <main>
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://teachmeai.in/" },
                    { name: "Blog", url: "https://teachmeai.in/blog" },
                    { name: post.title, url: `https://teachmeai.in/blog/${post.slug}` }
                ]}
            />
            <Navbar />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="min-h-screen bg-white">
                {/* Article header */}
                <div className="bg-gradient-to-br from-brand-primary/10 via-white to-brand-primary/5 py-16">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/blog" className="text-sm text-brand-primary hover:text-sky-600 transition-colors mb-6 inline-block">
                            ← All articles
                        </Link>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-semibold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full">
                                {post.category}
                            </span>
                            <span className="text-xs text-slate-400">{post.readingTime}</span>
                            <span className="text-xs text-slate-400">
                                {new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-brand-dark leading-tight mb-4">
                            {post.title}
                        </h1>
                        <p className="text-lg text-slate-600">
                            {post.excerpt}
                        </p>
                        <div className="flex items-center gap-3 mt-6">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-sky-500 flex items-center justify-center text-white font-bold text-sm">
                                K
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-brand-dark">{post.author}</p>
                                <p className="text-xs text-slate-500">AI Coach & Founder, teachmeai</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Article body */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <MarkdownRenderer content={post.content} />
                </div>

                {/* Author CTA */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="bg-gradient-to-br from-brand-primary/5 to-sky-50 rounded-2xl border border-brand-primary/20 p-6 md:p-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-sky-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                K
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-brand-dark mb-1">About the author</h3>
                                <p className="text-sm text-slate-600 mb-4">
                                    Khalid Irfan is the founder of teachmeai, with 19+ years in IT and 7+ years in academia. He helps professionals, educators, and entrepreneurs adopt AI with clarity, confidence, and measurable impact.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        href="/ai-diagnostic"
                                        className="inline-block bg-gradient-to-r from-brand-primary to-sky-500 hover:from-sky-600 hover:to-brand-primary text-white font-semibold py-2 px-5 rounded-lg text-sm transition-all duration-150"
                                    >
                                        Free AI Diagnostic
                                    </Link>
                                    <Link
                                        href="/programs/clarity-call"
                                        className="inline-block border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold py-2 px-5 rounded-lg text-sm transition-all duration-150"
                                    >
                                        Book a Clarity Call
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related posts */}
                {allPosts.length > 0 && (
                    <div className="bg-slate-50 py-12">
                        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-xl font-bold text-brand-dark mb-6">Continue reading</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {allPosts.map(relatedPost => (
                                    <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group">
                                        <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-brand-primary/40 hover:shadow-md transition-all duration-200 h-full">
                                            <span className="text-xs font-semibold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">
                                                {relatedPost.category}
                                            </span>
                                            <h3 className="text-base font-semibold text-brand-dark mt-2 mb-1 group-hover:text-brand-primary transition-colors">
                                                {relatedPost.title}
                                            </h3>
                                            <p className="text-xs text-slate-500">{relatedPost.readingTime}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    )
}
