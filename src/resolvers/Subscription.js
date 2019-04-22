export default {
  comment: {
    subscribe(p, { postId }, { db, pubsub }) {
      const post = db.posts.find(({ id, published }) => id == postId && published)
      if (!post) {
        throw new Error('Post not found.')
      }
      return pubsub.asyncIterator(`comment ${postId}`)
    }
  },
  post: {
    subscribe(p, a, { pubsub }) {
      return pubsub.asyncIterator('post')
    }
  }
}
