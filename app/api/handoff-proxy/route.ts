
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // FORCE Cloud Run (Bypassing Vercel WAF entirely)
        // We hardcode this because environment variables on Vercel are likely still pointing to the blocked URL
        const INTAKE_API = 'https://teachmeai-agent-service-584680412286.us-central1.run.app/handoff';

        console.log(`📡 [Handoff Proxy] CRITICAL: Calling Cloud Run at ${INTAKE_API}`);

        const response = await fetch(INTAKE_API, {
            // ... (headers and body)
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': req.headers.get('user-agent') || 'Mozilla/5.0',
                'Accept': req.headers.get('accept') || '*/*',
                'Accept-Language': req.headers.get('accept-language') || '',
                'sec-ch-ua': req.headers.get('sec-ch-ua') || '',
                'sec-ch-ua-mobile': req.headers.get('sec-ch-ua-mobile') || '',
                'sec-ch-ua-platform': req.headers.get('sec-ch-ua-platform') || '',
                'x-forwarded-for': req.headers.get('x-forwarded-for') || '',
                'referer': req.headers.get('referer') || '',
                'cookie': req.headers.get('cookie') || '',
                'x-vercel-protection-bypass': req.headers.get('x-vercel-protection-bypass') || '',
            },
            body: JSON.stringify(body),
        });

        const contentType = response.headers.get('content-type') || '';
        console.log(`📡 [Handoff Proxy] Status: ${response.status}, Content-Type: ${contentType}`);

        // 2. Treat HTML as a hard failure (Vercel Checkpoint)
        if (contentType.includes('text/html')) {
            console.error('❌ [Handoff Proxy] Blocked by Vercel Security Checkpoint');
            return NextResponse.json(
                { status: 'error', message: 'Handoff blocked by security wall' },
                { status: 502 } // Bad Gateway
            );
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ [Handoff Proxy] Upstream Error:', errorText);
            return NextResponse.json({ status: 'error', message: 'Handoff failed' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('❌ [Handoff Proxy] Error:', error);
        return NextResponse.json(
            { status: 'error', message: 'Internal Proxy Error' },
            { status: 500 }
        );
    }
}
