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

// [START osconfig_v1_osconfigzonalservice_inventory_get]

import (
	"context"
	"fmt"
	"io"

	osconfig "cloud.google.com/go/osconfig/apiv1"
	osconfigpb "cloud.google.com/go/osconfig/apiv1/osconfigpb"
)

// getInventory gets the inventory data for a Compute Engine instance.
func getInventory(ctx context.Context, w io.Writer, projectID string, locationID string, instanceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/instances/%s/inventory", projectID, locationID, instanceID)

	client, err := osconfig.NewOsConfigZonalClient(ctx)
	if err != nil {
		return fmt.Errorf("NewOsConfigZonalClient: %w", err)
	}
	defer client.Close()

	req := &osconfigpb.GetInventoryRequest{
		Name: name,
		View: osconfigpb.InventoryView_FULL,
	}

	resp, err := client.GetInventory(ctx, req)
	if err != nil {
		return fmt.Errorf("GetInventory: %w", err)
	}

	fmt.Fprintf(w, "Retrieved inventory: %s\n", resp.GetName())
	if osInfo := resp.GetOsInfo(); osInfo != nil {
		fmt.Fprintf(w, "Operating system: %s\n", osInfo.GetLongName())
	}

	return nil
}

// [END osconfig_v1_osconfigzonalservice_inventory_get]
