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
        personId: '',
        vehicleId: '',
        publicationDate: '',    
        state:'',
        price: ''
    });
    const navigate = useNavigate();

    const [selectedState, setSelectedState] = useState('');


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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (publicationData && publicationData.publicationDate !== undefined) {
                // Convertir el precio a float antes de enviarlo al backend
                const floatValue = parseFloat(publicationData.price);
    
                // Convertir la fecha al formato AAAA/MM/DD antes de enviarla al backend
                const formattedDate = publicationData.publicationDate.split('/').reverse().join('/');
    
                // Modificar la variable dataToSend en lugar de redeclararla
                const dataToSend = {
                    ...publicationData,
                    price: floatValue,
                    publicationDate: formattedDate
                };
    
                const response = await Axios.post('http://localhost:1338/api/createPublication', dataToSend);
                console.log(response.data);
                navigate('/publications/Publication');
            } else {
                console.log("publicationData o publicationData.publicationDate no está definido.");
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleCancel = async (event) => {
        navigate('/publications/publication');
    }

    function handleSelectState(event) {
        setSelectedState(event.target.value);
        setPublicationData({
            ...publicationData,
            state: event.target.value
        });
    }

    return (
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={6}>
                <CFormInput
                    type="number"
                    id="personId"
                    name="personId"
                    label="Person ID"
                    value={publicationData.personId}
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
            <CCol xs={4}>
                <CFormSelect id="stateOptions" label="State" value={selectedState} onChange={handleSelectState}>
                    <option value="">Select status</option>
                    <option key="avaliable" value="avaliable">Avaliable</option>
                    <option key="unvaliable" value="unvaliable">Unvaliable</option>
                </CFormSelect>
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
