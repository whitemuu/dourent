const fetch = require('node-fetch')

const keywords = ["龙腾苑", "13号线"],
const groups = [
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
]

async function load() {
  let resultPromises = this.groups.filter(g => g.enable).map(g => fetch(`http://45.77.112.62/v2/group/${g.id}/topics?count=20`))
  responses = await Promise.all(resultPromises)
  // responses.forEach(r => r.text().then(t => console.log(t)))
  for (let response of responses) {
    let topics = JSON.parse(await response.text()).topics
    // bad syntax for nesting, disaster compared to lisp/haskell
    this.topics = this.topics.concat(topics.filter(topic =>
                                                   this.keywords.some(keyword => topic.title.includes(keyword))))
  }
}

load()
