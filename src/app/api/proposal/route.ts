import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all proposals
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      // Get single proposal
      const proposal = await prisma.proposal.findUnique({
        where: { id: parseInt(id) },
      });

      if (!proposal) {
        return NextResponse.json(
          { error: 'Proposal not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(proposal);
    }

    // Get all proposals
    const proposals = await prisma.proposal.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(proposals);
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}


// POST new proposal
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Map the requirements object to the database fields
    const proposal = await prisma.proposal.create({
      data: {
        // Personal Information
        name: body.name,
        gender: body.gender,
        age: body.age,
        maritalStatus: body.maritalStatus,
        height: body.height,
        disability: body.disability,
        designation: body.designation,
        
        // Education
        qualification: body.qualification,
        university: body.university,
        
        // Religion
        caste: body.caste,
        customCaste: body.customCaste,
        sect: body.sect,
        
        // Property
        propertySize: body.propertySize,
        homeOwnership: body.homeOwnership,
        location: body.location,
        carAvailable: body.carAvailable,
        
        // Family
        fatherOccupation: body.fatherOccupation,
        motherOccupation: body.motherOccupation,
        brothers: body.brothers,
        brothersMarried: body.brothersMarried,
        brothersDetails: body.brothersDetails,
        sisters: body.sisters,
        sistersMarried: body.sistersMarried,
        sistersDetails: body.sistersDetails,
        
        // Address
        address: body.address,
        
        // Requirements (mapped from the requirements object)
        reqAgeLimit: body.requirements.ageLimit,
        reqHeight: body.requirements.height,
        reqCity: body.requirements.city,
        reqCaste: body.requirements.caste,
        reqCustomCaste: body.requirements.customCaste,
        reqQualification: body.requirements.qualification,
      },
    });

    return NextResponse.json(proposal, { status: 201 });
  } catch (error) {
    console.error('Error creating proposal:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT update proposal
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();

    const updatedProposal = await prisma.proposal.update({
      where: { id: parseInt(id) },
      data: {
        // Personal Information
        name: body.name,
        gender: body.gender,
        age: body.age,
        maritalStatus: body.maritalStatus,
        height: body.height,
        disability: body.disability,
        designation: body.designation,
        
        // Education
        qualification: body.qualification,
        university: body.university,
        
        // Religion
        caste: body.caste,
        customCaste: body.customCaste,
        sect: body.sect,
        
        // Property
        propertySize: body.propertySize,
        homeOwnership: body.homeOwnership,
        location: body.location,
        carAvailable: body.carAvailable,
        
        // Family
        fatherOccupation: body.fatherOccupation,
        motherOccupation: body.motherOccupation,
        brothers: body.brothers,
        brothersMarried: body.brothersMarried,
        brothersDetails: body.brothersDetails,
        sisters: body.sisters,
        sistersMarried: body.sistersMarried,
        sistersDetails: body.sistersDetails,
        
        // Address
        address: body.address,
        
        // Requirements
        reqAgeLimit: body.requirements?.ageLimit,
        reqHeight: body.requirements?.height,
        reqCity: body.requirements?.city,
        reqCaste: body.requirements?.caste,
        reqCustomCaste: body.requirements?.customCaste,
        reqQualification: body.requirements?.qualification,
      },
    });

    return NextResponse.json(updatedProposal);
  } catch (error) {
    console.error('Error updating proposal:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE proposal
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await prisma.proposal.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { message: 'Proposal deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting proposal:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}