<template>
  <section class="card-main">
    <div class="article">
      <div class="card-pres test-bg" :class="'card-press_' + id">
        <div ref="cardImg" class="card-pic-t" :class="'card-bg-' + activeImage"></div>
        <div class="back-box">
          <img :src="editUrl" alt="" class="backImgDom" :class="'img-type0' + backImageType">
        </div>
        <div class="dragdom" :class="'dragdom-' + id" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></div>
      </div>
    </div>
    <div class="edit-panel">
      <textarea id="textAreaInput" class="edit-panel-textarea" placeholder="在这里输入您的祝福语..."></textarea>
    </div>
    <div class="img-list">
      <ul class="img-ul">
        <li v-for="(item, index) in imgList" :key="index" @mouseup="lookImage(index)" :class="{active: activeImage === '0' + (index + 1)}">
          <img :src="item.url" alt="">
        </li>
      </ul>
    </div>
    <div class="submit" @mouseup="submit">
      <span class="submit-btn">生成明信片</span>
    </div>
    <div class="enlarge-area" v-show="preImageShow">
      <div class="mask" @mouseup="preImageShow = false"></div>
      <div class="enlarge-area_content">
        <img :src="preImage" alt="">
        <div class="submit-area">
          <div class="sel-pre" @mouseup="switchImage('pre')">上一张</div>
          <div class="select-bak" @mouseup="selectImage">选择背景图</div>
          <div class="sel-next" @mouseup="switchImage('next')">下一张</div>
        </div>
      </div>
    </div>
     <!-- @click="previewDialog = false" -->
    <div class="previewDialog" :class="myPreviewDialog" v-show="previewDialog" @click="previewDialog = false">
      <canvas id="myCanvas" style="display: none;position: absolute;">
        抱歉，您的浏览器不支持HTML5的图像绘制
      </canvas>
      <img id="previewImg" :src="canvasUrl" alt="" class="myCanvasClass">
      <!-- <div class="save"><router-link :to="{path: '/plates'}">生成新的贺卡</router-link></div> -->
      <!-- <div class="newB">长按图片保存</div> -->
    </div>
    <div class="hide">使用设定字体</div>
  </section>
