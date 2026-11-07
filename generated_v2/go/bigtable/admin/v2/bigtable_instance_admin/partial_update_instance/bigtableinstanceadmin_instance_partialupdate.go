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

// [START bigtableadmin_v2_bigtableinstanceadmin_partial_update_instance]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	bigtableadminpb "cloud.google.com/go/bigtable/admin/apiv2/adminpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// Use the PartialUpdateInstance method.
func partialUpdateInstance(ctx context.Context, w io.Writer, projectID string, instanceID string) error {
	instance := &bigtableadminpb.Instance{
		Name:        fmt.Sprintf("projects/%s/instances/%s", projectID, instanceID),
		DisplayName: "Updated Instance Name",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	client, err := bigtableadmin.NewBigtableInstanceAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableInstanceAdminClient: %w", err)
	}
	defer client.Close()

	req := &bigtableadminpb.PartialUpdateInstanceRequest{
		Instance:   instance,
		UpdateMask: updateMask,
	}

	op, err := client.PartialUpdateInstance(ctx, req)
	if err != nil {
		return fmt.Errorf("PartialUpdateInstance: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Updated instance: %s\n", resp.GetName())
	return nil
}

// [END bigtableadmin_v2_bigtableinstanceadmin_partial_update_instance]
