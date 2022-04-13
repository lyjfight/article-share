## devtool

此选项控制是否生成，以及如何生成`source map`。`source map`是什么呢，在我们生产环境上，当产生报错时我们很难去定位报错的具体位置，因为生产环境下代码已经被一些babel，loader，压缩工具给丑化和压缩了，此时调试就特别困难，即使在开发环境，代码就是被编译过了的与源代码也是有很多不一致的地方。那如何让报错能够指定到对应的源文件且能准确的对应到具体的错行那行代码上，那答案就是source map，它能够将编译后的代码映射到源文件上。那如何使用source map呢，很简单，首先会根据源文件生成source map文件，我们可以通过webpack配置生成source map文件，之后在编译后的代码最后加入一行注释，指向source-map文件，注释内容为 `//# sourceMappingURL=bundle.js.map` 。浏览器会根据我们的注释，寻找soure map文件，并根据source map文件还原源代码，便于我们去调试。

在我们浏览器中读取soure map功能是默认开启的，在chrome中，在如下图位置开启

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78616c2917ea4e709049b4a6e039b594~tplv-k3u1fbpfcp-zoom-1.image)

那source map是怎么样的呢，我们通过webpack配置`devtool` 属性为 `'source-map'`

```js
module.exports = {
  //...
  mode: 'development',
  devtool: 'source-map'
  //...
}
```

重新打包后我们在打包输出文件除了**bundle.js**以外多了一个**bundle.js.map**文件

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20d1af6cfa93450182234f04943848b7~tplv-k3u1fbpfcp-zoom-1.image)

查看bundle.js文件我们可以看到文件最后注释 `sourceMappingURL` 指向了`bundle.js.map` 文件

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8142edc62f9e40fe8c0ebb461281678d~tplv-k3u1fbpfcp-zoom-1.image)

那我们就可以肯定这个**bundle.js.map**文件就是我们要的**source map**文件，那这个source map文件长什么样，我们对它做一个格式化

```json
{
  "version": 3,
  "file": "js/bundle.js",
  "mappings": "yBAIAA,QAAQC,IAAIC,KACZF,QAAQC,ICJCE,GDKTH,QAAQC,ICDCE,G",
  "sources": [
    "webpack://lyj-test-library/./src/main.js",
    "webpack://lyj-test-library/./src/js/priceFormat.js"
  ],
  "sourcesContent": [
    "// import { createComponent } from './js/component'\n// createComponent()\n\nimport { add, minus } from './js/priceFormat'\nconsole.log(abc)\nconsole.log(add(2, 3))\nconsole.log(minus(5, 3))\n",
    "const add = (a, b) => {\n  return a + b\n}\n\nconst minus = (a, b) => {\n  return a - b\n}\n\nexport {\n  add,\n  minus\n}"
  ],
  "names": [
    "console",
    "log",
    "abc",
    "a"
  ],
  "sourceRoot": ""
}
```

对里面每一个属性说明

-   `version`: 当前使用的版本，也是最新的第三版
-   `sources`: 从哪些文件转换过来的source-map和打包的代码(最初始的文件)
-   `names`: 转换前的变量和属性名称(如果使用的是development模式，就为空数组，也就不需要保留转换前的名称
-   `mappings`: source-map用来和源文件映射的信息(比如位置信息等)，一串base64 VLQ(veriable- length quantity可变长度值)编码
-   `file`: 打包后的文件(浏览器加载的文件)
-   `sourceContent`: 转换前的具体代码信息(和sources是对应的关系)
-   `sourceRoot`: 所有的sources相对的根目录

目前webpack5为处理source map给我们提供了26种选项，我们可以查看官网<https://webpack.docschina.org/configuration/devtool/>，官网为处理source map的每一个选项都做了快慢比较和区别，下么我们介绍下几种在我们开发测试发布中主要用到的选项。

首先介绍下三种不会出现source map的配置

-   `(none)` : devtool属性缺省，为production默认配置，不会生成source map
-   `eval` : 为development默认配置，它不会生成source map，但是在eval最后面添加 //# sourceURL= 注释，在我们调试时浏览器会跟给我们生成一些目录，方便我们调试
-   `false` : 不生产source map文件，也不会生成跟source map有关的一些内容

下面再介绍能生成source map的选项

### source-map

会生成一个bundle.js.map的source-map文件，在打包文件bundle.js最下面会有 `//# sourceMappingURL=bundle.js.map` 这样一条注释，它会帮我们指向source-map文件。并且在浏览器中打开错误能够定位到源代码的具体报错那一行，而且那一列开始报错也给我们指定出来了。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ed9f45ea21f420d9b8e3fc599327935~tplv-k3u1fbpfcp-zoom-1.image)

