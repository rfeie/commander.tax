const storeItem = (key, data) => {
  const val = JSON.stringify(data);
  sessionStorage.setItem(key, val);
};
const getItem = key => {
  const data = sessionStorage.getItem(key);
  return JSON.parse(data);
};

export { getItem, storeItem };
