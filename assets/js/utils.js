String.prototype.capitalize = function () {
  return this[0].toUpperCase() + this.slice(1);
};

export function serializeForm(node) {
  const inputs = node.querySelectorAll('input:not([type="submit"])'); // exempt submit input

  const data = {};
  for (const input of inputs) {
    Object.assign(data, {[input.id] : input.value});
  }

  return data;
}
