function __awaiter(t,s,r,o){return new(r=r||Promise)(function(i,e){function a(t){try{c(o.next(t))}catch(t){e(t)}}function n(t){try{c(o.throw(t))}catch(t){e(t)}}function c(t){var e;t.done?i(t.value):((e=t.value)instanceof r?e:new r(function(t){t(e)})).then(a,n)}c((o=o.apply(t,s||[])).next())})}var ErrorCaptcha;function renderCaptcha(t,e){var i=document.createElement("style"),a=null==(a=null==t?void 0:t.mask)||a,n=null!=(n=null==t?void 0:t.width)?n:320,t=null!=(t=null==t?void 0:t.height)?t:355,a=(i.textContent=`
  ${a?`#${e}captcha_mask {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2001;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, .7); }
      `:""}
  #${e}ssj_captcha {
    width: ${n}px;
    height: ${t}px;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    padding: 5px;
    border-radius: 8px;
    border: 1px solid #ebeef5;
    background: #ffffff;
    font-size: 16px;
    display:block;
    z-index:9999;
  }

  .${e}captcha_content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .${e}captcha_top {
    display: flex;
    width: 300px;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .${e}captcha_top_left {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 15px;
  }

  .${e}captcha_top_right {
    display: flex;
    align-items: center;
    width: 150px;
    height: 40px;
  }

  #${e}captcha_content_main {
    display: flex;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }

  .${e}captcha_dots {
    position: absolute;
    z-index: 10;
    width: 22px;
    height: 22px;
    color: #cedffe;
    background: #3e7cff;
    border: 2px solid #f7f9fb;
    line-height: 20px;
    text-align: center;
    border-radius: 22px;
    cursor: default;
  }


  .${e}captcha_bottom {
    display: flex;
    width: 300px;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
  }

  .${e}captcha_bottom_left {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    cursor: pointer;
  }

  .${e}captcha_bottom_right {
    display: flex;
    align-items: center;
    justify-content: end;
    width: 150px;
    height: 40px;
  }

  .${e}captcha_bottom_right_button {
    width: 100%;
    height: 40px;
    letter-spacing: 2px;
    text-align: center;
    padding: 9px 15px;
    font-size: 15px;
    border-radius: 5px;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    color: #fff;
    background-color: #409eff;
    border: 1px solid #409eff;
    -webkit-appearance: none;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
  }
  .${e}skeleton_loading{
    background-size: 400% 100%;
    background-position: 100% 50%;
    background-image: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
    animation: ${e}skeleton 1.4s ease infinite;
  }

  @keyframes ${e}skeleton {
    0% {
         background-position: 100% 50%;
    }

    100% {
         background-position: 0 50%;
    }
  }
  .${e}rotate{
      animation: ${e}r 1s linear infinite;
  }
  @keyframes ${e}r {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
    }
  `,document.head.appendChild(i),`
  <div id="${e}ssj_captcha">
    <div class="${e}captcha_content">
      <div class="${e}captcha_top">
        <div class="${e}captcha_top_left">
          请在下图依次点击：
        </div>
        <div class="${e}captcha_top_right">
          <img id="${e}captcha_thumbBase64" class="${e}skeleton_loading" width="150" height="40" />
        </div>
      </div>
      <div id="${e}captcha_content_main">
        <img id="${e}captcha_imageBase64" class="${e}skeleton_loading" width="300" height="240"/>
      </div>
      <div class="${e}captcha_bottom">
        <div class="${e}captcha_bottom_left">
          <svg id="${e}captcha_close" t="1695624522263" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="5073" width="32" height="32">
            <path
              d="M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128zM512 832c-179.2 0-320-140.8-320-320s140.8-320 320-320 320 140.8 320 320S691.2 832 512 832z"
              p-id="5074" fill="#707070"></path>
            <path
              d="M672 352c-12.8-12.8-32-12.8-44.8 0L512 467.2 396.8 352C384 339.2 364.8 339.2 352 352S339.2 384 352 396.8L467.2 512 352 627.2c-12.8 12.8-12.8 32 0 44.8s32 12.8 44.8 0L512 556.8l115.2 115.2c12.8 12.8 32 12.8 44.8 0s12.8-32 0-44.8L556.8 512l115.2-115.2C684.8 384 684.8 364.8 672 352z"
              p-id="5075" fill="#707070"></path>
          </svg>
          <svg id="${e}captcha_refresh" t="1695624501395" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="4020" width="32" height="32">
            <path
              d="M733.04 379.104a264.112 264.112 0 0 0-468.112 41.76 14.336 14.336 0 0 1-17.968 8.16l-20.256-7.008a12.352 12.352 0 0 1-7.456-16.192 312.112 312.112 0 0 1 556.736-48.56l12.704-44.352a16 16 0 0 1 7.632-9.584l-132.96-38.128a14.464 14.464 0 0 1-13.76-7.632l-132.96 38.128a14.464 14.464 0 0 1-3.04-26.56l24.752-13.712a16 16 0 0 1 12.16-1.392l42.032 12.048z m-447.52 280.352a264.112 264.112 0 0 0 468.112-41.76 14.336 14.336 0 0 1 17.968-8.16l20.256 7.008a12.352 12.352 0 0 1 7.44 16.176c-46.368 118.032-160.8 199.072-290.432 199.072-110.96 0-210.768-59.296-266.304-150.432l-12.704 44.288a16 16 0 0 1-7.616 9.584l-24.752 13.712a14.464 14.464 0 0 1-20.928-16.64l38.128-132.96a11.136 11.136 0 0 1 13.76-7.632l132.976 38.128a14.464 14.464 0 0 1 3.04 26.56l-24.768 13.712a16 16 0 0 1-12.16 1.392l-42.016-12.048z"
              fill="#707070" p-id="4021"></path>
          </svg>
        </div>
        <div class="${e}captcha_bottom_right">
          <button id="${e}captcha_confirm" class="${e}captcha_bottom_right_button">
            确定
          </button>
        </div>
      </div>
    </div>
  </div>
  `);return a}function isPromiseFunction(t){return"function"==typeof t&&"AsyncFunction"===t.constructor.name}function generateRandomString(e=5){var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";let a="";for(let t=0;t<e;t++){var n=Math.floor(Math.random()*i.length);a+=i.charAt(n)}return a}!function(t){t.CONFIG_ERROR="请传入config配置对象",t.OPEN_CONFIG_ERROR="config配置需要至少包含initCallback和verifyCallback函数",t.INIT_ERROR="请先执行Init初始化方法",t.OPEN_ERROR="必须传入el、initCallback和verifyCallback参数，并且initCallback和verifyCallback必须是Promise函数",t.INIT_CALLBACKArg="回调函数的返回值必须是一个对象 对象里 三个参数 key,smImg,bigImg"}(ErrorCaptcha=ErrorCaptcha||{});class Captcha{static init(t){return Captcha.instance||(Captcha.instance=new Captcha(t)),Captcha.instance}renderImage(){var t;return __awaiter(this,void 0,void 0,function*(){const e=document.getElementById(this.prefixName+"captcha_thumbBase64"),i=document.getElementById(this.prefixName+"captcha_imageBase64"),a=document.getElementById(this.prefixName+"captcha_refresh");yield null==(t=this.initCallback)?void 0:t.call(this).then(t=>{if(!(t&&t.bigImg&&t.key&&t.smImg))throw this.close(),ErrorCaptcha.INIT_CALLBACKArg;a.removeAttribute("class"),this.refreshFlag=!0,this.key=t.key,e.src=t.smImg,i.src=t.bigImg})})}registerEvent(){var t=document.getElementById(this.prefixName+"captcha_close"),e=document.getElementById(this.prefixName+"captcha_refresh"),i=document.getElementById(this.prefixName+"captcha_confirm"),a=document.getElementById(this.prefixName+"captcha_imageBase64");t.addEventListener("click",this.close,!0),e.addEventListener("click",this.refresh,!0),i.addEventListener("click",this.verify,!0),a.addEventListener("click",this.captchaClickPos,!0)}removeEvent(){var t=document.getElementById(this.prefixName+"captcha_close"),e=document.getElementById(this.prefixName+"captcha_refresh"),i=document.getElementById(this.prefixName+"captcha_confirm"),a=document.getElementById(this.prefixName+"captcha_imageBase64");t.removeEventListener("click",this.close,!0),e.removeEventListener("click",this.refresh,!0),i.removeEventListener("click",this.verify,!0),a.removeEventListener("click",this.captchaClickPos,!0)}captchaClickPos(t){t.preventDefault();var e=t.currentTarget.getBoundingClientRect(),t={x:t.clientX-e.left-11,y:t.clientY-e.top-11,index:this.dots.length+1};this.dots.push(t),this.updateDots()}updateDots(){const a=document.getElementById(this.prefixName+"captcha_content_main");this.dots.forEach(t=>{var e=document.createElement("div"),i=(e.className=this.prefixName+"captcha_dots",e.style.top=t.y+"px",e.style.left=t.x+"px",document.createElement("span"));i.textContent=t.index,e.appendChild(i),a.appendChild(e)})}constructor(t){if(this.initialized=!1,this.dots=[],this.refreshNumber=5,this.refreshFlag=!1,this.initCallback=null,this.verifyCallback=null,this.closeCallback=null,!t)throw ErrorCaptcha.CONFIG_ERROR;this.config=t,this.config.refreshNumber&&(this.refreshNumber=this.config.refreshNumber),this.initialized=!0,this.prefixName=generateRandomString()+"_",this.close=this.close.bind(this),this.refresh=this.refresh.bind(this),this.verify=this.verify.bind(this),this.captchaClickPos=this.captchaClickPos.bind(this)}open({el:e,initCallback:i,verifyCallback:a,closeCallback:n}){return __awaiter(this,void 0,void 0,function*(){if(!(e&&i&&a&&"function"==typeof i&&"function"==typeof a&&isPromiseFunction(i)&&isPromiseFunction(a)))throw ErrorCaptcha.OPEN_CONFIG_ERROR;if(!this.initialized)throw ErrorCaptcha.INIT_ERROR;this.el=e;var t=renderCaptcha(this.config.styleConfig,this.prefixName);return e.innerHTML=t,this.initCallback=i,this.verifyCallback=a,n&&(this.closeCallback=n),this.renderImage(),this.registerEvent(),this})}close(){this.removeEvent(),this.el.innerHTML="",this.dots=[],this.el=void 0,this.key=void 0,this.initCallback=null,this.verifyCallback=null,this.closeCallback&&(this.closeCallback(),this.closeCallback=null)}refresh(){return __awaiter(this,void 0,void 0,function*(){if(0===this.refreshNumber)alert("验证次数已到达上限,请重试"),this.close();else if(this.refreshFlag){this.refreshFlag=!1,this.dots=[];const n=document.getElementById(this.prefixName+"captcha_content_main");var t=n.querySelectorAll(`.${this.prefixName}captcha_dots`),e=document.getElementById(this.prefixName+"captcha_thumbBase64"),i=document.getElementById(this.prefixName+"captcha_imageBase64"),a=document.getElementById(this.prefixName+"captcha_refresh");t.forEach(function(t){"img"!==t.tagName.toLowerCase()&&n.removeChild(t)}),a.setAttribute("class",this.prefixName+"rotate"),e.removeAttribute("src"),i.removeAttribute("src"),--this.refreshNumber,this.renderImage()}})}verify(){var t;return __awaiter(this,void 0,void 0,function*(){const e=[];this.dots.forEach(t=>{e.push(t.x,t.y)}),yield null==(t=this.verifyCallback)?void 0:t.call(this,{key:this.key,dotArr:e})})}}export{Captcha as default};
