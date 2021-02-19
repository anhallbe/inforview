declare namespace scb {
	/* REQUEST */
	interface ISelection {
		filter: string
		values: string[]
	}

	interface IQuery {
		code: string
		selection: ISelection
	}

	interface IResponse {
		format: string
	}

	export interface RequestObject {
		query: IQuery[]
		response: IResponse
	}

	/* RESPONSE */ 
	interface IColumn {
		code: string
		text: string
		type: string
	}

	interface IDatum {
		key: string[]
		values: string[]
	}

	export interface ResponseObject {
		columns: IColumn[]
		comments: any[]
		data: IDatum[]
	}
}
