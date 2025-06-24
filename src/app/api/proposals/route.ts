import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // ✅ Use named import

// GET all proposals
export async function GET() {
  try {
    const proposals = await prisma.proposal.findMany();
    return NextResponse.json(proposals);
  } catch (error) {
    console.error(error); // ✅ use the error
    return NextResponse.json({ error: 'Error fetching proposals' }, { status: 500 });
  }
}

// POST new proposal
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const proposal = await prisma.proposal.create({
      data: body,
    });
    return NextResponse.json(proposal);
  } catch (error) {
    console.error(error); // ✅ use the error
    return NextResponse.json({ error: 'Error creating proposal' }, { status: 500 });
  }
}
