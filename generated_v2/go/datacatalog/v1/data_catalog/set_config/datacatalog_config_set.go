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

// [START datacatalog_v1_datacatalog_set_config]

import (
	"context"
	"fmt"
	"io"
	"os"

	datacatalog "cloud.google.com/go/datacatalog/apiv1"
	"cloud.google.com/go/datacatalog/apiv1/datacatalogpb"
)

// setConfig updates the Dataplex migration configuration for an organization and location.
func setConfig(ctx context.Context, w io.Writer, organizationID string, locationID string) error {
	name := fmt.Sprintf("organizations/%s/locations/%s", organizationID, locationID)
	catalogUIExperience := datacatalogpb.CatalogUIExperience_CATALOG_UI_EXPERIENCE_ENABLED

	// If the organization ID is not provided, fall back to project configuration.
	if organizationID == "" {
		if orgID := os.Getenv("ORGANIZATION_ID"); orgID != "" {
			name = fmt.Sprintf("organizations/%s/locations/%s", orgID, locationID)
		} else if projectID := os.Getenv("GOOGLE_CLOUD_PROJECT"); projectID != "" {
			name = fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
		} else if projectID := os.Getenv("PROJECT_ID"); projectID != "" {
			name = fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
		}
	}

	client, err := datacatalog.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("datacatalog.NewClient: %w", err)
	}
	defer client.Close()

	req := &datacatalogpb.SetConfigRequest{
		Name: name,
		Configuration: &datacatalogpb.SetConfigRequest_CatalogUiExperience{
			CatalogUiExperience: catalogUIExperience,
		},
	}

	resp, err := client.SetConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("client.SetConfig: %w", err)
	}

	fmt.Fprintf(w, "Successfully updated configuration for %s: UI experience set to %v\n", name, resp.GetCatalogUiExperience())
	return nil
}

// [END datacatalog_v1_datacatalog_set_config]
