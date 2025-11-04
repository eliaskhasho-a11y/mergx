
import { NextResponse } from 'next/server';
export async function POST(){ return NextResponse.json({ trackingNumber:'PN123456789SE', labelUrl:'/api/shipping/label/PN123456789SE', status:'Booked' }); }
