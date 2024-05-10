import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {
    CButton,
    CTable,
    CTableHead,
    CTableBody,
    CTableRow,
    CTableHeaderCell,
    CTableDataCell
} from '@coreui/react';

const Buyer = () => {
    const navigate = useNavigate();
    const [buyerData, setBuyerData] = useState([]);

    useEffect(() => {
        const getBuyers = async () => {
            const response = await Axios({
                url: 'http://localhost:1338/api/listbuyers',
            });
            const lstBuyers = Object.keys(response.data).map(i => response.data[i]);
            setBuyerData(lstBuyers.flat());
        };

        getBuyers();
    }, []);

    const handleCreateBuyer = () => {
        navigate('buyers/buyer');
    };

    function handleEdit() {
        navigate(``);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'personName',
        },
        {
            title: 'Last Name',
            dataIndex: 'personLastName',
        },
        {
            title: 'Age',
            dataIndex: 'personAge',
        },
        {
            title: 'Email',
            dataIndex: 'personEmail',
        },
        {
            title: 'Address',
            dataIndex: 'personAddress',
        },
        {
            title: 'City',
            dataIndex: 'cityId',
        },
        {
            title: 'Wallet',
            dataIndex: 'wallet',
        },
        {
            title: 'Options',
        },
    ];
    return (
        <div>
            <CButton onClick={handleCreateRestaurant}>New buyer</CButton>
            <CTable>
                <CTableHead>
                    <CTableRow>
                        {columns.map((column, index) => (
                            <CTableHeaderCell key={index}>{column.title}</CTableHeaderCell>
                        ))}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {buyerData.map((buyer, index) => (
                        <CTableRow key={index}>
                            {columns.map((column, columnIndex) => {
                                if (column.render) {
                                    return <CTableDataCell key={columnIndex}>{column.render(buyer)}</CTableDataCell>;
                                } else {
                                    return <CTableDataCell key={columnIndex}>{buyer[column.dataIndex]}</CTableDataCell>;
                                }
                            })}
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </div>
    );
};

export default Buyer;
