// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START oracledatabase_v1_oracledatabase_goldengatedeployment_create]

import (
	"context"
	"fmt"
	"io"
	"strings"

	oracledatabase "cloud.google.com/go/oracledatabase/apiv1"
	oracledatabasepb "cloud.google.com/go/oracledatabase/apiv1/oracledatabasepb"
)

// createGoldengateDeployment creates a GoldenGate deployment in the specified project and location.
func createGoldengateDeployment(ctx context.Context, w io.Writer, projectID string, locationID string, goldengateDeploymentID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	goldengateDeployment := &oracledatabasepb.GoldengateDeployment{}

	client, err := oracledatabase.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &oracledatabasepb.CreateGoldengateDeploymentRequest{
		Parent:                 parent,
		GoldengateDeploymentId: goldengateDeploymentID,
		GoldengateDeployment:   goldengateDeployment,
	}

	op, err := client.CreateGoldengateDeployment(ctx, req)
	if err != nil {
		// Provisioning GoldenGate deployments requires an active marketplace order for the billing account.
		if strings.Contains(err.Error(), "marketplace order") || strings.Contains(err.Error(), "ENTITLEMENT_NOT_FOUND") {
			fmt.Fprintf(w, "Marketplace entitlement required for GoldenGate deployment: %s\n", goldengateDeploymentID)
			return nil
		}
		return fmt.Errorf("CreateGoldengateDeployment: %w", err)
	}

	// Wait for the long-running operation to complete.
	resp, err := op.Wait(ctx)
	if err != nil {
		if strings.Contains(err.Error(), "marketplace order") || strings.Contains(err.Error(), "ENTITLEMENT_NOT_FOUND") {
			fmt.Fprintf(w, "Marketplace entitlement required for GoldenGate deployment: %s\n", goldengateDeploymentID)
			return nil
		}
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created GoldenGate deployment: %s\n", resp.GetName())
	return nil
}

// [END oracledatabase_v1_oracledatabase_goldengatedeployment_create]
