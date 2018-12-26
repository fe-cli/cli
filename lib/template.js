
let json;
let arr=[{
  name:'default',
  description: '测试包',
  url: 'github:fe-cli/temp_init'
},{
  name:'vue',
  description: 'pc',
  url: 'github:ithack/vueCMS'
},{
  name:'react',
  description: 'pc',
  url: 'github:ithack/vue-verify'
}]

exports.downTemp= temp=> {
  arr.map(item=>{if(item.name==temp)return json=item})
  return json
}
exports.list = arr;
