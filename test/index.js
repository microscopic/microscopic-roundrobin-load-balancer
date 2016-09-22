'use strict'

const chai = require('chai')
const expect = chai.expect

const RoundRobinLoadBalancer = require('../lib/index')

describe('RoundRobinLoadBalancer', () => {
  describe('balance()', () => {
    it('should throw error if there are no nodes', () => {
      const loadBalancer = new RoundRobinLoadBalancer()

      const nodes = []

      expect(() => loadBalancer.balance(nodes)).to.throw()
    })

    it('should return first node', () => {
      const loadBalancer = new RoundRobinLoadBalancer()

      const nodes = [ { connection: 1 } ]

      for (let i = 0; i < 10; i++) {
        expect(loadBalancer.balance(nodes).connection).to.be.equal(1)
      }
    })

    it('should return correct node', () => {
      const loadBalancer = new RoundRobinLoadBalancer()

      const nodes = []
      for (let i = 0; i < 10; i++) {
        nodes.push({ connection: i })
      }

      for (let i = 0; i < 20; i++) {
        const node = loadBalancer.balance(nodes)

        expect(node.connection).to.be.equal(i - (i < 10 ? 0 : 10))
      }
    })
  })
})
