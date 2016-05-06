`var link = function(scope, element, attrs, ngModel) {
    ngModel.$validators.cellphone = function(modelValue, viewValue) {
        return ngModel.$isEmpty(modelValue) || /^1[3|4|5|7|8]\d{9}$/.test(modelValue) ;
    } ;
} `

cellphone = () ->
    {
        restrict: "A",
        require: "ngModel",
        link: link

    }

angular.module("register").directive "cellphone", cellphone
