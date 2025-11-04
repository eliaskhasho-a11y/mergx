
import { NextResponse } from 'next/server';
export async function POST(){ return NextResponse.json({ status:'draft-created', invoiceId:'inv_001', pdfUrl:'/api/invoices/pdf/inv_001' }); }
