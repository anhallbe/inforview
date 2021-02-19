const templateUrl: string = require<string>("file-loader!./stat-chart.component.html");

export class StatChart {
	private data: number[];
	private labels: string[];
	private description: string;

	static $inject = ["$scope"];
	constructor($scope) {
		console.log("<stat-chart> Component controller works", $scope);
	}

	static injectInto(m: ng.IModule) {
		m.component("statChart", {
			templateUrl,
			controller: StatChart,
			bindings: {
				data: "<",
				labels: "<",
				type: "@",
				description: "@",
			}
		});
	}
}
