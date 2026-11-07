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

// [START bigtableadmin_v2_bigtableinstanceadmin_instance_create]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	"cloud.google.com/go/bigtable/admin/apiv2/adminpb"
)

// createInstance creates a Cloud Bigtable instance.
func createInstance(ctx context.Context, w io.Writer, projectID string, instanceID string) error {
	client, err := bigtableadmin.NewBigtableInstanceAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableInstanceAdminClient failed: %w", err)
	}
	defer client.Close()

	parent := fmt.Sprintf("projects/%s", projectID)

	instance := &adminpb.Instance{
		DisplayName: "Example Bigtable Instance",
		Type:        adminpb.Instance_PRODUCTION,
	}

	clusters := map[string]*adminpb.Cluster{
		"example-cluster": {
			Location:           fmt.Sprintf("projects/%s/locations/us-central1-b", projectID),
			ServeNodes:         1,
			DefaultStorageType: adminpb.StorageType_SSD,
		},
	}

	req := &adminpb.CreateInstanceRequest{
		Parent:     parent,
		InstanceId: instanceID,
		Instance:   instance,
		Clusters:   clusters,
	}

	op, err := client.CreateInstance(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateInstance failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait for instance creation failed: %w", err)
	}

	fmt.Fprintf(w, "Created instance: %s\n", resp.GetName())
	return nil
}

// [END bigtableadmin_v2_bigtableinstanceadmin_instance_create]
