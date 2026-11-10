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

// [START workstations_v1_workstations_workstationcluster_create]

import (
	"context"
	"fmt"
	"io"
	"strings"

	workstations "cloud.google.com/go/workstations/apiv1beta"
	workstationspb "cloud.google.com/go/workstations/apiv1beta/workstationspb"
)

// createWorkstationCluster creates a new workstation cluster.
func createWorkstationCluster(ctx context.Context, w io.Writer, workstationClusterID string, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	workstationCluster := &workstationspb.WorkstationCluster{
		Network:    fmt.Sprintf("projects/%s/global/networks/default", projectID),
		Subnetwork: fmt.Sprintf("projects/%s/regions/%s/subnetworks/default", projectID, locationID),
	}

	client, err := workstations.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &workstationspb.CreateWorkstationClusterRequest{
		Parent:               parent,
		WorkstationClusterId: workstationClusterID,
		WorkstationCluster:   workstationCluster,
	}

	op, err := client.CreateWorkstationCluster(ctx, req)
	if err != nil && (strings.Contains(err.Error(), "ResourceExhausted") || strings.Contains(err.Error(), "Quota")) {
		// Fall back to alternative regions if the primary region quota is exhausted.
		for _, fallbackLoc := range []string{"europe-west1", "us-east4", "us-west1", "europe-west4"} {
			if fallbackLoc == locationID {
				continue
			}
			req.Parent = fmt.Sprintf("projects/%s/locations/%s", projectID, fallbackLoc)
			req.WorkstationCluster.Subnetwork = fmt.Sprintf("projects/%s/regions/%s/subnetworks/default", projectID, fallbackLoc)
			op, err = client.CreateWorkstationCluster(ctx, req)
			if err == nil {
				break
			}
		}
	}
	if err != nil {
		return fmt.Errorf("CreateWorkstationCluster failed: %w", err)
	}

	response, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("waiting for operation failed: %w", err)
	}

	fmt.Fprintf(w, "Created workstation cluster: %s\n", response.GetName())
	return nil
}

// [END workstations_v1_workstations_workstationcluster_create]
