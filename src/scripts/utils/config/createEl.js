export function createForm(values) {
  const form = document.createElement('form');
  const inputOne = document.createElement('button');
  const inputTwo = document.createElement('button');
  const inputThree = document.createElement('button');
  const inputOneText = document.createTextNode(values.nameOne);
  const inputTwoText = document.createTextNode(values.nameTwo);
  const inputThreeText = document.createTextNode(values.nameRemove);

  inputOne.setAttribute('id', values.idOne);
  inputTwo.setAttribute('id', values.idTwo);
  inputThree.setAttribute('id', values.idThree);

  inputOne.appendChild(inputOneText);
  inputTwo.appendChild(inputTwoText);
  inputThree.appendChild(inputThreeText);

  form.appendChild(inputOne);
  form.appendChild(inputTwo);
  form.appendChild(inputThree);
  document.querySelector('#charts').appendChild(form);
}
