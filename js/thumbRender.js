const ThumbRender = function (template, {
  url = 'no-photo.jpg',
  likes = 0,
  comments = 0
}) {
  const newPost = template.cloneNode(true);
  const newPostPicture = newPost.querySelector('.picture__img');
  newPostPicture.src = url;
  const newPostLikes = newPost.querySelector('.picture__likes');
  newPostLikes.textContent = String(likes);
  const newPostLikesComments = newPost.querySelector('.picture__comments');
  newPostLikesComments.textContent = String(comments);
  return newPost;
};

export {ThumbRender};
