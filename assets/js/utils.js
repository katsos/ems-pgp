String.prototype.capitalize = function () {
  return this[0].toUpperCase() + this.slice(1);
};

export function isUndefined(obj) {
  return typeof obj === 'undefined';
}

export function serializeForm(node) {
  const buttonClass = 'mdl-button';
  const inputs = node.querySelectorAll(`input:not(.${buttonClass})`); // get all inputs except buttons

  const data = {};
  for (const input of inputs) {
    const value = (input.type === 'number') ? Number(input.value) : input.value;
    Object.assign(data, {[input.id] : value});
  }

  return data;
}
