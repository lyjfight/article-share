# TypeScript的基本介绍

## 一、TypeScript 是什么

TypeScript 是一种由微软开发的自由和开源的编程语言。它是 JavaScript 的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。
TypeScript 提供最新的和不断发展的 JavaScript 特性，包括那些来自 2015 年的 ECMAScript 和未来的 提案中的特性，比如异步功能和 Decorators，以帮助建立健壮的组件。下图显示了 TypeScript 与 ES5、ES2015 和 ES2016 之间的关系:

<img width="250" alt="image" style="margin: 20px auto;display: block;" src="https://user-images.githubusercontent.com/40552704/177522907-93875f39-3fa9-4cd7-be09-5e36eaa1b327.png">

|  TypeScript   | JavaScript  |
|  ----  | ----  |
| JavaScript 的超集用于解决大型项目的代码复杂性  | 一种脚本语言，用于创建动态网⻚ |
| 可以在编译期间发现并纠正错误  | 作为一种解释型语言，只能在运行时发现错误 |
| 强类型，支持静态和动态类型 | 弱类型，没有静态类型选项 |
| 最终被编译成 JavaScript 代码，使浏览器可以理解 | 可以直接在浏览器中使用 |
| 支持模块、泛型和接口 | 不支持模块，泛型或接口 |
| 社区的支持仍在增⻓，而且还不是很大 | 大量的社区支持以及大量文档和解决问题的支持 |


## 二、TypeScript 基础类型

### 2.1 Boolean 类型

```ts
let isDone: boolean = false; // ES5:var isDone = false;
```

### 2.2 Number 类型

```ts
let count: number = 10; // ES5:var count = 10;
```

### 2.3 String 类型

```ts
let name: string = "semliker"; // ES5:var name = 'semlinker';
```

### 2.4 Array 类型

```ts
let list: number[] = [1, 2, 3]; // ES5:var list = [1,2,3];
let list: Array<number> = [1, 2, 3]; // Array<number>泛型语法 // ES5:var list = [1,2,3];
```

### 2.6 Enum 类型

**1.数字枚举**
```ts 
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}
let dir: Direction = Direction.NORTH;
```

默认情况下，NORTH 的初始值为 0，其余的成员会从 1 开始自动增⻓。换句话说，Direction.SOUTH 的值为 1，Direction.EAST 的值为 2，Direction.WEST 的值为 3。
以上的枚举示例经编译后，对应的 ES5 代码如下

```ts
"use strict";
var Direction;
(function (Direction) {
  Direction[(Direction["NORTH"] = 0)] = "NORTH";
  Direction[(Direction["SOUTH"] = 1)] = "SOUTH";
  Direction[(Direction["EAST"] = 2)] = "EAST";
  Direction[(Direction["WEST"] = 3)] = "WEST";
})(Direction || (Direction = {}));
var dir = Direction.NORTH;
```

当然我们也可以设置 NORTH 的初始值，比如:

```ts
enum Direction {
  NORTH = 3,
  SOUTH,
  EAST,
  WEST, 
}
```

**2.字符串枚举**

```ts
enum Direction {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}
```

以上代码对应的 ES5 代码如下:

```ts
"use strict";
var Direction;
(function (Direction) {
    Direction["NORTH"] = "NORTH";
    Direction["SOUTH"] = "SOUTH";
    Direction["EAST"] = "EAST";
    Direction["WEST"] = "WEST";
})(Direction || (Direction = {}));
```

**3.异构枚举**

异构枚举的成员值是数字和字符串的混合:

```ts
enum Enum { 
  A,
  B,
  C = "C",
  D = "D",
  E = 8,
  F,
}
```

以上代码对于的 ES5 代码如下:

```ts
"use strict";
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum[Enum["B"] = 1] = "B";
    Enum["C"] = "C";
    Enum["D"] = "D";
    Enum[Enum["E"] = 8] = "E";
    Enum[Enum["F"] = 9] = "F";
})(Enum || (Enum = {}));
```

通过观察上述生成的 ES5 代码，我们可以发现数字枚举相对字符串枚举多了 “反向映射”:

```ts
console.log(Enum.A) //输出:0 
console.log(Enum[0]) // 输出:A
```

### 2.7 Any 类型

在 TypeScript 中，任何类型都可以被归为 any 类型。这让 any 类型成为了类型系统的顶级类型(也被称作全局超级类型)。

```ts
let notSure: any = 666;
notSure = "semlinker";
notSure = false;
```

