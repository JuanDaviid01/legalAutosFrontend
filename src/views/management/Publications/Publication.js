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
        navigate('/publications/publicationform');
    };

    const handleEdit = (publicationId) => {
        navigate(`/Publications/PublicationEditForm/${publicationId}`);
    };

    const handleDelete = async (publicationId) => {
        try {
            var url = `http://localhost:1338/api/disablePublication/${publicationId}`;
            const response = await Axios.put(url);
            window.location.reload();
        }
        catch (e) {
            console.log(e);
        }
    }

    const columns = [
        {
            title: 'Publication ID',
            dataIndex: 'publicationId',
        },
        {
            title: 'Person ID',
            dataIndex: 'personId'
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
        {
            title: 'Options',
            render: (publication) => (
              <div>
                <CButton color="primary" onClick={() => handleEdit(publication.publicationId)}>
                  Edit
                </CButton>
                <CButton color="danger" onClick={() => handleDelete(publication.publicationId)}>
                  Delete
                </CButton>
              </div>
            )
          }
    ];

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <CButton className="btn-primary" onClick={handleCreatePublication}>New Publication</CButton>
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
                    {publicationData.map((Publication, index) => (
                        <CTableRow key={index}>
                            {columns.map((column, columnIndex) => {
                                if (column.render) {
                                    return <CTableDataCell key={columnIndex}>{column.render(Publication)}</CTableDataCell>;
                                } else {
                                    return <CTableDataCell key={columnIndex}>{Publication[column.dataIndex]}</CTableDataCell>;
                                }
                            })}
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </div>
    );
}

export default Publication;
