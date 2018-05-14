// 函数单一职责，里面每个函数只负责自己的事情，而且是唯一的事情。

const untils={
  //数组去重 原理是新建一个数组，新数组里面没有的id 都push进去 ，再返回出去
  removeRepeat(arr){
    let _arr=[],_arrIds=[];
    for(let i=0;i<arr.length;i++){
      if(_arrIds.indexOf(arr[i].id)===-1){
        _arrIds.push(arr[i].id);
        _arr.push(arr[i]);
      }
    }
    return _arr;
  },
  //遍历替换   将数组里对象为空的值 变成  '--'
  setInfo(arr){
    arr.map(item=>{
      for(let key in item){
        if(item[key]===''){
          item[key]='--';
        }
      }
    });
    return arr;
  },
  //根据id排序  从小到大
  sortForId(arr){
    return arr.sort((item1,item2)=>item1.id-item2.id);
  }
};
export default {
  untils
}
