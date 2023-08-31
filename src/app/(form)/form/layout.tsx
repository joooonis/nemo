'use client';

import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className='relative flex flex-col justify-start items-center w-full mx-auto'>
      <header className='z-10 flex text-lg fixed max-w-xl top-0 p-4 font-semibold items-center bg-white justify-between w-full'>
        <span onClick={() => router.back()}>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M15 18L9 12L15 6'
              stroke='#495565'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </span>
        일정 등록
        <span className='w-6 h-6' />
      </header>
      <div className='flex w-full flex-col justify-start items-center mt-4'>
        {children}
      </div>
    </div>
  );
}
