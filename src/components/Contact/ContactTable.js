import React from 'react';
import './ContactTable.css';
import {deleteInfo} from "../../Helpers";
import {CSVLink} from "react-csv";

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

const ContactTable = (props) => {

    const tableColumns = ['Name', 'Phone', 'Email', 'Date']

    const { items, requestSort, sortConfig } = useSortableData(props.data);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const editActionInfo = (id) => {
        props.editActionInfo(id);
    }

    return (
        <table className="table-sort">
            <thead>
            <tr>
                <th>№</th>
                {
                    tableColumns.map(tableColum => {
                            return (<th key={tableColum}><a
                                onClick={() => requestSort(tableColum.toLowerCase())}
                                className={getClassNamesFor(tableColum.toLowerCase())}
                            >{tableColum}</a></th>)
                        }
                    )
                }
                <th>
                    <CSVLink
                        type="button"
                        data={props.data}
                        filename={"contact-list.csv"}
                        className="link-export"
                        target="_blank">Export CSV</CSVLink>
                </th>
            </tr>
            </thead>
            <tbody>
            {items.map((item, index) => (
                <tr key={item?.id}>
                    <td>{++index}</td>
                    <td>{item?.name}</td>
                    <td>{item?.phone}</td>
                    <td>{item?.email}</td>
                    <td>{item?.date}</td>
                    <td align="right">
                        <button className="btn-success btn-action" onClick={() => editActionInfo(item?.id)}>Edit</button>
                        <button className="btn-danger btn-action" onClick={() => deleteInfo(item?.id)} >Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ContactTable;