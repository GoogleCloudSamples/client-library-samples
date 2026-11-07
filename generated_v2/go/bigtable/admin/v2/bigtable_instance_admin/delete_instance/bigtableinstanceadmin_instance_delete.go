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

// [START bigtableadmin_v2_bigtableinstanceadmin_instance_delete]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	"cloud.google.com/go/bigtable/admin/apiv2/adminpb"
)

// deleteInstance deletes an existing Cloud Bigtable instance.
func deleteInstance(ctx context.Context, w io.Writer, projectID string, instanceID string) error {
	name := fmt.Sprintf("projects/%s/instances/%s", projectID, instanceID)

	client, err := bigtableadmin.NewBigtableInstanceAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableInstanceAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.DeleteInstanceRequest{
		Name: name,
	}

	if err := client.DeleteInstance(ctx, req); err != nil {
		return fmt.Errorf("DeleteInstance failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted instance: %s\n", instanceID)
	return nil
}

// [END bigtableadmin_v2_bigtableinstanceadmin_instance_delete]
