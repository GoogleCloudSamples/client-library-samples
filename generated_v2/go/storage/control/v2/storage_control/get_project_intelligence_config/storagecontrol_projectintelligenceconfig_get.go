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

// [START storage_v2_storagecontrol_projectintelligenceconfig_get]

import (
	"context"
	"fmt"
	"io"

	storage "cloud.google.com/go/storage/control/apiv2"
	controlpb "cloud.google.com/go/storage/control/apiv2/controlpb"
)

// getProjectIntelligenceConfig gets the Storage Intelligence configuration for a project.
func getProjectIntelligenceConfig(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/intelligenceConfig", projectID, locationID)

	client, err := storage.NewStorageControlClient(ctx)
	if err != nil {
		return fmt.Errorf("NewStorageControlClient: %w", err)
	}
	defer client.Close()

	req := &controlpb.GetProjectIntelligenceConfigRequest{
		Name: name,
	}

	resp, err := client.GetProjectIntelligenceConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("GetProjectIntelligenceConfig: %w", err)
	}

	fmt.Fprintf(w, "Retrieved project intelligence config: %s\n", resp.GetName())
	return nil
}

// [END storage_v2_storagecontrol_projectintelligenceconfig_get]
