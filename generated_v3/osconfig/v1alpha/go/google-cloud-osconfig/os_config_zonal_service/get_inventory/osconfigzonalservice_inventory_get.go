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

// [START osconfig_v1alpha_osconfigzonalservice_inventory_get]

import (
	"context"
	"fmt"
	"io"

	osconfig "cloud.google.com/go/osconfig/apiv1alpha"
	osconfigpb "cloud.google.com/go/osconfig/apiv1alpha/osconfigpb"
	"google.golang.org/api/option"
)

// getInventory retrieves the inventory data for a specific Compute Engine instance.
func getInventory(ctx context.Context, w io.Writer, projectID string, locationID string, instanceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/instances/%s/inventory", projectID, locationID, instanceID)

	// OS Config Zonal API requires routing requests to the zonal endpoint.
	endpoint := fmt.Sprintf("%s-osconfig.googleapis.com:443", locationID)
	client, err := osconfig.NewOsConfigZonalClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewOsConfigZonalClient failed: %w", err)
	}
	defer client.Close()

	req := &osconfigpb.GetInventoryRequest{
		Name: name,
		View: osconfigpb.InventoryView_FULL,
	}

	resp, err := client.GetInventory(ctx, req)
	if err != nil {
		return fmt.Errorf("GetInventory failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved inventory: %s\n", resp.GetName())
	if osInfo := resp.GetOsInfo(); osInfo != nil {
		fmt.Fprintf(w, "Hostname: %s\n", osInfo.GetHostname())
		fmt.Fprintf(w, "OS: %s\n", osInfo.GetLongName())
	}

	return nil
}

// [END osconfig_v1alpha_osconfigzonalservice_inventory_get]
