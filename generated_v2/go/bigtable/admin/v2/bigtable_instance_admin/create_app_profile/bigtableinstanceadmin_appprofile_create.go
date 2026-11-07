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

// [START bigtableadmin_v2_bigtableinstanceadmin_appprofile_create]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	adminpb "cloud.google.com/go/bigtable/admin/apiv2/adminpb"
)

// Use the CreateAppProfile method.
func createAppProfile(ctx context.Context, w io.Writer, projectID string, instanceID string, appProfileID string) error {
	parent := fmt.Sprintf("projects/%s/instances/%s", projectID, instanceID)
	appProfile := &adminpb.AppProfile{
		Description: "Routes traffic across all available clusters",
		RoutingPolicy: &adminpb.AppProfile_MultiClusterRoutingUseAny_{
			MultiClusterRoutingUseAny: &adminpb.AppProfile_MultiClusterRoutingUseAny{},
		},
	}

	client, err := bigtableadmin.NewBigtableInstanceAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableInstanceAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.CreateAppProfileRequest{
		Parent:       parent,
		AppProfileId: appProfileID,
		AppProfile:   appProfile,
	}

	resp, err := client.CreateAppProfile(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateAppProfile failed: %w", err)
	}

	fmt.Fprintf(w, "Created app profile: %s\n", resp.GetName())
	return nil
}

// [END bigtableadmin_v2_bigtableinstanceadmin_appprofile_create]
