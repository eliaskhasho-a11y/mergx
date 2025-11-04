
import { NextResponse } from 'next/server';
export async function GET(){ return NextResponse.json({ orders:[{id:'ord_123', total:12500}]}); }
