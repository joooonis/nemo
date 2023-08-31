'use client';

import { useRouter } from 'next/navigation';

function Header() {
  const router = useRouter();
  return (
    <header className='fixed top-0 w-full bg-primary-white max-w-xl flex justify-between items-center px-4 h-12 z-50'>
      <div
        onClick={() => router.push('/home')}
        className='w-1/2 flex justify-start items-center cursor-pointer'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='#404040'
          className='w-6 h-6'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </div>
    </header>
  );
}

export default Header;
