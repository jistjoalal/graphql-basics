export default {
  count: {
    subscribe(p, a, { pubsub }) {
      let count = 0
      setInterval(() => {
        count++
        pubsub.publish('count', {
          count,
        })
      }, 1000)
      return pubsub.asyncIterator('count')
    }
  },
  comment: {
    subscribe(p, { postId }, { db, pubsub }) {
      const post = db.posts.find(({ id, published }) => id == postId && published)
      if (!post) {
        throw new Error('Post not found.')
      }
      return pubsub.asyncIterator(`comment ${postId}`)
    }
  }
}
