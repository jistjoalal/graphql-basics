export default {
  author(parent, _, { db }) {
    return db.users.find(({ id }) =>
      id == parent.author
    )
  },
  post(parent, _, { db }) {
    return db.posts.find(({ id }) =>
      id == parent.post
    )
  }
}
