<template>
  <div class="feedbackView"  v-show="showFeedbackView" @click.stop>
    <transition name="fade">
      <div class="content" v-show="showFeedbackView">
        <!--<div class="separateLine"></div>-->
        <textarea v-model="value" class="feedBackContent" placeholder="请输入反馈信息">
        </textarea>
        <button @click="hide">取消</button>
        <button @click="submitFeedback">发表</button>
      </div>
    </transition>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {

    data() {
      return {
        showFeedbackView:false,
        value:''
      }
    },
    methods: {
      show(){
        this.showFeedbackView = true
      },
      hide(){
        this.showFeedbackView = false
      },
      submitFeedback(){
        axios.post("https://music.boysummer.top/feedback/writefeedback", {
          params: this.value
        }).then((res) => {
          alert('反馈成功:)')
        }).catch((err)=>{
          alert('暂时无法反馈:(')
        })
        this.hide()
      }

    }
  }
</script>

<style scoped>
  .feedbackView {
    /*display: block;*/
    position: fixed;
    z-index: 1000;
    width: 100%;
    top: 0;
    bottom: 0;
    /*background-color: red;*/
    background: rgba(169, 169, 169, 0.5);
    border-radius: 5px;
  }
  .content {
    color: rgba(255,255,255,0.5);
    background: #333;
    padding-top: 20px;
    border-radius: 5px;
    display: block;
    width: 90%;
    margin-left: 5%;
    margin-top: 80px;
    height: 120px;
    /*background: white;*/
    text-align: center;
    /*background-color: ;*/
  }
  .separateLine {
    background-color: red;
    width: 95%;
    margin: 0 auto;
    height: 1px;
    /*background-color: #C8C7CC;*/
    margin-bottom: 10px;
  }

  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    font-size: 13px;
  }
  input:-moz-placeholder,
  textarea:-moz-placeholder {
    font-size: 13px;
  }
  input::-moz-placeholder,
  textarea::-moz-placeholder {
    font-size: 13px;
  }
  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    font-size: 13px;
  }
  textarea {
    width: 90%;
    height: 50px;
    margin:0 auto;
    margin-bottom:20px;
    border-radius: 5px;
    background-color: lightgray;
  }

  button {
    display: inline-block;
    background-color: lightgray;
    width: 25%;
    margin-right: 30px;
    margin-left: 30px;
    border-color: lightgray;
    border-width: 1px;
    border-style: solid;
    border-radius: 3px;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }

  .fade-enter,
  .fade-leave-to

  {
    transform: scale(0);
  }
  .title{
    display: block;
    height: 20px;
    color: white;
  }
</style>
