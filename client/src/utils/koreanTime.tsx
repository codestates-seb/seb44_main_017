// YYYY-MM-DD 형식으로 바꾸기
export const koreanDate = (time: any) => {
  const gmtDate = new Date(`${time}z`);

  const koreanDateString = gmtDate.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [year, month, day] = koreanDateString.split(/[.\-\/]/);
  const result = `${year}-${month}-${day}`.replace(/ /g, "");
  return result;
};

// YYYY-MM-DD HH:MM:SS 형식으로 바꾸기
export const koreanTime = (time: any) => {
  const gmtDate = new Date(`${time}z`);

  const koreanDateTimeString = gmtDate.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  console.log(koreanDateTimeString);
  const [datePart, timePart] = koreanDateTimeString.split(/. 오전 |. 오후 /);
  const [year, month, day] = datePart.split(/[.\-\/]/);
  const result = `${year}-${month}-${day}`.replace(/ /g, "");
  const [hour, minute, second] = timePart.split(/:/);

  return `${result} ${hour}:${minute}:${second}`;
};
