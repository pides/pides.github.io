// 程序入口
/// <reference path="System.ts" />
/// <reference path="BackGround.ts" />
/// <reference path="Role.ts" />
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
                if (this.role.x != this.role.targetPos[0]) {
                    if (this.role.targetPos[0] > this.role.x) {
                        ++this.role.x;
                    }
                    else {
                        --this.role.x;
                    }
                }
                if (this.role.y != this.role.targetPos[1]) {
                    if (this.role.targetPos[1] > this.role.y) {
                        ++this.role.y;
                    }
                    else {
                        --this.role.y;
                    }
                }
                if (this.role.y == this.role.targetPos[1] && this.role.x == this.role.targetPos[0]) {
                    this.role.moveing = false;
                    this.role.targetPos = [];
                }
            }
        };
        Main.prototype.onEvent = function () {
            Laya.stage.on("click", this, this.onMouseMove);
        };
        Main.prototype.onMouseMove = function (e) {
            this.role.moveing = true;
            this.role.targetPos = [Laya.stage.mouseX, Laya.stage.mouseY];
            if (this.role.targetPos[0] > this.role.x) {
                this.role.playAction('left_move');
            }
            else {
                this.role.playAction('right_move');
            }
            if (this.role.targetPos[0] == this.role.x && this.role.y > this.role.targetPos[1])
                this.role.playAction('top_move');
            if (this.role.targetPos[0] == this.role.x && this.role.y < this.role.targetPos[1])
                this.role.playAction('down_move');
        };
        return Main;
    }());
    Game.Main = Main;
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map