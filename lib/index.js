'use strict'

const LoadBalancer = require('microscopic-load-balancer')

class RoundRobinLoadBalancer extends LoadBalancer {
  /**
   * @inheritDoc
   */
  balance (nodes) {
    if (!nodes || !nodes.length) {
      throw new Error()
    }

    if (nodes.length === 1) {
      return nodes[ 0 ]
    }

    // Get first node
    const node = nodes.shift()
    // Add node at the end of the list
    nodes.push(node)

    return node
  }
}

module.exports = RoundRobinLoadBalancer
