import { format } from 'date-fns';

import { caclulateTimeDifference, dateToFormatString } from '@/utils/date';
import { Schedule } from '@/types';
import { Suspense } from 'react';
import Spinner from '@/components/common/Spinner';
import Card from '../ui/Card';
import RecentCard from '../ui/RecentCard';

export default async function Page() {
  const record = await getSchedulesMap();
  const recentSchedule = await getRecentSchedule();
  return (
    <Suspense
      fallback={
        <div className='w-full flex justify-center items-center'>
          <Spinner />
        </div>
      }>
      <div className='relative flex w-full flex-col justify-start items-center'>
        <div className='flex flex-col w-full justify-between items-center'>
          <h3 className='text-xl w-full flex items-center'>
            출발예정시간이&nbsp;
            <span className='text-primary-main font-bold'>
              {caclulateTimeDifference(
                new Date(recentSchedule.departureTime),
                new Date(recentSchedule.arrivalTime)
              )}
            </span>
            &nbsp;남았어요!
          </h3>
          <div className='w-full mt-4'>
            {recentSchedule && <RecentCard schedule={recentSchedule} />}
          </div>
        </div>
        <div className='mt-4 flex w-full flex-col justify-start items-center space-y-6'>
          {Object.keys(record).map((date) => (
            <div key={date} className='flex flex-col w-full'>
              <p className='text-sm text-left font-bold w-full'>
                {dateToFormatString(new Date(date))}
              </p>
              <div className='flex flex-col w-full mt-2 space-y-4'>
                {record[date].map((schedule) => (
                  <Card key={schedule.departureTime} schedule={schedule} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
}

async function getSchedulesMap(): Promise<Record<string, Schedule[]>> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/schedules`
  );
  const schedules: Schedule[] = await res.json();
  schedules.sort(
    (a, b) =>
      new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
  );
  const record: Record<string, Schedule[]> = {};
  schedules?.slice(1)?.forEach((schedule) => {
    const date = format(new Date(schedule.departureTime), 'yyyy-MM-dd');
    if (record[date]) {
      record[date].push(schedule);
    } else {
      record[date] = [schedule];
    }
  });

  return record;
}

async function getRecentSchedule(): Promise<Schedule> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/schedules`,
    { next: { revalidate: 3600 } }
  );
  const schedules: Schedule[] = await res.json();
  const recentSchedule = schedules?.sort(
    (a, b) =>
      new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
  )[0];

  return recentSchedule;
}
