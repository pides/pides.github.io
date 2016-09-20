// 程序入口
/// <reference path="System.ts" />
/// <reference path="BackGround.ts" />
/// <reference path="Role.ts" />
var Tween = laya.utils.Tween;
var Game;
(function (Game) {
    var Main = (function () {
        function Main() {
            Laya.init(640, 960, Laya.WebGL);
            Laya.loader.load("res/atlas/mcworld.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
            Laya.Stat.show(0, 50);
        }
        Main.prototype.onLoaded = function () {
            this.system = new Game.System();
            this.bg = new Game.BackGround();
            this.rolePool = new Game.Role.RolePool();
            this.role = new Game.Role.Role();
            this.role.pos(240, 700);
            Laya.stage.addChild(this.role);
            this.onEvent();
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        Main.prototype.onLoop = function () {
            if (this.role.moveing) {
                var _a = this.role, x = _a.x, y = _a.y;
                var targetX = this.role.targetPos[0];
                var targetY = this.role.targetPos[1];
                if (x == targetX && y == targetY) {
                    this.role.playAction(this.role.getDirection(), 'stop');
                }
            }
        };
        Main.prototype.onEvent = function () {
            Laya.stage.on("click", this, this.onMouseMove);
        };
        Main.prototype.onMouseMove = function (e) {
            this.role.targetPos = [Laya.stage.mouseX, Laya.stage.mouseY];
            var x1 = this.role.x; // 第一个点的横坐标
            var y1 = this.role.y; // 第一个点的纵坐标
            var x2 = Laya.stage.mouseX; // 第二个点的横坐标
            var y2 = Laya.stage.mouseY; // 第二个点的纵坐标
            var xdiff = x2 - x1; // 计算两个点的横坐标之差
            var ydiff = y2 - y1; // 计算两个点的纵坐标之差
            var jl = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5); // 计算两点之间的距离，并将结果返回表单元素
            if (x1 > x2) {
                this.role.playAction("right", 'move');
            }
            else {
                this.role.playAction('left', 'move');
            }
            if (x1 == x2 && y1 > y2) {
                this.role.playAction('top', 'move');
            }
            if (x1 == x2 && y1 < y2) {
                this.role.playAction('down', 'move');
            }
            this.role.moveing = true;
            Tween.to(this.role, { x: Laya.stage.mouseX, y: Laya.stage.mouseY }, 10 * jl);
            return;
        };
        return Main;
    }());
    Game.Main = Main;
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map