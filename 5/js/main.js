import {ThumbRender} from './thumbRender.js';
import {Posts} from './data.js';

const fragment = new DocumentFragment();
const template = document.querySelector('#picture').content;
const container = document.querySelector('.pictures');
Posts.forEach((el) => {
  fragment.appendChild(ThumbRender(template, el));
});

container.appendChild(fragment);

