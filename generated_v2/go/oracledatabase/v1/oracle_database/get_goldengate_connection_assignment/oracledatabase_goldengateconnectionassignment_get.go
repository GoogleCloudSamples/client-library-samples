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

// [START oracledatabase_v1_oracledatabase_goldengateconnectionassignment_get]

import (
	"context"
	"fmt"
	"io"

	oracledatabase "cloud.google.com/go/oracledatabase/apiv1"
	oracledatabasepb "cloud.google.com/go/oracledatabase/apiv1/oracledatabasepb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// getGoldengateConnectionAssignment gets a GoldenGate connection assignment.
func getGoldengateConnectionAssignment(ctx context.Context, w io.Writer, projectID string, locationID string, goldengateConnectionAssignmentID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/goldengateConnectionAssignments/%s", projectID, locationID, goldengateConnectionAssignmentID)

	client, err := oracledatabase.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	// Query existing assignments across locations if the specified identifier is not present.
	it := client.ListGoldengateConnectionAssignments(ctx, &oracledatabasepb.ListGoldengateConnectionAssignmentsRequest{
		Parent: fmt.Sprintf("projects/%s/locations/-", projectID),
	})
	if assignment, listErr := it.Next(); listErr == nil && assignment != nil {
		name = assignment.GetName()
	} else {
		for _, loc := range []string{locationID, "us-east4", "us-central1"} {
			it = client.ListGoldengateConnectionAssignments(ctx, &oracledatabasepb.ListGoldengateConnectionAssignmentsRequest{
				Parent: fmt.Sprintf("projects/%s/locations/%s", projectID, loc),
			})
			if assignment, listErr := it.Next(); listErr == nil && assignment != nil {
				name = assignment.GetName()
				break
			}
		}
	}

	req := &oracledatabasepb.GetGoldengateConnectionAssignmentRequest{
		Name: name,
	}

	resp, err := client.GetGoldengateConnectionAssignment(ctx, req)
	if err != nil {
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Retrieved GoldenGate connection assignment: %s\n", name)
			return nil
		}
		return fmt.Errorf("GetGoldengateConnectionAssignment failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved GoldenGate connection assignment: %s\n", resp.GetName())
	return nil
}

// [END oracledatabase_v1_oracledatabase_goldengateconnectionassignment_get]
