# babel的介绍

Babel 是一个转译器，主要用于将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

## babel 的用途

平时主要用 babel 来做一下几方面：

-   语法转换，这个是最常用的功能，可以把代码中的 esnext 的新的语法、typescript 的语法转成基于目标环境支持的语法
-   通过 Polyfill 方式在目标环境中添加缺失的特性 （通过引入第三方 polyfill 模块，例如 [core-js](https://github.com/zloirock/core-js)）
-   源码转换（codemods），比如小程序转译工具 taro 的编译

babel7 支持了 `preset-env`，可以指定 targets 来进行按需转换


## babel 的编译流程

babel 是 源码 到 源码 的转换，整体编译流程分为三步：

-   `parse`：通过 parser 把源码转成抽象语法树（AST）
-   `transform`：遍历 AST，调用各种 transform 插件对 AST 进行增删改
-   `generate`：把转换后的 AST 打印成目标代码，并生成 sourcemap


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fd652d544fb4cc29dd8882c82b8fad6~tplv-k3u1fbpfcp-watermark.image?)


### parse

parse 阶段的目的是把源码字符串转换成机器能够理解的 AST，这个过程分为词法分析、语法分析。

比如 `let name = 'li';` 这样一段源码，我们要先把它分成一个个不能细分的单词（token），也就是 `let`, `name`, `=`, `'li'`，这个过程是词法分析，按照单词的构成规则来拆分字符串成单词。

之后要把 token 进行递归的组装，生成 AST，这个过程是语法分析，按照不同的语法结构，来把一组单词组合成对象，比如声明语句、赋值表达式等都有对应的 AST 节点。


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44a7a851ddc44109955a2e889ec353c0~tplv-k3u1fbpfcp-watermark.image?)

[AST可视化网站](https://astexplorer.net/#/gist/3af72fdd39c4950fd8afbcd488a18f7f/1b1b86d2c89d01c2570b903d3cb157faf6e124db)

### transform

transform 阶段是对 parse 生成的 AST 的处理，会进行 AST 的遍历，遍历的过程中处理到不同的 AST 节点对 AST 节点进行增删改，返回新的 AST。


### generate

generate 阶段会把 AST 打印成目标代码字符串，并且会生成 sourcemap。不同的 AST 对应的不同结构的字符串。比如 `IfStatement` 就可以打印成 `if(test) {}` 格式的代码。这样从 AST 根节点进行递归的字符串拼接，就可以生成目标代码的字符串。


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/251b958e353d437792d1b661261a962d~tplv-k3u1fbpfcp-watermark.image?)

sourcemap 记录了源码到目标代码的转换关系，通过它我们可以找到目标代码中每一个节点对应的源码位置，用于调试的时候把编译后的代码映射回源码，或者线上报错的时候把报错位置映射到源码。

babel 的整个编译流程都是围绕 AST 来的，对于AST可以做一下事情

-   linter 工具就是分析 AST 的结构，对代码规范进行检查。
-   api 文档自动生成工具，可以提取源码中的注释，然后生成文档。
-   type checker 会根据从 AST 中提取的或者推导的类型信息，对 AST 进行类型是否一致的检查，从而减少运行时因类型导致的错误。
-   压缩混淆工具，这个也是分析代码结构，进行删除死代码、变量名混淆、常量折叠等各种编译优化，生成体积更小、性能更优的代码。


## AST 节点

AST 是对源码的抽象，字面量、标识符、表达式、语句、模块语法、class 语法都有各自的 AST。

### Literal

Literal 是字面量的意思，比如 `let name = 'li'`中，`'li'`就是一个字符串字面量 StringLiteral，相应的还有数字字面量 NumericLiteral，布尔字面量 BooleanLiteral，字符串字面量 StringLiteral，正则表达式字面量 RegExpLiteral 等。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0aea1cbf9d9f4019b0b7744765f1e80b~tplv-k3u1fbpfcp-watermark.image?)

除上面这些这几种类型外，还有很多字面量。babel 就是通过 `xxxLiteral` 来抽象这部分内容的。

### Identifier

Identifer 是标识符的意思，变量名、属性名、参数名等各种声明和引用的名字，都是Identifer。

```js
const name = 'li';

function say(name) {
  console.log(name);
}

const obj = {
  name: 'li'
}
```

比如上面这段代码中包含的 Identifer 有如下

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2740953e8744df0848e7df2cdcdf451~tplv-k3u1fbpfcp-watermark.image?)

### Statement

statement 是语句，它是可以独立执行的单位，比如 break、continue、debugger、return 或者 if 语句、while 语句、for 语句，还有声明语句，表达式语句等。我们写的每一条可以独立执行的代码都是语句。

语句末尾一般会加一个分号分隔，或者用换行分隔。

下面这些我们经常写的代码，每一行都是一个 Statement：

```js
break;    BreakStatement
continue;    ContinueStatement
return;    ReturnStatement
debugger;    DebuggerStatement
throw Error();    ThrowStatement
{}    BlockStatement
try {} catch(e) {} finally{}    TryStatement
if (v) {}    IfStatement
for (let key in obj) {}    ForInStatement
for (let i = 0;i < 10;i ++) {}    ForStatement
while (true) {}    WhileStatement
do {} while (true)    DoWhileStatement
switch (v){case 1: break;default:;}    SwitchStatement
with (a){}    WithStatement
```

