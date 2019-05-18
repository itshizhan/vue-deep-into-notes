let Watcher = function(object,key,callback){
  this.obj = object;
  this.getter = key;
  this.cb = callback;
  this.dep = null;
  this.value = undefined;

  this.get = function(){
    Dep.target = this;
    let value = this.obj[this.getter];
    Dep.target = null;
    return value;
  }
  
  this.update = function(){
    const value = this.obj[this.getter];
    const oldValue = this.value;
    this.value = value;
    this.cb.call(this.obj,value,oldValue)
  }
  
  this.addDep = function(dep){
    this.dep = dep
  }
  this.value = this.get();
}