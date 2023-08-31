import Button from '@/components/common/Button';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex flex-col justify-start items-center w-full mx-auto'>
      <header className='z-10 flex text-lg fixed max-w-xl top-0 p-4 font-semibold items-center bg-white justify-between w-full'>
        <span>
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
      <div className='flex w-full flex-col justify-start items-center mt-14'>
        {children}
      </div>
      <div className='flex fixed  max-w-xl bottom-0 justify-between px-4 pb-6 w-full'>
        <Button>일정 만들기</Button>
      </div>
    </div>
  );
}
