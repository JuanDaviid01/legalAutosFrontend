import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import {
    CForm,
    CCol,
    CFormInput,
    CFormSelect,
    CFormCheck,
    CButton
} from '@coreui/react'

const VehicleForm = () => {

    const [vehicleData, setVehicleData] = useState({
        vehiclePlate: '',
        vehicleBrand: '',
        vehicleLine: '',
        vehicleYear: '',
        vehicleTrasmision: '',
        vehicleBuyPrice: '',
        vehicleState: '',
        cityId: 0,
        personId: 0,
        buyDate: new Date,
        sellDate: new Date,
        vehicleCC: '',
        vehicleColor: '',
        vehicleSoat: '',
        vehicleTecno: '',
        vehicleDescription: '',
        vhicleType: '',
    });
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        const getDepartments = async () => {
            const response = await Axios({ url: 'http://localhost:1337/api/listdepartments' });
            const lstDepartments = Object.keys(response.data).map(i => response.data[i]);
            setDepartments(lstDepartments.flat());
        }

        const getCities = async (departmentId) => {
            const response = await Axios({ url: `http://localhost:1337/api/listcities/${departmentId}` });
            const lstCities = Object.keys(response.data).map(i => response.data[i]);
            setCities(lstCities.flat());
        }
        getDepartments();
        if (selectedDepartment !== "") {
            getCities(selectedDepartment);
        }
    }, [selectedDepartment]);

    function handleSelectDepartments(event) {
        setSelectedDepartment(event.target.value);
    }

    function handleSelectCities(event) {
        setSelectedCity(event.target.value);
        setVehicleData({
            ...vehicleData,
            cityId: event.target.value
        });
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setBuyerData({
            ...vehicleData,
            [name]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // Asegúrate de prevenir el comportamiento predeterminado del formulario
        try {
            const response = await Axios.post('http://localhost:1337/api/createVehicle', vehicleData);
            console.log(response.data);

            // Si la respuesta es exitosa, navega a la ruta especificada
            navigate('/Vehicles/Vehicle');
        } catch (e) {
            console.log(e);
        }
    }

    const handleCancel = async (event) => {
        navigate('/Vehicles/Vehicle');
    }

    return (
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={6}>
                <CFormInput
                    type="text"
                    id="vehiclePlate"
                    name="vehiclePlate"
                    label="Vehicle Plate"
                    value={vehicleData.vehiclePlate}
                    onChange={handleChange}
                    required
                />
            </CCol>
            <CCol md={6}>
                <CFormInput
                    type="text"
                    id="vehicleBrand"
                    name="vehiclebrand"
                    label="Vehicle Brand"
                    value={vehicleData.vehicle}
                    onChange={handleChange}
                    required
                />
            </CCol>
            <CCol md={6}>
                <CFormInput
                    type="text"
                    id="vehicleLine"
                    name="vehicleLine"
                    label="Vehicle Model"
                    value={vehicleData.vehicleLine}
                    onChange={handleChange}
                    required
                />
            </CCol>
            <CCol md={6}>
                <CFormInput
                    type="text"
                    id="vehicleYear"
                    name="vehicleYear"
                    label="Email"
                    value={vehicleData.vehicleYear}
                    onChange={handleChange}
                    required
                />
            </CCol>
            <CCol md={12}>
                <CFormInput
                    type="text"
                    id="vehicleAddress"
                    name="vehicleAddress"
                    label="Address"
                    value={vehicleData.vehicleAddress}
                    onChange={handleChange}
                    required
                />
            </CCol>
            <CCol md={12}>
                <CFormInput
                    type="password"
                    id="vehiclePassword"
                    name="vehiclePassword"
                    label="Password"
                    value={vehicleData.vehiclePassword}
                    onChange={handleChange}
                    required
                />
            </CCol>
            <CCol xs={4}>
                <CFormSelect id="departmentOptions" label="Department" value={selectedDepartment} onChange={handleSelectDepartments} >
                    <option value="">Select a department</option>
                    {departments.map(opcion => (
                        <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                    ))}
                </CFormSelect>
            </CCol>
            <CCol xs={4}>
                <CFormSelect id="cityOptions" label="City" value={selectedCity} onChange={handleSelectCities} >
                    <option value="">Select a city</option>
                    {cities.map(opcion => (
                        <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                    ))}
                </CFormSelect>
            </CCol>
            <CCol xs={12}>
                <CButton color="primary" type="submit">Save</CButton>
                <CButton color="secondary" onClick={() => setbuyerData({
                    personName: '',
                    personLastName: '',
                    personAge: '',
                    personEmail: '',
                    personAddress: '',
                    personPassword: '',
                    cityId: ''
                })}>Cancel</CButton>
            </CCol>
        </CForm>
    );


























};