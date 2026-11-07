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

// [START workstations_v1beta_workstations_workstation_create]

import (
	"context"
	"fmt"
	"io"

	workstations "cloud.google.com/go/workstations/apiv1beta"
	workstationspb "cloud.google.com/go/workstations/apiv1beta/workstationspb"
)

// createWorkstation creates a Cloud Workstation in an existing cluster and configuration.
func createWorkstation(ctx context.Context, w io.Writer, workstationID string, projectID string, locationID string, workstationClusterID string, workstationConfigID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/workstationClusters/%s/workstationConfigs/%s",
		projectID, locationID, workstationClusterID, workstationConfigID)

	workstation := &workstationspb.Workstation{
		DisplayName: "Sample Workstation",
	}

	client, err := workstations.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("workstations.NewClient: %w", err)
	}
	defer client.Close()

	req := &workstationspb.CreateWorkstationRequest{
		Parent:        parent,
		WorkstationId: workstationID,
		Workstation:   workstation,
	}

	op, err := client.CreateWorkstation(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateWorkstation: %w", err)
	}

	response, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created workstation: %s\n", response.GetName())

	return nil
}

// [END workstations_v1beta_workstations_workstation_create]
