const SENTENCES = [
  'Proin lacinia leo eu sapien semper cursus. Etiam tortor eros, fringilla quis finibus at, pretium tincidunt orci.',
  'Nam id justo at enim fringilla tempor ut quis massa.',
  'Morbi rhoncus mattis ex vehicula vulputate.',
  'Curabitur ornare, nisi quis bibendum egestas, sem est vulputate libero, quis mollis erat nunc sed lectus.',
  'Phasellus in tortor rhoncus, venenatis leo eu, facilisis enim.',
  'Pellentesque eu congue augue.',
  'Aliquam at laoreet arcu, varius rhoncus lacus.',
  'Praesent sem massa, tempor quis mauris eget, feugiat semper est.',
  'Integer dignissim varius ex quis euismod. Donec commodo dolor mauris, nec maximus libero tristique eget.',
  'Duis viverra est euismod leo finibus, at pellentesque mauris consectetur.',
  'Fusce ullamcorper, felis non imperdiet volutpat, nibh magna pellentesque nunc, ac venenatis ligula felis vel mauris.',
  'Nunc in justo mollis, mollis dui vel, elementum leo.',
  'Etiam lobortis laoreet nibh, posuere posuere sapien commodo eu.',
  'Aliquam pretium ornare magna a volutpat.',
  'Integer ut felis pulvinar, sollicitudin ex cursus, consectetur dui.',
  'Quisque ut dignissim augue, ut condimentum dolor.',
  'Sed luctus ante id euismod consequat.',
  'Fusce efficitur nunc nec erat ullamcorper, at mattis lectus feugiat.'
];

const POST_COUNT = 25;

const DOWNLOAD_URL = 'https://27.javascript.pages.academy/kekstagram-simple/data';

const UPLOAD_URL = 'https://27.javascript.pages.academy/kekstagram-simple';

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

export {SENTENCES, POST_COUNT, DOWNLOAD_URL, UPLOAD_URL, IMG_PARAMS, FILE_TYPES};

