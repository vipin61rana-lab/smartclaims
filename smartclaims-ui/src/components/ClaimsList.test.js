import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ClaimsList from './ClaimsList';
import claimService from '../services/claimService';

jest.mock('../services/claimService');

const mockClaims = [
    { id: 1, claimantName: 'John Doe', claimAmount: 1200.50, claimDate: '2023-01-15', status: 'Approved' },
    { id: 2, claimantName: 'Jane Smith', claimAmount: 500.00, claimDate: '2023-02-20', status: 'Pending' },
];

test('renders claims list and performs a search', async () => {
    claimService.getAllClaims.mockResolvedValue({ data: mockClaims });
    claimService.searchClaims.mockResolvedValue({ data: [mockClaims[0]] });

    render(
        <Router>
            <ClaimsList />
        </Router>
    );

    // Wait for initial data to load
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    // Search for a claim
    fireEvent.change(screen.getByLabelText(/search by name or status/i), { target: { value: 'John' } });
    fireEvent.click(screen.getByText(/search/i));

    // Wait for search results
    await waitFor(() => {
        expect(claimService.searchClaims).toHaveBeenCalledWith('John');
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
});

test('deletes a claim', async () => {
    claimService.getAllClaims.mockResolvedValue({ data: mockClaims });
    claimService.deleteClaim.mockResolvedValue({});

    render(
        <Router>
            <ClaimsList />
        </Router>
    );

    // Wait for initial data to load
    expect(await screen.findByText('John Doe')).toBeInTheDocument();

    // Click the delete button for the first claim
    const deleteButtons = screen.getAllByText(/delete/i);
    fireEvent.click(deleteButtons[0]);

    // Wait for delete to be called
    await waitFor(() => {
        expect(claimService.deleteClaim).toHaveBeenCalledWith(1);
    });
});
