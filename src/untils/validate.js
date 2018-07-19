/*
* Email正则
* */
export function isEmail(str) {
  if(str==null||str=="") return false;
  var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return ePattern.test(str)
}

/*
* 用户名或者密码  4到16位（字母，数字，下划线，减号）
* */
export function stringCheck(str) {
  if(str==null||str=="") return false;
  var ePattern = /^[a-zA-Z0-9_-]{4,16}$/;
  return ePattern.test(str)
}
