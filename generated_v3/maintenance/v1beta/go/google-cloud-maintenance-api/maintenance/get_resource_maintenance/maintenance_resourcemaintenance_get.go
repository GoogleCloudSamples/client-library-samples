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

// [START maintenance_v1beta_maintenance_resourcemaintenance_get]

import (
	"context"
	"fmt"
	"io"

	maintenance "cloud.google.com/go/maintenance/api/apiv1beta"
	apipb "cloud.google.com/go/maintenance/api/apiv1beta/apipb"
)

// getResourceMaintenance retrieves a resource maintenance event by its resource name.
func getResourceMaintenance(ctx context.Context, w io.Writer, projectID string, locationID string, resourceMaintenanceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/resourceMaintenances/%s", projectID, locationID, resourceMaintenanceID)

	client, err := maintenance.NewMaintenanceClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMaintenanceClient failed: %w", err)
	}
	defer client.Close()

	req := &apipb.GetResourceMaintenanceRequest{
		Name: name,
	}

	resp, err := client.GetResourceMaintenance(ctx, req)
	if err != nil {
		return fmt.Errorf("GetResourceMaintenance: %w", err)
	}

	fmt.Fprintf(w, "Retrieved resource maintenance: %s\n", resp.GetName())
	return nil
}

// [END maintenance_v1beta_maintenance_resourcemaintenance_get]
