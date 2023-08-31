'use client';

import { useForm } from 'react-hook-form';

interface FormValues {
  title: string;
  date: string;
  originName: string;
  destinationName: string;
  memo: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <div className='relativ flex w-full flex-col justify-start items-center'>
      <h2 className='text-left w-full mt-4 text-xl font-normal'>
        어떤 일정을 만드시나요?
      </h2>
      <form className='w-full flex-col flex items-center mt-4'>
        <input
          type='text'
          maxLength={20}
          placeholder='일정 이름을 입력해주세요'
          className='py-3 px-4 focus:border text-center block w-full border border-line placeholder:text-gray-03 focus:outline-none rounded-xl text-sm focus:border-primary-main'
        />
        <label
          htmlFor='date'
          className='text-gray-02 text-sm w-full text-left mt-9'>
          날짜와 시간
        </label>
        <input
          id='date'
          type='date'
          placeholder='일정 이름을 입력해주세요'
          className='mt-1.5 py-3 px-4 focus:border text-center block w-full border border-line placeholder:text-gray-03 focus:outline-none rounded-xl text-sm focus:border-primary-main'
        />
        <label
          htmlFor='destinationName'
          className='text-gray-02 text-sm w-full text-left mt-7'>
          약속장소 등록
        </label>
        <input
          id='orignName'
          type='text'
          placeholder='출발지 입력'
          className='mt-1.5 py-3 px-4 focus:border text-left block w-full border border-line placeholder:text-gray-03 focus:outline-none rounded-xl text-sm focus:border-primary-main'
        />
        <input
          id='destinationName'
          type='text'
          placeholder='도착지 입력'
          className='mt-1.5 py-3 px-4 focus:border text-left block w-full border border-line placeholder:text-gray-03 focus:outline-none rounded-xl text-sm focus:border-primary-main'
        />
        <label
          htmlFor='memo'
          className='text-gray-02 text-sm w-full text-left mt-7'>
          일정 메모
        </label>
        <textarea
          id='memo'
          maxLength={30}
          placeholder='일정에 대해 메모를 남겨주세요. (선택)'
          className='mt-1.5 py-3 px-4 focus:border resize-none text-left block w-full border border-line placeholder:text-gray-03 focus:outline-none rounded-xl text-sm focus:border-primary-main'
        />
      </form>
    </div>
  );
}

interface InputProps {
  placeholder?: string;
  size?: 'sm' | 'lg';
}

function Input({ size, placeholder }: InputProps) {
  return (
    <div className='relative w-full'>
      <input
        type='text'
        className={`${
          size === 'sm' ? 'h-7' : 'h-12'
        } border-none focus:outline-none focus:border-transparent w-full text-gray-900 rounded-lg focus:border focus:ring-1 focus:ring-primary-main block pl-4 pr-16`}
        placeholder={placeholder}
      />
    </div>
  );
}
