angular.app 'FamilyTour',[]
class AngularController
	constructor:(classOb,args...)->
		for func,index in args
			classOb[@$inject[index]]=func		
		_.map classOb,(value,key)=>
			classOb.$scope[key]=value if key!='constructor' and key!='$inject' and classOb.$inject.indexOf(key)<0 

class FamilyTourBasicController extends AngularController
	$inject:["$scope","$rootScope"]
	constructor:()->

	
FamilyTourBasicController.$inject=FamilyTourBasicController.prototype.$inject