var TheWitness = function (net, Spider) {
  var witness = {}

  witness.main = function () {
    witness.net = net
    witness.spider = Spider(net,'a')
  }

  witness.solve = function( end){
    witness.spider.next(end)
  }

  witness.main()
  return witness
}

var net = {
  nodes:{
    a:['b','d'],
    b:['a','c','e'],
    c:['b','f'],
    d:['a','e','f'],
    e:['b','d','f','h'],
    f:['c','e','i'],
    g:['d','h'],
    h:['e','g','i'],
    i:['f','h'],
  },
  point:[
    ['d','e'],
    ['b']
  ]
}

var net2 = {
  nodes:{
    a:['b','c'],
    b:['a','i'],
    c:['a','i'],
    i:['c','b'],
  },
}

var newNet ={
  nodes:{
    a:['d','c'],
    c:['d','g'],
    d:['a','b','f'],
    b:['c','d','e','f'],
    e:['b','f','g'],
    f:['d','i'],
    g:['c','e','i'],
    i:['g','f'],
  }
}

var spidersCount = 1

function Spider (net, start) {
  var spider = {
    route: [],
    net: net,
    position: start,
    next:function (end) {
      this.route.push(this.position)
      if (this.position === end) {
        console.log('小蜘蛛到达终点啦！路线是：',this.route)
        return false
      }

      for (var i = 0; i < this.net.nodes[this.position].length; i++) {
        var newSpider
        var nextPosition = this.net.nodes[this.position][i]
        if (this.route.indexOf(nextPosition)!==-1){
          continue
        }

        newSpider = this.duplicate()
        newSpider.position = nextPosition
        newSpider.next(end)
      };
    },
    duplicate: function () {
      return $.extend(true, {}, this)
    },
  }

  return spider
}