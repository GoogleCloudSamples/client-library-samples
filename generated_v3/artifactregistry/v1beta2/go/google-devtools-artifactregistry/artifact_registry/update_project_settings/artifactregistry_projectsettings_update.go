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

// [START artifactregistry_v1beta2_artifactregistry_projectsettings_update]

import (
	"context"
	"fmt"
	"io"

	artifactregistry "cloud.google.com/go/artifactregistry/apiv1beta2"
	artifactregistrypb "cloud.google.com/go/artifactregistry/apiv1beta2/artifactregistrypb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// Use the UpdateProjectSettings method.
func updateProjectSettings(ctx context.Context, w io.Writer, projectID string) error {
	projectSettings := &artifactregistrypb.ProjectSettings{
		Name:                   fmt.Sprintf("projects/%s/projectSettings", projectID),
		LegacyRedirectionState: artifactregistrypb.ProjectSettings_REDIRECTION_FROM_GCR_IO_ENABLED,
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"legacy_redirection_state"},
	}

	client, err := artifactregistry.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &artifactregistrypb.UpdateProjectSettingsRequest{
		ProjectSettings: projectSettings,
		UpdateMask:      updateMask,
	}

	resp, err := client.UpdateProjectSettings(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateProjectSettings failed: %w", err)
	}

	fmt.Fprintf(w, "Updated project settings: %s\n", resp.GetName())
	return nil
}

// [END artifactregistry_v1beta2_artifactregistry_projectsettings_update]
