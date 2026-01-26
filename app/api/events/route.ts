import Event from '@/database/event.model';
import connectDB from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json(
        {
          message: 'Invalid json data format',
        },
        { status: 400 },
      );
    }

    const createdEvent = await Event.create(event);

    return NextResponse.json(
      {
        message: 'Event created successfully',
        event: createdEvent,
      },
      { status: 201 },
    );
  } catch (e) {
    console.error('Error parsing JSON:', e);
    return NextResponse.json(
      {
        message: 'Invalid JSON',
        error: e instanceof Error ? e.message : 'Unknown error',
      },
      { status: 400 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        message: 'Events retrieved successfully',
        events,
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: 'Error retrieving events',
        error: e instanceof Error ? e.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
