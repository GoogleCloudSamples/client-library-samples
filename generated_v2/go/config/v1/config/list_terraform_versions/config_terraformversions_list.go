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

// [START infra-manager_v1_config_terraformversions_list]

import (
	"context"
	"fmt"
	"io"

	config "cloud.google.com/go/config/apiv1"
	"cloud.google.com/go/config/apiv1/configpb"
	"google.golang.org/api/iterator"
)

// listTerraformVersions lists available Terraform versions for a given location.
func listTerraformVersions(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := config.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &configpb.ListTerraformVersionsRequest{
		Parent: parent,
	}

	it := client.ListTerraformVersions(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate terraform versions: %w", err)
		}
		fmt.Fprintf(w, "TerraformVersion: %s\n", resp.GetName())
	}

	return nil
}

// [END infra-manager_v1_config_terraformversions_list]
