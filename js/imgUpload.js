import {UPLOAD_URL} from './settings.js';
import {closeByEsc, modalHandler} from './util.js';
import {imgEditor} from './imgEditor.js';

const container = document.querySelector('.pictures');

const setSuccessModal = function () {
  modalHandler.modal = {
    template: '#success',
    selector: '.success',
    container: container,
  };
  modalHandler.modalTitle = {
    selector: '.success__title',
    text: 'Изображение успешно загружено',
  };
  modalHandler.modalButton = {
    show: true,
    selector: '.success__button',
    text: 'Круто!',
  };
};

const setErrorModal = function (err) {
  modalHandler.modal = {
    template: '#error',
    selector: '.error',
    container: container,
  };
  modalHandler.modalTitle = {
    selector: '.error__title',
    text: `${err} Ошибка загрузки файла`,
  };
  modalHandler.modalButton = {
    show: true,
    selector: '.error__button',
    text: 'Попробовать ещё раз',
  };
};

const imgUpload = function () {
  imgEditor.init();
  imgEditor.fileForm.onsubmit = function (evt) {
    const submitBtn = imgEditor.fileForm.querySelector('#upload-submit');
    const formData = new FormData(imgEditor.fileForm);
    const valid = imgEditor.validator.validate();
    evt.preventDefault();
    if (!valid) {
      return false;
    }
    submitBtn.disabled = true;
    fetch(UPLOAD_URL, {
      method: 'post',
      body: formData,
    })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.status;
        }
        imgEditor.hideImgEditor();
        setSuccessModal();
      })
      .catch((err) => {
        setErrorModal(err);
      })
      .finally(() => {
        submitBtn.disabled = false;
        modalHandler.open();
        closeByEsc(modalHandler.close);
      });
  };
};
export {imgUpload};
