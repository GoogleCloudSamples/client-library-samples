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

// [START vectorsearch_v1beta_vectorsearchservice_collections_list]

import (
	"context"
	"fmt"
	"io"

	vectorsearch "cloud.google.com/go/vectorsearch/apiv1beta"
	vectorsearchpb "cloud.google.com/go/vectorsearch/apiv1beta/vectorsearchpb"
	"google.golang.org/api/iterator"
)

// listCollections lists collections in the specified project and location.
func listCollections(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := vectorsearch.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &vectorsearchpb.ListCollectionsRequest{
		Parent: parent,
	}

	it := client.ListCollections(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Collection: %s\n", resp.GetName())
	}

	return nil
}

// [END vectorsearch_v1beta_vectorsearchservice_collections_list]
