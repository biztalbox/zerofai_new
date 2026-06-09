import { NextResponse } from "next/server";

const CONTACT_API_URL =
  process.env.ZEROFAI_CONTACT_API_URL ??
  "https://api.zerofai.ai/website/api/v1/contact/us/";

type ContactPayload = {
  name: string;
  email: string;
  phone_number: string;
  message: string;
  company_name: string;
};

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const data = body as Record<string, unknown>;
  return (
    typeof data.name === "string" &&
    typeof data.email === "string" &&
    typeof data.phone_number === "string" &&
    typeof data.message === "string" &&
    typeof data.company_name === "string"
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.ZEROFAI_CONTACT_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Contact service is not configured." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Missing or invalid fields." }, { status: 400 });
  }

  const payload: ContactPayload = {
    name: body.name.trim(),
    email: body.email.trim(),
    phone_number: body.phone_number.trim(),
    message: body.message.trim(),
    company_name: body.company_name.trim(),
  };

  if (!payload.name || !payload.email || !payload.phone_number || !payload.company_name) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  try {
    const response = await fetch(CONTACT_API_URL, {
      method: "POST",
      headers: {
        "Authentication-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    let responseData: unknown = null;
    if (responseText) {
      try {
        responseData = JSON.parse(responseText);
      } catch {
        responseData = { detail: responseText };
      }
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to submit contact form.", details: responseData },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data: responseData });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach contact service. Please try again later." },
      { status: 502 }
    );
  }
}
