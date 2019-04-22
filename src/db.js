// demo data
const users = [
  {
    id: '1',
    name: 'Andrew',
    email: 'a@g.com',
    age: 28,
  },
  {
    id: '2',
    name: 'Bill',
    email: 'b@g.com',
  },
  {
    id: '3',
    name: 'Kate',
    email: 'k@g.com',
  },
]
const posts = [
  {
    id: '1',
    title: 'a post',
    body: 'the best post',
    published: true,
    author: '1',
  },
  {
    id: '2',
    title: 'a cool post',
    body: 'the coolest post',
    published: true,
    author: '1',
  },
  {
    id: '3',
    title: 'a bad post',
    body: 'the worst post',
    published: false,
    author: '3',
  }
]
const comments = [
  {
    id: '1',
    text: 'a comment',
    author: '1',
    post: '2',
  },
  {
    id: '2',
    text: 'another comment',
    author: '1',
    post: '2',
  },
  {
    id: '3',
    text: 'another one',
    author: '1',
    post: '3',
  },
  {
    id: '4',
    text: 'another great one',
    author: '3',
    post: '2',
  },
]

export default {
  users,
  posts,
  comments,
}
