'use client';
import useSWR from 'swr';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import Spinner from '@/components/common/Spinner';
import Link from 'next/link';
const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_URL}`,
      },
    })
    .then((res) => res.data);
export default function Page() {
  const searchParams = useSearchParams();

  const longitude = searchParams.get('longitude');
  const latitude = searchParams.get('latitude');
  const originName = searchParams.get('originName');
  const origin = searchParams.get('origin');

  const router = useRouter();

  const [query, setQuery] = useState('');

  const debouceQuery = useDebounce(query, 1000);

  const { data, isLoading } = useSWR(
    () =>
      debouceQuery &&
      `https://dapi.kakao.com/v2/local/search/keyword.json?x=${longitude}&y=${latitude}&query=${debouceQuery}`,
    fetcher
  );

  const { documents } = data || {};

  return (
    <div className='relative flex flex-col justify-start items-center w-full mx-auto'>
      <header className='z-10 flex text-lg fixed max-w-xl top-0 p-4 font-semibold items-center bg-black justify-between w-full'>
        <div className='relative w-full'>
          <div
            onClick={() => setQuery('')}
            className='absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <circle cx='12' cy='12' r='12' fill='#D2D2D2' />
              <path
                d='M18 6L6 18M6 6L18 18'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder='도착지를 입력하세요'
            className='focus:border-none focus:outline-none bg-white font-normal flex justify-start items-center w-full h-12 text-gray-900 rounded-xl text-gray-02 pl-4 pr-16'
          />
        </div>
      </header>
      <div className='flex w-full flex-col justify-start items-center mt-8'>
        {isLoading ? (
          <div className='w-full mt-4'>
            <Spinner />
          </div>
        ) : (
          <ul className='w-[calc(100%+32px)] mx-4 divide-y-[1px] divide-gray-03 border-b-[1px] border-b-gray-03'>
            {documents?.map((document: any) => (
              <Link
                href={{
                  pathname: '/form',
                  query: {
                    originName,
                    origin,
                    destinationName: document.place_name,
                    destination: document.x + ' , ' + document.y,
                  },
                }}
                key={document.id}>
                {' '}
                <li className='flex w-full px-4 items-center justify-around'>
                  <div className='pr-5 pl-0 justify-center items-center flex flex-col'>
                    <svg
                      width='17'
                      height='23'
                      viewBox='0 0 17 23'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M8.77502 22.0856C10.7649 19.6334 16.0635 12.7477 16.0635 8.95498C16.0635 4.28542 12.4675 0.5 8.03173 0.5C3.59593 0.5 0 4.28542 0 8.95498C0 12.7477 5.29852 19.6334 7.28845 22.0856C7.67453 22.5614 8.38894 22.5614 8.77502 22.0856ZM8.03188 11.7413C10.0033 11.7413 11.6015 10.0636 11.6015 7.99417C11.6015 5.92471 10.0033 4.24708 8.03188 4.24708C6.06041 4.24708 4.46222 5.92471 4.46222 7.99417C4.46222 10.0636 6.06041 11.7413 8.03188 11.7413Z'
                        fill='#CCCCCC'
                      />
                    </svg>
                    <p className='text-[#CCCCCC] text-xs mt-1'>
                      {meterToKm(document.distance)}m
                    </p>
                  </div>
                  <div className='flex flex-col py-3 justify-center items-center font-medium relative w-full'>
                    <div className='flex justify-center items-center w-full'>
                      <p className='w-full text-left text-lg'>
                        {document.place_name}
                      </p>
                    </div>
                    <div className='w-full text-sm text-gray-02 font-medium'>
                      {document.road_address_name}
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const meterToKm = (meter: number) => {
  if (meter < 1000) {
    return meter;
  }
  return Math.round(meter * 100) / 100;
};