import { IEventType } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

const EventCard = ({
  title,
  image,
  slug,
  location,
  date,
  time,
}: IEventType) => {
  return (
    <Link href={`/events/${slug}`} className="event-card">
      <Image
        src={image}
        alt={title}
        width={410}
        height={300}
        className="poster"
      />
      <div className="flex flex-row gap-2">
        <Image
          src="/icons/pin.svg"
          alt="Location Icon"
          width={14}
          height={14}
        />
        <p>{location}</p>
      </div>
      <p className="title"> {title}</p>
      <div className="datetime">
        <div className='flex gap-2'>
          <Image
            src="/icons/calendar.svg"
            alt="Date Icon"
            width={14}
            height={14}
          />
          <p>{date}</p>
        </div>
        <div className='flex gap-2'>
          <Image
            src="/icons/clock.svg"
            alt="Time Icon"
            width={14}
            height={14}
          />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
