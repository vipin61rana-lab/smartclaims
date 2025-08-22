package com.example.claimsmanagement.service;

import com.example.claimsmanagement.exception.ResourceNotFoundException;
import com.example.claimsmanagement.model.Claim;
import com.example.claimsmanagement.repository.ClaimRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClaimService {

    private final ClaimRepository claimRepository;

    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    public Optional<Claim> getClaimById(Long id) {
        return claimRepository.findById(id);
    }

    public Claim createClaim(Claim claim) {
        return claimRepository.save(claim);
    }

    public Claim updateClaim(Long id, Claim claimDetails) {
        Claim claim = claimRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Claim not found with id: " + id));

        claim.setClaimantName(claimDetails.getClaimantName());
        claim.setClaimAmount(claimDetails.getClaimAmount());
        claim.setClaimDate(claimDetails.getClaimDate());
        claim.setStatus(claimDetails.getStatus());

        return claimRepository.save(claim);
    }

    public void deleteClaim(Long id) {
        if (!claimRepository.existsById(id)) {
            throw new ResourceNotFoundException("Claim not found with id: " + id);
        }
        claimRepository.deleteById(id);
    }

    public List<Claim> searchClaims(String query) {
        return claimRepository.findByClaimantNameContainingIgnoreCaseOrStatusContainingIgnoreCase(query, query);
    }
}
