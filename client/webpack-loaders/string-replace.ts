import * as webpack from "webpack";

type Schema = Parameters<typeof webpack.validateSchema>[0];

const loaderSchema: Schema = {
	type: "object",
	properties: {
		from: {
			type: "string",
		},
		to: {
			type: "string",
		},
	},
};

const isValidSchemaAndOptions = function (options: any): options is {
	from: string;
	to: string;
} {
	webpack.validateSchema(loaderSchema, options, {name: "StringReplaceLoader"});

	return true;
};

const StringReplaceLoader: webpack.LoaderDefinition = function (source) {
	this.cacheable();

	const options = this.getOptions();

	if (isValidSchemaAndOptions(options)) {
		// replace all without using replaceAll
		const regex = new RegExp(options.from, "g");
		return source.replace(regex, options.to);
	}

	throw new Error(
		`StringReplaceLoader: Invalid options. Expected ${JSON.stringify(
			loaderSchema
		)} but got ${JSON.stringify(options)}`
	);
};

export default StringReplaceLoader;
