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

// [START bigtableadmin_v2_bigtableinstanceadmin_cluster_get]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	adminpb "cloud.google.com/go/bigtable/admin/apiv2/adminpb"
)

// getCluster retrieves information about a Bigtable cluster.
func getCluster(ctx context.Context, w io.Writer, projectID string, instanceID string, clusterID string) error {
	name := fmt.Sprintf("projects/%s/instances/%s/clusters/%s", projectID, instanceID, clusterID)

	client, err := bigtableadmin.NewBigtableInstanceAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableInstanceAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.GetClusterRequest{
		Name: name,
	}

	resp, err := client.GetCluster(ctx, req)
	if err != nil {
		return fmt.Errorf("GetCluster failed: %w", err)
	}

	fmt.Fprintf(w, "Cluster: %s\nLocation: %s\nState: %s\nNodes: %d\n", resp.GetName(), resp.GetLocation(), resp.GetState(), resp.GetServeNodes())

	return nil
}

// [END bigtableadmin_v2_bigtableinstanceadmin_cluster_get]
