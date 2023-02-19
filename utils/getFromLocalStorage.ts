const getFromLocalStorage = (key: string) => {
  let values = [];
  if (typeof window === 'undefined') {
    return;
  }
  try {
    values = JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.log(err);
  }
  return values;
};

export default getFromLocalStorage;
