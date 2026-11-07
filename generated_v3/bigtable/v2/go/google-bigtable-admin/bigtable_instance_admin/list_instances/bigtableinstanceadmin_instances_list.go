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

// [START bigtableadmin_v2_bigtableinstanceadmin_instances_list]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	bigtableadminpb "google.golang.org/genproto/googleapis/bigtable/admin/v2"
)

// listInstances lists Cloud Bigtable instances in a project.
func listInstances(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)

	client, err := bigtableadmin.NewBigtableInstanceAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableInstanceAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &bigtableadminpb.ListInstancesRequest{
		Parent: parent,
	}

	resp, err := client.ListInstances(ctx, req)
	if err != nil {
		return fmt.Errorf("ListInstances failed: %w", err)
	}

	for _, instance := range resp.GetInstances() {
		fmt.Fprintf(w, "Instance: %s\n", instance.GetName())
	}

	return nil
}

// [END bigtableadmin_v2_bigtableinstanceadmin_instances_list]
