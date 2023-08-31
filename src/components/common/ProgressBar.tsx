interface ProgressBarProps {
  valueMax: number;
  valueNow: number;
}

function ProgressBar({ valueMax, valueNow }: ProgressBarProps) {
  return (
    <div role='progress' className='w-full'>
      <div className='flex justify-start mb-2'>
        {valueMax - valueNow !== 0 ? (
          <span className='text-sm font-normal text-gray-500 rounded-md'>
            {valueMax - valueNow}문제 남았어요
          </span>
        ) : (
          <span className='text-sm font-normal text-gray-500 rounded-md'>
            마지막 문제입니다
          </span>
        )}
      </div>
      <div className='flex w-full rounded-md h-1 bg-primary-blue-lighter overflow-hidden dark:bg-gray-700'>
        <div
          className='flex flex-col justify-center overflow-hidden bg-primary-blue-main'
          role='progressbar'
          style={{ width: `${(valueNow / valueMax) * 100}%` }}
          aria-valuenow={valueNow}
          aria-valuemin={0}
          aria-valuemax={valueMax}></div>
      </div>
    </div>
  );
}

export default ProgressBar;
