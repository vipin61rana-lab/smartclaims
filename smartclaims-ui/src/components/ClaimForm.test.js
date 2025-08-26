import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ClaimForm from './ClaimForm';

const initialValues = {
    claimantName: 'John Doe',
    claimAmount: '1000',
    claimDate: '2023-01-01',
    status: 'Pending',
};

test('renders claim form and submits data', async () => {
    const handleSubmit = jest.fn();
    render(
        <Router>
            <ClaimForm initialValues={initialValues} onSubmit={handleSubmit} />
        </Router>
    );

    fireEvent.change(screen.getByLabelText(/claimant name/i), { target: { value: 'Jane Doe' } });
    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith({
            ...initialValues,
            claimantName: 'Jane Doe',
        });
    });
});

test('shows validation errors', async () => {
    const handleSubmit = jest.fn();
    render(
        <Router>
            <ClaimForm initialValues={{ claimantName: '', claimAmount: '', claimDate: '', status: '' }} onSubmit={handleSubmit} />
        </Router>
    );

    fireEvent.click(screen.getByText(/submit/i));

    expect(await screen.findByText('Claimant name is required')).toBeInTheDocument();
    expect(screen.getByText('Claim amount is required')).toBeInTheDocument();
    expect(screen.getByText('Claim date is required')).toBeInTheDocument();
    expect(screen.getByText('Status is required')).toBeInTheDocument();
});
