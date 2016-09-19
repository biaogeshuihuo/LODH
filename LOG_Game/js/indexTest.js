function Direction() { }
Direction.up = 0;
Direction.right = 1;
Direction.down = 2;
Direction.left = 3;

function AnimateArear(x, y, w, h) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = w || 100;
    this.height = h || 100;
}
function Human(x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 50;
    this.height = height || 50;
    this.moveSpeed = 600 * (16 / 1000);
    this.animateImage = new Image();
    this.animateImage.src = "images/animate.png";
    var o = this;
    this.isReady = false;
    this.animateImage.onload = function () {
        o.isReady = true;
    }
    this.upAnimate = new Array(
        new AnimateArear(0, 300),
        new AnimateArear(100, 300),
        new AnimateArear(200, 300),
        new AnimateArear(300, 300)
    );
    this.rightAnimate = new Array(
        new AnimateArear(0, 200),
        new AnimateArear(100, 200),
        new AnimateArear(200, 200),
        new AnimateArear(300, 200)
    );
    this.downAniate = new Array(
        new AnimateArear(0, 0),
        new AnimateArear(100, 0),
        new AnimateArear(200, 0),
        new AnimateArear(300, 0)
    );
    this.leftAnimate = new Array(
        new AnimateArear(0, 100),
        new AnimateArear(100, 100),
        new AnimateArear(200, 100),
        new AnimateArear(300, 100)
    );
    this.direction = Direction.down;
    this.timer = 0;
    this.animationSpeed = 150;
    this.isMoving = false;
    this.currentAnimate = this.downAniate;
    this.currentAnimateIndex = 0;
}
Human.prototype.move = function (d) {
    this.direction = d;
    switch (this.direction) {
        case Direction.up:
            this.y -= this.moveSpeed;
            break;
        case Direction.right:
            this.x += this.moveSpeed;
            break;
        case Direction.down:
            this.y += this.moveSpeed;
            break;
        case Direction.left:
            this.x -= this.moveSpeed;
            break;
    }
    this.x = this.x - map.x < 0 ? 0 : this.x;
    this.y = this.y - map.x < 0 ? 0 : this.y;
    this.x = this.x + this.width > map.width ? map.width - this.width : this.x;
    this.y = this.y + this.height > map.height ? map.height - this.height : this.y;
    if (!this.currentAnimate) {
        return;
    }
    this.isMoving = true;
    var that = this;
    if (!this.timer) {
        this.timer = setInterval(function () {
            that.currentAnimateIndex++;
            if (that.currentAnimateIndex >= that.currentAnimate.length) {
                that.currentAnimateIndex = 0;
            }
        }, this.animationSpeed);
    }
}
Human.prototype.stopMove = function () {
    this.isMoving = false;
    clearInterval(this.timer);
    this.timer = 0;
}
Human.prototype.render = function (context,map) {
    if (!this.isReady) {
        return;
    }
    if (!context) {
        return;
    }
    if (this.currentAnimate) {
        switch (this.direction) {
            case 0: {
                this.currentAnimate = this.upAnimate;
                break;
            }
            case 1: {
                this.currentAnimate = this.rightAnimate;
                break;
            }
            case 2: {
                this.currentAnimate = this.downAniate;
                break;
            }
            case 3: {
                this.currentAnimate = this.leftAnimate;
                break;
            }
        }
    }
    if (!this.isMoving) {
        this.currentAnimateIndex = 0;
    }
    if (map) {
        context.drawImage(this.animateImage, this.currentAnimate[this.currentAnimateIndex].x, this.currentAnimate[this.currentAnimateIndex].y, this.currentAnimate[this.currentAnimateIndex].width, this.currentAnimate[this.currentAnimateIndex].height, this.x - map.x, this.y - map.y, this.width, this.height);
    } else {
        context.drawImage(this.animateImage, this.currentAnimate[this.currentAnimateIndex].x, this.currentAnimate[this.currentAnimateIndex].y, this.currentAnimate[this.currentAnimateIndex].width, this.currentAnimate[this.currentAnimateIndex].height, this.x, this.y, this.width, this.height);
    }
}

var context;
var humen = new Human(200, 200);
addEventListener("keydown", function(e) {

    var code = e.keyCode;
    if (e.keyCode === 87 || e.keyCode === 83 || e.keyCode === 65 || e.keyCode === 68) {
        if (moveKey.indexOf(code) >= 0) {
            var i = moveKey.indexOf(code);
            moveKey.splice(i, 1);
            moveKey.unshift(code);
        } else {
            moveKey.unshift(code);
        }
    }


});
addEventListener("keyup", function(e) {
    var code = e.keyCode;
    if (e.keyCode === 87 || e.keyCode === 83 || e.keyCode === 65 || e.keyCode === 68) {
        if (moveKey.indexOf(code) >= 0) {
            var i = moveKey.indexOf(code);
            moveKey.splice(i, 1);
        }
    }

});

var w = window;
var ram = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var tip;
var moveKey = [];

function update() {

    if (moveKey.length > 0) {
        var code = moveKey[0];
        switch (code) {
            case 87: {
                humen.move(Direction.up);
                break;
            }
            case 83: {
                humen.move(Direction.down);
                break;
            }
            case 65: {
                humen.move(Direction.left);
                break;
            }
            case 68: {
                humen.move(Direction.right);
                break;
            }
        }
    } else {
        humen.stopMove();
    }
}

function main() {
    update();
    ram(main);
    if (!context) { return; }
    //context.clearRect(0, 0, 1200, 800);
    humen.render(context,map);
}
main();

addEventListener("load", function () {
    tip = document.querySelector("#tips");
    var canvas = document.querySelector("#canvas");
    context = canvas.getContext("2d");
});
