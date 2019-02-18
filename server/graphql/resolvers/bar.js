const Bar = require('../../models/bar');

module.exports = {
    bars: async () => {
        try {
            const bars = await Bar.find();
            return bars.map(bar => {
                return {
                    ...bar._doc
                };
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    createBar: async (args) => {
        try {
            const barCode = Math.random().toString(36).substring(2, 6).toUpperCase();
            const createdBar = new Bar({
                name: args.barInput.name,
                barCode: barCode,
                type: args.barInput.type,
                description: args.barInput.description,
                latitude: args.barInput.latitude,
                longitude: args.barInput.longitude,
            });
            const result = await createdBar.save();
            return {
                ...result._doc,
                _id: result.id,
            };
        } catch (err) {
            throw err;
        }
    },
    findBar: async ({barCode}) => {
        // does bar exist with given bar code
        const bar = await Bar.findOne({
            barCode: barCode.toUpperCase()
        });
        // no bar found with given bar code
        if (!bar) {
            throw new Error(`Bar with bar code: ${barCode} does not exist`);
        }
        return {
            _id: bar.id,
            name: bar.name,
            barCode: bar.barCode,
            type: bar.type,
            description: bar.description,
            latitude: bar.latitude,
            longitude: bar.longitude
        };
    }
};

