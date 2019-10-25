<template>
    <div id="index">
        <div class="txt-info">
            <p>迎国庆</p>
            <p>凹造型</p>
            <p class="small">领取你的国庆专属头像</p>
        </div>
        <van-row type="flex" justify="space-around" align="center">
            <van-icon name="arrow-left" class="opt-icon" @click="handleArrow('left')" />
            <div class="portrait">
                <img :src="userPhoto" class="user-head"/>
                <img :src="path" class="change" />
            </div>
            <van-icon name="arrow" class="opt-icon" @click="handleArrow('right')" />
        </van-row>


        <div class="button-opt">
            <button size="small" @click="changeImage">随机造型</button>
            <button @click="saveImage">保存头像</button>
        </div>

        <van-dialog style="width: 60%;"
            v-model="show"
            :showConfirmButton="false"
            :closeOnClickOverlay="true"
            >
            <img src="" id="avatar">
            <p class="tip">长按保存图片</p>
        </van-dialog>
    </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import axios from 'axios'
import VConsole from 'vconsole'
export default {
    data() {
        return {
            show: false,
            flag: 1,
            path: require('../assets/img/1.png'),
            userPhoto: '',
            copyPhoto: ''
        }
    },
    created () {
        if(this.getQueryString('debug')) {
            new VConsole();
        }
        this.init();  
    },
    methods: {
        init() {
            let openid = window.localStorage.getItem('openid');
            console.log(openid);
            if (openid !== undefined && openid !== null && openid !== 'undefined') {
                axios.get('http://gqapi.herozw.com/home/wechat/getUserByOpenId', {
                    params: {
                        openid: openid
                    }
                }).then(res => {
                    if (res) {
                        this.userPhoto = res.data.headimgurl;
                        this.copyPhoto = res.data.headimgurl;

                        console.log('byopenid==============');
                        console.log(res);
                    }
                })
            } else {
                if (!this.getQueryString('code')) {
                    axios.get('http://gqapi.herozw.com/home/wechat/getOauthUrl').then(res => {
                        window.location.href = res.data;
                    });
                } else {
                    this.getData();
                }
            }
        },
        getData() {
            axios.get('http://gqapi.herozw.com/home/wechat/getUser', {
                params: {
                    code: this.getQueryString('code'),
                    state: this.getQueryString('state')
                }
            }).then(res => {
                this.userPhoto = res.data.headimgurl;
                this.copyPhoto = res.data.headimgurl;
                window.localStorage.setItem('openid', res.data.openid);

                console.log('getUser==============');
                console.log(res);
            }).catch((e) => {
                console.log('获取数据失败');
            });
        },
        // 过去地址栏参数
        getQueryString(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        },
        // 切换图片配件
        handleArrow(form) {
            if (form == 'left') {
                this.flag--;
                
            } else if (form == 'right') {
                this.flag++;
               
            }
            if (this.flag == 0) {
                this.flag = 1;
                return;
            } 
            if (this.flag == 12) {
                this.flag = 11;
                return;
            } 
            this.path = require('../assets/img/'+ this.flag +'.png');
        },
        // 随机变化图片配件
        changeImage() {
            let max = 11;
            let min = 1;
            let number = Math.floor(Math.random() * (max - min + 1) ) + min;
            this.path = require('../assets/img/'+ number +'.png');
        },
        // 保存时
        saveImage() {
            this.show = true;
            this.drawImage();
            this.userPhoto = this.copyPhoto;
        },
        // 合成图片
        drawImage() {
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            canvas.width = 300;
            canvas.height = 300;

            var myImage = new Image();
            myImage.src = this.userPhoto; // 用户头像

            context.drawImage(myImage , 0 , 0 , 300 , 300);
            var myImage2 = new Image();
            myImage2.src = this.path;   // 配件

            myImage2.onload = function () {
                context.drawImage(myImage2 , 0 , 0 , 300 , 300);
                var base64 = canvas.toDataURL("image/png"); 
                var img = document.getElementById('avatar');
                img.setAttribute('src', base64);
                console.log(base64);
            }
        }
    }
}
</script>

<style lang="less">
    html {
        width: 100%;
        height: 100%;
    }
    body {
        width: 100%;
        height: 100%;
        // background-image: linear-gradient(to bottom, #ff8b4b, #ff4e4b);
        background: url('../assets/img/bg.png') no-repeat top center;
        background-size: 100%;
    }
    #index {
        padding: 0.3rem;
        .txt-info {
            p {
                background-image:-webkit-linear-gradient(left, yellow, #e9e9e9); 
                -webkit-background-clip:text; 
                -webkit-text-fill-color:transparent; 
                font-size: 1.2rem;
                text-align: center;
                font-weight: 600;

                &.small {
                    margin: 0.3rem 0;
                    font-size: 0.34rem;
                }
            }
        }
        .portrait {
            position: relative;
            width: 3.4rem;
            height: 3.4rem;
            overflow: hidden;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }

            .change {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 9;
            }
        }

        .opt-icon {
            background-color: #fff;
            width: 1rem;
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            border-radius: 50%;
            color: #ff4e4b;
            font-size: 0.68rem;
        }

        .button-opt {

            button {
                display: block;
                margin: 0.35rem auto;
                border: none;
                border-radius: 0.1rem;
                color: #ea6803;
                cursor: pointer;
                font-size: 0.35rem;
                font-weight: bold;
                padding: .25rem 1rem;
                background-color: #f6cf6f;
                
            }

            button:active {
                box-shadow: inset 0 0 0 1px #ea6803,
                inset 0 2px 0 hsla(0,0%,100%,.1),
                inset 0 1.2em 0 hsla(0,0%,100%,.1),
                inset 0 0 0 3em hsla(0,0%,100%,.2),
                inset 0 .25em .5em hsla(0,0%,0%,.05),
                0 -1px 1px hsla(0,0%,0%,.1),
                0 1px 1px hsla(0,0%,100%,.25);
            }
        }

        .tip {
            font-size: 0.68rem;
            text-align: center;
            padding: 0.5rem 0 0.68rem;
            color: red;
        }
    }
</style>