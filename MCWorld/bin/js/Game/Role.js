var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cache = false;
var Game;
(function (Game) {
    var Role;
    (function (Role_1) {
        var Role = (function (_super) {
            __extends(Role, _super);
            function Role() {
                _super.call(this);
                this.moveing = false;
                this.init();
            }
            Role.prototype.init = function () {
                if (!this.body) {
                    this.body = new Laya.Animation();
                    this.body.interval = 100;
                    this.addChild(this.body);
                }
                if (!cache) {
                    cache = true;
                    Laya.Animation.createFrames(["mcworld/role2_1.png"], "role_top_stop");
                    Laya.Animation.createFrames(["mcworld/role2_2.png", 'mcworld/role2_3.png'], "role_top_move");
                    Laya.Animation.createFrames(["mcworld/role1_1.png"], "role_down_stop");
                    Laya.Animation.createFrames(["mcworld/role1_2.png", 'mcworld/role1_3.png'], "role_down_move");
                    Laya.Animation.createFrames(["mcworld/role3_1.png"], "role_right_stop");
                    Laya.Animation.createFrames(["mcworld/role3_2.png", "mcworld/role3_3.png"], "role_right_move");
                    Laya.Animation.createFrames(["mcworld/role4_1.png"], "role_left_stop");
                    Laya.Animation.createFrames(["mcworld/role4_2.png", "mcworld/role4_3.png"], "role_left_move");
                }
                this.playAction();
            };
            /**
             * 设置当前角色动画
             */
            Role.prototype.playAction = function (direction, action) {
                if (direction === void 0) { direction = 'down'; }
                if (action === void 0) { action = 'stop'; }
                if (this.direction == direction && this.action == action) {
                    return;
                }
                this.direction = direction;
                console.log(direction);
                this.action = action;
                console.log(action);
                this.body.play(0, true, 'role_' + direction + '_' + action);
                //获取动画大小区域
                var bound = this.body.getBounds();
                this.body.pos(-bound.width / 2, -bound.height / 2);
            };
            /**
             * 获取当前角色动作
             */
            Role.prototype.getAction = function () {
                return this.action;
            };
            /**
             * 获取角色当前方向
             */
            Role.prototype.getDirection = function () {
                return this.direction;
            };
            return Role;
        }(Laya.Sprite));
        Role_1.Role = Role;
        var RolePool = (function () {
            function RolePool() {
            }
            RolePool.prototype.add = function () {
            };
            RolePool.prototype.remove = function () {
            };
            return RolePool;
        }());
        Role_1.RolePool = RolePool;
    })(Role = Game.Role || (Game.Role = {}));
})(Game || (Game = {}));
//# sourceMappingURL=Role.js.map