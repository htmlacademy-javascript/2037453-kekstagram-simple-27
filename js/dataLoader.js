import {ThumbRender} from './thumbRender.js';
import {DOWNLOAD_URL} from './settings.js';

const container = document.querySelector('.pictures');

const ModalHandler = {
  target: null,
  close: (evt) => {
    if (!!evt && (evt.type === 'click' || evt.key === 'Escape')) {
      evt.currentTarget.removeEventListener(evt.type, ModalHandler.close);
      if (ModalHandler.target) {ModalHandler.target.remove();}
    }
  }
};

const DownloadPhoto = function () {
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
      const template = document.querySelector('#error').content;
      const newError = template.cloneNode(true);
      const newErrorTitle = newError.querySelector('.error__title');
      const newErrorCancel = newError.querySelector('.error__button');
      newErrorTitle.textContent = `${err} Не удалось загрузить миниатюры`;
      newErrorCancel.textContent = 'Закрыть';
      container.appendChild(newError);
      ModalHandler.target = container.querySelector('.error');
      newErrorCancel.addEventListener('click', ModalHandler.close);
      window.addEventListener('keydown', ModalHandler.close);
    });
};

export {DownloadPhoto};
