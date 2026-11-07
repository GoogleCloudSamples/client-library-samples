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

// [START bigtableadmin_v2_bigtableinstanceadmin_appprofile_update]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	"cloud.google.com/go/bigtable/admin/apiv2/adminpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateAppProfile updates an existing Bigtable app profile.
func updateAppProfile(ctx context.Context, w io.Writer, projectID string, instanceID string, appProfileID string) error {
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}
	appProfile := &adminpb.AppProfile{
		Name:        fmt.Sprintf("projects/%s/instances/%s/appProfiles/%s", projectID, instanceID, appProfileID),
		Description: "Updated app profile description",
	}

	client, err := bigtableadmin.NewBigtableInstanceAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableInstanceAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.UpdateAppProfileRequest{
		AppProfile: appProfile,
		UpdateMask: updateMask,
	}

	op, err := client.UpdateAppProfile(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateAppProfile failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated app profile: %s\n", resp.GetName())
	return nil
}

// [END bigtableadmin_v2_bigtableinstanceadmin_appprofile_update]
