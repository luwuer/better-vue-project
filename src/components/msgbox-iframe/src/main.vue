<template>
  <transition name="msgbox-fade">
    <div class="msgbox-iframe-wrapper"
         v-show="visible">
      <div class="msgbox-iframe" :style="mainStyle">
        <Icon class="msgbox-iframe-close-icon"
              name="close"
              @click.native="close"
              v-if="showClose"></Icon>
        <div class="msgbox-iframe-title"
            v-if="showTitle">
          {{title}}
        </div>
        <div class="msgbox-iframe-content" :style="contentStyle">
          <iframe :src="url"
                  frameborder="0"
                  class="iframe"></iframe>
        </div>
        <div class="msgbox-iframe-footer"
            v-if="showFooter">
          <h-button type="ghost"
                    @click="close">{{cancelText}}</h-button>
          <h-button type="primary"
                    @click="confirm">{{confirmText}}</h-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      title: '未定义',
      url: '',
      showClose: true,
      showTitle: true,
      showFooter: true,
      confirmText: '确认',
      cancelText: '取消',
      duration: 0,
      beforeClose: () => true,
      beforeConfirm: () => true,
      visible: false,
      closed: false,
      timer: -1,
      width: '100%',
      height: '100%',
      escClose: false // esc 关闭
    }
  },
  computed: {
    mainStyle() {
      let style = {}
      if (this.width) {
        style.width = this.width
      }
      if (this.height) {
        let strHeight = this.height + ''
        if (/%/.test(strHeight)) {
          let percent = Number(strHeight.replace('%', ''))
          if (isNaN(percent)) console.error('TypeError: msgbox-iframe.height')

          style.height = percent * 0.8 + '%'
        } else {
          style.height = strHeight
        }
      }

      return style
    },
    contentStyle() {
      let titleHeight = 0
      let footerHeight = 0

      if (this.showTitle) {
        titleHeight = '32px'
      }
      if (this.showFooter) {
        footerHeight = '56px'
      }

      return {
        height: `calc(100% - ${titleHeight} - ${footerHeight})`
      }
    }
  },
  methods: {
    destroyElement() {
      this.$el.removeEventListener('animationend', this.destroyElement)
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    close() {
      let flag = this.beforeClose(this)
      if (flag !== false) {
        this.closed = true
      }
    },
    confirm() {
      let flag = this.beforeConfirm(this)
      if (flag !== false) {
        this.closed = true
      }
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    },
    keydown(e) {
      // esc关闭
      if (e.keyCode === 27) {
        if (!this.closed) {
          this.close()
        }
      }
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false
        window.selfMsgFlag = 0
        this.$el.addEventListener('animationend', this.destroyElement)
      }
    }
  },
  mounted() {
    this.startTimer()
    if (this.escClose) {
      document.addEventListener('keydown', this.keydown)
    }
  },
  beforeDestroy() {
    if (this.escClose) {
      document.removeEventListener('keydown', this.keydown)
    }
  }
}
</script>

<style lang="scss">
.msgbox-fade-enter-active {
  animation: msgbox-fade-in 0.3s;
}

.msgbox-fade-leave-active {
  animation: msgbox-fade-out 0.3s;
}

@keyframes msgbox-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }

  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes msgbox-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}

.msgbox-iframe-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // 设置 125% 是为了动画时半透明背景仍然全覆盖页面
  height: 125%;
  text-align: center;
  z-index: 2018;
  background: rgba(0, 0, 0, 0.5);

  &:after {
    content: '';
    display: inline-block;
    // 与屏幕等高，msgbox 的 vertical-iframe-align middle 就能使其居中: 125% * 80% = 100%
    height: 80%;
    width: 0px;
    vertical-align: middle;
  }

  .msgbox-iframe {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 80%;
    padding: 0;
    vertical-align: middle;
    background-color: #fff;
    border: 1px solid #ebeef5;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: left;
    overflow: hidden;
    backface-visibility: hidden;

    .msgbox-iframe-close-icon {
      position: absolute;
      top: 4px;
      right: 6px;
      font-size: 16px;
      cursor: pointer;

      &:hover {
        color: #298DFF;
      }
    }

    .msgbox-iframe-title {
      height: 32px;
      padding: 0 36px 0 12px;
      line-height: 32px;
      font-size: 14px;
      font-weight: 700;
      box-shadow: 0 1px 2px #3333;
    }

    .msgbox-iframe-content {
      padding-top: 2px;

      .iframe {
        width: 100%;
        height: calc(100% - 2px);
      }
    }

    .msgbox-iframe-footer {
      position: relative;
      padding: 12px;
      text-align: right;

      .h-btn {
        margin: 0 5px;
      }
    }
  }
}
</style>
