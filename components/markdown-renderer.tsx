import Link from "next/link"

interface MarkdownRendererProps {
    content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    const lines = content.trim().split("\n")
    const elements: React.ReactNode[] = []
    let i = 0
    let key = 0

    while (i < lines.length) {
        const line = lines[i]

        // Empty line
        if (line.trim() === "") {
            i++
            continue
        }

        // Horizontal rule
        if (line.trim() === "---") {
            elements.push(<hr key={key++} className="my-8 border-slate-200" />)
            i++
            continue
        }

        // Headings
        if (line.startsWith("## ")) {
            elements.push(
                <h2 key={key++} className="text-2xl font-bold text-brand-dark mt-10 mb-4">
                    {renderInline(line.slice(3))}
                </h2>
            )
            i++
            continue
        }

        if (line.startsWith("### ")) {
            elements.push(
                <h3 key={key++} className="text-xl font-semibold text-brand-dark mt-8 mb-3">
                    {renderInline(line.slice(4))}
                </h3>
            )
            i++
            continue
        }

        // Table
        if (line.includes("|") && line.trim().startsWith("|")) {
            const tableLines: string[] = []
            while (i < lines.length && lines[i].trim().startsWith("|")) {
                tableLines.push(lines[i])
                i++
            }

            if (tableLines.length >= 2) {
                const headers = tableLines[0].split("|").filter(c => c.trim()).map(c => c.trim())
                const rows = tableLines.slice(2).map(row =>
                    row.split("|").filter(c => c.trim()).map(c => c.trim())
                )

                elements.push(
                    <div key={key++} className="overflow-x-auto my-6">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr>
                                    {headers.map((header, idx) => (
                                        <th key={idx} className="text-left py-2.5 px-3 bg-slate-50 border-b-2 border-slate-200 font-semibold text-brand-dark text-xs">
                                            {renderInline(header)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, rIdx) => (
                                    <tr key={rIdx} className="border-b border-slate-100">
                                        {row.map((cell, cIdx) => (
                                            <td key={cIdx} className="py-2 px-3 text-slate-600 text-xs">
                                                {renderInline(cell)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
                continue
            }
        }

        // Unordered list
        if (line.trimStart().startsWith("- ")) {
            const items: string[] = []
            while (i < lines.length && lines[i].trimStart().startsWith("- ")) {
                items.push(lines[i].trimStart().slice(2))
                i++
            }
            elements.push(
                <ul key={key++} className="space-y-2 my-4 pl-1">
                    {items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 leading-relaxed">
                            <span className="text-brand-primary mt-0.5 shrink-0">•</span>
                            <span>{renderInline(item)}</span>
                        </li>
                    ))}
                </ul>
            )
            continue
        }

        // Ordered list
        if (/^\d+\.\s/.test(line.trimStart())) {
            const items: string[] = []
            while (i < lines.length && /^\d+\.\s/.test(lines[i].trimStart())) {
                items.push(lines[i].trimStart().replace(/^\d+\.\s/, ""))
                i++
            }
            elements.push(
                <ol key={key++} className="space-y-2 my-4 pl-1">
                    {items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                            <span className="w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                            </span>
                            <span>{renderInline(item)}</span>
                        </li>
                    ))}
                </ol>
            )
            continue
        }

        // Paragraph
        elements.push(
            <p key={key++} className="text-base text-slate-700 leading-relaxed my-4">
                {renderInline(line)}
            </p>
        )
        i++
    }

    return <div className="prose-custom">{elements}</div>
}

function renderInline(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = []
    let remaining = text
    let idx = 0

    while (remaining.length > 0) {
        // Bold + italic
        const boldItalicMatch = remaining.match(/^\*\*\*(.*?)\*\*\*/)
        if (boldItalicMatch) {
            parts.push(<strong key={idx++} className="font-bold italic text-brand-dark">{boldItalicMatch[1]}</strong>)
            remaining = remaining.slice(boldItalicMatch[0].length)
            continue
        }

        // Bold
        const boldMatch = remaining.match(/^\*\*(.*?)\*\*/)
        if (boldMatch) {
            parts.push(<strong key={idx++} className="font-semibold text-brand-dark">{boldMatch[1]}</strong>)
            remaining = remaining.slice(boldMatch[0].length)
            continue
        }

        // Italic
        const italicMatch = remaining.match(/^\*(.*?)\*/)
        if (italicMatch) {
            parts.push(<em key={idx++} className="italic text-slate-600">{italicMatch[1]}</em>)
            remaining = remaining.slice(italicMatch[0].length)
            continue
        }

        // Link
        const linkMatch = remaining.match(/^\[(.*?)\]\((.*?)\)/)
        if (linkMatch) {
            const href = linkMatch[2]
            const isInternal = href.startsWith("/")
            if (isInternal) {
                parts.push(
                    <Link key={idx++} href={href} className="text-brand-primary font-medium hover:text-sky-600 underline underline-offset-2 transition-colors">
                        {linkMatch[1]}
                    </Link>
                )
            } else {
                parts.push(
                    <a key={idx++} href={href} target="_blank" rel="noopener noreferrer" className="text-brand-primary font-medium hover:text-sky-600 underline underline-offset-2 transition-colors">
                        {linkMatch[1]}
                    </a>
                )
            }
            remaining = remaining.slice(linkMatch[0].length)
            continue
        }

        // Inline code
        const codeMatch = remaining.match(/^`(.*?)`/)
        if (codeMatch) {
            parts.push(
                <code key={idx++} className="bg-slate-100 text-brand-dark px-1.5 py-0.5 rounded text-sm font-mono">
                    {codeMatch[1]}
                </code>
            )
            remaining = remaining.slice(codeMatch[0].length)
            continue
        }

        // Plain text — find next special character
        const nextSpecial = remaining.search(/[\*\[\`]/)
        if (nextSpecial === -1) {
            parts.push(remaining)
            break
        } else if (nextSpecial === 0) {
            // The special char didn't match a pattern, treat as text
            parts.push(remaining[0])
            remaining = remaining.slice(1)
        } else {
            parts.push(remaining.slice(0, nextSpecial))
            remaining = remaining.slice(nextSpecial)
        }
    }

    return parts
}
