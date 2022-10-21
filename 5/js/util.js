import {SENTENCES} from './settings.js';

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

export {MaxLength, MyRandom, GenerateRandomDescription, GeneratePhotoDetails};
