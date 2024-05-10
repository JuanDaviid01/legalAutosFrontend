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
} from "@coreui/react";

const Publication = () => {
    const [publicationData, setPublicationData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getPublications = async () => {
            const response = await Axios({
                url: 'http://localhost:1338/api/listPublications'
            });
            const listPublication = Object.keys(response.data).map(i=> response.data[i]);
            setPublicationData(listPublication.flat());
        };

        getPublications();
    }, []);
    const handleCreatePublication = () => {
        navigate('publications/publication');
    };

    function handleEdit() {
        navigate(``);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'publicationId',
        },
        {
            title: 'Date',
            dataIndex: 'publicationDate'
        },
        {
            title: 'State',
            dataIndex: 'state'
        },
        {
            title: 'Price',
            dataIndex: 'price'
        },
    ];

        return (
          <div>
            <CButton onClick={handleCreatePublication} > New Publication </CButton>
            <CTable>
                <CTableHead>
                    <CTableRow>
                        {columns.map((column, index) => (
                            <CTableHeaderCell key={index}>{column.title}</CTableHeaderCell>
                        ))}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {publicationData.map((Publication, index) => (
                        <CTableRow key={index}>
                            {columns.map((column, columnIndex) => (
                                <CTableDataCell key={columnIndex}> {Publication[column.dataIndex]} </CTableDataCell>
                            ))}
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </div>
    );
}

export default Publication;