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
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Buyers Information</CardTitle>
                  <Button onClick={handleCreateBuyer}>New Buyer</Button>
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
                      {buyerData.map((buyer, index) => (
                        <tr key={index}>
                          {columns.map((column, columnIndex) => {
                            if (column.render) {
                              return (
                                <td key={columnIndex}>{column.render(buyer)}</td>
                              );
                            } else {
                              return (
                                <td key={columnIndex}>{buyer[column.dataIndex]}</td>
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

export default Buyer;