`any` 类型本质上是类型系统的一个逃逸舱。作为开发者，这给了我们很大的自由:`TypeScript` 允许我们对 `any` 类型的值执行任何操作，而无需事先执行任何形式的检查。比如:

```ts
let value: any;
value.foo.bar; // OK
value.trim(); // OK
value(); // OK
new value(); // OK
value[0][1]; // OK
```

在许多场景下，这太宽松了。使用 `any` 类型，可以很容易地编写类型正确但在运行时有问题的代码。如 果我们使用 `any` 类型，就无法使用 `TypeScript` 提供的大量的保护机制。为了解决 `any` 带来的问题， TypeScript 3.0 引入了 `unknown` 类型。

### 2.8 Unknown 类型

就像所有类型都可以赋值给 `any` ，所有类型也都可以赋值给 `unknown` 。这使得 `unknown` 成为 `TypeScript` 类型系统的另一种顶级类型(另一种是 any )。下面我们来看一下 unknown 类型的使用示 例:

```ts
let value: unknown;
value = true; // OK
value = 42; // OK
value = "Hello World"; // OK
value = []; // OK
value = {}; // OK
value = Math.random; // OK
value = null; // OK
value = undefined; // OK
value = new TypeError(); // OK
value = Symbol("type"); // OK
```

对 `value` 变量的所有赋值都被认为是类型正确的。但是，当我们尝试将类型为 `unknown` 的值赋值给其 他类型的变量时会发生什么?

```ts
let value: unknown;
let value1: unknown = value; // OK
let value2: any = value; // OK
let value3: boolean = value; // Error
let value4: number = value; // Error
let value5: string = value; // Error
let value6: object = value; // Error
let value7: any[] = value; // Error
let value8: Function = value; // Error
```

`unknown` 类型只能被赋值给 `any` 类型和 `unknown` 类型本身。毕竟我们不知道变量 `value` 中存储了什么类型的值。

现在让我们看看当我们尝试对类型为 `unknown` 的值执行操作时会发生什么：

```ts
let value: unknown;
value.foo.bar; // Error
value.trim(); // Error
value(); // Error
new value(); // Error
value[0][1]; // Error
```

将 `value` 变量类型设置为 `unknown` 后，这些操作都不再被认为是类型正确的。通过将 `any` 类型改变 为 `unknown` 类型，我们已将允许所有更改的默认设置，更改为禁止任何更改


### 2.9 Tuple 类型

**众所周知，数组一般由同种类型的值组成，但有时我们需要在单个变量中存储不同类型的值，这时候我们就可以使用元组。** 在 `JavaScript` 中是没有元组的，元组是 `TypeScript` 中特有的类型，其工作方式类似于数组。

元组可用于定义具有有限数量的未命名属性的类型。每个属性都有一个关联的类型。使用元组时，必须
提供每个属性的值。为了更直观地理解元组的概念，我们来看一个具体的例子:

```ts
let tupleType: [string, boolean];
tupleType = ["semlinker", true];
```

在上面代码中，我们定义了一个名为 `tupleType` 的变量，它的类型是一个类型数组 `[string, boolean]` ，然后我们按照正确的类型依次初始化 `tupleType` 变量。与数组一样，我们可以通过下标来 访问元组中的元素:

```ts
console.log(tupleType[0]); // semlinker
console.log(tupleType[1]); // true
```

在元组初始化的时候，如果出现类型不匹配的话，比如:

```ts
tupleType = [true, "semlinker"];
```

此时，TypeScript 编译器会提示以下错误信息:

```ts
[0]: Type 'true' is not assignable to type 'string'.
[1]: Type 'string' is not assignable to type 'boolean'.
```

很明显是因为类型不匹配导致的。在元组初始化的时候，我们还必须提供每个属性的值，不然也会出现
错误，比如:

```ts
tupleType = ["semlinker"];
```

此时，TypeScript 编译器会提示以下错误信息:

```ts
Property '1' is missing in type '[string]' but required in type '[string,boolean]'.
```

### 2.10 Void 类型

某种程度上来说，void 类型像是与 any 类型相反，它表示没有任何类型。当一个函数没有返回值时，通常会⻅到其返回值类型是 void:

```ts
// 声明函数返回值为void 
function warnUser(): void {
  console.log("This is my warning message");
}
```

以上代码编译生成的 ES5 代码如下:

```ts
"use strict";
function warnUser() {
  console.log("This is my warning message");
}
```

需要注意的是，声明一个 void 类型的变量没有什么作用，因为在严格模式下，它的值只能为 `undefined` :

