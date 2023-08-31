import { format } from 'date-fns';

function getCurrentDateTimeString() {
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy년 MM월 dd일 HH시 mm분');

  return formattedDate;
}

export { getCurrentDateTimeString };
