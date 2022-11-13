import {SENTENCES} from './settings.js';

const ModalHandler = {
  target: null,
  modal: {
    template: null,
    selector: null,
    container: null,
  },
  modalTitle: {
    selector: null,
    text: null,
  },
  modalButton: {
    show: true,
    selector: null,
    text: null,
  },
  buttonText: null,
  open: () => {
    const template = document.querySelector(ModalHandler.modal.template).content;
    const container = ModalHandler.modal.container;
    const Modal = template.cloneNode(true);
    const ModalTitle = Modal.querySelector(ModalHandler.modalTitle.selector);
    const ModalCancel = Modal.querySelector(ModalHandler.modalButton.selector);
    ModalTitle.textContent = ModalHandler.modalTitle.text;
    ModalCancel.textContent = ModalHandler.modalButton.text;
    container.appendChild(Modal);
    ModalHandler.target = container.querySelector(ModalHandler.modal.selector);
    if (!ModalHandler.modalButton.show) {
      ModalCancel.hidden = true;
      const timer = setTimeout(() => {
        ModalHandler.target.remove();
        clearTimeout(timer);
      }, 3000);
    } else {
      ModalCancel.addEventListener('click', ModalHandler.close);
      window.addEventListener('keydown', ModalHandler.close);
    }
    document.body.style.overflow = 'hidden';
  },
  close: (evt) => {
    if (!!evt && (evt.type === 'click' || evt.key === 'Escape')) {
      const ErrorCancel = ModalHandler.target.querySelector(ModalHandler.modalButton.selector);
      ErrorCancel.removeEventListener('click', ModalHandler.close);
      window.removeEventListener('keydown', ModalHandler.close);
      ModalHandler.target.remove();
      document.body.style.overflow = 'auto';
    }
  },
};

const MaxLength = (str, max) => str.length <= max;

const MyRandom = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const GenerateRandomDescription = () => {
  const n = MyRandom(1, 4);
  return Array
    .from({length: n}, () => SENTENCES[MyRandom(0, SENTENCES.length - 1)])
    .join(' ');
};

const GeneratePhotoDetails = (i) => ({
  id: i,
  url: `photos/photo${String(i).padStart(2, '0')}.jpg`,
  description: GenerateRandomDescription(),
  likes: MyRandom(15, 200),
  comments: MyRandom(0, 200),
});

export {MaxLength, MyRandom, GenerateRandomDescription, GeneratePhotoDetails, ModalHandler};
