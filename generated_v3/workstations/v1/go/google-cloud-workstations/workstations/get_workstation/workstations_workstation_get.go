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

// [START workstations_v1_workstations_workstation_get]

import (
	"context"
	"fmt"
	"io"

	workstations "cloud.google.com/go/workstations/apiv1beta"
	workstationspb "cloud.google.com/go/workstations/apiv1beta/workstationspb"
)

// getWorkstation retrieves a workstation resource.
func getWorkstation(ctx context.Context, w io.Writer, projectID string, locationID string, workstationClusterID string, workstationConfigID string, workstationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/workstationClusters/%s/workstationConfigs/%s/workstations/%s",
		projectID, locationID, workstationClusterID, workstationConfigID, workstationID)

	client, err := workstations.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &workstationspb.GetWorkstationRequest{
		Name: name,
	}

	workstation, err := client.GetWorkstation(ctx, req)
	if err != nil {
		return fmt.Errorf("GetWorkstation: %w", err)
	}

	fmt.Fprintf(w, "Retrieved workstation: %s (State: %s)\n", workstation.GetName(), workstation.GetState())

	return nil
}

// [END workstations_v1_workstations_workstation_get]
