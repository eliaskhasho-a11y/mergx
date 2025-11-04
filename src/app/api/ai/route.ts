import { NextResponse } from 'next/server';

// HF: t.ex. "mistralai/Mistral-7B-Instruct-v0.2"
const HF_DEFAULT_MODEL = 'mistralai/Mistral-7B-Instruct-v0.2';

export async function POST(req: Request) {
  try {
    const { provider = 'huggingface', apiKey, model, prompt, customEndpoint } = await req.json();

    if (!apiKey) return NextResponse.json({ error: 'Missing API key' }, { status: 400 });
    if (!prompt || typeof prompt !== 'string') return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });

    if (provider === 'huggingface') {
      const url = `https://api-inference.huggingface.co/models/${encodeURIComponent(model || HF_DEFAULT_MODEL)}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { max_new_tokens: 400, temperature: 0.2, return_full_text: false }
        })
      });
      const data = await res.json();
      if (!res.ok) return NextResponse.json({ error: data?.error || 'AI error' }, { status: res.status });

      // HF kan returnera [{generated_text:"..."}] eller {generated_text:"..."}
      const text = Array.isArray(data) ? (data[0]?.generated_text || data[0]?.text || '') : (data?.generated_text || data?.text || '');
      return NextResponse.json({ text });
    }

    if (provider === 'openai') {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: model || 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2
        })
      });
      const data = await res.json();
      if (!res.ok) return NextResponse.json({ error: data?.error || 'AI error' }, { status: res.status });
      const text = data?.choices?.[0]?.message?.content || '';
      return NextResponse.json({ text });
    }

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