语句是代码执行的最小单位，可以说，代码是由语句（Statement）构成的。babel 就是通过 `xxxStatement` 来抽象这部分内容的。

### Declaration

声明语句是一种特殊的语句，它执行的逻辑是在作用域内声明一个变量、函数、class、import、export 等。

比如下面这些语句都是声明语句：

```js
const a = 1;    VaiableDeclaration
function b(){}    FunctionDeclaration
class C {}    ClassDeclaration
import d from 'e';    ImportDeclaration
export default e = 1;    ExportDefaultDeclaration
export {e};    ExportNamedDeclaration
export * from 'e';    ExportAllDeclaration
```

声明语句用于定义变量，这也是代码中一个基础组成部分。

### Expression

expression 是表达式，特点是执行完以后有返回值，这是和语句 (statement) 的区别。

下面是一些常见的表达式

```js
[1,2,3]    ArrayExpression //数组表达式
a = 1    AssignmentExpression //赋值表达式
1 + 2;    BinaryExpression //二元表达式
-1;    UnaryExpression //一元表达式
function(){};    FunctionExpression //函数表达式
() => {};    ArrowFunctionExpression //箭头函数表达式
class{};    ClassExpression //class表达式
this;    ThisExpression //this表达式
```

### Class

class 的语法也有专门的 AST 节点来表示。

整个 class 的内容是 ClassBody，属性是 ClassProperty，方法是ClassMethod
比如下面的代码

```js
class Guang extends Person{
    name = 'li';
    constructor() {}
    eat() {}
}
```

它的AST组成可见
[AST可视化](https://astexplorer.net/#/gist/3af72fdd39c4950fd8afbcd488a18f7f/d073d50570450a049a1c924627bf01f2a5469f36)

### Modules

es module 是语法级别的模块规范，所以也有专门的 AST 节点。

#### import

import 有 3 种语法：

named import：

```js
import {c, d} from 'c';
```

default import：

```js
import a from 'a';
```

namespaced import:

```js
import * as b from 'b';
```

这 3 种语法都对应 ImportDeclaration 节点，但是 specifiers 属性不同，分别对应 ImportSpicifier、ImportDefaultSpecifier、ImportNamespaceSpcifier。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df707f20460649ae99357ac987e00dae~tplv-k3u1fbpfcp-watermark.image?)

图中黄框标出的就是 specifier 部分。可以直观的看出整体结构相同，只是 specifier 部分不同，所以 import 语法的 AST 的结构是 ImportDeclaration 包含着各种 import specifier。

#### export

export 也有3种语法：

named export：

```js
export { b, d};
```

default export：

```js
export default a;
```

all export：

```js
export * from 'c';
```

分别对应 ExportNamedDeclaration、ExportDefaultDeclaration、ExportAllDeclaration 的 AST。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dcea64c46f674ab2909a826836c2ca14~tplv-k3u1fbpfcp-watermark.image?)

### Program & Directive

program 是代表整个程序的节点，它有 body 属性代表程序体，存放 statement 数组，就是具体执行的语句的集合。还有 directives 属性，存放 Directive 节点，比如`"use strict"` 这种指令会使用 Directive 节点表示。

Program 是包裹具体执行语句的节点，而 Directive 则是代码中的指令部分。

### File & Comment

babel 的 AST 最外层节点是 File，它有 program、comments、tokens 等属性，分别存放 Program 程序体、注释、token 等，是最外层节点。

注释分为块注释和行内注释，对应 CommentBlock 和 CommentLine 节点。

```js
/* lyj */    
CommentBlock

// lyj       
CommentLine
```

## babel 的 api

babel 的编译流程分为三步：parse、transform、generate，每一步都暴露了一些 api 出来。

-   parse 阶段有`@babel/parser`，功能是把源码转成 AST
-   transform 阶段有 `@babel/traverse`，可以遍历 AST，并调用 visitor 函数修改 AST，修改 AST 自然涉及到 AST 的判断、创建、修改等，这时候就需要 `@babel/types` 了，当需要批量创建 AST 的时候可以使用 `@babel/template` 来简化 AST 创建逻辑。
-   generate 阶段会把 AST 打印为目标代码字符串，同时生成 sourcemap，需要 `@babel/generator` 包
-   中途遇到错误想打印代码位置的时候，使用 `@babel/code-frame` 包
-   babel 的整体功能通过 `@babel/core` 提供，基于上面的包完成 babel 整体的编译流程，并应用 plugin 和 preset。

主要学习的就是 `@babel/parser`，`@babel/traverse`，`@babel/generator`，`@babel/types`，`@babel/template` 这五个包的 api 的使用。

这些包的 api 都可以在[文档](https://link.juejin.cn/?target=https%3A%2F%2Fwww.babeljs.cn%2Fdocs%2Fbabel-parser "https://www.babeljs.cn/docs/babel-parser")里查看：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15ac3f213c4c4c9baf7cf755294e56a3~tplv-k3u1fbpfcp-zoom-1.image)




