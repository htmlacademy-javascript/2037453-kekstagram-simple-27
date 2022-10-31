// Всем необходимым элементам добавил id,
// потому что у меня бзик - классы для стилей, id (иногда data) для скриптов,
// теги - зло :)
const ImgEditor = {
  imgScale: 1,
  imgScaleMin: .25,
  imgScaleMax: 1,
  imgScaleStep: .25,
  imgEffects: {
    chrome: {
      name: 'grayscale',
      min: 0,
      max: 1,
      step: .1,
      unit: '',
    },
    sepia: {
      name: 'sepia',
      min: 0,
      max: 1,
      step: .1,
      unit: '',
    },
    marvin: {
      name: 'invert',
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
    },
    phobos: {
      name: 'blur',
      min: 0,
      max: 3,
      step: .1,
      unit: 'px',
    },
    heat: {
      name: 'brightness',
      min: 1,
      max: 3,
      step: .1,
      unit: '',
    },
  },
  init() {
    this.fileForm = document.querySelector('#upload-select-image');
    this.fileUpload = this.fileForm.querySelector('#upload-file');
    this.uploadCancel = this.fileForm.querySelector('#upload-cancel');
    this.imgEditor = this.fileForm.querySelector('#img-editor');
    this.imgPreview = this.fileForm.querySelector('#img-preview img');
    this.imgAddEffect = this.fileForm.querySelector('#img-effects');
    this.imgEffectValue = this.fileForm.querySelector('#img-effect-value');
    this.imgScaleHandler = this.fileForm.querySelector('#img-scale');
    this.imgScaleValue = this.imgScaleHandler.querySelector('#img-scale-value');
    this.fileUpload.addEventListener('change', this.showImgEditor);
  },
  setImgScale(evt) {
    if (evt?.target.classList.contains('scale__control--smaller')) {
      ImgEditor.imgScale -= ImgEditor.imgScaleStep;
    }
    if (evt?.target.classList.contains('scale__control--bigger')) {
      ImgEditor.imgScale += ImgEditor.imgScaleStep;
    }
    ImgEditor.imgScale = Math.max(Math.min(ImgEditor.imgScale, ImgEditor.imgScaleMax), ImgEditor.imgScaleMin);
    ImgEditor.imgScaleValue.value = `${ImgEditor.imgScale * 100}%`;
    ImgEditor.imgPreview.style.transform = `scale(${ImgEditor.imgScale})`;
  },
  setImgEffect(evt) {
    ImgEditor.clearImgEffect();
    const effect = evt?.target.value;
    if (ImgEditor.imgEffects?.[effect]) {
      ImgEditor.currentImgEffect = ImgEditor.imgEffects[effect];
      ImgEditor.imgPreview.classList.add(`effects__preview--${effect}`);
      ImgEditor.imgAddEffectHandler = noUiSlider.create(ImgEditor.fileForm.querySelector('#img-effect-level'), {
        connect: 'lower',
        start: ImgEditor.currentImgEffect.max,
        range: {
          'min': ImgEditor.currentImgEffect.min,
          'max': ImgEditor.currentImgEffect.max,
        },
        step: ImgEditor.currentImgEffect.step,
      });
      ImgEditor.imgAddEffectHandler.on('update', (val) => {
        ImgEditor.imgPreview.style.filter = `${ImgEditor.currentImgEffect.name}(${val[0]}${ImgEditor.currentImgEffect.unit})`;
      });
      ImgEditor.imgAddEffectHandler.on('change', (val) => {
        // Интересная идея с приведением типов. Превращаем true/false в 1/0
        const fractionalSize = Number(Number.isInteger(ImgEditor.currentImgEffect.step));
        ImgEditor.imgEffectValue.value = Number(val).toFixed(fractionalSize);
      });
    }
  },
  clearImgEffect() {
    this.imgEffectValue.value = '';
    this.imgPreview.removeAttribute('class');
    this.imgPreview.style.filter = null;
    // Если применен плагин - сносим.
    if (this.imgAddEffectHandler) {
      this.imgAddEffectHandler.destroy();
    }
  },
  resetImgChanges() {
    this.imgScale = 1;
    this.fileUpload.value = null;
    this.clearImgEffect();
  },
  showImgEditor() {
    // Пока не придумал, как обойти потерю окружения,
    // при этом сохранить оригинал функции, а не копию, которую дает bind.
    ImgEditor.setImgScale();
    ImgEditor.uploadCancel.addEventListener('click', ImgEditor.hideImgEditor);
    ImgEditor.imgAddEffect.addEventListener('change', ImgEditor.setImgEffect);
    ImgEditor.imgScaleHandler.addEventListener('click', ImgEditor.setImgScale);
    window.addEventListener('keyup', ImgEditor.hideImgEditor);
    ImgEditor.imgEditor.classList.remove('hidden');
  },
  hideImgEditor(evt) {
    // Хоть я и придерживаюсь числового кода нажатых клавиш
    if (evt?.key === 'Escape' || evt?.type === 'click') {
      ImgEditor.imgEditor.classList.add('hidden');
      ImgEditor.resetImgChanges();
      evt.currentTarget.removeEventListener(evt.type, ImgEditor.hideImgEditor);
    }
  },
};

export {ImgEditor};
