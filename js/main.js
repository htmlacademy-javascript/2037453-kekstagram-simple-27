function myRandom(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

function maxLength(str, max) {
  return str.length <= max
}

console.log(myRandom(5,8))

console.log(maxLength('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam beatae debitis deleniti quisquam totam. Ab architecto consequatur culpa deserunt, ex repellat veniam voluptatem voluptates? Deserunt itaque maxime repellendus sint. Architecto!', 50))
