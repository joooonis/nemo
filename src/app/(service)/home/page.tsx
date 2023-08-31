
export default function Page() {
  return (
    <div className='relative flex w-full flex-col justify-start items-center'>
      <h3 className='text-xl w-full'>
        출발예정시간이
        <span className='text-primary-main font-bold'> 1시간 25분</span>
        남았어요!
      </h3>
      <div className='w-full mt-4'>
        <RecentPromiseCard />
      </div>
      <div className='mt-4 flex w-full flex-col justify-start items-center space-y-6'>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

const Card = () => {
  return (
    <div className='flex w-full flex-col items-center '>
      <p className='text-sm text-left font-bold w-full'>내일</p>
      <div className='mt-3 w-full drop-shadow-md bg-white rounded-2xl p-4 flex flex-col items-center'>
        <div className='flex justify-between items-center w-full'>
          <p className='text-primary-main text-xs font-bold'>
            오늘 오전 10시 30분 출발
          </p>
          <p className='text-gray-02 text-xs flex justify-between items-center'>
            오후 12:00
          </p>
        </div>
        <h2 className='w-full font-bold text-xl mt-2'>네모톤</h2>
        <div className='flex justify-between items-center w-full mt-2 space-x-2'>
          <div className='grow flex flex-col justify-between items-center h-16'>
            <p className='bg-background-white rounded-sm w-full py-1 px-2 text-gray-02 text-sm'>
              서울시 성북구 동선동 4가
            </p>
            <p className='bg-background-white rounded-sm w-full py-1 px-2 text-gray-02 text-sm'>
              서울시 강남구 반포로 1-14
            </p>
          </div>
          <div className='flex justify-center items-center bg-background-white rounded-md aspect-square w-16 h-16 m-auto'>
            <svg
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M28.7932 14.8768L24.2935 6.85241C23.9994 6.32659 23.4329 6 22.8177 6H9.18063C8.56543 6 7.99897 6.32659 7.70481 6.85241L3.20507 14.8768C3.0706 15.1169 3 15.3847 3 15.6574V24.4836C3 25.8732 4.15981 27 5.59025 27C7.02069 27 8.1805 25.8732 8.1805 24.4836H23.8195C23.8195 25.8732 24.9793 27 26.4097 27C27.8402 27 29 25.8732 29 24.4836V15.6574C29 15.3847 28.9294 15.1152 28.7949 14.8768H28.7932ZM7.49806 13.4708L9.86307 9.07815C10.1522 8.53927 10.727 8.20124 11.3523 8.20124H20.7888C21.4276 8.20124 22.0109 8.55233 22.2949 9.10918L24.5255 13.4806C24.6801 13.8056 24.4364 14.1763 24.0683 14.1763H7.9519C7.57875 14.1763 7.33502 13.7958 7.49974 13.4708H7.49806ZM7.95526 21.6047C6.8963 21.6047 6.03737 20.7702 6.03737 19.7414C6.03737 18.7127 6.8963 17.8782 7.95526 17.8782C9.01422 17.8782 9.87316 18.7127 9.87316 19.7414C9.87316 20.7702 9.01422 21.6047 7.95526 21.6047ZM24.0414 21.6047C22.9824 21.6047 22.1235 20.7702 22.1235 19.7414C22.1235 18.7127 22.9824 17.8782 24.0414 17.8782C25.1003 17.8782 25.9593 18.7127 25.9593 19.7414C25.9593 20.7702 25.1003 21.6047 24.0414 21.6047Z'
                fill='#B1B7BF'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecentPromiseCard = () => {
  return (
    <div className='flex w-full flex-col items-center '>
      <div className='w-full drop-shadow-md bg-black rounded-2xl p-4 flex flex-col items-center'>
        <div className='flex justify-between items-center w-full'>
          <p className='text-primary-main text-xs font-bold'>
            오늘 오전 10시 30분 출발
          </p>
          <p className='text-gray-02 text-xs flex justify-between items-center'>
            오후 12:00
          </p>
        </div>
        <h2 className='w-full font-bold text-xl mt-2 text-white'>네모톤</h2>
        <div className='flex justify-between items-center w-full mt-2 space-x-2'>
          <div className='grow flex flex-col justify-between items-center h-16'>
            <p className='bg-[#3E3E3E80] rounded-sm w-full py-1 px-2 text-gray-02 text-sm'>
              서울시 성북구 동선동 4가
            </p>
            <p className='bg-[#3E3E3E80] rounded-sm w-full py-1 px-2 text-gray-02 text-sm'>
              서울시 강남구 반포로 1-14
            </p>
          </div>
          <div className='flex justify-center items-center bg-gray-01 rounded-md aspect-square w-16 h-16 m-auto'>
            <svg
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M28.7932 14.8768L24.2935 6.85241C23.9994 6.32659 23.4329 6 22.8177 6H9.18063C8.56543 6 7.99897 6.32659 7.70481 6.85241L3.20507 14.8768C3.0706 15.1169 3 15.3847 3 15.6574V24.4836C3 25.8732 4.15981 27 5.59025 27C7.02069 27 8.1805 25.8732 8.1805 24.4836H23.8195C23.8195 25.8732 24.9793 27 26.4097 27C27.8402 27 29 25.8732 29 24.4836V15.6574C29 15.3847 28.9294 15.1152 28.7949 14.8768H28.7932ZM7.49806 13.4708L9.86307 9.07815C10.1522 8.53927 10.727 8.20124 11.3523 8.20124H20.7888C21.4276 8.20124 22.0109 8.55233 22.2949 9.10918L24.5255 13.4806C24.6801 13.8056 24.4364 14.1763 24.0683 14.1763H7.9519C7.57875 14.1763 7.33502 13.7958 7.49974 13.4708H7.49806ZM7.95526 21.6047C6.8963 21.6047 6.03737 20.7702 6.03737 19.7414C6.03737 18.7127 6.8963 17.8782 7.95526 17.8782C9.01422 17.8782 9.87316 18.7127 9.87316 19.7414C9.87316 20.7702 9.01422 21.6047 7.95526 21.6047ZM24.0414 21.6047C22.9824 21.6047 22.1235 20.7702 22.1235 19.7414C22.1235 18.7127 22.9824 17.8782 24.0414 17.8782C25.1003 17.8782 25.9593 18.7127 25.9593 19.7414C25.9593 20.7702 25.1003 21.6047 24.0414 21.6047Z'
                fill='#fff'
              />
            </svg>
          </div>
        </div>
        <div className='mt-5 w-full'>
          <button className='bg-gray-01 text-white w-full font-medium h-12 rounded-2xl hover:opacity-80 text-lg transition duration-200'>
            위치 공유하기
          </button>
        </div>
      </div>
    </div>
  );
};
