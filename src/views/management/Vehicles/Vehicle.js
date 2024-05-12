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

const Vehicle = () => {
    const navigate = useNavigate();
    const [vehicleData, setVehicleData] = useState([]);

    useEffect(() => {
        const getVehicles = async () => {
            const response = await Axios({
                url: 'http://localhost:1338/api/listVehicles',
            });
            const lstVehicles = response.data.data.map(item => ({
                ...item,
                vehicleSoat: item.vehicleSoat ? 'Valid' : 'Time out',
                vehicleTecno: item.vehicleTecno ? 'Valid' : 'Time out',
                vehicleSellPrice: item.vehicleSellPrice ?? '',
            }));
            setVehicleData(lstVehicles.flat());
        };
        getVehicles();
    }, []);
    //----------------------------------------------------------------
    const handleCreateVehicle = () => {
        navigate('/vehicles/vehicleForm');
    };

    function handleEditVehicle() {
        navigate('');
    };
    const columns = [
        {
            title: 'Plate',
            dataIndex: 'vehiclePlate',
        },
        {
            title: 'Brand',
            dataIndex: 'vehicleBrand',
        },
        {
            title: 'Line',
            dataIndex: 'vehicleLine',
        },
        {
            title: 'Type',
            dataIndex: 'vehicleType',
        },
        {
            title: 'Year',
            dataIndex: 'vehicleYear',
        },
        {
            title: 'Trasmission',
            dataIndex: 'vehicleTrasmision',
        },
        {
            title: 'CC',
            dataIndex: 'vehicleCC',
        },
        {
            title: 'Color',
            dataIndex: 'vehicleColor',
        },
        {
            title: 'Soat',
            dataIndex: 'vehicleSoat',
        },
        {
            title: 'Tecno',
            dataIndex: 'vehicleTecno',
        },
        {
            title: 'State',
            dataIndex: 'vehicleState',
        },
        {
            title: 'Description',
            dataIndex: 'vehicleDescription',
        },
        {
            title: 'Buy price',
            dataIndex: 'vehicleBuyPrice',
        },
        {
            title: 'Sell price',
            dataIndex: 'vehicleSellPrice',
        },
        {
            title: 'Buy date',
            dataIndex: 'buyDate',
        },
        {
            title: 'Sell date',
            dataIndex: 'sellDate',
        },
        {
            title: 'City id',
            dataIndex: 'cityId',
        },
        {
            title: 'Person id',
            dataIndex: 'personId',
        }
    ]
    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <button style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px' }} onClick={handleCreateVehicle}>New Vehicle</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index} style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{column.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {vehicleData.map((vehicle, index) => (
                            <tr key={index}>
                                {columns.map((column, columnIndex) => (
                                    <td key={columnIndex} style={{ padding: '8px', borderBottom: '1px solid #ddd', whiteSpace: 'nowrap' }}>{vehicle[column.dataIndex]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Vehicle;

