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

// [START datalineage_v1_configmanagementservice_config_get]

import (
	"context"
	"fmt"
	"io"

	datalineage "cloud.google.com/go/datacatalog/lineage/configmanagement/apiv1"
	"cloud.google.com/go/datacatalog/lineage/configmanagement/apiv1/configmanagementpb"
)

// getConfig retrieves the Data Lineage configuration for a project and location.
func getConfig(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/config", projectID, locationID)

	client, err := datalineage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &configmanagementpb.GetConfigRequest{
		Name: name,
	}

	resp, err := client.GetConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("GetConfig: %w", err)
	}

	fmt.Fprintf(w, "Retrieved configuration: %s\n", resp.GetName())

	return nil
}

// [END datalineage_v1_configmanagementservice_config_get]
