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

const Vehicle = () => {
    const navigate = useNavigate();
    const [vehicleData, setVehicleData] = useState([]);

    useEffect (() => {
        const getVehicle = async () => {
            const response = await Axios({
                url: 'http://localhost:1338/api/listVehicles',
            });
        };
        getVehicle();
    }, []);
    //----------------------------------------------------------------
    const handleCreateVehicle = () => {
        navigate('/managment/vehicles/vehicle');
    };

    function handleEditVehicle() {
        navigate('');
    };
    const columns = [
        {
            title: 'Plate',
            dataIndex: '',
        },
        {
            title: 'Brand',
            dataIndex: '',
        },
        {
            title: 'Line',
            dataIndex: '',
        },
        {
            title: 'Type',
            dataIndex: '',
        },
        {
            title: 'Year',
            dataIndex: '',
        },
        {
            title: 'Trasmision',
            dataIndex: '',
        },
        {
            title: 'C.c',
            dataIndex: '',
        },
        {
            title: 'Color',
            dataIndex: '',
        },
        {
            title: 'Soat',
            dataIndex: '',
        },
        {
            title: 'Tecno',
            dataIndex: '',
        },
        {
            title: 'State',
            dataIndex: '',
        },
        {
            title: 'Description',
            dataIndex: '',
        },
        {
            title: 'Buy price',
            dataIndex: '',
        },
        {
            title: 'Sell price',
            dataIndex: '',
        },
        {
            title: 'Buy date',
            dataIndex: '',
        },
        {
            title: 'Sell date',
            dataIndex: '',
        },
        {
            title: 'City id',
            dataIndex: '',
        },
        {
            title: 'Person id',
            dataIndex: '',
        }
    ]
}