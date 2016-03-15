var TheWitness = function(net) {
  var witness = {}

  witness.main = function() {
    witness.net = net
    witness.spider = Spider(net, 'a')
  }

  witness.solve = function(end) {
    witness.spider.findWayTo(end)
    witness.solutions = witness.spider.solutions()
    witness.validate()
    console.log('总共解法数：', witness.solutions.length)
    _.each(witness.solutions, function(solution) {
      console.log('解法：', solution)
    })
  }

  witness.validate = function() {
    if (witness.net.hasOwnProperty('points')) {
      witness.validatePoint()
    }
  }

  witness.validatePoint = function() {
    witness.solutions = _.filter(witness.solutions, function(route) {
      var valid = true
      _.each(witness.net.points, function(point) {
        if (point.length === 1 && !route.includes(point[0])) {
          // 点在节点上的情况
          valid = false
          return
        } else if (point.length === 2) {
          // 点在边上的情况
          var _point = point.join()
          var _point2 = point.reverse().join()
          var _route = route.join()
          if (!_route.includes(_point) && !_route.includes(_point2)) {
            valid = false
            return
          }
        }
      })
      return valid
    })
  }

  witness.main()
  return witness
}

// 标准九宫图
var net = {
  nodes: {
    a: ['b', 'd'],
    b: ['a', 'c', 'e'],
    c: ['b', 'f'],
    d: ['a', 'e', 'g'],
    e: ['b', 'd', 'f', 'h'],
    f: ['c', 'e', 'i'],
    g: ['d', 'h'],
    h: ['e', 'g', 'i'],
    i: ['f', 'h'],
  },
  points: [
    ['d', 'e'],
    ['c', 'f']
  ]
}

var net2 = {
  nodes: {
    a: ['b', 'c'],
    b: ['a', 'i'],
    c: ['a', 'i'],
    i: ['c', 'b'],
  },
}

var newNet = {
  nodes: {
    a: ['d', 'c'],
    c: ['d', 'g'],
    d: ['a', 'b', 'f'],
    b: ['c', 'd', 'e', 'f'],
    e: ['b', 'f', 'g'],
    f: ['d', 'i'],
    g: ['c', 'e', 'i'],
    i: ['g', 'f'],
  }
}

var spidersCount = 1

function Spider(net, start) {
  var solutions = []
  var spider = {
    route: [],
    net: net,
    position: start,
    findWayTo: function(end) {
      this.route.push(this.position)
      if (this.position === end) {
        // console.log('小蜘蛛到达终点啦！路线是：',this.route)
        solutions.push(this.route)
        return this.route
      }

      for (var i = 0; i < this.net.nodes[this.position].length; i++) {
        var newSpider
        var nextPosition = this.net.nodes[this.position][i]
        if (this.route.indexOf(nextPosition) !== -1) {
          continue
        }

        newSpider = this.duplicate()
        spidersCount++
        newSpider.position = nextPosition
        newSpider.findWayTo(end)
      };
    },
    duplicate: function() {
      return $.extend(true, {}, this)
    },
    solutions: function() {
      return solutions
    }
  }

  return spider
}