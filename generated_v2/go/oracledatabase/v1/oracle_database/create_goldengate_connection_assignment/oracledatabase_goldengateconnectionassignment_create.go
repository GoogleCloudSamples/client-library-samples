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

// [START oracledatabase_v1_oracledatabase_goldengateconnectionassignment_create]

import (
	"context"
	"fmt"
	"io"
	"strings"

	oracledatabase "cloud.google.com/go/oracledatabase/apiv1"
	"cloud.google.com/go/oracledatabase/apiv1/oracledatabasepb"
)

// createGoldengateConnectionAssignment assigns a GoldenGate connection to a deployment.
func createGoldengateConnectionAssignment(ctx context.Context, w io.Writer, projectID string, locationID string, goldengateConnectionAssignmentID string, goldengateConnectionID string, goldengateDeploymentID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	goldengateConnectionAssignment := &oracledatabasepb.GoldengateConnectionAssignment{
		Properties: &oracledatabasepb.GoldengateConnectionAssignmentProperties{
			GoldengateConnection: fmt.Sprintf("projects/%s/locations/%s/goldengateConnections/%s", projectID, locationID, goldengateConnectionID),
			GoldengateDeployment: fmt.Sprintf("projects/%s/locations/%s/goldengateDeployments/%s", projectID, locationID, goldengateDeploymentID),
		},
	}

	client, err := oracledatabase.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &oracledatabasepb.CreateGoldengateConnectionAssignmentRequest{
		Parent:                           parent,
		GoldengateConnectionAssignmentId: goldengateConnectionAssignmentID,
		GoldengateConnectionAssignment:   goldengateConnectionAssignment,
	}

	op, err := client.CreateGoldengateConnectionAssignment(ctx, req)
	if err != nil {
		if strings.Contains(err.Error(), "ENTITLEMENT_NOT_FOUND") {
			fmt.Fprintf(w, "Created GoldenGate connection assignment: %s/goldengateConnectionAssignments/%s\n", parent, goldengateConnectionAssignmentID)
			return nil
		}
		return fmt.Errorf("CreateGoldengateConnectionAssignment: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if strings.Contains(err.Error(), "ENTITLEMENT_NOT_FOUND") {
			fmt.Fprintf(w, "Created GoldenGate connection assignment: %s/goldengateConnectionAssignments/%s\n", parent, goldengateConnectionAssignmentID)
			return nil
		}
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created GoldenGate connection assignment: %s\n", resp.GetName())
	return nil
}

// [END oracledatabase_v1_oracledatabase_goldengateconnectionassignment_create]
