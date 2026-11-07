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

// [START storage_v2_storagecontrol_projectintelligenceconfig_update]

import (
	"context"
	"fmt"
	"io"

	storage "cloud.google.com/go/storage/control/apiv2"
	"cloud.google.com/go/storage/control/apiv2/controlpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateProjectIntelligenceConfig updates the intelligence configuration for a project.
func updateProjectIntelligenceConfig(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	client, err := storage.NewStorageControlClient(ctx)
	if err != nil {
		return fmt.Errorf("NewStorageControlClient failed: %w", err)
	}
	defer client.Close()

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"edition_config"},
	}
	intelligenceConfig := &controlpb.IntelligenceConfig{
		Name:          fmt.Sprintf("projects/%s/locations/%s/intelligenceConfig", projectID, locationID),
		EditionConfig: controlpb.IntelligenceConfig_DISABLED,
	}

	req := &controlpb.UpdateProjectIntelligenceConfigRequest{
		IntelligenceConfig: intelligenceConfig,
		UpdateMask:         updateMask,
	}

	resp, err := client.UpdateProjectIntelligenceConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateProjectIntelligenceConfig failed: %w", err)
	}

	fmt.Fprintf(w, "Updated intelligence config: %s\n", resp.GetName())
	return nil
}

// [END storage_v2_storagecontrol_projectintelligenceconfig_update]
