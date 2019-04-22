export default {
  author(parent, _, { db }) {
    return db.users.find(({ id }) => 
      id === parent.author
    )
  },
  comments(parent, _, { db }) {
    return db.comments.filter(({ post }) =>
      post == parent.id
    )
  }
}
  