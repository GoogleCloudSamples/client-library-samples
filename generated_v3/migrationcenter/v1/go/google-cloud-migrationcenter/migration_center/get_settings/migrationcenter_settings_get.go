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

// [START migrationcenter_v1_migrationcenter_settings_get]

import (
	"context"
	"fmt"
	"io"

	migrationcenter "cloud.google.com/go/migrationcenter/apiv1"
	migrationcenterpb "cloud.google.com/go/migrationcenter/apiv1/migrationcenterpb"
)

// getSettings retrieves the Migration Center settings for a project and location.
func getSettings(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/settings", projectID, locationID)

	client, err := migrationcenter.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("migrationcenter.NewClient failed: %w", err)
	}
	defer client.Close()

	req := &migrationcenterpb.GetSettingsRequest{
		Name: name,
	}

	resp, err := client.GetSettings(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetSettings failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved settings: %s\n", resp.GetName())
	return nil
}

// [END migrationcenter_v1_migrationcenter_settings_get]
