import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {
    CForm,
    CCol,
    CFormInput,
    CFormSelect,
    CButton
} from '@coreui/react'

const PublicationsForms = () => {
    const [publicationData, setPublicationData] = useState({
        publicationId: '',
        publicationDate: '',
        state:'',
        price: ''
    });
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const getDepartments = async () => {
            const response = await Axios({url:'http://localhost:1337/api/listdepartments'});
            const lstDepartments = Object.keys(response.data).map(i=> response.data[i]);
            setDepartments(lstDepartments.flat());
        }

        const getCities = async(departmentId)=>{
            const response = await Axios({url: `http://localhost:1337/api/listcities/${departmentId}`});
            const lstCities = Object.keys(response.data).map(i=> response.data[i]);
            setCities(lstCities.flat());
        }

        getDepartments();

        if(selectedDepartment !== "")
            getCities(selectedDepartment);

    },[selectedDepartment]);

    function handleSelectDepartments(event){
        setSelectedDepartment(event.target.value);
    }

    function handleSelectCities(event){
        setSelectedCity(event.target.value);
        setPublicationData({
            ...publicationData,
            cityId: event.target.value
        })
    }

    function handleChange(event){
        const {name, value} = event.target;
        setPublicationData({
            ...publicationData,
            [name]: value
        });
    }

    function handleReturn(event){
        navigate('/Publications/Publication');
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const response = await Axios.post('http://localhost:1338/api/createPublication', publicationData);
            console.log(response.data);
            navigate('/Publications/Publication');
        }
        catch (e){
            console.log(e);
        }
    }

    return(
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={12}>
                <CFormInput type="text" id="publicationId" name="publicationId" label="ID" value={publicationData.publicationId} onChange={handleChange} />
            </CCol>
            <CCol md={12}>
                <CFormInput type="text" id="publicationDate" name="publicationDate" label="Date" value={publicationData.publicationDate} onChange={handleChange} />
            </CCol>
            <CCol xs={4}>
                <CFormSelect id="departmentOptions" label = "Department" value={ selectedDepartment} onChange={handleSelectDepartments} >
                    <option value="">Select a department</option>
                    {departments.map(opcion =>(
                        <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                    ))}
                </CFormSelect>
            </CCol>
            <CCol xs={4}>
                <CFormSelect id="cityOptions" label = "City" value={ selectedCity} onChange={handleSelectCities} >
                    <option value="">Select a city</option>
                    {cities.map(opcion =>(
                        <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                    ))}
                </CFormSelect>
            </CCol>
            <CCol xs={4}>
                <CFormInput type="text" id="state" name="state" label="State" value={publicationData.state} onChange={handleChange} />
            </CCol>
            <CCol md={12}>
                <CFormInput type="text" id="price" name="price" label="Price" value={publicationData.price} onChange={handleChange} />
            </CCol>
            <CCol xs={6}>
                <CButton color="primary" type="submit" >Save</CButton>
            </CCol>
            <CCol xs={6}>
                <CButton color="secondary" onClick={handleReturn}>Cancel</CButton>
            </CCol>
        </CForm>
    )
}

export default PublicationsForms
