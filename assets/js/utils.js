String.prototype.capitalize = function () {
  return this[0].toUpperCase() + this.slice(1);
};

String.prototype.camelCaseToSentence = function () {
  const firstWord = this.match(/^[a-z]*/).pop();
  let laterWords = this.match(/[A-Z][a-z]*/);

  laterWords = laterWords.map(word => word.toLowerCase());

  return [firstWord.capitalize(), ...laterWords].join(' ');
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
