import { NextResponse } from "next/server";
import { addConsignment } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name || "").trim();
    const phone = String(body?.phone || "").trim();
    const brand = String(body?.brand || "").trim();
    const model = String(body?.model || "").trim();
    const year = String(body?.year || "").trim();
    const condition = String(body?.condition || "").trim();
    const notes = String(body?.notes || "").trim();

    if (name.length < 2 || phone.length < 6 || !brand || !model) {
      return NextResponse.json(
        { ok: false, error: "Name, phone, brand and model are required." },
        { status: 400 }
      );
    }

    const entry = addConsignment({
      name: name.slice(0, 60),
      phone: phone.slice(0, 24),
      brand: brand.slice(0, 40),
      model: model.slice(0, 80),
      year: year.slice(0, 12),
      condition: condition.slice(0, 40),
      notes: notes.slice(0, 500),
    });

    return NextResponse.json({
      ok: true,
      id: entry.id,
      message:
        "Thank you! Our watchmaker will call you within 24 hours (IST) to evaluate your piece.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not submit. Try again." },
      { status: 500 }
    );
  }
}
