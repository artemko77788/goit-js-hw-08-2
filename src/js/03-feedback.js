import throttle from 'lodash.throttle';
const Storage_Key = 'feedback-form-state';
const formListener = document.querySelector('.feedback-form');
let userData = {};

dataFromlocalStorage();

formListener.addEventListener('input', throttle(formData, 500));
formListener.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  if (formListener.message.value !== '' && formListener.email.value !== '') {
    evt.preventDefault();
    console.log(userData);
    userData = {};
    evt.currentTarget.reset();
    localStorage.removeItem(Storage_Key);
  }
}

function formData(e) {
  userData[e.target.name] = e.target.value;
  localStorage.setItem(Storage_Key, JSON.stringify(userData));
}

function dataFromlocalStorage() {
  const saveData = localStorage.getItem(Storage_Key);

  if (saveData) {
    const parseSave = JSON.parse(saveData);
    const keys = Object.keys(parseSave);

    for (const key of keys) {
      formListener.elements[key].value = parseSave[key];
      userData[key] = parseSave[key];
    }
  }
}
