angular.module("myApp", [])
.controller("MyController", ["$scope", function($scope){
	console.log('set up angular');
	$scope.dialogContexts = [{
		title: 'A Dialog',
		field: 'something'
	}, {
		title: 'Another Dialog',
		field: 'something else'
	}, {
		title: 'And Another Dialog',
		field: 'with this'
	}, {
		title: 'Dialog Here',
		field: 'stuff here'
	}, {
		title: 'Again Dialog',
		field: 'more text'
	}, {
		title: 'Last Dialog',
		field: 'last text'
	}];
	$scope.modalShown = false;
	$scope.toggleModal = function(selection) {
		$scope.selected = selection;
		$scope.modalShown = !$scope.modalShown;
	};
	$scope.clickDialog = function(selection){
		$scope.selected = selection;
		console.log(selection);
	};
	$scope.moveRight = function(selection){
		console.log("right", selection);
		if (selection > $scope.dialogContexts.length-2){
			return;
		}
		else {
			$scope.selected = selection+1;
		}
	};
	$scope.moveLeft = function(selection){
		console.log("something", selection);
		if (selection <1){
			return;
		}
		else{
			$scope.selected = selection-1;
		}
	};

}])
.directive("dialog", function(){
	return {
		restrict: 'E',
		//will use show variable to determine if showing modal or not
		scope: {
			shown: '='
		},
		replace: true,
		transclude: true, //custom content for directive, will be used to indicate where content goes
		link: function(scope, element, attrs) {
			scope.dialogStyle = {};
			if (attrs.width){
				scope.dialogStyle.width = attrs.width;
			}
			if (attrs.height){
				scope.dialogStyle.height = attrs.height;
			}
			scope.hideModal = function(){
				scope.shown = false;
			};
		},
		template:
		"<div class='ng-modal' ng-show='shown'>" +
		//overlay will add a dim effect behind the modal
			"<div class='ng-modal-overlay' ng-click='hideModal()'></div>" +
			"<div class='ng-modal-dialog' ng-style='dialogStyle'>" +
				"<div class='ng-modal-close' ng-click='hideModal()'>" +
				"<div class='forward-slash'></div>" +
				"<div class='backward-slash'></div>" +
				"</div>" +
				"<div class='ng-modal-dialog-content' ng-transclude></div>" +
			"</div>" +
		"</div>"
	};
})
.directive("dialogShelf", function(){
	return {
		restrict: 'E',
		scope: {
			shown: '='
		},
		transclude: true,
		template:
		"<div ng-show='shown' ng-transclude>" +
		"</div>"
	};
});