const Menu = require('../../../models/menu');

const menus = async (menuIds) => {
    try {
        const foundMenus = [];
        await menuIds.forEach(id => {
            const menu = Menu.findOne({_id: id});
            foundMenus.push(menu);
        });
        await foundMenus.map(async menu => {
            return {
                ...menu.doc,
                _id: menu.id,
                drinks: menu.drinks
            }
        });
        return await foundMenus;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = {
    menus
};
