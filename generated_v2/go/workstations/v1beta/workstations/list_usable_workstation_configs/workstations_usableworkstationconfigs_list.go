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

// [START workstations_v1beta_workstations_usableworkstationconfigs_list]

import (
	"context"
	"fmt"
	"io"

	workstations "cloud.google.com/go/workstations/apiv1beta"
	workstationspb "cloud.google.com/go/workstations/apiv1beta/workstationspb"
	"google.golang.org/api/iterator"
)

// listUsableWorkstationConfigs lists workstation configurations that the caller has permission to use.
func listUsableWorkstationConfigs(ctx context.Context, w io.Writer, projectID string, locationID string, workstationClusterID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/workstationClusters/%s", projectID, locationID, workstationClusterID)

	client, err := workstations.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &workstationspb.ListUsableWorkstationConfigsRequest{
		Parent: parent,
	}

	it := client.ListUsableWorkstationConfigs(ctx, req)
	for {
		config, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next failed: %w", err)
		}
		fmt.Fprintf(w, "Workstation config: %s\n", config.GetName())
	}

	return nil
}

// [END workstations_v1beta_workstations_usableworkstationconfigs_list]
