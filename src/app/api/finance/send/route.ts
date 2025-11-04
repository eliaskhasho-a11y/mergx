
import { NextResponse } from 'next/server';
export async function POST(){ return NextResponse.json({ status:'sent', offerLink:'https://financier.example/offer/abc' }); }
