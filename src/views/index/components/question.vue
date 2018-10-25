<template>
  <div class="question" :class="[isShow === false ? 'noshow' : '']">
    <div class="header">
    </div>
    <div class="question-body">
      <div class="tips">
        {{descs}}
      <!-- 尊敬的贵宾您好，感谢您参观本园，为了更好地为您提供服务，现请您做一份满意度问卷，感谢您的配合！ -->
      </div>
      <div class="question-list">
        <ol type="1" style="margin-left:-15px;">
          <li v-for="(item, index) in dataList" :key="'item' + index">
            <p>{{item.cname}}</p>
            <div class="answer">
              <el-radio-group v-model="answerObj[index]">
                <el-radio
                  v-for="(value, idx) in item.answerList"
                  :key="'value' + idx"
                  :label="value"
                >
                {{value.cname}}
                </el-radio>
              </el-radio-group>
            </div>
          </li>
        </ol>
        <div class="user-info">
          <el-form :inline="true" :model="dataForm" ref="dataForm" :rules="rules">
            <el-form-item label="您的姓名:" prop="userName">
              <el-input type="text" v-model="dataForm.userName" class="user-name"></el-input>
            </el-form-item>
            <el-form-item label="您的手机号码(必填):" prop="userPhone">
              <el-input type="text" class="phone-input" v-model="dataForm.userPhone"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="error-tip">
          {{errorTip}}
        </div>
        <div class="operation">
          <el-button type="primary" size="small" :disabled="isDisabled" class="sure-btn" @click="submitData('dataForm')">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {valiPhone} from '@/utils/validator.js';
