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
    const Modal = template.cloneNode(true);
    const ModalTitle = Modal.querySelector(modalHandler.modalTitle.selector);
    const ModalCancel = Modal.querySelector(modalHandler.modalButton.selector);
    ModalTitle.textContent = modalHandler.modalTitle.text;
    ModalCancel.textContent = modalHandler.modalButton.text;
    container.appendChild(Modal);
    modalHandler.target = container.querySelector(modalHandler.modal.selector);
    if (!modalHandler.modalButton.show) {
      ModalCancel.hidden = true;
      const timer = setTimeout(() => {
        modalHandler.target.remove();
        clearTimeout(timer);
      }, 3000);
    } else {
      ModalCancel.addEventListener('click', modalHandler.close);
      window.addEventListener('keydown', modalHandler.close);
    }
    document.body.style.overflow = 'hidden';
  },
  close: (evt) => {
    if (!!evt && (evt.type === 'click' || evt.key === 'Escape')) {
      const ErrorCancel = modalHandler.target.querySelector(modalHandler.modalButton.selector);
      ErrorCancel.removeEventListener('click', modalHandler.close);
      window.removeEventListener('keydown', modalHandler.close);
      modalHandler.target.remove();
      document.body.style.overflow = 'auto';
    }
  },
};
export {modalHandler};