```ts
let unusable: void = undefined;
```

### 2.11 Null 和 Undefined 类型

TypeScript 里， `undefined` 和 `null` 两者有各自的类型分别为 `undefined` 和 `null` 。

```ts
let u: undefined = undefined;
let n: null = null;
```

### 2.12 object 和 {} 类型

**1.object 类型**

object 类型是:TypeScript 2.2 引入的新类型，它用于表示非原始类型。

```ts
interface ObjectConstructor {
  create(o: object | null): any;
  // ...
}

Object.create(proto);     // OK
Object.create(null);      // OK
Object.create(undefined); // Error
Object.create(1337);      // Error
Object.create(true);      // Error
Object.create("oops");    // Error
```

**2.{} 类型**

{} 类型描述了一个没有成员的对象。当你试图访问这样一个对象的任意属性时，TypeScript 会产生一个编译时错误。

```ts
// Type {}
const obj = {};
// Error: Property 'prop' does not exist on type '{}'.
obj.prop = "semlinker";
```

但是，你仍然可以使用在 `Object` 类型上定义的所有属性和方法，这些属性和方法可通过 JavaScript 的原型链隐式地使用:

```ts
// Type {}
const obj = {};
// "[object Object]"
obj.toString();
```

### 2.13 Never 类型

`never` 类型表示的是那些永不存在的值的类型。 例如， `never` 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。

```ts
// 返回never的函数必须存在无法达到的终点 
function error(message: string): never {
  throw new Error(message);
}
function infiniteLoop(): never {
  while (true) {}
}
```

## 三、TypeScript 断言

### 3.1 类型断言

有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。类型断言好比其他语言里的 类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。

类型断言有两种形式:

**1.“尖括号” 语法**

```ts
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

**2.as 语法**

```ts
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

### 3.2 非空断言

在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 ! 可以用于断言操作对象是非
`null` 和非 `undefined` 类型。**具体而言，x! 将从 x 值域中排除 null 和 undefined 。**

那么非空断言操作符到底有什么用呢?下面我们先来看一下非空断言操作符的一些使用场景。

**1.忽略 undefined 和 null 类型**

```ts
function myFunc(maybeString: string | undefined | null) {
  // Type 'string | null | undefined' is not assignable to type 'string'.
  // Type 'undefined' is not assignable to type 'string'.
  const onlyString: string = maybeString; // Error
  const ignoreUndefinedAndNull: string = maybeString!; // Ok
}
```

**2.调用函数时忽略 undefined 类型**

```ts
type NumGenerator = () => number;
function myFunc(numGenerator: NumGenerator | undefined) {
  // Object is possibly 'undefined'.(2532)
  // Cannot invoke an object which is possibly 'undefined'.(2722)
  const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}
```

### 3.3 确定赋值断言

在 TypeScript 2.7 版本中引入了确定赋值断言，即允许在实例属性和变量声明后面放置一个 `!` 号，从而
告诉 TypeScript 该属性会被明确地赋值。为了更好地理解它的作用，我们来看个具体的例子:

```ts
let x: number;
initialize();
// Variable 'x' is used before being assigned.(2454)
console.log(2 * x); // Error
function initialize() {
  x = 10;
}
```

很明显该异常信息是说变量 x 在赋值前被使用了，要解决该问题，我们可以使用确定赋值断言:

```ts
let x!: number;
initialize();
console.log(2 * x); // Ok
function initialize() {
  x = 10;
}
```

通过 `let x!: number;` 确定赋值断言，TypeScript 编译器就会知道该属性会被明确地赋值。


## 四、类型守卫

**类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内。** 

目前主要有四种的方式来实现类型保护:

### 4.1 in 关键字

```ts
interface Admin {
  name: string;
  privileges: string[];
}
interface Employee {
  name: string;
  startDate: Date;
}
type UnknownEmployee = Employee | Admin;
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  } 
}
```

### 4.2 typeof 关键字

```ts
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
      return padding + value;
  }
  throw new Error('Expected string or number, got ' + padding + '.');
}
```

### 4.3 instanceof 关键字

```ts
interface Padder {
  getPaddingString(): string;
}
class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}
class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}
let padder: Padder = new SpaceRepeatingPadder(6);
if (padder instanceof SpaceRepeatingPadder) { // padder的类型收窄为 'SpaceRepeatingPadder'
}
```

## 五、联合类型和类型别名

### 5.1 联合类型

联合类型通常与 `null` 或 `undefined` 一起使用:

```ts
const sayHello = (name: string | undefined) => {
  /* ... */
};
```

