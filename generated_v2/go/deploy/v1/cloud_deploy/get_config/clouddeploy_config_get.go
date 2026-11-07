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

// [START clouddeploy_v1_clouddeploy_config_get]

import (
	"context"
	"fmt"
	"io"

	clouddeploy "cloud.google.com/go/deploy/apiv1"
	deploypb "cloud.google.com/go/deploy/apiv1/deploypb"
)

// getConfig retrieves the Cloud Deploy configuration for the specified project and location.
func getConfig(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/config", projectID, locationID)

	client, err := clouddeploy.NewCloudDeployClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudDeployClient failed: %w", err)
	}
	defer client.Close()

	req := &deploypb.GetConfigRequest{
		Name: name,
	}

	resp, err := client.GetConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("GetConfig failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved Cloud Deploy configuration: %s\n", resp.GetName())
	fmt.Fprintf(w, "Default Skaffold version: %s\n", resp.GetDefaultSkaffoldVersion())

	return nil
}

// [END clouddeploy_v1_clouddeploy_config_get]
