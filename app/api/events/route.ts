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
