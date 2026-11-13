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

// [START bigtableadmin_v2_bigtableinstanceadmin_cluster_create]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	"cloud.google.com/go/bigtable/admin/apiv2/adminpb"
)

// createCluster creates a new cluster in an existing Bigtable instance.
func createCluster(ctx context.Context, w io.Writer, projectID string, instanceID string, clusterID string, zoneID string) error {
	parent := fmt.Sprintf("projects/%s/instances/%s", projectID, instanceID)
	cluster := &adminpb.Cluster{
		Location:           fmt.Sprintf("projects/%s/locations/%s", projectID, zoneID),
		ServeNodes:         3,
		DefaultStorageType: adminpb.StorageType_SSD,
	}

	client, err := bigtableadmin.NewBigtableInstanceAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableInstanceAdminClient: %w", err)
	}
	defer client.Close()

	req := &adminpb.CreateClusterRequest{
		Parent:    parent,
		ClusterId: clusterID,
		Cluster:   cluster,
	}

	op, err := client.CreateCluster(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateCluster: %w", err)
	}

	// CreateCluster is a long-running operation; wait for it to complete.
	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created cluster: %s\n", resp.GetName())
	return nil
}

// [END bigtableadmin_v2_bigtableinstanceadmin_cluster_create]
