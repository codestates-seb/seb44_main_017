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
  const date = new Date(time);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()-3).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
