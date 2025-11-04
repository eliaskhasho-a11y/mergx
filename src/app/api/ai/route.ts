import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { provider = 'openai', apiKey, model = 'gpt-4o-mini', prompt, customEndpoint } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: 'Missing API key' }, { status: 400 });
    }
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }

    if (provider === 'openai') {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2
        })
      });
      const data = await res.json();
      if (!res.ok) return NextResponse.json({ error: data?.error || 'AI error' }, { status: res.status });
      const text = data?.choices?.[0]?.message?.content || '';
      return NextResponse.json({ text });
    }

    // GENERISK “custom” endpoint (om du vill peka mot en proxy/annan leverantör)
    if (customEndpoint) {
      const res = await fetch(customEndpoint, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, prompt })
      });
      const data = await res.json();
      if (!res.ok) return NextResponse.json({ error: data?.error || 'AI error' }, { status: res.status });
      return NextResponse.json({ text: data?.text || JSON.stringify(data) });
    }

    return NextResponse.json({ error: 'Unknown provider' }, { status: 400 });
  } catch (e:any) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
