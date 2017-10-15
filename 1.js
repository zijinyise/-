// 创建一个原型链：
var arr = [1,2,3];
// 其原型链是：arr ---> Array.prototype ---> Object.prototype ---> null
// Array.prototype定义了indexOf()、shift()等方法，因此可以在所有的Array对象上直接调用这些方法

// 当创建一个函数时：
function foo()
{
    return 0;
}
// 函数也是一个对象，它的原型链是：
// foo ---> Function.prototype ---> Object.prototype ---> null
// 由于Function.prototype定义了apply()等方法，因此，所有函数都可以调用apply()方法

// 构造函数：
// 除了直接用{...}创建一个对象外，JavaScript还可以用一种构造函数的方法来创建对象，
// 它的用法是，先定义一个构造函数：
function Student(name)
{
    this.name = name;
    this.hello = function()
    {
        console.log('Hello, ' + this.name + '!');
    }
}
var xiaoming = new Student('小明');
var xiaohong = new Student('小红');
console.log(xiaoming.name);  // 小明
console.log(xiaoming.hello());  // Hello, 小明!
// 注意：如果不写new，这就是一个普通函数，它返回undefined。但是，如果写了new，它就变成了一个构造函数，
// 它绑定的this指向新创建的对象，并默认返回this，也就是说，不需要在最后写return this
// 新创建的xiaoming的原型链是：
// xiaoming ---> Student,prototype ---> Object.prototype ---> null
// 也就是说，xiaoming的原型指向函数的Student的原型，
// 如果又创建了xiaohong、xiaojun，那么这些对象的原型与xiaoming是一样的
// xiaoming  ↓
// xiaohong ---> Student.prototype ---> Object.prototype ---> null
// xiaojun   ↑

// 用new Student()创建的对象还从原型上获得了一个constructor属性，它指向函数Student本身：
console.log(xiaoming.constructor === Student.prototype.constructor)  // true
console.log(Student.prototype.constructor === Student)  // true
console.log(Object.getPrototypeOf(xiaoming) === Student.prototype)  // true
console.log(xiaoming instanceof Student)  // true
// 注意：Student.prototype执行的对象就是xiaoming、xiaohong的原型对象，
// 这个原型对象自己还有个属性constructor，指向Student函数本身
// 另外i，函数Student恰好有个属性prototype指向xiaoming、xiaohong的原型对象，
// 但是xiaoming、xiaohong这些对象可没有prototype这个属性，不过可以用__proto__这个非标准用法来查看
// 现在我们就认为xiaoming、xiaohong这些对象'继承'自Student

// 不过还有个小问题：
console.log(xiaoming.name)  // 小明
console.log(xiaohong.name)  // 小红
console.log(xiaoming.hello)  // function Student/this.hello()
console.log(xiaohong.hello)  // function Student/this.hello()
console.log(xiaoming.hello === xiaohong.hello)  // false
// xiaoming和xiaohong各自的name不通，这是对的，否则无法区分谁是谁了
// xiaoming和xiaohong各自的hello是一个函数，但它们是两个不同的函数，虽然函数名称和代码都是相同的!
// 如果通过new Student()创建了很多对象，这些对象的hello函数实际上只需要共享同一个函数就可以了，这样可以省很多内存
// 要让创建的独享共享一个hello函数，根据对象的属性查找原则，
// 只需要把hello函数移动到xiaoming、xiaohong这些对象共同的原型上就可以可，也就是Student.prototype:

