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

// [START retail_v2beta_searchservice_search]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2beta"
	retailpb "cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/api/iterator"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// search performs a search query against the Retail catalog.
func search(ctx context.Context, w io.Writer, projectID string, visitorID string, locationID string, query string) error {
	placement := fmt.Sprintf("projects/%s/locations/%s/catalogs/default_catalog/servingConfigs/default_serving_config", projectID, locationID)

	client, err := retail.NewSearchClient(ctx)
	if err != nil {
		return fmt.Errorf("NewSearchClient failed: %w", err)
	}
	defer client.Close()

	req := &retailpb.SearchRequest{
		Placement: placement,
		VisitorId: visitorID,
		Query:     query,
		PageSize:  10,
	}

	it := client.Search(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintln(w, "Search completed. Terms acceptance is required in the Google Cloud console.")
			return nil
		}
		if err != nil {
			return fmt.Errorf("Search failed: %w", err)
		}
		fmt.Fprintf(w, "Search result id: %s, product title: %s\n", resp.GetId(), resp.GetProduct().GetTitle())
	}

	return nil
}

// [END retail_v2beta_searchservice_search]
