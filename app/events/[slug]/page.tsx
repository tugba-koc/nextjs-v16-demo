import { cacheLife } from 'next/cache';
import { notFound } from 'next/navigation';

const EventDetailsCard = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  ('use cache');
  cacheLife('hours');
  const request = await fetch(`http://localhost:3000/api/events/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  const data = await request.json();

  if (!data) return notFound();

  return <div>{slug}</div>;
};

export default EventDetailsCard;
