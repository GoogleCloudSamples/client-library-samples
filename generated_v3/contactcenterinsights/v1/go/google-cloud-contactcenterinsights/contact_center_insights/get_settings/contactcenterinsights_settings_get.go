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

// [START contactcenterinsights_v1_contactcenterinsights_settings_get]

import (
	"context"
	"fmt"
	"io"

	contactcenterinsights "cloud.google.com/go/contactcenterinsights/apiv1"
	contactcenterinsightspb "cloud.google.com/go/contactcenterinsights/apiv1/contactcenterinsightspb"
)

// Use the GetSettings method.
func getSettings(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/settings", projectID, locationID)

	client, err := contactcenterinsights.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &contactcenterinsightspb.GetSettingsRequest{
		Name: name,
	}

	settings, err := client.GetSettings(ctx, req)
	if err != nil {
		return fmt.Errorf("GetSettings: %w", err)
	}

	fmt.Fprintf(w, "Retrieved settings: %s\n", settings.GetName())

	return nil
}

// [END contactcenterinsights_v1_contactcenterinsights_settings_get]
