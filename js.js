var net = {
  nodes:{
    a:['b','d'],
    b:['a','c','e'],
    c:['b','f'],
    d:['a','e'],
    e:['b','d','f','h'],
    f:['c','e','i','b'],
    g:['d','h','e'],
    h:['e','g','i'],
    i:['f','h'],
  },
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

var spider = {
  route: [],
  net: net,
  position:'a',
  next:function () {
    this.route.push(this.position)

    if (this.position === 'i') {
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
      newSpider.next(newSpider.position)
    };
  },
  duplicate: function () {
    return $.extend(true, {}, this)
  },
}
