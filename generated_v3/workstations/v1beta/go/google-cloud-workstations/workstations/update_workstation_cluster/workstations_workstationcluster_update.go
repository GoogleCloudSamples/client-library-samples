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

// [START workstations_v1beta_workstations_workstationcluster_update]

import (
	"context"
	"fmt"
	"io"

	workstations "cloud.google.com/go/workstations/apiv1beta"
	"cloud.google.com/go/workstations/apiv1beta/workstationspb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateWorkstationCluster updates an existing Cloud Workstations cluster.
func updateWorkstationCluster(ctx context.Context, w io.Writer, projectID string, locationID string, workstationClusterID string) error {
	client, err := workstations.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	clusterName := fmt.Sprintf("projects/%s/locations/%s/workstationClusters/%s", projectID, locationID, workstationClusterID)

	workstationCluster := &workstationspb.WorkstationCluster{
		Name:        clusterName,
		DisplayName: "Updated Cluster Display Name",
	}

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	req := &workstationspb.UpdateWorkstationClusterRequest{
		WorkstationCluster: workstationCluster,
		UpdateMask:         updateMask,
	}

	op, err := client.UpdateWorkstationCluster(ctx, req)
	if err != nil {
		return fmt.Errorf("failed to update workstation cluster: %w", err)
	}

	response, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("failed to wait for workstation cluster update: %w", err)
	}

	fmt.Fprintf(w, "Updated workstation cluster: %s\n", response.GetName())

	return nil
}

// [END workstations_v1beta_workstations_workstationcluster_update]
