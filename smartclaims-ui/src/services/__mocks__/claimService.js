const claimService = {
    getAllClaims: jest.fn(() => Promise.resolve({ data: [] })),
    getClaimById: jest.fn(() => Promise.resolve({ data: {} })),
    createClaim: jest.fn(() => Promise.resolve({ data: {} })),
    updateClaim: jest.fn(() => Promise.resolve({ data: {} })),
    deleteClaim: jest.fn(() => Promise.resolve()),
    searchClaims: jest.fn(() => Promise.resolve({ data: [] })),
};

export default claimService;
