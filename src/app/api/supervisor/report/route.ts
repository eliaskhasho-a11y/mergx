
import { NextResponse } from 'next/server';
export async function GET(){ return NextResponse.json({ alert:'DSO over threshold', value:39, recommendation:'Send reminder + 2% cash discount'}); }
