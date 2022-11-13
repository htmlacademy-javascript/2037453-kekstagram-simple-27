import {ThumbRender} from './thumbRender.js';
import {DOWNLOAD_URL} from './settings.js';
import {ModalHandler} from './util.js';

const container = document.querySelector('.pictures');


const ImgDownload = function () {
  fetch(DOWNLOAD_URL, {
    method: 'get'
  })
    .then((resp) => {
      if (!resp.ok) {
        throw resp.status;
      }
      return resp.json();
    })
    .then((resp) => {
      const fragment = new DocumentFragment();
      const template = document.querySelector('#picture').content;
      resp.forEach((el) => {
        fragment.appendChild(ThumbRender(template, el));
      });
      container.appendChild(fragment);
    })
    .catch((err) => {
      ModalHandler.modal = {
        template: '#error',
        selector: '.error',
        container: container,
      };
      ModalHandler.modalTitle = {
        selector: '.error__title',
        text: `${err} Не удалось загрузить миниатюры`,
      };
      ModalHandler.modalButton = {
        show: false,
        selector: '.error__button',
      };
      ModalHandler.open();
    });
};

export {ImgDownload};
