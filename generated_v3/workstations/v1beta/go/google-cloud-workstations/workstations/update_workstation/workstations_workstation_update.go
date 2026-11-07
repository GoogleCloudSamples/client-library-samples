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

// [START workstations_v1beta_workstations_workstation_update]

import (
	"context"
	"fmt"
	"io"

	workstations "cloud.google.com/go/workstations/apiv1beta"
	workstationspb "cloud.google.com/go/workstations/apiv1beta/workstationspb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateWorkstation updates an existing workstation's display name.
func updateWorkstation(ctx context.Context, w io.Writer, projectID string, locationID string, workstationClusterID string, workstationConfigID string, workstationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/workstationClusters/%s/workstationConfigs/%s/workstations/%s",
		projectID, locationID, workstationClusterID, workstationConfigID, workstationID)

	workstation := &workstationspb.Workstation{
		Name:        name,
		DisplayName: "Updated Workstation",
	}

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	client, err := workstations.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &workstationspb.UpdateWorkstationRequest{
		Workstation: workstation,
		UpdateMask:  updateMask,
	}

	op, err := client.UpdateWorkstation(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateWorkstation failed: %w", err)
	}

	response, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated workstation: %s\n", response.GetName())
	return nil
}

// [END workstations_v1beta_workstations_workstation_update]
