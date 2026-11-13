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

// [START bigtableadmin_v2_bigtableinstanceadmin_partial_update_cluster]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	adminpb "cloud.google.com/go/bigtable/admin/apiv2/adminpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// partialUpdateCluster updates the number of nodes in an existing Cloud Bigtable cluster.
func partialUpdateCluster(ctx context.Context, w io.Writer, projectID string, instanceID string, clusterID string) error {
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"serve_nodes"},
	}
	cluster := &adminpb.Cluster{
		Name:       fmt.Sprintf("projects/%s/instances/%s/clusters/%s", projectID, instanceID, clusterID),
		ServeNodes: 3,
	}

	client, err := bigtableadmin.NewBigtableInstanceAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableInstanceAdminClient: %w", err)
	}
	defer client.Close()

	req := &adminpb.PartialUpdateClusterRequest{
		Cluster:    cluster,
		UpdateMask: updateMask,
	}

	op, err := client.PartialUpdateCluster(ctx, req)
	if err != nil {
		return fmt.Errorf("PartialUpdateCluster: %w", err)
	}

	// Wait for the long-running operation to complete.
	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("PartialUpdateCluster operation wait: %w", err)
	}

	fmt.Fprintf(w, "Updated cluster: %s (serve nodes: %d)\n", resp.GetName(), resp.GetServeNodes())
	return nil
}

// [END bigtableadmin_v2_bigtableinstanceadmin_partial_update_cluster]
