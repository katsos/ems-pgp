String.prototype.capitalize = function () {
  return this[0].toUpperCase() + this.slice(1);
};

/**
 * A safe way to get pathname with a trailing slash always.
 * @returns {string}
 */
function getPathname() {
  const pathname = window.location.pathname;
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function isUndefined(obj) {
  return typeof obj === 'undefined';
}

function kebabCaseToLabel(string) {
  return string.split('_').join(' ');
}

function serializeForm(node) {
  const buttonClass = 'mdl-button';
  const inputs = node.querySelectorAll(`input:not(.${buttonClass})`); // get all inputs except buttons

  const data = {};
  for (const input of inputs) {
    const value = (input.type === 'number') ? Number(input.value) : input.value;
    Object.assign(data, {[input.id] : value});
  }

  return data;
}

export { getPathname, kebabCaseToLabel };
