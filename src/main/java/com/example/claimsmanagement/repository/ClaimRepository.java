package com.example.claimsmanagement.repository;

import com.example.claimsmanagement.model.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
    List<Claim> findByClaimantNameContainingIgnoreCaseOrStatusContainingIgnoreCase(String claimantName, String status);
}
