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

// [START workstations_v1beta_workstations_workstations_list]

import (
	"context"
	"fmt"
	"io"

	workstations "cloud.google.com/go/workstations/apiv1beta"
	workstationspb "cloud.google.com/go/workstations/apiv1beta/workstationspb"
	"google.golang.org/api/iterator"
)

// listWorkstations retrieves workstations within a specified workstation configuration.
func listWorkstations(ctx context.Context, w io.Writer, projectID string, locationID string, workstationClusterID string, workstationConfigID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/workstationClusters/%s/workstationConfigs/%s", projectID, locationID, workstationClusterID, workstationConfigID)

	client, err := workstations.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &workstationspb.ListWorkstationsRequest{
		Parent: parent,
	}

	it := client.ListWorkstations(ctx, req)
	for {
		workstation, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListWorkstations iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Workstation: %s (state: %s)\n", workstation.GetName(), workstation.GetState())
	}

	return nil
}

// [END workstations_v1beta_workstations_workstations_list]
