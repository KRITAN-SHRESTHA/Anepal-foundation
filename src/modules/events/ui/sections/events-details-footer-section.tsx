import { formatDateByCountry } from '@/lib/date-format';
import { Events } from '@/sanity/types';
import React from 'react';

export default function EventsDetailsFooterSection({ data }: { data: Events }) {
  return (
    <div className="xs:grid-cols-2 mt-13 grid grid-cols-1 gap-7 md:grid-cols-3">
      <div className="bg-[#32C876] p-7 text-white">
        <h4 className="text-xl font-bold">Details</h4>
        <p className="mt-4">
          <b>Start:</b> {formatDateByCountry(data.event_time?.start as string)}
        </p>
        <p>
          <b>Finish:</b> {formatDateByCountry(data.event_time?.end as string)}
        </p>
      </div>
      <div className="bg-[#F76588] p-7 text-white">
        <h4 className="text-xl font-bold">Organizer</h4>
        <p className="mt-4">
          <b>Phone:</b> {data.organizer_info?.phone}
        </p>
        <p>
          <b>Email:</b> {data.organizer_info?.email}
        </p>
      </div>
      <div className="bg-[#49C2DF] p-7 text-white">
        <h4 className="text-xl font-bold">Venue</h4>
        <p className="mt-4">
          <b>Location:</b> {data.venue?.location}
        </p>
      </div>
    </div>
  );
}