export default {
  data () {
    return {
      errorTip: '', // 错误提示
      isDisabled: false,
      isShow: true,
      answerObj: {},
      questionObj: {},
      dataInfo: {
        projectId: null,
        indexs: null,
        volumeId: null,
        userName: null,
        userPhone: null,
        questResultsList: []
      },
      dataForm: {
        userName: null,
        userPhone: null
      },
      descs: null,
      rules: {
        userPhone: [
          { required: true, message: '请输入您的手机号', trigger: 'blur' },
          { validator: valiPhone, trigger: 'blur' }
        ],
        userName: [
          { required: false, trigger: 'blur' }
        ]
      },
      dataList: [],
      params: {
        pageNum: 1,
        pageSize: 99999,
        where: {
          projectId: null,
          statuss: 0
        }
      }
    }
  },
  created () {
    this.getQuestion();
  },
  methods: {
    getQuestion () {
      const projectId = this.$route.query.projectId;
      // alert(projectId)
      this.params.where.projectId = projectId;
      const data = JSON.stringify(this.params);
      if (projectId) {
        this.isShow = true;
        this.axios.get('/volume/page/' + data) // 根据项目id查询问卷id
          .then(res => {
            if (res && res.status === 200) {
              console.log(res)
              if (res.data.result.length > 0) {
                this.descs = res.data.result[0].descs;
                this.dataInfo.indexs =  res.data.result[0].indexs;
                this.dataInfo.projectId = res.data.result[0].projectId;
                this.dataInfo.volumeId = res.data.result[0].uid;
                this.axios.get('/volume/' + res.data.result[0].uid) // 根据问卷id查问卷调查问题和答案
                  .then(response => {
                    if (response && response.status === 200) {
                      if (response.data.length > 0) {
                        this.dataList = response.data;
                      }
                    }
                  })
                  .catch(() => {})
              }
            }
          })
          .catch(() => {});
      } else {
        this.isShow = false;
      }
    },
    submitData (form) { // 提交问卷
      this.dataInfo.questResultsList = [];
      this.errorTip = '';
      for (let i in this.answerObj) {
        const data = {
          answerId: this.answerObj[i].uid,
          problemId: this.answerObj[i].problemId
        }
        this.dataInfo.questResultsList.push(data);
      }
      this.$refs[form].validate(valid => {
        if (valid) {
          const params = {
            volumeId: this.dataInfo.volumeId,
            userPhone: this.dataForm.userPhone
          }
          this.axios.get('/results/boo', {params})
            .then(res => {
              if (res && res.data === false) {
                this.sendData();
                this.errorTip = '';
                // this.isDisabled = false;
              } else {
                this.errorTip = '您已经做过该问卷了';
                // this.isDisabled = true;
              }
            })
            .catch(() => {});
        }
      });
    },
    sendData () {
      this.dataInfo.userName = this.dataForm.userName;
      this.dataInfo.userPhone = this.dataForm.userPhone;
      if (this.dataInfo.questResultsList && this.dataInfo.questResultsList.length === this.dataList.length) {
        this.axios.post('/results', this.dataInfo)
        .then(res => {
          if (res && res.status === 201) {
            this.$router.push({name: 'result', query: {phone: this.dataForm.userPhone}});
          }
        })
        .catch(() => {})
      } else {
        this.errorTip = '请先填写完问卷';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .noshow {
    display: none;
  }
.question {
  width: 100%;
  height: 100%;
  font-size: 14px;
  .header {
    width: 100%;
    -webkit-background-size: 100% 100%;
    height: 42%;
    background-size: 100% 100%;
    background-position: 0 0;
    background-repeat: no-repeat;
    background-image: url(../../../assets/img/question/title.png);
  }
  .question-body {
    width: 100%;
    min-height: calc(100% - 42%);
    margin-top: -1px;
    // height: auto;
    background: #72d8ee;
    .tips {
      width: 87.7%;
      margin: 0 6.3%;
      padding: 0 10px 10px 10px;
      background: #fff;
      line-height: 20px;
    }
    .question-list {
      width: 87.7%;
      margin: 0 6.3%;
      padding-top:10px;
      background: #fff;
      ol {
        width: 100%;
        margin: 0;
        padding-right: 20px;
        line-height: 20px;
        li {
          margin-bottom: 10px;
        }
        .answer {
          width: 100%;
          padding-right: 20px;
          margin-top: 10px;
          /deep/ .el-radio-group {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content:flex-start;
            flex-direction: column;
          }
          /deep/ .el-radio{
            // margin-right: 5%;
            margin-bottom: 10px;
          }
          /deep/ .el-radio+.el-radio {
            margin-left: 0;
          }
        }
      }
    }
  }
  .user-info {
    width: 100%;
    padding: 10px;
    /deep/ .el-input__inner {
      border-left-style: none;
      border-right-style: none;
      border-top-style: none;
      height: 20px;
      line-height: 20px;
    }
    /deep/ .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
      content: none;
      display: table;
    }
    /deep/ .el-form-item {
      margin-bottom: 0;
    }
    /deep/ .el-form-item__content {
      width: 50%;
    }
  }
  .operation {
    width: 100%;
    text-align: center;
    padding: 20px 0 ;
    .sure-btn {
      width: 80px;
      background: #72d8ee;
      border-color: #72d8ee;
    }
  }
  .error-tip {
    color: red;
    text-align: center;
  }
}
@media screen and (max-width: 330px) {
  .question {
    font-size: 12px;
  }
  /deep/ .el-radio__label {
    font-size: 12px;
  }
  /deep/ .el-form-item__label , /deep/ .el-input{
    font-size: 12px;
  }
  .phone-input {
    width: 120px;
  }
}
@media screen and (max-height: 570px){
  .question {
    .header {
      height: 36%;
    }
    .question-body {
      min-height: calc(100% - 36%);
    }
  }
}
@media screen and (min-height: 620px){
  .question {
    .header {
      height: 37%;
    }
    .question-body {
      min-height: calc(100% - 37%);
    }
  }
}
@media screen and (min-height: 800px){
  .question {
    .header {
       height: 30%;
    }
    .question-body {
      min-height: calc(100% - 30%);
    }
  }
}
</style>


