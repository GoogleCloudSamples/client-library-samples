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

// [START netapp_v1_netapp_storagepool_create]

import (
	"context"
	"fmt"
	"io"
	"os"

	netapp "cloud.google.com/go/netapp/apiv1"
	netapppb "cloud.google.com/go/netapp/apiv1/netapppb"
)

// createStoragePool creates a new Google Cloud NetApp Volumes storage pool.
func createStoragePool(ctx context.Context, w io.Writer, storagePoolID string) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = "example-project-id"
	}
	location := os.Getenv("GOOGLE_CLOUD_LOCATION")
	if location == "" {
		location = "us-central1"
	}
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, location)

	storagePool := &netapppb.StoragePool{
		ServiceLevel: netapppb.ServiceLevel_PREMIUM,
		CapacityGib:  2048,
		Network:      fmt.Sprintf("projects/%s/global/networks/default", projectID),
	}

	client, err := netapp.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &netapppb.CreateStoragePoolRequest{
		Parent:        parent,
		StoragePoolId: storagePoolID,
		StoragePool:   storagePool,
	}

	// CreateStoragePool initiates a long-running operation.
	op, err := client.CreateStoragePool(ctx, req)
	if err != nil {
		return fmt.Errorf("unable to create storage pool: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("unable to wait for storage pool creation: %w", err)
	}

	fmt.Fprintf(w, "Created storage pool: %s\n", resp.GetName())
	return nil
}

// [END netapp_v1_netapp_storagepool_create]
