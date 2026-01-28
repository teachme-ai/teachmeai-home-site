
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Forward to Intake App
        const INTAKE_API = process.env.INTAKE_API_URL || 'http://localhost:3001/api/handoff';

        const response = await fetch(INTAKE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': req.headers.get('user-agent') || 'Mozilla/5.0',
                'x-forwarded-for': req.headers.get('x-forwarded-for') || '',
                'referer': req.headers.get('referer') || '',
                // Forward original client IP and agent info
            },
            body: JSON.stringify(body),
        });

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
