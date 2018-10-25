import Vue from 'vue/dist/vue.js';
import Router from 'vue-router';

// 主要
import mainDefault from '../components/default.vue';
import result from '../components/result.vue';
import question from '../components/question.vue';

import plates from '../components/plates.vue'
import edit from '../components/edit.vue'
import start from '../components/start.vue'
Vue.use(Router)

 
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: mainDefault,
      meta: {
        title: '问卷调查'
      }
    },
    {
      path: '/result',
      name: 'result',
      component: result,
      meta: {
        title: '问卷调查'
      }
    },
    {
        path: '/question',
        name: 'question',
        component: question,
        meta: {
          title: '问卷调查'
        }
    },
    {
      path: '/plates',
      name: 'plates',
      component: plates,
      meta: {
        title: '贺卡制作'
      }
    },
    {
      path: '/edit',
      name: 'edit',
      component: edit,
      meta: {
        title: '贺卡制作'
      }
    },{
      path: '/start',
      name: 'start',
      component: start,
      meta: {
        title: '贺卡制作'
      }
    }
  ]
})
// 使用 afterEach 钩子函数，保证路由已经跳转成功之后修改 title 页面埋点
router.afterEach((route) => {
  let documentTitle = '';
  route.matched.forEach((path) => {
    if (path.meta.title) {
      documentTitle = `${path.meta.title}`;
    }
  });
  console.log('页面埋点:' + route.path, '当前环境：' + process.env.VUE_APP_SERVICE_CONFIG)
  document.title = documentTitle;
});
export default router
