var map = new Map();
window.onload = function () {
    var canvas = document.querySelector("#canvas");
    var context = canvas.getContext("2d");
    
    var isDrag = false;
    var dx = 0, dy = 0;

    setInterval(function() {
        if (map.isReady) {
            context.clearRect(0,0,1200,800);
            context.drawImage(map.img, map.x,map.y,1200,800,0,0,1200,800);
        }
    }, 16);

    canvas.addEventListener("mousedown", function(e) {
        isDrag = true;
        dx = e.x;
        dy = e.y;
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        isDrag = false;
    }, false);
    canvas.addEventListener("mousemove", function (e) {
        if (isDrag) {
            var x = e.x - dx;
            var y = e.y - dy;
            dx = e.x;
            dy = e.y;
            //x = x < 0 ? 0 : x;
            //y = y < 0 ? 0 : y;
            map.x += -x;
            map.y += -y;
            map.x = map.x < 0 ? 0 : map.x;
            map.x = map.x + 1200 >= map.width ? map.width - 1200 : map.x;
            map.y = map.y < 0 ? 0 : map.y;
            map.y = map.y + 800 >= map.height ? map.height - 800 : map.y;
        }
    }, false);
}

function Map(x,y,w,h) {
    this.x = x || 0;
    this.y = y || 0;
    this.img = new Image();
    this.img.src = "images/03.jpg";
    this.width = w || this.img.width;
    this.height = h || this.img.height;
    var that = this;
    this.isReady = false;
    this.img.onload = function() {
        that.isReady = true;
        that.width = w || that.img.width;
        that.height = h || that.img.height;
    }
}