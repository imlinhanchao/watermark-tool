let app = new Vue({
  el: '#app',
  data: {
    isDrag: false,
    image: '',
    repeat: true,
    text: '',
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
    },
    getDefault() {
      // 从 location search 中获取默认值
      let search = location.search;
      if (search) {
        let params = search.slice(1).split('&');
        params.forEach((item) => {
          let [key, value] = item.split('=');
          if (key === 'text') {
            this.text = decodeURIComponent(value);
          } else if (key === 'color') {
            this.style.color = value;
          } else if (key === 'size') {
            this.style.fontSize = value;
          } else if (key === 'opacity') {
            this.style.opacity = value / 100;
          } else if (key === 'weight') {
            this.style.fontWeight = value === 'bold';
          } else if (key === 'angle') {
            this.angle = value;
          } else if (key === 'repeat') {
            this.repeat = value === '1';
          } else if (key === 'src') {
            this.image = decodeURIComponent(value);
          }
        })
      }
    },
    dragenterHandler(e) {
      this.isDrag = true;
      e.preventDefault();
    },
    dragleaveHandler(e) {
      this.isDrag = false;
    },
    dragoverHandler(e) {
      this.isDrag = true;
      e.preventDefault();
    },
    dropHandler(e) {
      this.isDrag = false;
      let files = e.dataTransfer.files;
      Array.from(files).forEach(f => {
        if (f.type.indexOf('image') < 0) return;
        this.previewFile(f);
      })
      e.preventDefault();
    },
    pasteHandle(e) {
      let items = event.clipboardData && event.clipboardData.items;
      Array.from(items).forEach(f => {
        if (f.type.indexOf('image') < 0) return;
        let file = f.getAsFile();
        this.previewFile(file);
      })
    }
  },
  mounted: function () {
    this.$refs['drag-area'].addEventListener('dragenter', this.dragenterHandler, false);
    this.$refs['drag-area'].addEventListener('dragleave', this.dragleaveHandler, false);
    this.$refs['drag-area'].addEventListener('dragover', this.dragoverHandler, false);
    this.$refs['drag-area'].addEventListener('drop', this.dropHandler, false);
    document.addEventListener('paste', this.pasteHandle, false);
    this.getDefault();
  }
})