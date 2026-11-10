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

// [START datalineage_v1_lineage_links_search]

import (
	"context"
	"errors"
	"fmt"
	"io"

	datalineage "cloud.google.com/go/datacatalog/lineage/apiv1"
	lineagepb "cloud.google.com/go/datacatalog/lineage/apiv1/lineagepb"
	"google.golang.org/api/iterator"
)

// searchLinks searches lineage links for a given source asset.
func searchLinks(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	source := &lineagepb.EntityReference{
		FullyQualifiedName: fmt.Sprintf("bigquery:%s.example_dataset.example_table", projectID),
	}

	client, err := datalineage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("datalineage.NewClient: %w", err)
	}
	defer client.Close()

	req := &lineagepb.SearchLinksRequest{
		Parent: parent,
		Criteria: &lineagepb.SearchLinksRequest_Source{
			Source: source,
		},
	}

	it := client.SearchLinks(ctx, req)
	var count int
	for {
		link, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("SearchLinks: %w", err)
		}
		fmt.Fprintf(w, "Found lineage link: %s\n", link.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No lineage links found.")
	}

	return nil
}

// [END datalineage_v1_lineage_links_search]
