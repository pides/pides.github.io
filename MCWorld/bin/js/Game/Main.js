// 程序入口
/// <reference path="System.ts" />
/// <reference path="BackGround.ts" />
/// <reference path="Role.ts" />
var Tween = laya.utils.Tween;
var Game;
(function (Game) {
    var Main = (function () {
        function Main() {
            Laya.init(960, 640, Laya.WebGL);
            //设置适配模式
            Laya.stage.scaleMode = "showall";
            //设置剧中对齐
            Laya.stage.alignH = "center";
            //设置横竖屏
            Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
            Laya.loader.load("res/tiledMap/back.json");
            Laya.loader.load("res/atlas/mcworld.json", Laya.Handler.create(this, this.onLoadBackGround), null, Laya.Loader.ATLAS);
            Laya.Stat.show(0, 50);
        }
        Main.prototype.onLoadBackGround = function () {
            this.bg = new Game.BackGround(this, this.onLoaded);
        };
        Main.prototype.onLoaded = function () {
            // this.system = new Game.System();
            this.Ctrl = new Laya.Sprite();
            var h = Laya.stage.height;
            this.Ctrl.y = h - 100;
            this.Ctrl.x = 100;
            this.Ctrl.zOrder = 10;
            this.Ctrl.graphics.alpha(0.3);
            this.Ctrl.graphics.drawCircle(0, 0, 50, "#000000");
            this.Ctrl.width = 100;
            this.Ctrl.height = 100;
            this.CtrlBtn = new Laya.Sprite();
            this.CtrlBtn.width = 50;
            this.CtrlBtn.height = 50;
            this.CtrlBtn.graphics.alpha(0.5);
            this.CtrlBtn.x = this.CtrlBtn.y = -25;
            this.CtrlBtn.graphics.drawCircle(25, 25, 25, "#ffffff");
            this.CtrlBtn.mouseEnabled = true;
            this.Ctrl.mouseEnabled = true;
            this.Ctrl.addChild(this.CtrlBtn);
            var Rectangle = laya.maths.Rectangle;
            var dragRegion = new Rectangle(-25, -25, 0, 0);
            Laya.stage.addChild(this.Ctrl);
            this.CtrlBtn.flag = false;
            var x = -25, y = -25;
            this.CtrlBtn.on(Laya.Event.MOUSE_DOWN, this, function (e) {
                if (!x)
                    x = e.nativeEvent.layerX;
                if (!y)
                    y = e.nativeEvent.layerY;
                this.CtrlBtn.flag = true;
                this.CtrlBtn.startDrag(dragRegion, true, 100);
            });
            // CtrlBtn.on(Laya.Event.MOUSE_MOVE,this,function(e){
            //     console.log(1);
            //     if(flag){
            //         var xv = e.nativeEvent.layerX;
            //         var yv = e.nativeEvent.layerY;
            //         if(x>xv){
            //             this.role.x--;
            //         }else if(x<xv){
            //             this.role.x++;
            //         }
            //         if(y>yv){
            //             this.role.y--;
            //         }else if(y<yv){
            //             this.role.y++;
            //         }
            //     }
            // });
            this.CtrlBtn.on(Laya.Event.MOUSE_UP, this, function (e) {
                this.CtrlBtn.flag = false;
            });
            this.rolePool = new Game.Role.RolePool();
            this.role = new Game.Role.Role();
            this.role.pos(240, 300);
            this.bg.addChild(this.role);
            Laya.stage.addChild(this.bg);
            // this.onEvent();
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        Main.prototype.onLoop = function () {
            if (this.CtrlBtn.flag) {
                var xv = this.CtrlBtn.x;
                var yv = this.CtrlBtn.y;
                if (yv !== -25 || xv !== -25) {
                    if (-25 > xv) {
                        this.role.x--;
                    }
                    else if (-25 < xv) {
                        this.role.x++;
                    }
                    if (-25 > yv) {
                        this.role.y--;
                    }
                    else if (-25 < yv) {
                        this.role.y++;
                    }
                }
            }
        };
        Main.prototype.onEvent = function () {
            Laya.stage.on("mousedown", this, this.onMouseDown);
            //  Laya.stage.on("mouseup", this, this.onMouseUp);
        };
        Main.prototype.onMouseUp = function () {
            this.role.mouseDowning = false;
        };
        Main.prototype.onMouseDown = function (e) {
            var target = e.target;
            console.log(target);
            // this.role.mouseDowning = true;
            // this.moveRole(this.role);
            // return;
        };
        Main.prototype.moveRole = function (role) {
            role.targetPos = [Laya.stage.mouseX, Laya.stage.mouseY];
            var x1 = role.x; // 第一个点的横坐标
            var y1 = role.y; // 第一个点的纵坐标
            var x2 = Laya.stage.mouseX; // 第二个点的横坐标
            var y2 = Laya.stage.mouseY; // 第二个点的纵坐标
            var xdiff = x2 - x1; // 计算两个点的横坐标之差
            var ydiff = y2 - y1; // 计算两个点的纵坐标之差
            var jl = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5); // 计算两点之间的距离，并将结果返回表单元素
            var n = Math.abs(x1 - x2);
            if (n < 30) {
                y1 > y2 ? role.playAction('top', 'move') : role.playAction('down', 'move');
            }
            else {
                x1 > x2 ? role.playAction("right", 'move') : role.playAction('left', 'move');
            }
            role.moveing = true;
            Tween.to(this.role, { x: Laya.stage.mouseX, y: Laya.stage.mouseY }, 10 * jl);
        };
        return Main;
    }());
    Game.Main = Main;
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map