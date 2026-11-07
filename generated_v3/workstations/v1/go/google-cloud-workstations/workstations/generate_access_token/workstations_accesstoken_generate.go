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

// [START workstations_v1_workstations_generate_access_token]

import (
	"context"
	"fmt"
	"io"

	workstations "cloud.google.com/go/workstations/apiv1beta"
	workstationspb "cloud.google.com/go/workstations/apiv1beta/workstationspb"
)

// generateAccessToken generates a short-lived access token for a workstation.
func generateAccessToken(ctx context.Context, w io.Writer, projectID string, locationID string, workstationClusterID string, workstationConfigID string, workstationID string) error {
	workstation := fmt.Sprintf("projects/%s/locations/%s/workstationClusters/%s/workstationConfigs/%s/workstations/%s",
		projectID, locationID, workstationClusterID, workstationConfigID, workstationID)

	client, err := workstations.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &workstationspb.GenerateAccessTokenRequest{
		Workstation: workstation,
	}

	resp, err := client.GenerateAccessToken(ctx, req)
	if err != nil {
		return fmt.Errorf("GenerateAccessToken failed: %w", err)
	}

	fmt.Fprintf(w, "Generated access token with expiration %s\n", resp.GetExpireTime().AsTime())
	return nil
}

// [END workstations_v1_workstations_generate_access_token]
