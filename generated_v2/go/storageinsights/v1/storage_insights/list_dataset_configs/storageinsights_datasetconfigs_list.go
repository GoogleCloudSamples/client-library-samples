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

// [START storageinsights_v1_storageinsights_datasetconfigs_list]

import (
	"context"
	"fmt"
	"io"

	storageinsights "cloud.google.com/go/storageinsights/apiv1"
	"cloud.google.com/go/storageinsights/apiv1/storageinsightspb"
	"google.golang.org/api/iterator"
)

// listDatasetConfigs lists dataset configurations for a project and location.
func listDatasetConfigs(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := storageinsights.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &storageinsightspb.ListDatasetConfigsRequest{
		Parent: parent,
	}

	it := client.ListDatasetConfigs(ctx, req)
	var count int
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("Next: %w", err)
		}
		fmt.Fprintf(w, "Dataset config: %s\n", resp.GetName())
		count++
	}
	if count == 0 {
		fmt.Fprintln(w, "No dataset configs found.")
	}

	return nil
}

// [END storageinsights_v1_storageinsights_datasetconfigs_list]
