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

// [START bigtableadmin_v2_bigtableinstanceadmin_instance_update]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	adminpb "cloud.google.com/go/bigtable/admin/apiv2/adminpb"
)

// updateInstance updates the display name of a Cloud Bigtable instance.
func updateInstance(ctx context.Context, w io.Writer, projectID string, instanceID string) error {
	displayName := "Updated Instance Display Name"

	client, err := bigtableadmin.NewBigtableInstanceAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("bigtableadmin.NewBigtableInstanceAdminClient: %w", err)
	}
	defer client.Close()

	instanceName := fmt.Sprintf("projects/%s/instances/%s", projectID, instanceID)
	req := &adminpb.Instance{
		Name:        instanceName,
		DisplayName: displayName,
	}

	resp, err := client.UpdateInstance(ctx, req)
	if err != nil {
		return fmt.Errorf("client.UpdateInstance: %w", err)
	}

	fmt.Fprintf(w, "Updated instance: %s (display name: %s)\n", resp.GetName(), resp.GetDisplayName())
	return nil
}

// [END bigtableadmin_v2_bigtableinstanceadmin_instance_update]
