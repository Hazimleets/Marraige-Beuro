import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // ✅ fix the import if it's a named export

// GET single proposal
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const proposal = await prisma.proposal.findUnique({
      where: { id: params.id },
    });
    if (!proposal) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }
    return NextResponse.json(proposal);
  } catch (error) {
    console.error('GET proposal error:', error); // ✅ use the error
    return NextResponse.json({ error: 'Error fetching proposal' }, { status: 500 });
  }
}

// PUT (update) proposal
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const proposal = await prisma.proposal.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(proposal);
  } catch (error) {
    console.error('PUT proposal error:', error); // ✅ use the error
    return NextResponse.json({ error: 'Error updating proposal' }, { status: 500 });
  }
}

// DELETE proposal
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.proposal.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Proposal deleted successfully' });
  } catch (error) {
    console.error('DELETE proposal error:', error); // ✅ use the error
    return NextResponse.json({ error: 'Error deleting proposal' }, { status: 500 });
  }
}
