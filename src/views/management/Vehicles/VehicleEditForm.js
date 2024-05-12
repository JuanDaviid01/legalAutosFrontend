import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import Axios from "axios";
import {
    CForm,
    CCol,
    CFormInput,
    CFormSelect,
    CButton,
} from '@coreui/react'

const VehicleEditForm = () => {
    const { vehicleId } = useParams();

    const [vehicleData, setVehicleData] = useState({
        vehiclePlate: '',
        vehicleBrand: '',
        vehicleLine: '',
        vehicleType: '',
        vehicleYear: 0,
        vehicleTrasmision: '',
        vehicleCC: '',
        vehicleColor: '',
        vehicleBuyPrice: 0,
        vehicleSellPrice: 0,
        vehicleState: '',
        cityId: 0,
        personId: '',
        buyDate: '',
        sellDate: '',
        vehicleSoat: false,
        vehicleTecno: false,
        vehicleDescription: '',
        vehicleId: '',
    });
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedTransmission, setSelectedTransmission] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedSoat, setSelectedSoat] = useState('');
    const [selectedTecno, setSelectedTecno] = useState('');

    useEffect(() => {

        const getVehicles = async () => {
            const response = await Axios({ url: `http://localhost:1338/api/getVehicle/${vehicleId}` });
            const vehicle = response.data.data
            setVehicleData(vehicle);
        }
        const getDepartments = async () => {
            const response = await Axios({ url: 'http://localhost:1338/api/listdepartments' });
            const lstDepartments = Object.keys(response.data).map(i => response.data[i]);
            setDepartments(lstDepartments.flat());
        }

        const getCities = async (departmentId) => {
            const response = await Axios({ url: `http://localhost:1338/api/listcities/${departmentId}` });
            const lstCities = Object.keys(response.data).map(i => response.data[i]);
            setCities(lstCities.flat());
        }
        getVehicles();
        getDepartments();

        if (selectedDepartment !== "")
            getCities(selectedDepartment);

    }, [selectedDepartment]);

    function handleSelectDepartments(event) {
        setSelectedDepartment(event.target.value);
    }

    function handleSelectCities(event) {
        setSelectedCity(event.target.value);
        setVehicleData({
            ...vehicleData,

            cityId: event.target.value
        })
    }
    function handleSelectSoat(event) {
        setSelectedSoat(event.target.value);
        setVehicleData({
            ...vehicleData,
            cityId: event.target.value
        });
        console.log(`Estado de SOAT: ${event.target.value}`);
    }
    function handleSelectTecno(event) {
        setSelectedTecno(event.target.value);
        setVehicleData({
            ...vehicleData,
            cityId: event.target.value
        });
        console.log(`Estado de Tecnomecánica: ${event.target.value}`);
    }

    function handleSelectTransmissions(event) {
        setSelectedTransmission(event.target.value);
        setVehicleData({
            ...vehicleData,
            vehicleTrasmision: event.target.value
        });
        console.log(`trasmision: ${event.target.value}`);

    }
    function handleSelectState(event) {
        setSelectedState(event.target.value);
        setVehicleData({
            ...vehicleData,
            vehicleState: event.target.value
        });
        console.log(`state: ${event.target.value}`);

    }
    function handleChange(event) {
        const { name, value } = event.target;
        setVehicleData({
            ...vehicleData,
            [name]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // Asegúrate de prevenir el comportamiento predeterminado del formulario
        try {
            const response = await Axios.put(`http://localhost:1338/api/updateVehicle/${vehicleId}`, vehicleData);
            console.log(response.data);

            // Si la respuesta es exitosa, navega a la ruta especificada
            navigate('/vehicles/Vehicle');
        } catch (e) {
            console.log(e);
        }
    }
    const handleCancel = async (event) => {
        navigate('/vehicles/vehicle');
    }


    return (
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={4}>
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
            <CCol md={4}>
                <CFormInput
                    type="text"
                    id="vehicleBrand"
                    name="vehicleBrand"
                    label="Brand"
                    value={vehicleData.vehicleBrand}
                    onChange={handleChange}
                    required
                />
            </CCol>
            <CCol md={4}>
                <CFormInput
                    type="text"
                    id="vehicleLine"
                    name="vehicleLine"
                    label="Line"
                    value={vehicleData.vehicleLine}
                    onChange={handleChange}
                    required
                />
            </CCol>
            <CCol md={4}>
                <CFormInput
                    type="text"
                    id="vehicleType"
                    name="vehicleType"
                    label="Type of vehicle"
                    value={vehicleData.vehicleType}
                    onChange={handleChange}
                    required
                />
            </CCol>
            <CCol md={4}>
                <CFormInput
                    type="integer"
                    id="vehicleYear"
                    name="vehicleYear"
                    label="Vehicle Year"
                    value={vehicleData.vehicleYear}
                    onChange={handleChange}
                    required
                />
            </CCol>
            <CCol xs={4}>
                <CFormSelect id="transmissionOptions" label="Transmission" value={selectedTransmission} onChange={handleSelectTransmissions}>
                    <option value="">Select transmission type</option>
                    <option key="automatic" value="automatic">Automatic</option>
                    <option key="manual" value="manual">Manual</option>
                </CFormSelect>
            </CCol>

            <CCol md={4}>
                <CFormInput
                    type="integer"
                    id="vehicleBuyPrice"
                    name="vehicleBuyPrice"
                    label="Buy price"
                    value={vehicleData.vehicleBuyPrice}
                    onChange={handleChange}
                    required
                />
            </CCol>
            <CCol md={4}>
                <CFormInput
                    type="integer"
                    id="vehicleSellPrice"
                    name="vehicleSellPrice"
                    label="Sell price"
                    value={vehicleData.vehicleSellPrice}
                    onChange={handleChange}
                    required
                />
            </CCol>
            <CCol md={4}>
                <CFormInput
                    type="date"
                    id="buyDate"
                    name="buyDate"
                    label="Buy Date"
                    value={vehicleData.buyDate}
                    onChange={handleChange}
                    required
                />
            </CCol>
            <CCol md={4}>
                <CFormInput
                    type="date"
                    id="sellDate"
                    name="sellDate"
                    label="Sell Date"
                    value={vehicleData.sellDate}
                    onChange={handleChange}
                />
            </CCol>
            <CCol md={4}>
                <CFormInput
                    type="text"
                    id="vehicleCC"
                    name="vehicleCC"
                    label="engine displacement"
                    value={vehicleData.vehicleCC}
                    onChange={handleChange}
                    required
                />
            </CCol>
            <CCol md={4}>
                <CFormInput
                    type="text"
                    id="vehicleColor"
                    name="vehicleColor"
                    label="Color"
                    value={vehicleData.vehicleColor}
                    onChange={handleChange}
                    required
                />
            </CCol>
            <CCol xs={4}>
                <CFormSelect id="soatOptions" label="SOAT" value={selectedSoat} onChange={handleSelectSoat}>
                    <option value="">Select SOAT status</option>
                    <option value="true">Valid</option>
                    <option value="false">Timed out</option>
                </CFormSelect>
            </CCol>
            <CCol xs={4}>
                <CFormSelect id="tecnoOptions" label="Tecnomecanica" value={selectedTecno} onChange={handleSelectTecno}>
                    <option value="">Select Tecno status</option>
                    <option value="true">Valid</option>
                    <option value="false">Timed out</option>
                </CFormSelect>
            </CCol>
            <CCol xs={4}>
                <CFormSelect id="stateOptions" label="State" value={selectedState} onChange={handleSelectState}>
                    <option value="">Select status</option>
                    <option key="avaliable" value="avaliable">Avaliable</option>
                    <option key="unvaliable" value="unvaliable">Unvaliable</option>
                </CFormSelect>
            </CCol>
            <CCol md={12}>
                <CFormInput
                    type="text"
                    id="vehicleDescription"
                    name="vehicleDescription"
                    label="Description of the vehicle"
                    value={vehicleData.vehicleDescription}
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
            <CCol md={4}>
                <CFormInput
                    type="text"
                    id="personId"
                    name="personId"
                    label="Enter your Identification Number"
                    value={vehicleData.personId}
                    onChange={handleChange}
                    required
                />
            </CCol>
            <CCol xs={12} className="d-flex justify-content-end mt-4">
                <CButton color="secondary" className="me-2" onClick={handleCancel}>Cancel</CButton>
                <CButton color="primary" type="submit">Save</CButton>
            </CCol>
        </CForm>
    );
}
export default VehicleEditForm