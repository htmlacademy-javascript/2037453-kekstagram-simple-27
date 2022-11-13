const ThumbRender = function (template, {
  url = 'no-photo.jpg',
  likes = 0,
  comments = 0,
  description = 'Случайная фотография',
}) {
  const newPost = template.cloneNode(true);
  const newPostLink = newPost.querySelector('.picture');
  newPostLink.href = url;
  const newPostPicture = newPost.querySelector('.picture__img');
  newPostPicture.src = url;
  newPostPicture.alt = description;
  const newPostLikes = newPost.querySelector('.picture__likes');
  newPostLikes.textContent = String(likes);
  const newPostLikesComments = newPost.querySelector('.picture__comments');
  newPostLikesComments.textContent = String(comments);
  return newPost;
};

export {ThumbRender};
