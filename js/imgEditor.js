/*
* Pristine - плагин кастомизации валидации формы
* noUiSlider - плагин кастомизации range
* */
import {FILE_TYPES, IMG_PARAMS} from './settings.js';
import {closeByEsc} from './util.js';

const imgEditor = {
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
    this.validator = new Pristine(this.fileForm);
  },
  setImgScale(evt) {
    if (evt?.target.classList.contains('scale__control--smaller')) {
      imgEditor.imgScale -= imgEditor.imgScaleStep;
    }
    if (evt?.target.classList.contains('scale__control--bigger')) {
      imgEditor.imgScale += imgEditor.imgScaleStep;
    }
    imgEditor.imgScale = Math.max(Math.min(imgEditor.imgScale, imgEditor.imgScaleMax), imgEditor.imgScaleMin);
    imgEditor.imgScaleValue.value = `${imgEditor.imgScale * 100}%`;
    imgEditor.imgPreview.style.transform = `scale(${imgEditor.imgScale})`;
  },
  setImgEffect(evt) {
    imgEditor.clearImgEffect();
    const effect = evt?.target.value;
    if (imgEditor.imgEffects?.[effect]) {
      imgEditor.currentImgEffect = imgEditor.imgEffects[effect];
      imgEditor.imgPreview.classList.add(`effects__preview--${effect}`);
      imgEditor.imgAddEffectHandler = noUiSlider.create(imgEditor.fileForm.querySelector('#img-effect-level'), {
        connect: 'lower',
        start: imgEditor.currentImgEffect.max,
        range: {
          'min': imgEditor.currentImgEffect.min,
          'max': imgEditor.currentImgEffect.max,
        },
        step: imgEditor.currentImgEffect.step,
      });
      imgEditor.imgAddEffectHandler.on('update', (val) => {
        imgEditor.imgPreview.style.filter = `${imgEditor.currentImgEffect.name}(${val[0]}${imgEditor.currentImgEffect.unit})`;
      });
      imgEditor.imgAddEffectHandler.on('change', (val) => {
        const fractionalSize = Number(Number.isInteger(imgEditor.currentImgEffect.step));
        imgEditor.imgEffectValue.value = Number(val).toFixed(fractionalSize);
      });
    }
  },
  clearImgEffect() {
    this.imgEffectValue.value = '';
    this.imgPreview.removeAttribute('class');
    this.imgPreview.style.filter = null;
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
    const file = imgEditor.fileUpload.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((el) => fileName.endsWith(el));
    if (matches) {
      imgEditor.imgPreview.src = URL.createObjectURL(file);
      imgEditor.setImgScale();
      imgEditor.uploadCancel.addEventListener('click', imgEditor.hideImgEditor);
      imgEditor.imgAddEffect.addEventListener('change', imgEditor.setImgEffect);
      imgEditor.imgScaleHandler.addEventListener('click', imgEditor.setImgScale);
      imgEditor.imgEditor.classList.remove('hidden');
      closeByEsc(imgEditor.hideImgEditor);
    }
  },
  hideImgEditor() {
    imgEditor.imgEditor.classList.add('hidden');
    imgEditor.imgPreview.src = 'img/upload-default-image.jpg';
    imgEditor.resetImgChanges();
    imgEditor.uploadCancel.removeEventListener('click', imgEditor.hideImgEditor);
    imgEditor.fileForm.reset();
    imgEditor.validator.reset();
  },
};
export {imgEditor};
