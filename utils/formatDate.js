export const formatDate = (inputDate) => {
  const date = inputDate.split("T")[0];
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};
