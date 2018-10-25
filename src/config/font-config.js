/* 配置的默认值 */
// left: '50%', // 文字与左边的距离 （type为0时，该设置无效）
// top: '50%', // 文字与顶部的百分比距离
// fontSize: 12, // 文字字体大小
// fontWeight: 'normal', // 文字加粗 normal|bold
// letterSpacing: 0, // 文字间距
// color: '#000', // 文字颜色 默认黑色#000
// lineHeight: 10, // 行间距
// width: '50%', // 文字区域的百分比宽度
// type: 0 // 横向居中
const FONT_CONFIG = {
  "01": {
      right: 0.15,
      top: 0.45, // 文字与顶部的百分比距离
      bottom: 0.25, // 文字与底部距离
      fontSize: 12, // 文字字体大小
      fontWeight: 'normal', // 文字加粗 normal|bold
      letterSpacing: 2, // 文字间距
      color: '#5f3243', // 文字颜色 默认黑色#000
      lineHeight: 2, // 行间距
      type: 2 // 竖排
    },
    "02": {
      top: 0.73, // 文字与顶部的百分比距离
      fontSize: 18, // 文字字体大小
      fontWeight: 'normal', // 文字加粗 normal|bold
      letterSpacing: 1, // 文字间距
      color: '#d0ba6e', // 文字颜色 默认黑色#000
      lineHeight: 2, // 行间距
      type: 0 // 横向居中
    },
    "03": {
      top: 0.65, // 文字与顶部的百分比距离
      fontSize: 14, // 文字字体大小
      fontWeight: 'normal', // 文字加粗 normal|bold
      letterSpacing: 2, // 文字间距
      color: '#333434', // 文字颜色 默认黑色#000
      lineHeight: 2, // 行间距
      type: 0 // 横向居中
    },
    "04": {
      right: 0.19,
      top: 0.18, // 文字与顶部的百分比距离
      fontSize: 8, // 文字字体大小
      fontWeight: 'normal', // 文字加粗 normal|bold
      letterSpacing: 0, // 文字间距
      top2: 0.1,
      // fontFamily: '黑体',
      color: '#242a38', // 文字颜色 默认黑色#000
      lineHeight: 2, // 行间距
      bottom: 0.1, // 文字与底部距离
      type: 2 // 竖排
    }
  // "01": {
  //   top: 0.71, // 文字与顶部的百分比距离
  //   fontSize: 20, // 文字字体大小
  //   fontWeight: 'normal', // 文字加粗 normal|bold
  //   letterSpacing: 2, // 文字间距
  //   color: '#000', // 文字颜色 默认黑色#000
  //   lineHeight: 2, // 行间距
  //   type: 0 // 横向居中
  // },
  // "02": {
  //   right: 0.19,
  //   top: 0.1, // 文字与顶部的百分比距离
  //   fontSize: 8, // 文字字体大小
  //   fontWeight: 'normal', // 文字加粗 normal|bold
  //   letterSpacing: 2, // 文字间距
  //   color: '#666', // 文字颜色 默认黑色#000
  //   lineHeight: 2, // 行间距
  //   type: 2 // 竖排
  // },
  // "04": {
  //   left: 0.75,
  //   top: 0.34, // 文字与顶部的百分比距离
  //   fontSize: 8, // 文字字体大小
  //   fontWeight: 'normal', // 文字加粗 normal|bold
  //   letterSpacing: 2, // 文字间距
  //   color: '#FFF', // 文字颜色 默认黑色#000
  //   lineHeight: 3, // 行间距
  //   type: 1 // 居中
  // },
  // "05": {
  //   top: 0.65, // 文字与顶部的百分比距离
  //   fontSize: 12, // 文字字体大小
  //   fontWeight: 'normal', // 文字加粗 normal|bold
  //   letterSpacing: 2, // 文字间距
  //   color: '#666', // 文字颜色 默认黑色#000
  //   lineHeight: 2, // 行间距
  //   type: 0 // 横向居中
  // }
}
export default FONT_CONFIG