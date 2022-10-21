const ThumbRender = function(template, item) {
  const newPost = template.cloneNode(true);
  const picture = newPost.querySelector('.picture__img');
  picture.src = item?.url || 'no-photo.jpg';
  const likes = newPost.querySelector('.picture__likes');
  likes.textContent = item?.likes || '0';
  const comments = newPost.querySelector('.picture__comments');
  comments.textContent = item?.comments || '0';
  return newPost;
};

export {ThumbRender};
