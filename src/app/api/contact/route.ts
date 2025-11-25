import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (!process.env.WEB3FORMS_API_KEY) {
        return NextResponse.json({ error: 'Configuration Error' }, { status: 500 });
    }

    // Web3Forms API
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_API_KEY,
        name,
        email,
        message,
        subject: `You Got a Message from Portfolio: ${name}`,
      }),
    });

    const responseText = await response.text();

    let result;
    try {
        result = JSON.parse(responseText);
    } catch (e) {
        throw new Error(`Web3Forms returned non-JSON response`);
    }

    if (!result.success) {
      throw new Error(result.message || 'Web3Forms failed');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
