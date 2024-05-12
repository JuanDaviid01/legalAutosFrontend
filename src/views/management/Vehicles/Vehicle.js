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

    function handleEditVehicle(vehicleId) {
        navigate(`/vehicles/VehicleEditForm/${vehicleId}`);
    };
    const handleDelete = async(vehicleId) => {
        try {
          var url = `http://localhost:1338/api/disableVehicle/${vehicleId}`;
          const response = await Axios.put(url);
          window.location.reload();
        }
        catch (e) {
          console.log(e);
        }
      }
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
        },
        {
            title: 'Options',
            render: (vehicle) =>(
                <div>
                    <CButton color="primary" onClick={() => handleEditVehicle(vehicle.vehicleId)}>Edit</CButton>
                    <CButton color="danger" onClick={() => handleDeleteVehicle(vehicle.vehicleId)}>Delete</CButton>

                </div>
            ),
        }
    ]
    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
            <CButton className="btn-primary" onClick={handleCreateVehicle}>New Vehicle</CButton>
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
                    {vehicleData.map((vehicle, index) => (
                        <CTableRow key={index}>
                            {columns.map((column, columnIndex) => {
                                if (column.render) {
                                    return <CTableDataCell key={columnIndex}>{column.render(vehicle)}</CTableDataCell>;
                                } else {
                                    return <CTableDataCell key={columnIndex}>{vehicle[column.dataIndex]}</CTableDataCell>;
                                }
                            })}
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </div>
    )
}
export default Vehicle;

