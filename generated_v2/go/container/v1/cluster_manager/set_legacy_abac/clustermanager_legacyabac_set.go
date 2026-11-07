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

// [START container_v1_clustermanager_set_legacy_abac]

import (
	"context"
	"fmt"
	"io"

	container "cloud.google.com/go/container/apiv1"
	containerpb "cloud.google.com/go/container/apiv1/containerpb"
)

// setLegacyAbac configures legacy ABAC for a GKE cluster.
func setLegacyAbac(ctx context.Context, w io.Writer, projectID string, locationID string, clusterID string) error {
	enabled := false
	name := fmt.Sprintf("projects/%s/locations/%s/clusters/%s", projectID, locationID, clusterID)

	client, err := container.NewClusterManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClusterManagerClient failed: %w", err)
	}
	defer client.Close()

	req := &containerpb.SetLegacyAbacRequest{
		Name:    name,
		Enabled: enabled,
	}

	resp, err := client.SetLegacyAbac(ctx, req)
	if err != nil {
		return fmt.Errorf("SetLegacyAbac failed: %w", err)
	}

	fmt.Fprintf(w, "SetLegacyAbac operation initiated: %s\n", resp.GetName())
	return nil
}

// [END container_v1_clustermanager_set_legacy_abac]
