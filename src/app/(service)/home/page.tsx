'use client';
import { format } from 'date-fns';

import { caclulateTimeDifference, dateToFormatString } from '@/utils/date';
import { fetcher } from '@/utils/swrFetcher';
import useSWR from 'swr';
import { Schedule } from '@/types';
import RecentCard from '../ui/RecentCard';
import Card from '../ui/Card';

export default function Page() {
  const { data: schedules } = useSWR<Schedule[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/schedules`,
    fetcher
  );

  const recentSchedule = schedules?.sort(
    (a, b) =>
      new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
  )[0];

  const record: Record<string, Schedule[]> = {};

  schedules?.slice(1)?.forEach((schedule) => {
    const date = format(new Date(schedule.departureTime), 'yyyy-MM-dd');
    if (record[date]) {
      record[date].push(schedule);
    } else {
      record[date] = [schedule];
    }
  });

  return (
    <div className='relative flex w-full flex-col justify-start items-center'>
      {recentSchedule && (
        <div className='flex flex-col w-full justify-between items-center'>
          <h3 className='text-xl w-full flex items-center'>
            출발예정시간이&nbsp;
            <span className='text-primary-main font-bold'>
              {caclulateTimeDifference(
                new Date(recentSchedule.departureTime),
                new Date()
              )}
            </span>
            &nbsp;남았어요!
          </h3>
          <div className='w-full mt-4'>
            {recentSchedule && <RecentCard schedule={recentSchedule} />}
          </div>
        </div>
      )}

      <div className='mt-4 flex w-full flex-col justify-start items-center space-y-6'>
        {Object.keys(record).map((date) => (
          <div key={date} className='flex flex-col w-full space-y-4'>
            <p className='text-sm text-left font-bold w-full'>
              {dateToFormatString(new Date(date))}
            </p>
            <div className='flex flex-col w-full space-y-4'>
              {record[date].map((schedule) => (
                <Card key={schedule.commonScheduleId} schedule={schedule} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
