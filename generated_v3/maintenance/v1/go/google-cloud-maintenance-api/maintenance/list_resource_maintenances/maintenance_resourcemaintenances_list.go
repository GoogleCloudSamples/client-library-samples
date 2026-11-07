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

// [START maintenance_v1_maintenance_resourcemaintenances_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	maintenance "cloud.google.com/go/maintenance/api/apiv1"
	"cloud.google.com/go/maintenance/api/apiv1/apipb"
	"google.golang.org/api/iterator"
)

// listResourceMaintenances lists maintenance activities for resources in a given project and location.
func listResourceMaintenances(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := maintenance.NewMaintenanceClient(ctx)
	if err != nil {
		return fmt.Errorf("failed to create maintenance client: %w", err)
	}
	defer client.Close()

	req := &apipb.ListResourceMaintenancesRequest{
		Parent: parent,
	}

	it := client.ListResourceMaintenances(ctx, req)
	for {
		resp, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate resource maintenances: %w", err)
		}
		fmt.Fprintf(w, "Resource Maintenance: %s\n", resp.GetName())
	}

	return nil
}

// [END maintenance_v1_maintenance_resourcemaintenances_list]
