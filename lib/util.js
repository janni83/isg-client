/**
 * @param object {object}
 * @param propertyName {string}
 * @param constructor {function}
 * @returns {object}
 */
const lazyCreateModule = (object, propertyName, constructor) => {
  if (!object[propertyName]) {
    // eslint-disable-next-line no-param-reassign
    object[propertyName] = new constructor(object);
  }
  return object[propertyName];
};

module.exports = lazyCreateModule;
