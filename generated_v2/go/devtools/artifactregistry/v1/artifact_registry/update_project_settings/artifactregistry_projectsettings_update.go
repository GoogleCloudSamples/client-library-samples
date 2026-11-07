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

// [START artifactregistry_v1_artifactregistry_projectsettings_update]

import (
	"context"
	"fmt"
	"io"
	"strings"

	artifactregistry "cloud.google.com/go/artifactregistry/apiv1"
	"cloud.google.com/go/artifactregistry/apiv1/artifactregistrypb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateProjectSettings updates Artifact Registry project settings to disable legacy redirection.
func updateProjectSettings(ctx context.Context, w io.Writer, projectID string) error {
	projectSettings := &artifactregistrypb.ProjectSettings{
		Name:                   fmt.Sprintf("projects/%s/projectSettings", projectID),
		LegacyRedirectionState: artifactregistrypb.ProjectSettings_REDIRECTION_FROM_GCR_IO_DISABLED,
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"legacy_redirection_state"},
	}

	client, err := artifactregistry.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("artifactregistry.NewClient: %w", err)
	}
	defer client.Close()

	req := &artifactregistrypb.UpdateProjectSettingsRequest{
		ProjectSettings: projectSettings,
		UpdateMask:      updateMask,
	}

	resp, err := client.UpdateProjectSettings(ctx, req)
	if err != nil {
		// Artifact Registry automatically routes all gcr.io traffic, preventing updates to legacy redirection.
		if strings.Contains(err.Error(), "This field can no longer be updated") || strings.Contains(err.Error(), "all gcr.io urls use Artifact Registry") {
			fmt.Fprintln(w, "Legacy redirection state can no longer be updated: all gcr.io URLs route to Artifact Registry.")
			return nil
		}
		return fmt.Errorf("client.UpdateProjectSettings: %w", err)
	}

	fmt.Fprintf(w, "Updated project settings: %s\n", resp.GetName())
	return nil
}

// [END artifactregistry_v1_artifactregistry_projectsettings_update]
