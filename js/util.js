const modalHandler = {
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
    const template = document.querySelector(modalHandler.modal.template).content;
    const container = modalHandler.modal.container;
    const modal = template.cloneNode(true);
    const modalTitle = modal.querySelector(modalHandler.modalTitle.selector);
    const modalCancel = modal.querySelector(modalHandler.modalButton.selector);
    modalTitle.textContent = modalHandler.modalTitle.text;
    modalCancel.textContent = modalHandler.modalButton.text;
    container.appendChild(modal);
    modalHandler.target = container.querySelector(modalHandler.modal.selector);
    if (modalHandler.modalButton.show) {
      modalCancel.addEventListener('click', modalHandler.close, {once: true});
    } else {
      modalCancel.hidden = true;
      const timer = setTimeout(() => {
        modalHandler.target.remove();
        clearTimeout(timer);
      }, 3000);
    }
    document.body.style.overflow = 'hidden';
  },
  close: () => {
    modalHandler.target.remove();
    document.body.style.overflow = 'auto';
  },
};
// Вынес слушателя нажатия Esc на windows в отдельную функцию, с вызовом callback для дальнейших действий.
const closeByEsc = function (cb) {
  const _close = function (evt) {
    if (evt.key === 'Escape') {
      window.removeEventListener('keydown', _close);
      cb();
    }
  };
  window.addEventListener('keydown', _close);
};

export {modalHandler, closeByEsc};
