module.exports = app => {
	return {
		findAll: (params, callback) => {
			//console.log('models: ')
			//console.dir(params);
			return callback([
				{title: "Buy Some Shoes"},
				{title: "Fix notebook"}
			]);
		}
	};
};
