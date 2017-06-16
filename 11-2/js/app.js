/**
 * Created by Lenovo on 2017/5/31.
 */
angular.module("lottery",[]).
    controller('ctrl_lottery',['$scope', '$timeout',
    function ($scope, $timeout) {
//       初始化奖品数据
        $scope.items = [
            {id: 1, name: "欧洲", status: 0},
            {id: 2, name: "MAC", status: 0},
            {id: 3, name: "iphone6", status: 0},
            {id: 4, name: "山地车", status: 0},
            {id: 5, name: "电视", status: 0},
            {id: 6, name: "500充值卡", status: 0}
        ];
        $scope.result = "奖品为空";
        $scope.$$ = function (id) {
            return document.getElementById(id);
        }
        $scope.showhide = function (pre, nex) {
            pre = "step" + pre;
            nex = "step" + nex;
            $scope.$$(pre).style.display="none";
            $scope.$$(nex).style.display="black";
        }
//        开始抽奖的方法
        $scope.start =function () {
            $scope.showhide(1, 2);
            var circle = 5;
            var selkey = Math.floor(Math.random()* $scope.items.length);
            var next = function (key) {
                $scope.items(key).status = true;
                if((key - 1)>= 0)
                    $scope.items(key-1).status = false;
                if(key == 0)
                    $scope.items($scope.items.length-1).status = false;
                var timer = $timeout (function () {
                    if(circle <= 0 && selkey == key){
                      $scope.showhide(2, 3);
                      $scope.result = $scope.items(key).name;
                      return;
                    };
                    if($scope.items.length == key+1){
                        circle--;
                    }
                    if($scope.items[key+1]){
                        next(key+1)
                    }else {
                        next(0)
                    }
                },100);
            }
            next(0);
        }
//        显示奖品时绑定的方法
        $scope.reset = function () {
            $scope.showhide(3, 1);
        }
        $scope.edit = function () {
            $scope.showhide(3, 4);
        }
//        修改方法
        $scope.add = function () {
            var last_id = lastid();
            $scope.items.push({id: last_id, name: $scope.name, status:0})
        }
        $scope.del = function (id) {
            angular.forEach($scope.items, function (value, key) {
                if (id == value.id) {
                    $scope.items.splice(key, 1);
                };
            })
        }
        $scope.return = function () {
            $scope.showhide(4, 3);
        }

    //    用于获取最后一项ID号值
        function lastid() {
            var id = 0;
            angular.forEach($scope.items, function (value, key) {
                if (id < value.id)
                    id = value.id
            })
            return ++id;
        }

    }]);