例如，这里 `name` 的类型是 `string | undefined` 意味着可以将 `string` 或 `undefined` 的值传递给 `sayHello` 函数。

```ts
sayHello("semlinker");
sayHello(undefined);
```

### 5.2 类型别名

类型别名用来给一个类型起个新名字。

```ts
type Message = string | string[];
let greet = (message: Message) => {
  // ...
};
```

## 六、交叉类型

在 TypeScript 中交叉类型是将多个类型合并为一个类型。通过 & 运算符可以将现有的多种类型叠加到 一起成为一种类型，它包含了所需的所有类型的特性。

```ts
type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };
let point: Point = {
  x: 1,
  y: 1 
}
```

## 七、TypeScript 函数

### 7.1 函数类型

```ts
let IdGenerator: (chars: string, nums: number) => string;
function createUserId(name: string, id: number): string {
  return name + id;
}
IdGenerator = createUserId;
```

### 7.2 可选参数及默认参数

```ts
// 可选参数
function createUserId(name: string, id: number, age?: number): string {
  return name + id;
}
// 默认参数
function createUserId(name = "semlinker", id: number, age?: number): string {
  return name + id;
}
```

在声明函数时，可以通过 ? 号来定义可选参数，比如 `age?: number` 这种形式。在实际使用时，需要 注意的是可选参数要放在普通参数的后面，不然会导致编译错误。


## 八、TypeScript 接口

在面向对象语言中，接口是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类去实现。
TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对 「对象的形状(Shape)」进行描述。

### 8.1 对象的形状

```ts
interface Person {
  name: string;
  age: number;
}
let semlinker: Person = {
  name: "semlinker",
  age: 33,
};
```

### 8.2 可选 | 只读属性

```ts
interface Person {
  readonly name: string;
  age?: number;
}
```

### 8.3 任意属性

有时候我们希望一个接口中除了包含必选和可选属性之外，还允许有其他的任意属性，这时我们可以使用 `索引签名` 的形式来满足上述要求。

```ts
interface Person {
  name: string;
  age?: number;
  [key: string]: any;
}
const p1 = { name: "semlinker" };
const p2 = { name: "lolo", age: 5 };
const p3 = { name: "kakuqo", sex: 1 }
```

### 8.4 接口与类型别名的区别

**1.Objects/Functions**

接口和类型别名都可以用来描述对象的形状或函数签名:

**接口**

```ts
interface Point {
  x: number;
  y: number;
}
interface SetPoint {
  (x: number, y: number): void;
}
```

**类型别名**

```ts
type Point = {
  x: number;
  y: number;
};
type SetPoint = (x: number, y: number) => void;
```

**2.Other Types**

与接口类型不一样，类型别名可以用于一些其他类型，比如原始类型、联合类型和元组:

```ts
// primitive
type Name = string;
// object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };
// union
type PartialPoint = PartialPointX | PartialPointY;
// tuple
type Data = [number, string];
```

**3.Extend**

接口和类型别名都能够被扩展，但语法有所不同。此外，接口和类型别名不是互斥的。接口可以扩展类
型别名，而反过来是不行的。

**Interface extends interface**

```ts
interface PartialPointX { x: number; }
interface Point extends PartialPointX {
  y: number; 
}
```

**Type alias extends type alias**

```ts
type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };
```

**Interface extends type alias**

```ts
type PartialPointX = { x: number; };
interface Point extends PartialPointX { y: number; }
```

**Type alias extends interface**

```ts
interface PartialPointX { x: number; }
type Point = PartialPointX & { y: number; };
```

**4.Implements**

类可以以相同的方式实现接口或类型别名，但类不能实现使用类型别名定义的联合类型:

```ts
interface Point {
  x: number;
  y: number;
 
}
class SomePoint implements Point {
  x = 1;
  y = 2; 
}
type Point2 = {
  x: number;
  y: number;
};
class SomePoint2 implements Point2 {
  x = 1;
  y = 2; 
}
type PartialPoint = { x: number; } | { y: number; };
// A class can only implement an object type or
// intersection of object types with statically known members.
class SomePartialPoint implements PartialPoint { // Error
  x = 1;
  y = 2; 
}
```

**5.Declaration merging**

与类型别名不同，接口可以定义多次，会被自动合并为单个接口。

```ts
interface Point { x: number; }
interface Point { y: number; }
const point: Point = { x: 1, y: 2 };
```





## 九、TypeScript 类

## 十、TypeScript 泛型

## 十一、TypeScript 装饰器




