export const dateFormat = (timestamp) => {
  return timestamp.split("T")[0].split("-").reverse().join(" / ");
};

export const toggleArrayItem = (value, array) => {
  const index = array.indexOf(value);
  if (index === -1) array.push(value);
  else array.splice(index, 1);
  return array
};