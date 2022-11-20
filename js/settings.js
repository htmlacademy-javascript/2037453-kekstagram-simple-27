const DOWNLOAD_URL = 'https://27.javascript.pages.academy/kekstagram-simple/data';
const UPLOAD_URL = 'https://27.javascript.pages.academy/kekstagram-simple1';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const IMG_PARAMS = {
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
};
export {DOWNLOAD_URL, UPLOAD_URL, IMG_PARAMS, FILE_TYPES};
