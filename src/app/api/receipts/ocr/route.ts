
import { NextResponse } from 'next/server';
export async function POST(){ return NextResponse.json({ ocr:{date:'2025-11-03', supplier:'Circle K', amount:452.00, vat:90.40, currency:'SEK', confidence:0.97}, suggestion:{ account:'5611 Drivmedel', costCenter:'FIELD-SALES' } }); }
