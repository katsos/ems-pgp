String.prototype.capitalize = function () {
  return this[0].toUpperCase() + this.slice(1);
};

export function serializeForm(node) {
  const inputs = node.querySelectorAll('input:not([type="submit"])'); // exempt submit input

  const data = {};
  for (const input of inputs) {
    const value = (input.type === 'number') ? Number(input.value) : input.value;
    Object.assign(data, {[input.id] : value});
  }

  return data;
}
