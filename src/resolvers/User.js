export default {
  posts(parent, _, { db }) {
    return db.posts.filter(({ author }) =>
      author == parent.id
    )
  },
  comments(parent, _, { db }) {
    return db.comments.filter(({ author }) =>
      author == parent.id
    )
  }
}
