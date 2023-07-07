interface TimesProps {
  name: Intl.RelativeTimeFormatUnit;
  milliSeconds: number;
}

const elapsedTime = (date: Date) => {
  const start = new Date(date);
  const end = new Date();

  const diff = (end.getTime() - start.getTime()) / 1000;

  const formatter = new Intl.RelativeTimeFormat("ko", {
    numeric: "always",
  });

  const times: TimesProps[] = [
    { name: "year", milliSeconds: 60 * 60 * 24 * 365 },
    { name: "month", milliSeconds: 60 * 60 * 24 * 30 },
    { name: "day", milliSeconds: 60 * 60 * 24 },
    { name: "hour", milliSeconds: 60 * 60 },
    { name: "minute", milliSeconds: 60 },
  ];

  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);

    if (betweenTime > 0) {
      return formatter.format(-betweenTime, value.name);
    }
  }
  return "방금 전";
};

export default elapsedTime;
