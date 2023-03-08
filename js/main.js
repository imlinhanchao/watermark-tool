let app = new Vue({
  el: '#app',
  data: {
    isDrag: false,
    image: '',
    repeat: true,
    text: '仅供租房备案使用，他用无效',
    angle: 45,
    style: {
      color: '#ffffff',
      fontSize: 20,
      fontFamily: `"Noto Serif SC", PingFang SC, Helvetica Neue, Hiragino Sans GB,
      Segoe UI, Microsoft YaHei, 微软雅黑, sans-serif;`,
      opacity: .3,
      fontWeight: false,
    },
    position: {
      x: 0, y: 0
    }
  },
  computed: {
    textStyle() {
      return {
        ...this.style,
        fontWeight: this.style.fontWeight ? 'bold' : 'normal',
        fontSize: `${this.style.fontSize}px`,
        transform: `rotate(${this.angle}deg)`,
        width: `${this.text.length}em`,
        height: `${this.text.length}em`,
      }
    }
  },
  methods: {
    uploadHandle(e) {
      let files = e.target.files;
      this.previewFile(files[0]);
      this.$refs.file.value = '';
    },
    previewFile(f) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.image = reader.result
      };
      reader.readAsDataURL(f);
    },
    download() {
      domtoimage.toBlob(document.getElementById('result')).then(function (blob) {
        window.saveAs(blob, 'result.png');
    });
    }
  },
  mounted: function () {
  }
})