import { format } from 'date-fns';

function getCurrentDateTimeString() {
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy년 MM월 dd일 HH시 mm분');

  return formattedDate;
}

function dateToFormatString(date: Date) {
  const currentDate = new Date();
  const formattedDate = format(date, 'MM월 dd일 HH시 mm분');

  if (currentDate.getDate() === date.getDate()) {
    return `오늘 ${formattedDate}`;
  }

  if (currentDate.getDate() + 1 === date.getDate()) {
    return `내일 ${formattedDate}`;
  }

  if (currentDate.getDate() + 2 === date.getDate()) {
    return `모레 ${formattedDate}`;
  } else {
    return formattedDate;
  }
}

function caclulateTimeDifference(departureTime: Date, arrivalTime: Date) {
  const timeDifference = arrivalTime.getTime() - departureTime.getTime();
  const hours = Math.floor(timeDifference / 1000 / 60 / 60);
  const minutes = Math.floor((timeDifference / 1000 / 60 / 60 - hours) * 60);

  return hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
}

function dateToTimeString(date: Date) {
  const formattedDate = format(date, 'HH시 mm분');

  return formattedDate;
}

export {
  getCurrentDateTimeString,
  dateToFormatString,
  dateToTimeString,
  caclulateTimeDifference,
};
