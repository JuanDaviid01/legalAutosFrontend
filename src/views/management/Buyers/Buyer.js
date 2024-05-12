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
//
//
/*gofdndssd*/
//

        getBuyers();
    }, []);


    const handleCreateBuyer = () => {
        navigate('/buyers/buyerform');
    };

    function handleEdit(personId) {
        navigate(`/buyers/buyerEditForm/${personId}`);
    };

    const handleDelete = async (personId) => {
        try {
            var url = `http://localhost:1338/api/disablebuyer/${personId}`;
            const response = await Axios.put(url);
            window.location.reload();
        }
        catch (e) {
            console.log(e);
        }
    }

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
            render: (buyer) => (
                <div>
                    <CButton color="primary" style={{ marginRight: '5px' }} onClick={() => handleEdit(buyer.personId)}>
                        Editar
                    </CButton>
                    <CButton color="danger" onClick={() => handleDelete(buyer.personId)}>
                        Eliminar
                    </CButton>
                </div>
            ),
        },

    ];
    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <CButton className="btn-primary" onClick={handleCreateBuyer}>New Buyer</CButton>
            </div>
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
