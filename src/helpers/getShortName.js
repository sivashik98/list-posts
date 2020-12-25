export const getShortName = (name, maxValueOfSymbols) => {
  let result = "";

  for (let i = 0; i < maxValueOfSymbols; i++) {
    result += name[i];
  }

  return `${result} .....`;
};
