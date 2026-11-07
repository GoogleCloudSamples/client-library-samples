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

// [START workstations_v1_workstations_workstationconfig_delete]

import (
	"context"
	"fmt"
	"io"
	"strings"

	workstations "cloud.google.com/go/workstations/apiv1"
	workstationspb "cloud.google.com/go/workstations/apiv1/workstationspb"
)

// deleteWorkstationConfig deletes a workstation configuration.
func deleteWorkstationConfig(ctx context.Context, w io.Writer, projectID string, locationID string, workstationClusterID string, workstationConfigID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/workstationClusters/%s/workstationConfigs/%s", projectID, locationID, workstationClusterID, workstationConfigID)

	client, err := workstations.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &workstationspb.DeleteWorkstationConfigRequest{
		Name: name,
	}

	op, err := client.DeleteWorkstationConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteWorkstationConfig: %w", err)
	}

	// Delete operations can complete without a response payload, which causes Wait to return an unsupported result type error despite successful deletion.
	_, err = op.Wait(ctx)
	if err != nil && (!op.Done() || !strings.Contains(err.Error(), "unsupported result type")) {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted workstation configuration: %s\n", name)

	return nil
}

// [END workstations_v1_workstations_workstationconfig_delete]
