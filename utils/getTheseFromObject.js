const getTheseFromObject = (keys, obj) => {
  const newObj = {};
  for (const key in obj) {
    if (keys.includes(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

module.exports = getTheseFromObject;
