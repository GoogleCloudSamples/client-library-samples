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

// [START netapp_v1_netapp_storagepool_get]

import (
	"context"
	"fmt"
	"io"

	netapp "cloud.google.com/go/netapp/apiv1"
	netapppb "cloud.google.com/go/netapp/apiv1/netapppb"
)

// getStoragePool retrieves information about an existing NetApp storage pool.
func getStoragePool(ctx context.Context, w io.Writer, projectID string, locationID string, storagePoolID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/storagePools/%s", projectID, locationID, storagePoolID)

	client, err := netapp.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &netapppb.GetStoragePoolRequest{
		Name: name,
	}

	storagePool, err := client.GetStoragePool(ctx, req)
	if err != nil {
		return fmt.Errorf("failed to get storage pool: %w", err)
	}

	fmt.Fprintf(w, "Storage pool: %s\n", storagePool.GetName())
	fmt.Fprintf(w, "Capacity (GiB): %d\n", storagePool.GetCapacityGib())
	fmt.Fprintf(w, "Service level: %s\n", storagePool.GetServiceLevel())
	fmt.Fprintf(w, "State: %s\n", storagePool.GetState())

	return nil
}

// [END netapp_v1_netapp_storagepool_get]
