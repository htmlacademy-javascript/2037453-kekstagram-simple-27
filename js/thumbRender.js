const ThumbRender = function(template, item) {
  const newPost = template.cloneNode(true);
  const picture = newPost.querySelector('.picture__img');
  picture.src = item.url;
  const likes = newPost.querySelector('.picture__likes');
  likes.textContent = item.likes;
  const comments = newPost.querySelector('.picture__comments');
  comments.textContent = item.comments;
  return newPost;
};

export {ThumbRender};
