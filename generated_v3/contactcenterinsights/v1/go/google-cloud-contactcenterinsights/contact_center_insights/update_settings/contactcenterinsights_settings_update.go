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

// [START contactcenterinsights_v1_contactcenterinsights_settings_update]

import (
	"context"
	"fmt"
	"io"

	contactcenterinsights "cloud.google.com/go/contactcenterinsights/apiv1"
	contactcenterinsightspb "cloud.google.com/go/contactcenterinsights/apiv1/contactcenterinsightspb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateSettings updates the settings for a project and location.
func updateSettings(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	settings := &contactcenterinsightspb.Settings{
		Name:         fmt.Sprintf("projects/%s/locations/%s/settings", projectID, locationID),
		LanguageCode: "en-US",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"language_code"},
	}

	client, err := contactcenterinsights.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &contactcenterinsightspb.UpdateSettingsRequest{
		Settings:   settings,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateSettings(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateSettings: %w", err)
	}

	fmt.Fprintf(w, "Updated settings: %s\n", resp.GetName())
	return nil
}

// [END contactcenterinsights_v1_contactcenterinsights_settings_update]
