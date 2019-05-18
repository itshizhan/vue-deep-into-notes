console.log("------defineProperty--------");
//console.log(this); // 在模块中，顶层的this返回 undefined

// let object = {}, test = 'test'
// Object.defineProperty(object, 'test', {
//     configurable: true,             // 描述该属性的描述符能否被改变，默认值为 false
//     enumerable: true,               // 能否被遍历，比如 for in，默认值为 false
//     get(){                // 取值的时候调用，object.test，默认值为 false
//         console.log('enter get')
//         return test
//     },
//     set(newValue){        // 设置值的时候使用
//         console.log('enter set')
//         test = newValue
//     }
// })

// window.object = object;


let callback = {
  target:null
}

let defineReactive = function(object,key,value){
  let array = [];
  Object.defineProperty(object,key,{
    configurable:true,
    enumerable:true,
    get(){
      if(callback.target){
        array.push(callback.target)
      }
      console.log(array);
      return value;
    },
    set(newValue){
      if(newValue!=value){
        array.forEach(fun=>fun(newValue,value))
      }
    }
  })
}

// 测试
let obj = {};
callback.target = function(newValue, oldValue){console.log('添加了一个新的属性，新的值是：' + newValue)}
defineReactive(obj, 'test', 'testVal');

obj.test;

callback.target = null;
obj.test = 'test2';

callback.target = function(newValue, oldValue){console.log('添加第二个函数，新的值是：' + newValue)}
obj.test
// test
callback.target = null
obj.test = 'test3';
console.log(obj);

