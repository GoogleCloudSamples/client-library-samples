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

// [START datacatalog_v1_lineage_links_search]

import (
	"context"
	"fmt"
	"io"
	"os"

	lineage "cloud.google.com/go/datacatalog/lineage/apiv1"
	lineagepb "cloud.google.com/go/datacatalog/lineage/apiv1/lineagepb"
	"google.golang.org/api/iterator"
)

// searchLinks searches for lineage links matching the specified criteria.
func searchLinks(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = "example-project-id"
	}
	location := os.Getenv("GOOGLE_CLOUD_LOCATION")
	if location == "" {
		location = "us-central1"
	}
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, location)

	client, err := lineage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("lineage.NewClient: %w", err)
	}
	defer client.Close()

	req := &lineagepb.SearchLinksRequest{
		Parent: parent,
		Criteria: &lineagepb.SearchLinksRequest_Source{
			Source: &lineagepb.EntityReference{
				FullyQualifiedName: fmt.Sprintf("bigquery:%s.example_dataset.example_table", projectID),
			},
		},
	}

	it := client.SearchLinks(ctx, req)
	count := 0
	for {
		link, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("SearchLinks: %w", err)
		}
		count++
		fmt.Fprintf(w, "Found link: %s\n", link.GetName())
	}

	fmt.Fprintf(w, "Search completed. Total links found: %d\n", count)
	return nil
}

// [END datacatalog_v1_lineage_links_search]
