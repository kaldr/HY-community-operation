(function(){var t,n,o=[].slice,r=function(t,n){function o(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return o.prototype=n.prototype,t.prototype=new o,t.__super__=n.prototype,t},e={}.hasOwnProperty;angular.app("FamilyTour",[]),t=function(){function t(){var t,n,r,e,c,i;for(n=arguments[0],t=2<=arguments.length?o.call(arguments,1):[],c=e=0,i=t.length;e<i;c=++e)r=t[c],n[this.$inject[c]]=r;_.map(n,function(t){return function(t,o){if("constructor"!==o&&"$inject"!==o&&n.$inject.indexOf(o)<0)return n.$scope[o]=t}}(this))}return t}(),n=function(t){function n(){}return r(n,t),n.prototype.$inject=["$scope","$rootScope"],n}(t),n.$inject=n.prototype.$inject}).call(this);