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

const BuyerForm = () => {


    const [buyerData, setBuyerData] = useState({
        personName: '',
        personLastName: '',
        personAge:'',
        personId: '',
        personEmail: '',
        personAddress: "",
        personPassword: "",
        cityId: 0,
    });
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');

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

        if (selectedDepartment !== "") {
            getCities(selectedDepartment);
        }

    }, [selectedDepartment]);

    function handleSelectDepartments(event) {
        setSelectedDepartment(event.target.value);
    }

    function handleSelectCities(event) {
        setSelectedCity(event.target.value);
        setBuyerData({
            ...buyerData,

            cityId: event.target.value
        })
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setBuyerData({
            ...buyerData,
            [name]: value
        });
    }

    const handleSubmit = async (event) => {
    event.preventDefault(); // Asegúrate de prevenir el comportamiento predeterminado del formulario
    try {
        const response = await Axios.post('http://localhost:1338/api/createbuyer', buyerData);
        console.log(response.data);

            // Si la respuesta es exitosa, navega a la ruta especificada
            navigate('/buyers/buyer');
        } catch (e) {
            console.log(e);
        }
    }

    const handleCancel = async (event) => {
        navigate('/buyers/buyer');
    }


return (
    <CForm className="row g-3" onSubmit={handleSubmit}>
        <CCol md={6}>
            <CFormInput
                type="text"
                id="personName"
                name="personName"
                label="First Name"
                value={buyerData.personName}
                onChange={handleChange}
                required
            />
        </CCol>
        <CCol md={6}>
            <CFormInput
                type="text"
                id="personLastName"
                name="personLastName"
                label="Last Name"
                value={buyerData.personLastName}
                onChange={handleChange}
                required
            />
        </CCol>
        <CCol md={6}>
            <CFormInput
                type="text"
                id="personId"
                name="personId"
                label="Identification"
                value={buyerData.personId}
                onChange={handleChange}
                required
            />
        </CCol>
        <CCol md={6}>
            <CFormInput
                type="number"
                id="personAge"
                name="personAge"
                label="Age"
                value={buyerData.personAge}
                onChange={handleChange}
                required
            />
        </CCol>
        <CCol md={6}>
            <CFormInput
                type="email"
                id="personEmail"
                name="personEmail"
                label="Email"
                value={buyerData.personEmail}
                onChange={handleChange}
                required
            />
        </CCol>
        <CCol md={12}>
            <CFormInput
                type="text"
                id="personAddress"
                name="personAddress"
                label="Address"
                value={buyerData.personAddress}
                onChange={handleChange}
                required
            />
        </CCol>
        <CCol md={12}>
            <CFormInput
                type="password"
                id="personPassword"
                name="personPassword"
                label="Password"
                value={buyerData.personPassword}
                onChange={handleChange}
                required
            />
        </CCol>
        <CCol xs={4}>
                <CFormSelect id="departmentOptions" label = "Department" value={ selectedDepartment} onChange={handleSelectDepartments} >
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

export default BuyerForm