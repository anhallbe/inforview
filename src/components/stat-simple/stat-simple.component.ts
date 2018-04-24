const templateUrl: string = require<string>("file-loader!./stat-simple.component.html");

export class StatSimple {
	static $inject = [];
	constructor() {
		console.log("<stat-simple> Component controller works");
	}

	static injectInto(m: ng.IModule) {
		m.component("statSimple", {
			templateUrl,
			controller: StatSimple,
			bindings: {
				value: "@",
				description: "@",
			},
		});
	}
}
