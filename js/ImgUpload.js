import {UPLOAD_URL} from './settings.js';
import {ModalHandler} from './util.js';
import {ImgEditor} from './ImgEditor.js';

const container = document.querySelector('.pictures');

const ImgUpload = function () {
  const form = document.querySelector('#upload-select-image');
  const pristine = new Pristine(form);

  ImgEditor.init();

  form.onsubmit = function (evt) {
    const submitBtn = form.querySelector('#upload-submit');
    const data = new FormData(form);
    const valid = pristine.validate();

    evt.preventDefault();
    if (!valid) {
      return false;
    }
    submitBtn.disabled = true;
    fetch(UPLOAD_URL, {
      method: 'post',
      body: data,
    })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.status;
        }
        ImgEditor.reset();
        form.reset();

        ModalHandler.modal = {
          template: '#success',
          selector: '.success',
          container: container,
        };
        ModalHandler.modalTitle = {
          selector: '.success__title',
          text: 'Изображение успешно загружено',
        };
        ModalHandler.modalButton = {
          show: true,
          selector: '.success__button',
          text: 'Круто!',
        };
      })
      .catch((err) => {
        ModalHandler.modal = {
          template: '#error',
          selector: '.error',
          container: container,
        };
        ModalHandler.modalTitle = {
          selector: '.error__title',
          text: `${err} Ошибка загрузки файла`,
        };
        ModalHandler.modalButton = {
          show: true,
          selector: '.error__button',
          text: 'Попробовать ещё раз',
        };
      })
      .finally(() => {
        ModalHandler.open();
        submitBtn.disabled = false;
      });
  };
};

export {ImgUpload};
