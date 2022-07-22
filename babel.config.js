//项目发布阶段需要用到的 babel 插件
const plugins = []
//判断环境
if(process.env.NODE_ENV === 'production'){
  plugins.push("transform-remove-console")
}

module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset"
  ],
  "plugins": [
    //配置 ... 代表展开运算符
    ...plugins
  ]
}
