const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key) => {
  const isExist = localStorage.getItem(key);
  if (isExist) {
    return JSON.parse(isExist);
  }
  return "";
};

const removeItem = (key) => localStorage.removeItem(key);

const removeAll = () => localStorage.clear();

export { setItem, getItem, removeItem, removeAll };
