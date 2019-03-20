const CollectionPoint = require('../../models/collectionPoint');
const Bar = require('../../models/bar');

module.exports = {
    collectionPoints: async () => {
        try {
            const collectionPoints = await CollectionPoint.find();
            return collectionPoints.map(collectionPoint => {
                return {
                    ...collectionPoint._doc
                };
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    createCollectionPoint: async (args) => {
        try {
            let collectionPointId = Math.random().toString(36).substring(2, 6).toUpperCase();
            const collectionPoint = await CollectionPoint.findOne({
                collectionPointId: collectionPointId
            });
            if (!collectionPoint) {
                collectionPointId = Math.random().toString(36).substring(2, 6).toUpperCase();
            }
            console.log(args);
            const bar = await Bar.findOne({_id: args.collectionPointInput.bar});
            if (!bar) {
                throw new Error(`Bar with provided id: ${collectionPointId} does not exist`);
            }
            const createdCollectionPoint = new CollectionPoint({
                name: args.collectionPointInput.name,
                bar: bar,
                collectionPointId: collectionPointId,
            });
            const result = await createdCollectionPoint.save();
            return {
                ...result._doc,
                _id: result.id,
                bar: bar
            };
        } catch (err) {
            throw err;
        }
    },
    findCollectionPointById: async ({collectionPointId}) => {
        // does bar exist with given bar code
        const collectionPoint = await CollectionPoint.findOne({
            collectionPointId: collectionPointId.toUpperCase()
        });
        // no bar found with given bar code
        if (!collectionPoint) {
            throw new Error(`Collection Point with collectionPointId: ${collectionPointId} does not exist`);
        }
        return {
            _id: collectionPoint.id,
            name: collectionPoint.name,
            bar: collectionPoint.bar,
            collectionPointId: collectionPoint.collectionPointId
        };
    }
};

