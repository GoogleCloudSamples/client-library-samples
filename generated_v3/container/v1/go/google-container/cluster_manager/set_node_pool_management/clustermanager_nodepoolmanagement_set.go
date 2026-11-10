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

// [START container_v1_clustermanager_set_node_pool_management]

import (
	"context"
	"fmt"
	"io"

	container "cloud.google.com/go/container/apiv1"
	containerpb "cloud.google.com/go/container/apiv1/containerpb"
)

// setNodePoolManagement configures node management options for an existing GKE node pool.
func setNodePoolManagement(ctx context.Context, w io.Writer, projectID string, locationID string, clusterID string, nodePoolID string) error {
	management := &containerpb.NodeManagement{
		AutoRepair:  true,
		AutoUpgrade: true,
	}

	client, err := container.NewClusterManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClusterManagerClient failed: %w", err)
	}
	defer client.Close()

	req := &containerpb.SetNodePoolManagementRequest{
		Name:       fmt.Sprintf("projects/%s/locations/%s/clusters/%s/nodePools/%s", projectID, locationID, clusterID, nodePoolID),
		Management: management,
	}

	op, err := client.SetNodePoolManagement(ctx, req)
	if err != nil {
		return fmt.Errorf("SetNodePoolManagement failed: %w", err)
	}

	fmt.Fprintf(w, "Node pool management update initiated. Operation name: %s\n", op.GetName())
	return nil
}

// [END container_v1_clustermanager_set_node_pool_management]
