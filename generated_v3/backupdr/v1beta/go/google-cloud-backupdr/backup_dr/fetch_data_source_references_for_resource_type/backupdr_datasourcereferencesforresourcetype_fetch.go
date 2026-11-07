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

// [START backupdr_v1beta_backupdr_fetch_data_source_references_for_resource_type]

import (
	"context"
	"errors"
	"fmt"
	"io"

	backupdr "cloud.google.com/go/backupdr/apiv1beta"
	backupdrpb "cloud.google.com/go/backupdr/apiv1beta/backupdrpb"
	"google.golang.org/api/iterator"
)

// fetchDataSourceReferencesForResourceType lists data source references for a specified resource type.
func fetchDataSourceReferencesForResourceType(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	resourceType := "sqladmin.googleapis.com/Instance"

	client, err := backupdr.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("backupdr.NewClient failed: %w", err)
	}
	defer client.Close()

	req := &backupdrpb.FetchDataSourceReferencesForResourceTypeRequest{
		Parent:       parent,
		ResourceType: resourceType,
	}

	it := client.FetchDataSourceReferencesForResourceType(ctx, req)
	count := 0
	for {
		resp, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("FetchDataSourceReferencesForResourceType failed: %w", err)
		}
		fmt.Fprintf(w, "Fetched data source reference: %s\n", resp.GetName())
		count++
	}

	fmt.Fprintf(w, "Completed fetching data source references. Total found: %d\n", count)
	return nil
}

// [END backupdr_v1beta_backupdr_fetch_data_source_references_for_resource_type]
