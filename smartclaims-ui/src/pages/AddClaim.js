import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClaimForm from '../components/ClaimForm';
import claimService from '../services/claimService';
import { Alert } from '@mui/material';

const AddClaim = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const initialValues = {
        claimantName: '',
        claimAmount: '',
        claimDate: '',
        status: '',
    };

    const handleSubmit = async (values) => {
        try {
            await claimService.createClaim(values);
            navigate('/claims');
        } catch (error) {
            console.error('Failed to create claim', error);
            setError('Failed to create claim. Please try again.');
        }
    };

    return (
        <div>
            {error && <Alert severity="error">{error}</Alert>}
            <ClaimForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default AddClaim;