</template>
<script>
import FONT_CONFIG from '@/config/font-config'
export default {
  name: 'edit',
  data () {
    return {
      backImageType: 1, // 背景图片的类型
      id: '',
      preImage: '',
      imageIdx: '',
      preImageShow: false,
      myPreviewDialog: '',
      baseConfig: {
        left: '50%',
        top: '50%', // 文字与顶部的百分比距离
        fontSize: 12, // 文字字体大小
        fontWeight: 'normal', // 文字加粗 normal|bold
        letterSpacing: 0, // 文字间距
        color: '#000', // 文字颜色 默认黑色#000
        lineHeight: 2, // 行间距
        type: 0 // 横向居中
      },
      editUrl: null,
      activeImage: "01",
      previewDialog: false,
      // myCanvasClass: 'myCanvasClass',
      canvasUrl: '',
      imgList: [
        {
          id: 0,
          url: require('../../../assets/img/bgimg/bgimg_01.jpg')
        },
        {
          id: 1,
          url: require('../../../assets/img/bgimg/bgimg_02.jpg')
        },
        {
          id: 2,
          url: require('../../../assets/img/bgimg/bgimg_03.jpg')
        },
        {
          id: 3,
          url: require('../../../assets/img/bgimg/bgimg_04.jpg')
        },
        {
          id: 4,
          url: require('../../../assets/img/bgimg/bgimg_05.jpg')
        },
        {
          id: 5,
          url: require('../../../assets/img/bgimg/bgimg_06.jpg')
        },
        {
          id: 6,
          url: require('../../../assets/img/bgimg/bgimg_07.jpg')
        },
        {
          id: 7,
          url: require('../../../assets/img/bgimg/bgimg_08.jpg')
        }
      ],
      dragdom: null,
      startPoint: {
        x: 0,
        y: 0
      },
      endPoint: {
        x: 0,
        y: 0
      },
      startSite: {
        left: 0,
        top: 0
      },
      imgStartSite: {
        left: 0,
        top: 0
      },
      loading: null,
      loadArray: [],
      xPercent: 1, // X轴放大比例
      yPercent: 1 // Y轴放大比例
    }
  },
  watch: {
    loadArray(v) {
      if (v.length === this.imgList.length + 1) {
        this.loading.close()
      }
    }
  },
  created () {
    let _this = this
    this.loading = this.$loading({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.3)'
    });
    // this.backImageType = this.$route.query.type ? parseInt(this.$route.query.type) : 1
    const id = this.$route.query.id;
    if (id) {
      this.id = id
      if (this.id )
      this.editUrl = require('../../../assets/img/edit/edit_' + id + '.png');
      for (let i = 0; i < _this.imgList.length; i++) {
        let image2 = new Image()
        image2.onload = function () {
          _this.loadArray.push(1)
        }
        image2.src = _this.imgList[i].url
      }
    }
  },
  mounted () {
    this.setStyle()
    if (this.id && FONT_CONFIG[this.id]) {
      let o = Object.assign(this.baseConfig, FONT_CONFIG[this.id])
      for (let prop in o) {
        this.$set(this.baseConfig, prop, o[prop])
      }
    }
  },
  methods: {
    lookImage(idx) {
      this.imageIdx = idx
      this.preImage = require('../../../assets/img/bgimg/bgimg_0' + (this.imageIdx + 1) + '.jpg')
      this.preImageShow = true
    },
    switchImage (o) {
      if (o === 'pre') {
        this.imageIdx = (this.imageIdx === 0 ? 7 : (this.imageIdx - 1))
        this.preImage = require('../../../assets/img/bgimg/bgimg_0' + (this.imageIdx + 1) + '.jpg')
      } else {
        this.imageIdx = (this.imageIdx === 7 ? 0 : (this.imageIdx + 1))
        this.preImage = require('../../../assets/img/bgimg/bgimg_0' + (this.imageIdx + 1) + '.jpg')
      }
    },
    selectImage () {
      this.activeImage = '0' + (this.imageIdx + 1)
      this.preImageShow = false
    },
    setStyle () {
      let _this = this,
        backImgDom = document.querySelector('.backImgDom'),
        cardPres = document.querySelector('.card-pres')
      var image = new Image()
      let width = 0, height = 0
      image.onload = function () {
        if (_this.id === '01' || _this.id === '02' || _this.id === '03') {
          // _this.myCanvasClass = 'myCanvasClass'
          // 就高不就宽
          height = cardPres.offsetHeight
          width =  (image.width * height / image.height)
        } else if(_this.id === '04') {
          // _this.myCanvasClass = 'myCanvasClass_01'
          // 就宽不就高
          width = cardPres.offsetWidth
          height =  (image.height * width / image.width)
        }
        backImgDom.style.height = height + 'px'
        backImgDom.style.width = width + 'px'
        cardPres.style.width = width + 'px'
        cardPres.style.height = height + 'px'
        _this.loadArray.push(1)
      }
      image.src = this.editUrl
      // 解决Android bug
      let dom = document.querySelector('.article')
      dom.style.height = dom.offsetHeight + 'px' 
    },
    // 根据dom高度设置图片的合适高宽
    setImageSize (image) {
      var width = this.canvas.width,
        tempWidth = image.width, tempHeight = image.height
      return {
        width: width,
        height: width * tempHeight/ tempWidth
      }
    },
    setBakImageSize (image) {
      var tempWidth = image.width,
        tempHeight = image.height,
        width = document.querySelector('.card-pic-t').offsetWidth,
        height = width * tempHeight / tempWidth
      return {
        width: width * this.xPercent,
        height: height * this.yPercent
      }
    },
    drawText (context) {
      // 根据宽度设置文字大小
      var wp = document.querySelector('.card-pres').offsetWidth / this.canvas.width,
        hp = document.querySelector('.card-pres').offsetHeight / this.canvas.height,
        font = 12 / wp
      context.font = "bold " + font + "px Microsoft Yahei"
      context.fillStyle = '#000'
      let dom = document.querySelector('.editbox')
      let x = (dom.offsetLeft + 5) / wp, y = (dom.offsetTop + 15) / wp, pointX = x, pointY = y
      let str = dom.innerHTML || ''
      if (str) {
        str = 
        str = str.replace(/(<br>|<br\/>)/g, '').split(/(<div>|<\/div>)/)
        console.log(str)
        for (let i = 0; i < str.length; i++) {
          if (str[i] === '<div>') {
            pointX += (17 / wp)
            pointY = y
            continue
          } else if (str[i] === '</div>' || str[i] === '<br/>' || str[i] === '<br>') {
            continue
          } else {
            for (let s of str[i]) {
              if (pointY + font  >=  (this.canvas.height - 10 / hp) ) {
                pointY = y
                pointX += (17 / wp)
              }
              context.fillText(s, pointX, pointY);
              pointY += (17 / hp)
            }
          }
        }
      }
    },
    _drawText (context) {
      // 根据宽度设置文字大小
      var wp = document.querySelector('.card-pres').offsetWidth / this.canvas.width,
        hp = document.querySelector('.card-pres').offsetHeight / this.canvas.height,
        font = 12 / wp
      context.font = "bold " + font + "px Microsoft Yahei"
      context.fillStyle = '#000'
      let dom = document.querySelector('.editbox')
      let x = (dom.offsetLeft + 5) / wp, y = (dom.offsetTop + 15) / wp, pointX = x, pointY = y
      let str = dom.innerHTML || ''
      if (str) {
        str = 
        str = str.replace(/(<br>|<br\/>)/g, '').split(/(<div>|<\/div>)/)
        console.log(str)
        for (let i = 0; i < str.length; i++) {
          if (str[i] === '<div>') {
            pointX += (17 / wp)
            pointY = y
            continue
          } else if (str[i] === '</div>' || str[i] === '<br/>' || str[i] === '<br>') {
            continue
          } else {
            for (let s of str[i]) {
              if (pointY + font  >=  (this.canvas.height - 10 / hp) ) {
                pointY = y
                pointX += (17 / wp)
              }
              context.fillText(s, pointX, pointY);
              pointY += (17 / hp)
            }
          }
        }
      }
    },
    drawTextByType (context) {
      var o = this.baseConfig
      let dom = document.getElementById('textAreaInput')
      let text = dom.value
      let fontFamily = o.fontFamily || 'SuXinShiLiuKai'
      console.log(fontFamily)
      context.fillStyle = o.color
      if (o.type === 0) {
        // 横向 居中
        let fontSize = o.fontSize * this.xPercent // 放大后的文字大小
        // 画横向居中文字
        context.font = fontSize + "px " + fontFamily
        context.textBaseline = 'top'
        let x = this.canvas.width / 2, // 文字的x坐标(初始值为窗口的中间位置)
          y = this.canvas.height * o.top, // 文字的y坐标
          xStep = 0 // 文字的所占宽度

        // 根据换行拆分text
        text = text.trim().split(/\n/)
        for (let i = 0; i < text.length; i++) {
          if (text[i] && text[i].length > 0) {
            xStep = context.measureText(text[i][0]).width
            let fontWidth = context.measureText(text[i]).width + o.letterSpacing * this.xPercent * (text[i].length - 1)
            if (fontWidth > this.canvas.width - 10 * this.xPercent) {
              x = 10 * this.xPercent
            } else {
              x = (x - (fontWidth / 2))
            }
            for (let t = 0; t < text[i].length; t++) {
              context.fillText(text[i][t], x, y);
              x += xStep + o.letterSpacing * this.xPercent // 文字宽度 + 文字间距
              if (t === text[i].length - 1) {
                y += xStep + o.lineHeight * this.yPercent
                x = this.canvas.width / 2
              } else if ((x + xStep + o.letterSpacing * this.xPercent) > (this.canvas.width - 10 * this.xPercent)) {
                y += xStep + o.lineHeight * this.yPercent
                x = 10 * this.xPercent
              }
            }
          }
        }
      } else if (o.type === 1) {
        // 居中 (非横向)
        let fontSize = o.fontSize * this.xPercent // 放大后的文字大小
        // 画横向居中文字
        context.font = fontSize + "px " + fontFamily
        // context.textAlign="center";
        context.textBaseline = 'top'
        let x = this.canvas.width * o.left, // 文字的x坐标(初始值为窗口的中间位置)
          y = this.canvas.height * o.top, // 文字的y坐标
          xStep = 0 // 文字的所占宽度

        // 根据换行拆分text
        text = text.trim().split(/\n/)
        for (let i = 0; i < text.length; i++) {
          if (text[i] && text[i].length > 0) {
            console.log(text[i])
            xStep = context.measureText(text[i][0]).width
            let fontWidth = context.measureText(text[i]).width + o.letterSpacing * this.xPercent * (text[i].length - 1),
              xTemp = 0, temp = this.canvas.width * 0.6
            x = (x - (fontWidth / 2))
            if (x < temp) {
              x = temp
            }
            xTemp = x
            for (let t = 0; t < text[i].length; t++) {
              context.fillText(text[i][t], x, y);
              x += xStep + o.letterSpacing * this.xPercent // 文字宽度 + 文字间距
              if (t === text[i].length - 1) {
                y += xStep + o.lineHeight * this.yPercent
                x = this.canvas.width * o.left
              } else if ((x + xStep + o.letterSpacing * this.xPercent) > (this.canvas.width - 10 * this.xPercent)) {
                y += xStep + o.lineHeight * this.yPercent
                x = xTemp
              }
            }
          }
        }
      } else if (o.type === 2) {
        // 竖排
        let fontSize = o.fontSize * this.xPercent // 放大后的文字大小
        // 画横向居中文字
        context.font = fontSize + "px " + fontFamily
        context.textBaseline = 'top'

        let x = this.canvas.width * (1 - o.right), // 文字的x坐标(文本框宽度 + left值)
          y = this.canvas.height * o.top, // 文字的y坐标
          xStep = 0 // 文字的所占宽度
        // 根据换行拆分text
        text = text.trim().split(/\n/)
        for (let i = 0; i < text.length; i++) {
          if (text[i] && text[i].length > 0) {
            xStep = context.measureText(text[i][0]).width
            x -= (xStep + o.lineHeight * this.yPercent)
            for (let t = 0; t < text[i].length; t++) {
              context.fillText(text[i][t], x, y);
              y += xStep + o.letterSpacing * this.yPercent // 文字宽度 + 文字间距
              if (t === text[i].length - 1) {
                y = this.canvas.height * (o.top2 ? o.top2 : o.top)
              } else if ((y + xStep + o.letterSpacing * this.yPercent) > this.canvas.height * (1 - o.bottom)) {
                x -= (xStep + o.lineHeight * this.yPercent)
                y = this.canvas.height * (o.top2 ? o.top2 : o.top)
              }
            }
          }
        }
      }
    },
    getPixelRatio (context) {
      var backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
      return (window.devicePixelRatio || 1) / backingStore;
    },
    setCanvasSize () {
      var width = document.querySelector('.card-pres').offsetWidth;
      var height = document.querySelector('.card-pres').offsetHeight;
      var windowWidth = window.innerWidth * 2;
      // 就宽不就高
      this.canvas = document.getElementById('myCanvas')
      this.canvas.width = windowWidth
      this.canvas.height = windowWidth * height / width

      this.xPercent = this.canvas.width / width // X轴放大比例
      this.yPercent = this.canvas.height / height // Y轴放大比例

      var previewImg = document.getElementById('previewImg')
      previewImg.style.width = (window.innerWidth) + 'px'
      previewImg.style.height = ((window.innerWidth) * height / width) +  'px'
      
    },
    // 合并图片
    submit () {
      const loading = this.$loading({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)'
      });
      this.setCanvasSize()
      let url = require('../../../assets/img/bgimg/bgimg_' + this.activeImage + '.jpg'),
        context = this.canvas.getContext('2d'), image = new Image(), _this = this
      image.onload = function () {
        let size = _this.setBakImageSize(image),
          left = _this.$refs['cardImg'].offsetLeft,
          top = _this.$refs['cardImg'].offsetTop
          console.log(size, left, top)
          console.log(left * _this.xPercent, top * _this.yPercent, size.width, size.height)
        context.drawImage(image, left * _this.xPercent, top * _this.yPercent, size.width, size.height)
        // 设置底图
        let bakImage = new Image()
        bakImage.onload = function () {
          let size = _this.setImageSize(bakImage)
          context.drawImage(bakImage, 0, 0, size.width, size.height)
          _this.drawTextByType(context)
          _this.canvasUrl = _this.canvas.toDataURL("image/png")
          if (_this.canvas.height / 2 > window.innerHeight) {
            _this.myPreviewDialog = 'myPreviewScroll'
          } else {
            _this.myPreviewDialog = ''
          }
          _this.previewDialog = true
          _this.$nextTick(() => {
            // document.getElementById('textAreaInput').value = ''
            loading.close()
          })
        }
        bakImage.src = _this.editUrl
      }
      image.src = url
    },
    touchstart (e) {
      let dom = this.$refs['cardImg'],
        left = dom.offsetLeft || 0,
        top = dom.offsetTop || 0
      console.log('start', e.changedTouches[0].clientX, e.changedTouches[0].clientY)
      // 设置初始鼠标位置
      this.startPoint.x = e.changedTouches[0].clientX
      this.startPoint.y = e.changedTouches[0].clientY
      // 保存触摸块的初始位置 结束后需要还原
      this.startSite.left = e.target.offsetLeft ? e.target.offsetLeft : 0
      this.startSite.top = e.target.offsetTop ? e.target.offsetTop : 0
      // 设置背景图初始位置
      this.imgStartSite.left = left
      this.imgStartSite.top = top
      console.log(left, top)
    },
    touchmove (e) {
      // 设置鼠标结束位置
      this.endPoint.x = e.changedTouches[0].clientX
      this.endPoint.y = e.changedTouches[0].clientY
      // 设置图片的位移
      let x = this.endPoint.x - this.startPoint.x,
        y = this.endPoint.y - this.startPoint.y,
        dom = this.$refs['cardImg']
        console.log(x, y)
      // 设置图片的位置
      dom.style.left = (this.imgStartSite.left + x) + 'px'
      dom.style.top = (this.imgStartSite.top + y) + 'px'
    },
    touchend () {}
  }
}
</script>
<style lang="scss" scoped>
  .card-main {
    height: 100%;
    overflow: hidden;
    background-color: #FFF;
    // 头部
    .header {
      height: 40px;
      background-color: #05afa0;
      text-align: center;
      line-height: 40px;
      text-align: center;
      color: #FFF;
      font-size: 12px;
      .back {
        position: absolute;
        left: 0;
        top: 0;

      }
    }
    .edit-panel {
      width: 100%;
      height: 50px;
      position: relative;
      background-color: #FFF;
      &:after {
        content: '';
        position: absolute;
        left: 7px;
        right: 7px;
        height: 1px;
        bottom: 0;
        border-bottom: 1px solid #d2c7be;
      }
      .edit-panel-textarea {
        margin-top: 14px;
        height: 16px;
        line-height: 16px;
        width: 100%;
        border-width: 0 0 0 4px;
        border-style: solid;
        border-color: #82756A;
        background: none;
        padding: 0 14px;
        resize: none;
        border-radius: 0;
      }
    }
    // 底部
    .submit {
      text-align: center;
      height: 76px;
      line-height: 35px;
      padding-top: 18px;
      background-color: #FFF;
      .submit-btn {
        width: 90.6%;
        height: 50px;
        line-height: 50px;
        font-size: 17.5px;
        color: #FFF;
        border-radius: 4px;
        display: inline-block;
        background: #82756A;
      }
    }
    // 图片列表
    .img-list {
      margin: 15px 7px 0;
      overflow-x: auto;
      height: 73px;
      background-color: #FFF;
      .img-ul {
        width: 633px;
        height: 100%;
        white-space: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        li {
          float: left;
          width: 73px;
          height: 73px;
          margin-right: 7px;
          &.active {
            border: 4px solid #82756A;
          }
          &:last-child {
            margin-right: 0;
          }
          img {
            width :100%;
            height: 100%;
            display: block;
          }
        }
      }
    }
    // 中间内容
    .article {
      height: calc(100% - 214px);
      width: 100%;
      background-color: #282828;
      padding: 10px 0;
      .card-pres {
        width: 90%;
        height: calc(100% - 20px);
        position: relative;
        margin: 0 auto;
        overflow: hidden;
        &.card-press_01 {
          top: 50%;
          transform: translateY(-50%);
          .card-pic-t {
            width: 257%;
            top: 0;
            height: 200%;
          }
        }
        &.card-press_02 {
          top: 50%;
          transform: translateY(-50%);
          .card-pic-t {
            top: 0%;
            width: 200%;
          }
        }
        &.card-press_03 {
          top: 50%;
          transform: translateY(-50%);
          .card-pic-t {
            top: 0%;
            width: 170%;
          }
        }
        &.card-press_04 {
          top: 50%;
          transform: translateY(-50%);
          .card-pic-t {
            width: 90%;
            top: 0;
          }
        }
        &.card-press_05 {
          .card-pic-t {
            width: 140%;
            top: 7%;
          }
        }
        .back-box {
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 1;
          .img-type01 {
            height: 100%;
            display: block;
            margin: 0 auto;
          }
          .img-type02 {
            width: 100%;
          }
        }
        .dragdom {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          &.dragdom-01 {
            // top: 10%;
            // left: 14%;
            // right: 14%;
            // bottom: 44%;
          }
          &.dragdom-02 {
            left: 4%;
            right: 4%;
            top: 10%;
            bottom: 34%;
          }
          &.dragdom-04 {
            left: 14px;
            right: 30%;
            top: 20px;
            bottom: 35%;
          }
          &.dragdom-05 {
            left: 7%;
            right: 7%;
            top: 3%;
            bottom: 40%;
          }
        }
        .card-pic-t {
          position: absolute;
          top: 10%;
          left: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          background-repeat: no-repeat;
          background-size: contain;
        }
        .card-bg-01 {
          background-image: url(../../../assets/img/bgimg/bgimg_01.jpg);
        }
        .card-bg-02 {
          background-image: url(../../../assets/img/bgimg/bgimg_02.jpg);
        }
        .card-bg-03 {
          background-image: url(../../../assets/img/bgimg/bgimg_03.jpg);
        }
        .card-bg-04 {
          background-image: url(../../../assets/img/bgimg/bgimg_04.jpg);
        }
        .card-bg-05 {
          background-image: url(../../../assets/img/bgimg/bgimg_05.jpg);
        }
        .card-bg-06 {
          background-image: url(../../../assets/img/bgimg/bgimg_06.jpg);
        }
        .card-bg-07 {
          background-image: url(../../../assets/img/bgimg/bgimg_07.jpg);
        }
        .card-bg-08 {
          background-image: url(../../../assets/img/bgimg/bgimg_08.jpg);
        }
      }
      
    }
    .enlarge-area {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
      .mask {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .2);
        z-index: 1;
      }
      .enlarge-area_content {
        z-index: 2;
        position: relative;
        padding: 10px;
        top: 50%;
        margin: 0 5px;
        background-color: #FFF;
        border-radius: 5px;
        transform: translateY(-50%);
        .submit-area {
          height: 66px;
          padding-top: 8px;
          display: flex;
          .sel-pre, .sel-next {
            width: 70px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 14px;
            color: #82756A;
          }
          .select-bak {
            flex: 1;
            background-color: #82756A;
            font-size: 17.5px;
            color: #FFF;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-radius: 5px;
          }
        }
        img {
          width: 100%;
          display: block;
        }
      }
    }
    .previewDialog {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #82756A;
      z-index: 100;
      .myCanvasClass {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      &.myPreviewScroll {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        .myCanvasClass {
          position: relative;
          top: unset;
          left: unset;
          transform: none;
          display: block;
        }
      }
      .save {
        position: fixed;
        bottom: 46px;
        width: 90%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #FFF;
        border-radius: 4px;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        font-weight: bold;
        color: #82756A;
        text-align: center;
        a {
          color: #82756A;
        }
      }
      .newB {
        position: fixed;
        bottom: 19px;
        width: 50%;
        left: 50%;
        transform: translateX(-50%);
        height: 12px;
        line-height: 12px;
        font-size: 12px;
        font-weight: bold;
        color: #FFF;
        text-align: center;
        a {
          color: #FFF;
        }
      }
    }
    .hide {
      font-family: SuXinShiLiuKai;
    }
  }
</style>
