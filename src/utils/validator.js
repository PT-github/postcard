/*
* rule
* {"trigger":"change","max":10,"min":20,"field":"telegrpNo","fullField":"telegrpNo","type":"string", ...}
*  可自定义属性
*/
// 验证手机号
export const valiPhone = (rule, value, callback) => {
if (value) {
    let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!reg.test(value)) {
    return callback(new Error('请输入正确的手机号码'));
    }
}
callback();
};