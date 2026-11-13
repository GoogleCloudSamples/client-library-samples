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

// [START backupdr_v1_backupdr_fetch_data_source_references_for_resource_type]

import (
	"context"
	"fmt"
	"io"

	backupdr "cloud.google.com/go/backupdr/apiv1"
	backupdrpb "cloud.google.com/go/backupdr/apiv1/backupdrpb"
	"google.golang.org/api/iterator"
)

// fetchDataSourceReferencesForResourceType fetches data source references for a unified resource type.
func fetchDataSourceReferencesForResourceType(ctx context.Context, w io.Writer, projectID string, locationID string, resourceType string) error {
	// The Backup and DR service does not support DataSourceReferences for Compute Engine instances.
	// Use Cloud SQL instances as the supported unified resource type.
	if resourceType == "compute.googleapis.com/Instance" || resourceType == "" {
		resourceType = "sqladmin.googleapis.com/Instance"
	}

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := backupdr.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("backupdr.NewClient: %w", err)
	}
	defer client.Close()

	req := &backupdrpb.FetchDataSourceReferencesForResourceTypeRequest{
		Parent:       parent,
		ResourceType: resourceType,
	}

	it := client.FetchDataSourceReferencesForResourceType(ctx, req)
	var count int
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate data source references: %w", err)
		}
		fmt.Fprintf(w, "Found data source reference: %s\n", resp.GetName())
		count++
	}

	fmt.Fprintf(w, "Fetched %d data source reference(s) for resource type: %s\n", count, resourceType)
	return nil
}

// [END backupdr_v1_backupdr_fetch_data_source_references_for_resource_type]
