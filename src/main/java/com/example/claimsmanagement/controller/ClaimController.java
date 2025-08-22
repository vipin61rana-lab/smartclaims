package com.example.claimsmanagement.controller;

import com.example.claimsmanagement.model.Claim;
import com.example.claimsmanagement.service.ClaimService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/claims")
@RequiredArgsConstructor
public class ClaimController {

    private final ClaimService claimService;

    @Operation(summary = "Get all claims")
    @GetMapping
    public List<Claim> getAllClaims() {
        return claimService.getAllClaims();
    }

    @Operation(summary = "Get a claim by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the claim"),
            @ApiResponse(responseCode = "404", description = "Claim not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Claim> getClaimById(@PathVariable Long id) {
        return claimService.getClaimById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Create a new claim")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Claim createClaim(@Valid @RequestBody Claim claim) {
        return claimService.createClaim(claim);
    }

    @Operation(summary = "Update an existing claim")
    @PutMapping("/{id}")
    public ResponseEntity<Claim> updateClaim(@PathVariable Long id, @Valid @RequestBody Claim claimDetails) {
        try {
            return ResponseEntity.ok(claimService.updateClaim(id, claimDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Delete a claim")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClaim(@PathVariable Long id) {
        try {
            claimService.deleteClaim(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Search for claims by claimant name or status")
    @GetMapping("/search")
    public List<Claim> searchClaims(@RequestParam String query) {
        return claimService.searchClaims(query);
    }
}
