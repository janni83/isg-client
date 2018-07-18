const lazyCreateModule = (object, propertyName, constructor) => {
  if (!object[propertyName]) {
    // eslint-disable-next-line no-param-reassign
    object[propertyName] = new constructor(object);
  }
  return object[propertyName];
};

export default lazyCreateModule;
