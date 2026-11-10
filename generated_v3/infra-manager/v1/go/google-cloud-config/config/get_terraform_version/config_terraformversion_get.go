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

// [START infra-manager_v1_config_terraformversion_get]

import (
	"context"
	"fmt"
	"io"

	config "cloud.google.com/go/config/apiv1"
	configpb "cloud.google.com/go/config/apiv1/configpb"
)

// getTerraformVersion retrieves details of a specific Terraform version.
func getTerraformVersion(ctx context.Context, w io.Writer, projectID string, locationID string, terraformVersionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/terraformVersions/%s", projectID, locationID, terraformVersionID)

	client, err := config.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("config.NewClient: %w", err)
	}
	defer client.Close()

	req := &configpb.GetTerraformVersionRequest{
		Name: name,
	}

	resp, err := client.GetTerraformVersion(ctx, req)
	if err != nil {
		return fmt.Errorf("GetTerraformVersion: %w", err)
	}

	fmt.Fprintf(w, "Retrieved Terraform version: %s\nState: %s\n", resp.GetName(), resp.GetState())
	return nil
}

// [END infra-manager_v1_config_terraformversion_get]
