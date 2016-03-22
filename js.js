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
  walls: [
      ['a', 'b'],
      ['b', 'c'],
      ['c', 'f'],
      ['f', 'i'],
      ['h', 'i'],
      ['g', 'h'],
      ['d', 'g'],
      ['a', 'd'],
    ]
    // points: [
    //   ['d', 'e'],
    //   ['c', 'f']
    // ]
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

var xiaoyudewang = {
  nodes: {
    a: ['c', 'b'],
    b: ['a', 'c', 'd', 'e', 'f'],
    c: ['a', 'b', 'd', 'h', 'g'],
    d: ['b', 'c', 'h', 'e'],
    e: ['b', 'd', 'f', 'h'],
    f: ['b', 'e', 'i', 'h', 'j'],
    g: ['c', 'h', 'k'],
    h: ['c', 'g', 'd', 'e', 'f', 'i', 'l'],
    i: ['f', 'j', 'h', 'l'],
    j: ['f', 'i', 'l'],
    k: ['g', 'l'],
    l: ['k', 'h', 'i', 'j'],
    j: ['f', 'i', 'l'],
  },
  points: [
    ['a'],
    ['d'],
    ['e'],
    ['i', 'j']
  ]
}

var Map = function(net) {
  var map = {}
  map.net = net
  map.edges = []

  map.init = function(argument) {
    map.allEdges()
  }

  // 图的基本操作
  /**
   * [addEdge description]
   * @param {[type]} edge ['a','b']
   */
  // 判断边是否在某个边的数组中，不傳array就是map.edges
  map.isEdgeExist = function(edge, array) {
    var exist = false
    var textArray
    if (array) {
      textArray = array
    } else {
      textArray = map.edges
    }
    textArray.forEach(function(e) {
      if (map.isEqual(e, edge)) {
        exist = true
      }
    })
    return exist
  
  // 判断两条边是否为同一条边
  map.isEqual = function(e1, e2) {
    if (_.isEqual(e1.sort(), e2.sort())) {
      return true
    }
    return false
  }

  map.addEdge = function(edge) {
    if (!map.net.nodes[edge[0]].includes(edge[1])) {
      map.net.nodes[edge[0]].push(edge[1])
    }
    if (!map.net.nodes[edge[1]].includes(edge[0])) {
      map.net.nodes[edge[1]].push(edge[0])
    }
  }
  map.deleteEdge = function(edge) {
    if (map.net.nodes[edge[0]].includes(edge[1])) {
      map.net.nodes[edge[0]] = _.without(map.net.nodes[edge[0]], edge[1])
    }
    if (map.net.nodes[edge[1]].includes(edge[0])) {
      map.net.nodes[edge[1]] = _.without(map.net.nodes[edge[1]], edge[0])
    }
  }
  map.allEdges = function() {
    _.forEach(map.net.nodes, function(nodes, key) {
      nodes.forEach(function(node) {
        var e = [key, node]
        if (!map.isEdgeExist(e)) {
          map.edges.push(e)
        }
      })
    })
    return map.edges
  }

  // 图的区域操作
  map.allAreas = function() {
    // _.forEach(map.net.nodes, function (nodes, key) {
  }
  map.circle = function(n) {
      var circle
      _.forEach(map.net.nodes[n], function(node) {

      })
    }

  // 根据路线取得路线经过的边
  map.getRouteEdges = function(route) {
    var path = []
    for (var i = 0; i < route.length - 1; i++) {
      path.push([route[i], route[i + 1]])
    };
    return path
  }

  // 根据路线取得图的墙和路线所包括的边
  map.getCutMapEdges = function(route) {
    var cutMapEdges
    var path = map.getRouteEdges(route)
    var wallPath = _.union(path, map.net.walls)
    cutMapEdges = map.edges.filter(function(e) {
      return map.isEdgeExist(e, wallPath)
    })
    return cutMapEdges
  }

  // 根据所有的边生成一个新的图
  map.generateMapByEdges = function(edges) {
    var newMap = Map({
      nodes: {}
    })
    edges.forEach(function(e) {
      var e1 = e[0]
      var e2 = e[1]
      if (!newMap.net.nodes.hasOwnProperty(e1)) {
        newMap.net.nodes[e1] = [];
      }
      if (!newMap.net.nodes.hasOwnProperty(e2)) {
        newMap.net.nodes[e2] = [];
      }
      newMap.addEdge(e)
    })
    return newMap
  }

  // 根据路线和已有的墙生成一个新的图
  map.getNewMapByRoute = function(route) {
    var edges = map.getCutMapEdges(route)
    return map.generateMapByEdges(edges)
  }

  map.init()
  return map
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
    // bfs: function (end, first) {
    //   this.route.push(this.position)
    //   if (first && this.position === end) {
    //     // console.log('小蜘蛛到达终点啦！路线是：',this.route)
    //     solutions.push(this.route)
    //     return this.route
    //   }

    //   for (var i = 0; i < this.net.nodes[this.position].length; i++) {
    //     var level
    //     var newSpider
    //     var nextPosition = this.net.nodes[this.position][i]
    //     if (this.route.indexOf(nextPosition) !== -1) {
    //       continue
    //     }

    //     newSpider = this.duplicate()
    //     spidersCount++
    //     newSpider.position = nextPosition
    //     level.push(newSpider)
    //   };

    //   level.forEach(function (ns) {
    //     ns.findWayTo(end)
    //   })

    // var i, n, newLevel = []

    // level = level || map.net.nodes[s];
    // var route = _.extend([], r)

    // route.push(s)

    // for (var i = 0; i < level.length; i++) {
    //   n = level[i]
    //   if (n === z) {
    //     return route
    //   }
    //   if (!route.includes(n)) {
    //     newLevel = newLevel.concat(map.net.nodes[n])
    //   }
    // };

    // map.bfs(n, z, route, level)
    // },
    duplicate: function() {
      return $.extend(true, {}, this)
    },
    solutions: function() {
      return solutions
    }
  }
  return spider
}

m = Map(net)
w = TheWitness(net)