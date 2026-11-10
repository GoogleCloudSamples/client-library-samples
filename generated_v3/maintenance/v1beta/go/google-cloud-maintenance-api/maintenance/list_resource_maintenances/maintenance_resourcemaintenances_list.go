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

// [START maintenance_v1beta_maintenance_resourcemaintenances_list]

import (
	"context"
	"fmt"
	"io"

	maintenance "cloud.google.com/go/maintenance/api/apiv1beta"
	maintenancepb "cloud.google.com/go/maintenance/api/apiv1beta/apipb"
	"google.golang.org/api/iterator"
)

// listResourceMaintenances lists resource maintenances for a project and location.
func listResourceMaintenances(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := maintenance.NewMaintenanceClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMaintenanceClient failed: %w", err)
	}
	defer client.Close()

	req := &maintenancepb.ListResourceMaintenancesRequest{
		Parent: parent,
	}

	it := client.ListResourceMaintenances(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListResourceMaintenances iterator error: %w", err)
		}
		fmt.Fprintf(w, "Resource Maintenance: %s\n", resp.GetName())
	}

	return nil
}

// [END maintenance_v1beta_maintenance_resourcemaintenances_list]
