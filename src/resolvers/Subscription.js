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
  }
}
