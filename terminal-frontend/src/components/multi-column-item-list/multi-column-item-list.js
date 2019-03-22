import React from 'react'
import PropTypes from 'prop-types'


// SETTINGS:
const itemsPerOrderListColumn = 4; // How many order items show per column



const MultiColumnItemList = (props) => {
    const renderListItems = (items) => {
        return items.map((itemData) => {
            return (
                <li key={itemData.id}><span className="quantity">{itemData.quantity}x</span>{itemData.name}</li>
            );
        })
    };

    const renderMultiColumnItemList = (items) => {
        if (items.length > itemsPerOrderListColumn) {
            const columnCount = Math.floor(items.length / itemsPerOrderListColumn) + 1; // Calculate how many columns are needed
            let columns = []; // Array of arrays of rows

            // Build columns array
            for (let i=0; i < columnCount; i++) {
                let startIndex = i*itemsPerOrderListColumn;
                columns.push(items.slice(startIndex, startIndex + itemsPerOrderListColumn));
            }

            // Loop through columns, creating each a UL and spawning LI inside
            let i = -1; // Counter used for key
            return columns.map((columnData) => {
                i++;
                return(
                    <ul key={i} className="orderList multiColumn">
                    { renderListItems(columnData) }
                    </ul>
                )
            });

        } else {
            return <ul className="orderList">{ renderListItems(items) }</ul>
        }
    };

    return renderMultiColumnItemList(props.orderItems);
};

MultiColumnItemList.propTypes = {
    orderItems: PropTypes.array.isRequired // Items to be rendered
};

export default MultiColumnItemList;
