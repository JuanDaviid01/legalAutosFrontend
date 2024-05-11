import React, { useEffect, useState } from 'react';
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

const SellerForm = () => {

    const [sellerData, setSellerData] = useState({
        
        personName: '',
        personLastName: '',
        personAge: '',
        personId: '',
        personEmail: '',
        personAddress: '',
        personPassword: '',
        cityId: 0,
    });
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
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

        getDepartments();

        if (selectedDepartment !== "")
            getCities(selectedDepartment);

    }, [selectedDepartment]);

    function handleSelectDepartments(event) {
        setSelectedDepartment(event.target.value);
    }

    function handleSelectCities(event) {
        setSelectedCity(event.target.value);
        setSellerData({
            ...sellerData,
            cityId: event.target.value
        })
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setSellerData({
            ...sellerData,
            [name]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await Axios.post('http://localhost:1338/api/createseller', sellerData);
            console.log(response.data);
            navigate('/sellers/seller');
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleCancel = async (event) => {
        navigate('/sellers/seller');
    }

    return (
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={6}>
                <CFormInput type="text" id="personName" name="personName" label="First Name" value={sellerData.personName} onChange={handleChange} required />
            </CCol>
            <CCol md={6}>
                <CFormInput type="text" id="personLastName" name="personLastName" label="Last Name" value={sellerData.personLastName} onChange={handleChange} required />
            </CCol>
            <CCol md={6}>
                <CFormInput type="text" id="personId" name="personId" label="Identification" value={sellerData.personId} onChange={handleChange} required />
            </CCol>
            <CCol md={6}>
                <CFormInput type="number" id="personAge" name="personAge" label="Age" value={sellerData.personAge} onChange={handleChange} required />
            </CCol>
            <CCol md={6}>
                <CFormInput type="email" id="personEmail" name="personEmail" label="Email" value={sellerData.personEmail} onChange={handleChange} required />
            </CCol>
            <CCol md={12}>
                <CFormInput type="text" id="personAddress" name="personAddress" label="Address" value={sellerData.personAddress} onChange={handleChange} required />
            </CCol>

            <CCol md={12}>
                <CFormInput type="password" id="personPassword" name="personPassword" label="Password" value={sellerData.personPassword} onChange={handleChange} required />
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
                <CButton color="secondary" onClick={handleCancel}>Cancel</CButton>
            </CCol>
        </CForm>
    );
}

export default SellerForm