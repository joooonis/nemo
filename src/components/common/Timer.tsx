import { convertSecondsToMinutesSeconds } from '@/utils/convertSecondsToMinutesSeconds';

interface TimerProps {
  timeValue: number;
}

function Timer({ timeValue }: TimerProps) {
  const [minutes, seconds] = convertSecondsToMinutesSeconds(timeValue);
  return (
    <div className='flex w-12 justify-between items-center text-sm font-normal text-gray-500'>
      <span className='w-[48%] text-center'>{minutes}</span>
      <span>:</span>
      <span className='w-[48%] text-center'>{seconds}</span>
    </div>
  );
}

export default Timer;
