const sentences = [
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

const myRandom = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const maxLength = (str, max) => str.length <= max;

const generateRandomDescription = () => {
  const n = myRandom(1, 4);
  return Array
    .from({length: n}, () => sentences[myRandom(0, sentences.length - 1)])
    .join(' ');
};

const generatePhotoDetails = (i) => ({
  id: i,
  url: `photos/${i}.jpg`,
  description: generateRandomDescription(),
  likes: myRandom(15, 200),
  comments: myRandom(0, 200),
});

Array.from({length: 25}, (_, i) => generatePhotoDetails(i + 1));

maxLength('', 5);