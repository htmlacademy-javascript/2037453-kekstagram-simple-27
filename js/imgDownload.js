import {DOWNLOAD_URL} from './settings.js';
import {modalHandler} from './util.js';
import {thumbRender} from './thumbRender.js';

const container = document.querySelector('.pictures');

const addImgPreviews = function (resp) {
  const fragment = new DocumentFragment();
  const template = document.querySelector('#picture').content;
  resp.forEach((el) => {
    fragment.appendChild(thumbRender(template, el));
  });
  container.appendChild(fragment);
};

const setErrorModal = function(err) {
  modalHandler.modal = {
    template: '#error',
    selector: '.error',
    container: container,
  };
  modalHandler.modalTitle = {
    selector: '.error__title',
    text: `${err} Не удалось загрузить миниатюры`,
  };
  modalHandler.modalButton = {
    show: false,
    selector: '.error__button',
  };
};

const imgDownload = function () {
  fetch(DOWNLOAD_URL, {
    method: 'get'
  })
    .then((resp) => {
      if (!resp.ok) {
        throw resp.status;
      }
      return resp.json();
    })
    .then((resp) => addImgPreviews(resp))
    .catch((err) => {
      setErrorModal(err);
      modalHandler.open();
    });
};
export {imgDownload};
