// Всем необходимым элементам добавил id,
// потому что у меня бзик - классы для стилей, id (иногда data) для скриптов,
// теги - зло :)
import {IMG_PARAMS, FILE_TYPES} from './settings.js';

const ImgEditor = {
  imgScale: IMG_PARAMS.imgScale,
  imgScaleMin: IMG_PARAMS.imgScaleMin,
  imgScaleMax: IMG_PARAMS.imgScaleMax,
  imgScaleStep: IMG_PARAMS.imgScaleStep,
  imgEffects: IMG_PARAMS.imgEffects,
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
  reset() {
    this.imgEditor.classList.add('hidden');
    ImgEditor.imgPreview.src = 'img/upload-default-image.jpg';
    this.resetImgChanges();
    this.uploadCancel.removeEventListener('click', ImgEditor.hideImgEditor);
    window.removeEventListener('keyup', ImgEditor.hideImgEditor);
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
    this.imgAddEffect.removeEventListener('change', this.setImgEffect);
    this.imgScaleHandler.removeEventListener('click', this.setImgScale);
    this.clearImgEffect();
  },
  showImgEditor() {
    // Пока не придумал, как обойти потерю окружения,
    // при этом сохранить оригинал функции, а не копию, которую дает bind.
    const file = ImgEditor.fileUpload.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((el) => fileName.endsWith(el));
    if(matches) {
      ImgEditor.imgPreview.src = URL.createObjectURL(file);
      ImgEditor.setImgScale();
      ImgEditor.uploadCancel.addEventListener('click', ImgEditor.hideImgEditor);
      ImgEditor.imgAddEffect.addEventListener('change', ImgEditor.setImgEffect);
      ImgEditor.imgScaleHandler.addEventListener('click', ImgEditor.setImgScale);
      window.addEventListener('keyup', ImgEditor.hideImgEditor);
      ImgEditor.imgEditor.classList.remove('hidden');
    }
  },
  hideImgEditor(evt) {
    // Хоть я и придерживаюсь числового кода нажатых клавиш
    if (evt?.key === 'Escape' || evt?.type === 'click') {
      ImgEditor.reset();
    }
  },
};

export {ImgEditor};
