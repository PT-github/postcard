// 是否使用本地API接口
export const localAPI = false;
// 是否使用线上API接口
export const publicAPI = false;
// ctx
export const ctx = 'vis';

/*
 * 域名地址
 * dev 开发环境
 * test 测试环境
 * prod 生产环境
 * */
const oDomains = {
  // ajax地址
  domain: {
      development: 'http://10.116.64.112:8086/api',
      test: 'http://222.244.147.121:8086/api',
      production: 'http://222.244.147.121:8086/api'
  },
  // 用户服务 url以 @user/开头
  domain_user: {
      development: 'http://10.16.2.88:8443/api/user/',
      test: 'http://10.16.2.88:8443/api/user/',
      production: 'http://10.16.2.88:8443/api/user/'
  },
  // websocket地址
  domain_ws: {
      development: 'ws://10.16.2.88:8443',
      test: 'ws://10.16.2.88:8443',
      production: 'ws://10.16.2.88:8443'
  },
  // 文件/图片/CDN地址
  domain_file: {
      development: 'http://swift.aorise.org:8090/v1/AUTH_a415edee1cbd404795977372009b51dd/travel-pub',
      test: 'http://swift.aorise.org:8090/v1/AUTH_a415edee1cbd404795977372009b51dd/travel-pub',
      production: 'http://swift.aorise.org:8090/v1/AUTH_a415edee1cbd404795977372009b51dd/travel-pub'
  },
  // 上传地址
  domain_upload: {
      development: 'http://10.16.4.50:8084',
      test: 'http://10.16.4.50:8084',
      production: 'http://10.16.4.50:8084'
  }
};
// development production test
let sENV = process.env.NODE_ENV;
if (!sENV) { sENV = 'development'; }
console.log('config env', sENV);
// ajax default
export const ajaxCtx = {
  domain: oDomains.domain[sENV],
  domain_user: oDomains.domain_user[sENV],
  domain_ws: oDomains.domain_ws[sENV],
  domain_file: oDomains.domain_file[sENV],
  domain_upload: oDomains.domain_upload[sENV]
};

// cookie名
export const cookieUserId = 'sc.pro.web.user_id';
export const cookieUserName = 'sc.pro.web.user_name';
// cookie默认有效时间（小时）
export const cookieTime = 24;

// 高德地图 溆浦县 adcode
export const mapXupuxian = {
  adcode: '431224',
  name: '溆浦县',
  center: [110.685133, 27.907633]
};
