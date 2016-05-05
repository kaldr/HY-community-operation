cellphone=()->
    {
        restrict: "A",
        require: "ngModel",
        link:link

    }

angular.module("register").directive "cellphone",cellphone
