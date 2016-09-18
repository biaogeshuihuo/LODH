/**
 * 方向枚举，上右下左分别为0，1，2，3
 * @returns {} 
 */
function Direction() { }
/**
 * 定义方向的枚举
 */
Direction.up = 0;
Direction.right = 1;
Direction.down = 2;
Direction.left = 3;

/*所有的枚举都要放在最顶上*/

/**
 * 大小类型，描述大小
 * @param {大小的宽度} w 
 * @param {大小的高度} h 
 * @returns {} 
 */
function Size(w, h) {
    this.width = w || 100;
    this.height = h || 100;
}
/**
 * 位置类型
 * @param {位置的x坐标} x 
 * @param {位置的y坐标} y 
 * @returns {} 
 */
function Position(x,y) {
    this.x = x || 0;
    this.y = y || 0;
}
/**
 * 区域类型
 * @param {区域左上角的x坐标} x 
 * @param {区域左上角的y坐标} y 
 * @param {区域的宽度} w 
 * @param {区域的高度} h 
 * @returns {} 
 */
function Area(x, y, w, h) {
    this.position = new Position(x, y);
    this.x = this.position.x;
    this.y = this.postion.y;    
    this.size = new Size(w, h);
    this.width = this.size.width;
    this.height = this.size.height;
}


function BaseObject() {
    
}