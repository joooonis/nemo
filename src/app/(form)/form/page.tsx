'use client';

import Button from '@/components/common/Button';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';

interface Inputs {
  name: string;
  arrivalDate: string;
  arrivalTime: string;
  originName: string;
  origin: string;
  destinationName: string;
  destination: string;
  memo: string;
}

async function sendRequest(
  url: string,
  {
    arg,
  }: {
    arg: any;
  }
) {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const originName = searchParams.get('originName');
  const origin = searchParams.get('origin');
  const destinationName = searchParams.get('destinationName');
  const destination = searchParams.get('destination');

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>({
    defaultValues: {
      originName: originName || '',
      origin: origin || '',
      destinationName: destinationName || '',
      destination: destination || '',
    },
  });

  const { trigger, isMutating } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/schedules`,
    sendRequest,
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const onSubmit = (data: Inputs) => {
    const {
      name,
      arrivalDate,
      arrivalTime,
      memo,
      origin,
      originName,
      destination,
      destinationName,
    } = data;

    trigger({
      arrivalTime: `${arrivalDate} ${arrivalTime}:00`,
      name,
      origin,
      originName,
      destination,
      destinationName,
      memo,
    });
  };

  return (
    <div className='relativ flex w-full flex-col justify-start items-center'>
      <h2 className='text-left w-full mt-4 text-xl font-normal'>
        어떤 일정을 만드시나요?
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex-col flex items-center mt-4'>
        <input
          {...register('name', { required: true })}
          type='text'
          maxLength={20}
          placeholder='일정 이름을 입력해주세요'
          className='py-3 px-4 focus:border text-center block w-full border border-line placeholder:text-gray-03 focus:outline-none rounded-xl text-sm focus:border-primary-main'
        />
        <label
          htmlFor='arrivalDate'
          className='text-gray-02 text-sm w-full text-left mt-9'>
          날짜
        </label>
        <input
          {...register('arrivalDate', { required: true })}
          id='arrivalDate'
          type='date'
          className='mt-1.5 py-3 px-4  text-center block w-full border border-line placeholder:text-gray-03 focus:border focus:outline-none rounded-xl text-sm focus:border-primary-main'
        />
        <label
          htmlFor='arrivalTime'
          className='text-gray-02 text-sm w-full text-left mt-2'>
          시간
        </label>
        <input
          {...register('arrivalTime', { required: true })}
          id='arrivalTime'
          type='time'
          className='mt-1.5 py-3 px-4 text-center block w-full border border-line placeholder:text-gray-03 focus:border focus:outline-none rounded-xl text-sm focus:border-primary-main'
        />
        <label
          htmlFor='destinationName'
          className='text-gray-02 text-sm w-full text-left mt-7'>
          약속장소 등록
        </label>
        <Link
          className='w-full'
          href={{
            pathname: '/departure',
            query: {
              originName: searchParams.get('originName'),
              origin: searchParams.get('origin'),
              destinationName: searchParams.get('destinationName'),
              destination: searchParams.get('destination'),
            },
          }}>
          <div className='text-gray-03 mt-1.5 py-3 px-4 text-left block w-full border border-line rounded-xl text-sm'>
            {originName || '출발지 입력'}
          </div>
        </Link>
        <Link
          className='w-full'
          href={{
            pathname: '/arrival',
            query: {
              originName: searchParams.get('originName'),
              origin: searchParams.get('origin'),
              destinationName: searchParams.get('destinationName'),
              destination: searchParams.get('destination'),
            },
          }}>
          <div className='text-gray-03 mt-1.5 py-3 px-4 text-left block w-full border border-line rounded-xl text-sm'>
            {destinationName || '도착지 입력'}
          </div>
        </Link>
        <label
          htmlFor='memo'
          className='text-gray-02 text-sm w-full text-left mt-7'>
          일정 메모
        </label>
        <textarea
          {...register('memo')}
          id='memo'
          rows={5}
          maxLength={30}
          placeholder='일정에 대해 메모를 남겨주세요. (선택)'
          className='mt-1.5 py-3 px-4 focus:border resize-none text-left block w-full border border-line placeholder:text-gray-03 focus:outline-none rounded-xl text-sm focus:border-primary-main'
        />
        <div className='flex fixed max-w-xl bottom-0 justify-between px-4 pb-6 w-full'>
          <Button disabled={!isValid}>일정 만들기</Button>
        </div>
      </form>
    </div>
  );
}
