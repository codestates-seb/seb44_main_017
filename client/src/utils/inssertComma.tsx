export const insertComma = (value: string): string => {
  if (!/^[0-9,]*$/.test(value)) {
    throw new Error("Input must contain only numbers and commas");
  }

  const cleanInput = value.replace(/,/g, "");
  let result = "";
  let digitCount = 0;

  for (let i = cleanInput.length - 1; i >= 0; i--) {
    result = cleanInput[i] + result;
    digitCount++;

    if (digitCount === 3 && i !== 0) {
      result = "," + result;
      digitCount = 0;
    }
  }

  return result;
};
export const commaNumber = (num: number | string): string => {
  const numString = num.toString();
  const numParts = numString.split(".");
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return numParts.join(".");
};
