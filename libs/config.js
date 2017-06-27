module.exports = app => {
	const env = process.env.NODE_ENV || 'development';
	return require(`./config.${env}.js`);
};
