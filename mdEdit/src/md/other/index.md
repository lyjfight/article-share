## other

此选项控制是否生成，以及如何生成`source map`。`source map`是什么呢，在我们生产环境上，当产生报错时我们很难去定位报错的具体位置，因为生产环境下代码已经被一些babel，loader，压缩工具给丑化和压缩了，此时调试就特别困难，即使在开发环境，代码就是被编译过了的与源代码也是有很多不一致的地方。那如何让报错能够指定到对应的源文件且能准确的对应到具体的错行那行代码上，那答案就是source map，它能够将编译后的代码映射到源文件上。那如何使用source map呢，很简单，首先会根据源文件生成source map文件，我们可以通过webpack配置生成source map文件，之后在编译后的代码最后加入一行注释，指向source-map文件，注释内容为 `//# sourceMappingURL=bundle.js.map` 。浏览器会根据我们的注释，寻找soure map文件，并根据source map文件还原源代码，便于我们去调试。

在我们浏览器中读取soure map功能是默认开启的，在chrome中，在如下图位置开启
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