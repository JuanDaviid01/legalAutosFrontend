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

const PublicationForm = () => {
    const [publicationData, setPublicationData] = useState({
        publicationId: '',
        vehicleId: '',
        publicationDate: '',    
        state:'',
        price: ''
    });
    const navigate = useNavigate();

    function handleChange(event){
        const {name, value} = event.target;
        setPublicationData({
            ...publicationData,
            [name]: value
        });
    }

    function handleReturn(event){
        navigate('/publications/publication');
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        try{    
                // Convertir el precio a float antes de enviarlo al backend
                const floatValue = parseFloat(publicationData.price);
                const dataToSend = {
                ...publicationData,
                price: floatValue
            };
            
            const response = await Axios.post('http://localhost:1338/api/createPublication', dataToSend);
            console.log(response.data);
            navigate('/publications/publication');
        } catch (e){
            console.log(e);
        }
    }

    const handleCancel = async (event) => {
        navigate('/publications/publication');
    }

    return (
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={6}>
                <CFormInput
                    type="number"
                    id="publicationId"
                    name="publicationId"
                    label="Publication ID"
                    value={publicationData.publicationId}
                    onChange={handleChange}
                    required
                />
                </CCol>
                <CCol md={6}>
                    <CFormInput
                        type="number"
                        id="vehicleId"
                        name='vehicleId'
                        label='Vehicle ID'
                        value={publicationData.vehicleId}
                        onChange={handleChange}
                        required
                    />
            </CCol>
            <CCol md={6}>
                <CFormInput
                    type="date"
                    id="publicationDate"
                    name="publicationDate"
                    label="Publication Date"
                    value={publicationData.publicationDate}
                    onChange={handleChange}
                    required
                />
            </CCol>
            <CCol md={6}>
                <CFormInput
                    type="text"
                    id="state"
                    name="state"
                    label="Publication State"
                    value={publicationData.state}
                    onChange={handleChange}
                    required
                />
            </CCol>
            <CCol md={6}>
                <CFormInput
                    type="number"
                    id="price"
                    name="price"
                    label="Publication Price"
                    value={publicationData.price}
                    onChange={handleChange}
                    required
                />
            </CCol>
            <CCol xs={12}>
                <CButton color="primary" type="submit">Save</CButton>
                <CButton color="secondary" onClick={handleCancel}>Cancel</CButton>
            </CCol>
        </CForm>
    );
}

export default PublicationForm
