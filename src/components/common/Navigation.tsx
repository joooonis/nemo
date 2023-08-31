'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav className='flex fixed max-w-xl bottom-0 border-t border-t-neutral-200 bg-primary-white justify-between items-center h-16 w-full'>
      <ul className='w-full flex items-center justify-between px-4'>
        <li className='w-1/5 flex flex-col items-center justify-center'>
          <Link href='/home'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke={pathname === '/home' ? '#1764FE' : 'gray'}
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
              />
            </svg>
          </Link>
          <p
            className={`text-xs ${
              pathname === '/home' ? 'text-[#1764FE]' : 'text-[#404040]'
            }`}>
            학습
          </p>
        </li>
        <li className='w-1/5 flex flex-col items-center justify-center'>
          <Link href='/analysis'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke={pathname === '/analysis' ? '#1764FE' : '#404040'}
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z'
              />
            </svg>
          </Link>
          <p
            className={`text-xs ${
              pathname === '/analysis' ? 'text-[#1764FE]' : 'text-[#404040]'
            }`}>
            분석
          </p>
        </li>
        <li className='w-1/5 flex flex-col items-center justify-center'>
          <Link href='/record'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke={pathname === '/record' ? '#1764FE' : '#404040'}
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'
              />
            </svg>
          </Link>
          <p
            className={`text-xs ${
              pathname === '/record' ? 'text-[#1764FE]' : 'text-[#404040]'
            }`}>
            기록
          </p>
        </li>
      </ul>
    </nav>
  );
}
