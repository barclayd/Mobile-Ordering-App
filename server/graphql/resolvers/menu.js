const Menu = require('../../models/menu');
const {drinks} = require('./mergeResolvers/drinks');

module.exports = {
    findAllMenus: async () => {
        try {
            const menus = await Menu.find();
            return menus.map(async menu => {
                const returnedDrinks = await drinks(menu.drinks);
                return {
                    ...menu._doc,
                    drinks: returnedDrinks
                };
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    createMenu: async (args) => {
        try {
            const returnedDrinks = await drinks(args.menuInput.drinks);
            if (!returnedDrinks) {
                throw new Error('Error found whilst processing drinkIds');
            }
            const createdMenu = new Menu({
                name: args.menuInput.name,
                drinks: args.menuInput.drinks,
                description: args.menuInput.description,
                image: args.menuInput.image
            });
            const result = await createdMenu.save();
            return {
                ...result._doc,
                _id: result.id,
                drinks: returnedDrinks
            };
        } catch (err) {
            throw err;
        }
    }
};

