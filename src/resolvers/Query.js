export default {
  users(_, { query }, { db }) {
    if (!query) return db.users
    query = query.toLowerCase()
    return db.users.filter(({ name }) =>
      name.toLowerCase().includes(query)
    );
  },
  posts(_, { query }, { db }) {
    if (!query) return db.posts
    query = query.toLowerCase()
    return db.posts.filter(({ title, body }) =>
      (
        title.toLowerCase().includes(query)
        || body.toLowerCase().includes(query)
      )
    )
  },
  comments(_, { query }, { db }) {
    if (!query) return db.comments
    query = query.toLowerCase()
    return db.comments.filter(({ text }) =>
      text.toLowerCase().includes(query)
    )
  },
  me() {
    return {
      id: '123',
      name: 'Mike',
      email: 'mike@g.com',
    }
  },
  post() {
    return {
      id: '234',
      title: 'guide to swag',
      body: 'step 1 wear a top hat like Abe Lincoln',
      published: true,
    }
  }
}