### eval-source-map

该选项不会生成.map文件，但是source map会以DataURL的方式添加到evel最后面，如 `//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64` 。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/227810330b5144af9615114e782c4699~tplv-k3u1fbpfcp-zoom-1.image)

同样的该配置也能定位到报错源代码具体的行和列位置

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5be5d9d705394a7da15c620e297d5195~tplv-k3u1fbpfcp-zoom-1.image)

### inline-source-map

该选项也不会生成.map文件，但是它会在打包文件bundle.js最下面以DataURL方式添加到文件最底下，如 `//# sourceMappingURL=data:application/json;charset=utf-8;base64` 。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2d8f47ee0244d0285fa9f3614f80485~tplv-k3u1fbpfcp-zoom-1.image)

同样也能在浏览器中定位到源代码具体的行和列位置

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0c402522d1e4b35bba2ff8a0d17a401~tplv-k3u1fbpfcp-zoom-1.image)

### cheap-soure-map

它跟source-map一样，会生成.map文件，也会在bundle.js最下面生成 `//# sourceMappingURL=bundle.js.map` 注释指向.map文件，不同的是一个低开销的生成方式，它没有列映射，因为在实际开发中我们定位到某一行就大概能分析出问题了。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c6fe4a08fac46669e2c6aecdd63ebee~tplv-k3u1fbpfcp-zoom-1.image)

但是这个选项有个问题，当我们使用loader对源码做了处理，该source map报错定位就处理了不那么好了，比如我们使用babel-loader处理我们的代码

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5c493c14541407d8657fe23a3e2477c~tplv-k3u1fbpfcp-zoom-1.image)

当我们重新定位报错位置后发现报错位置与源代码不符合了

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1f63d23f06e404a8ffaa910553db7a9~tplv-k3u1fbpfcp-zoom-1.image)

因此就出现了cheap-module-source-map配置。

### cheap-module-source-map

该选择与cheap-source-map的区别是它会对使用loader的soucre map处理更好。我们还是使用babel-loader处理。重新打包后定位到报错位置可以看到现在报错位置和源码所在位置以完全符合。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f29dd1aa806450b84f18ef629610ee3~tplv-k3u1fbpfcp-zoom-1.image)

### hidden-source-map

该选项会生成source map文件，但是在bundle.js文件最下面 `//# sourceMappingURL=bundle.js.map` 这条注释会被删除，这时就引用不了source map文件，如果在bundle.js下面手动添加上面这条注释，就又会生效。

### nosources-source-map

该选项会生成source map，在打包文件bundle.js下面也会有添加url注释，但是和source-map不同的是，bundle.js.map文件缺少了sourceContent属性

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/867ff06bab544d16bdcebb125485831b~tplv-k3u1fbpfcp-zoom-1.image)

因此只能产生报错信息，不能生成源文件。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3356bc9b781745048488b053031f2fb4~tplv-k3u1fbpfcp-zoom-1.image)

实际上webpack给了我们这么多的source map选项，是可以组合的，组合规则如下

-   `inline-|hidden-|eval`: 三个值时三选一
-   `nosources`: 可选值
-   `cheap`: 可选值，并且可以跟随 `module` 的值

模式规则总结 `[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map` 。

那我们在不同的环境下如何最优使用呢

-   **开发阶段** : 推荐使用 `source-map` 或者 `cheap-module-source-map`
-   -   这分别是vue和react使用的值，可以获取调试信息，方便快速开发
-   **测试阶段** : 推荐使用 `source-map` 或者 `cheap-module-source-map`
-   -   测试阶段我们也希望在浏览器下看到正确的错误提示
-   **发布阶段** : false、缺省值(不写)\