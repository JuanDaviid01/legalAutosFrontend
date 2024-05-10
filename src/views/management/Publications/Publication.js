import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import {
    Card,
    CardHeader, 
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    Button
} from "reactstrap";

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
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Publications Information</CardTitle>
                  <Button onClick={handleCreatePublication}>New Publication</Button>
                  </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        {columns.map((column, index) => (
                          <th key={index}>{column.title}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                    {publicationData.map((Publication, index) => (
                        <tr key={index}>
                          {columns.map((column, columnIndex) => {
                            if (column.render) {
                              return (
                                <td key={columnIndex}>{column.render(Publication)}</td>
                            );
                          } else {
                            return (
                              <td key={columnIndex}>{Publication[column.dataIndex]}</td>
                            );
                        }
                    })}
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </div>
);
}

export default Publication;