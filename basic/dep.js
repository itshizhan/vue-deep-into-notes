let Dep = function(){
  // 存放依赖
  this.subs = []
  // 添加依赖
  this.addSub = function(sub){
    this.subs.push(sub)
  }
  //移除依赖
  this.removeSub = function(sub){
    const index = this.subs.indexOf(sub);
    if(index>-1){
      this.subs.splice(index,1)
    }
  }
  // 执行依赖
  this.notify = function(newVal,oldVal){
    this.subs.forEach(func => {
      func(newVal,oldVal)
    })
  }
}

//  函数
// Dep.target = null;

let defineReactive = function(object, key, value){
  let dep = new Dep();
  Object.defineProperty(object, key, {
      configurable: true,
      enumerable: true,
      get(){
          if(Dep.target){
            dep.addSub(Dep.target)
          }
          return value
      },
      set(newValue){
          if(newValue != value){
              dep.notify(newValue, value)
          }
          value = newValue
      }
  })
}

let object = {}

// Dep.target = null
// object.test = 'test2'
// 我被添加进去了，新的值是：test2
 
Dep.target = function(newValue, oldValue){
    console.log('添加第二个函数，新的值是：' + newValue)
}
defineReactive(object, 'test', 'test');
object.test