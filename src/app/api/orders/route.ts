
import { NextResponse } from 'next/server';
export async function GET(){ return NextResponse.json({ orders:[{id:'ord_123', customer:'Elon Kista', total:12450}]}); }
