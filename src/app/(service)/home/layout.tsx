'use client';
import Button from '@/components/common/Button';
import FixedBottom from '../ui/FixedBottom';
import FixedTop from '../ui/FixedTop';
import Search from '../ui/Search';
import { getCurrentDateTimeString } from '@/utils/date';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Spinner from '@/components/common/Spinner';
import Link from 'next/link';
import { fetcherKakao } from '@/utils/swrFetcher';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [currentDateTime, setCurrentDateTime] = useState(
    getCurrentDateTimeString()
  );
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();

  const { data, isLoading } = useSWR(
    () =>
      latitude &&
      longitude &&
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
    fetcherKakao
  );

  const userLocation = data?.documents[0].address_name;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  if (isLoading)
    return (
      <div className='w-full flex justify-center items-center'>
        <Spinner />
      </div>
    );

  if (!data) return null;

  return (
    <div className='relative flex w-full flex-col justify-start items-center'>
      <FixedTop>
        <h2 className='text-lg text-white font-bold'>{currentDateTime}</h2>
        <h3 className='flex mt-2 mb-4 justify-start items-center text-gray-02'>
          <span className='mr-2'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M10 1.6C8.30261 1.6 6.67475 2.27428 5.47452 3.47452C4.27428 4.67475 3.6 6.30261 3.6 8C3.6 10.4784 5.21259 12.8834 6.98076 14.7498C7.84849 15.6657 8.71893 16.4156 9.37334 16.9367C9.61689 17.1306 9.82962 17.2922 10 17.4181C10.1704 17.2922 10.3831 17.1306 10.6267 16.9367C11.2811 16.4156 12.1515 15.6657 13.0192 14.7498C14.7874 12.8834 16.4 10.4784 16.4 8C16.4 6.30261 15.7257 4.67475 14.5255 3.47452C13.3253 2.27428 11.6974 1.6 10 1.6ZM10 18.4C9.55624 19.0656 9.55604 19.0655 9.55581 19.0654L9.55352 19.0638L9.54819 19.0602L9.52985 19.0478C9.51428 19.0373 9.49206 19.0221 9.46365 19.0024C9.40682 18.963 9.32517 18.9057 9.22223 18.8314C9.01644 18.6827 8.72509 18.4658 8.37666 18.1883C7.68107 17.6344 6.75151 16.8343 5.81924 15.8502C3.98741 13.9166 2 11.1216 2 8C2 5.87827 2.84285 3.84344 4.34315 2.34315C5.84344 0.842855 7.87827 0 10 0C12.1217 0 14.1566 0.842855 15.6569 2.34315C17.1571 3.84344 18 5.87827 18 8C18 11.1216 16.0126 13.9166 14.1808 15.8502C13.2485 16.8343 12.3189 17.6344 11.6233 18.1883C11.2749 18.4658 10.9836 18.6827 10.7778 18.8314C10.6748 18.9057 10.5932 18.963 10.5364 19.0024C10.5079 19.0221 10.4857 19.0373 10.4701 19.0478L10.4518 19.0602L10.4465 19.0638L10.4448 19.065C10.4446 19.0651 10.4438 19.0656 10 18.4ZM10 18.4L10.4438 19.0656C10.175 19.2448 9.82453 19.2445 9.55581 19.0654L10 18.4ZM10 6.4C9.11634 6.4 8.4 7.11634 8.4 8C8.4 8.88366 9.11634 9.6 10 9.6C10.8837 9.6 11.6 8.88366 11.6 8C11.6 7.11634 10.8837 6.4 10 6.4ZM6.8 8C6.8 6.23269 8.23269 4.8 10 4.8C11.7673 4.8 13.2 6.23269 13.2 8C13.2 9.76731 11.7673 11.2 10 11.2C8.23269 11.2 6.8 9.76731 6.8 8Z'
                fill='#7B7B7B'
              />
            </svg>
          </span>
          {userLocation}
        </h3>
        <div className='space-y-2'>
          <div className='w-full'>
            <Link
              href={{
                pathname: '/arrival',
                query: { latitude, longitude },
              }}
              className='w-full'>
              <Search placeholder='목적지를 입력해주세요' />
            </Link>
          </div>
        </div>
      </FixedTop>
      <div className='flex w-full flex-col justify-start items-center'>
        {children}
      </div>
      <FixedBottom>
        <Link
          className='w-full'
          href={{
            pathname: '/form',
            query: { originName: userLocation },
          }}>
          <Button>새로운 일정 추가</Button>
        </Link>
      </FixedBottom>
    </div>
  );
}
