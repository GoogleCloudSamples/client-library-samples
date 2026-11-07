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

// [START modelarmor_v1beta_modelarmor_floorsetting_get]

import (
	"context"
	"fmt"
	"io"
	"os"

	modelarmor "cloud.google.com/go/modelarmor/apiv1beta"
	modelarmorpb "cloud.google.com/go/modelarmor/apiv1beta/modelarmorpb"
)

// getFloorSetting retrieves the Model Armor floor setting for a project.
func getFloorSetting(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = "example-project-id"
	}
	location := os.Getenv("GOOGLE_CLOUD_LOCATION")
	if location == "" {
		location = "global"
	}

	name := fmt.Sprintf("projects/%s/locations/%s/floorSetting", projectID, location)

	client, err := modelarmor.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &modelarmorpb.GetFloorSettingRequest{
		Name: name,
	}

	resp, err := client.GetFloorSetting(ctx, req)
	if err != nil {
		return fmt.Errorf("GetFloorSetting failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved floor setting: %s\n", resp.GetName())
	return nil
}

// [END modelarmor_v1beta_modelarmor_floorsetting_get]
