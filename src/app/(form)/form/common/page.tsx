'use client';

import Button from '@/components/common/Button';
import Spinner from '@/components/common/Spinner';
import { Schedule } from '@/types';
import { dateToFormatString } from '@/utils/date';
import { fetcher } from '@/utils/swrFetcher';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { isLoading, data } = useSWR<Partial<Schedule>>(
    () =>
      id &&
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/schedules/common?id=${id}`,
    fetcher
  );
  const router = useRouter();

  if (isLoading)
    return (
      <div className='w-full flex justify-center items-center mt-16'>
        <Spinner />
      </div>
    );

  const handleShareLink = () => {
    navigator.clipboard.writeText(`nemo-pied.vercel.app/form/new?id=${id}`);
  };

  return (
    <div className='relativ flex w-full flex-col justify-start items-center'>
      <div className='mt-4'>
        <svg
          width='106'
          height='106'
          viewBox='0 0 106 106'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <g filter='url(#filter0_d_84_2570)'>
            <circle cx='53' cy='49' r='33' fill='black' />
          </g>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M70.8413 36.1751C71.8492 37.1496 71.8763 38.7566 70.9018 39.7645L50.449 60.9183C49.9707 61.413 49.3121 61.6923 48.624 61.6923C47.936 61.6923 47.2774 61.413 46.7991 60.9183L35.9442 49.6914C34.9697 48.6835 34.9968 47.0765 36.0047 46.102C37.0126 45.1275 38.6196 45.1546 39.5941 46.1625L48.624 55.5019L67.2519 36.2355C68.2264 35.2277 69.8335 35.2006 70.8413 36.1751Z'
            fill='white'
          />
          <defs>
            <filter
              id='filter0_d_84_2570'
              x='0'
              y='0'
              width='106'
              height='106'
              filterUnits='userSpaceOnUse'
              color-interpolation-filters='sRGB'>
              <feFlood flood-opacity='0' result='BackgroundImageFix' />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dy='4' />
              <feGaussianBlur stdDeviation='10' />
              <feComposite in2='hardAlpha' operator='out' />
              <feColorMatrix
                type='matrix'
                values='0 0 0 0 0.286275 0 0 0 0 0.333333 0 0 0 0 0.396078 0 0 0 0.2 0'
              />
              <feBlend
                mode='normal'
                in2='BackgroundImageFix'
                result='effect1_dropShadow_84_2570'
              />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='effect1_dropShadow_84_2570'
                result='shape'
              />
            </filter>
          </defs>
        </svg>
      </div>
      <h2 className='text-center w-full mt-1 font-medium'>일정 등록 완료</h2>
      <div className='mt-5 bg-background-white w-full px-7 pt-5 pb-8 rounded-2xl'>
        <h2 className='font-bold w-full flex text-lg justify-center items-center'>
          {data?.name}
        </h2>
        <div className='flex w-full mt-4 space-y-4 flex-col justify-between items-center'>
          <div className='w-full'>
            <h3 className='text-primary-main font-semibold text-sm'>
              약속 장소
            </h3>
            <p className='text-gray-02 mt-1'>{data?.destinationName}</p>
          </div>
          <div className='w-full'>
            <h3 className='text-primary-main font-semibold text-sm'>
              날짜와 시간
            </h3>
            <p className='text-gray-02 mt-1'>
              {data?.arrivalTime &&
                dateToFormatString(new Date(data?.arrivalTime))}
            </p>
          </div>
          {data?.memo && (
            <div className='w-full'>
              <h3 className='text-primary-main font-semibold text-sm'>
                일정 메모
              </h3>
              <p className='text-gray-02 mt-1'>{data?.memo}</p>
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col fixed max-w-xl bottom-0 justify-between px-4 pb-6 space-y-3 w-full'>
        <Button onClick={handleShareLink} variant='outline'>
          친구들에게 공유하기
        </Button>
        <Button onClick={() => router.push('/home')}>메인으로 돌아가기</Button>
      </div>
    </div>
  );
}
