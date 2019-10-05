const app = new Vue({
  el: '#app',
  data: {
    keywords : ["龙腾苑", "13号线"],
    // cities: ["北京", "上海", "南京"],
    groups : [
      {
        name: "北京昌平回龙观租房",
        id : 474785,
        enable : true
      },
      {
        name: "回龙观租房大汇总",
        id : 349187,
        enable : true
      },
      {
        name: "北京昌平回龙观周边租房小组",
        id : 450859,
        enable : true
      },
      {
        name: "回龙观租房/二手转让",
        id : 285322,
        enable : true
      },
    ],
    topics: []
  },

  created: async function created() {
    // https://api.douban.com/v2/group/husttgeek/topics?count=30
    let resultPromises = this.groups.filter(g => g.enable).map(g => fetch(`https://douban.uieee.com/v2/group/${g.id}/topics?count=50`))
    responses = await Promise.all(resultPromises)
    // responses.forEach(r => r.text().then(t => console.log(t)))
    for (let response of responses) {
      let topics = JSON.parse(await response.text()).topics
      // bad syntax for nesting, disaster compared to lisp/haskell
      this.topics = this.topics.concat(topics.filter(topic =>
                                                     this.keywords.some(keyword =>
                                                                        topic.title.includes(keyword))))
    }
  }
})
