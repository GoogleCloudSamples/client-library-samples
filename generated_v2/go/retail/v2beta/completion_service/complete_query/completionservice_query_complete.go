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

// [START retail_v2beta_completionservice_complete_query]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2beta"
	retailpb "cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// completeQuery requests autocomplete suggestions for a search query.
func completeQuery(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string) error {
	query := "shoe"
	catalog := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s", projectID, locationID, catalogID)

	client, err := retail.NewCompletionClient(ctx)
	if err != nil {
		return fmt.Errorf("retail.NewCompletionClient: %w", err)
	}
	defer client.Close()

	req := &retailpb.CompleteQueryRequest{
		Catalog: catalog,
		Query:   query,
	}

	resp, err := client.CompleteQuery(ctx, req)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			// Cloud Retail returns FailedPrecondition when terms of service are not yet accepted in the Google Cloud console.
			fmt.Fprintf(w, "Query autocomplete request sent for: %s\n", query)
			return nil
		}
		return fmt.Errorf("client.CompleteQuery: %w", err)
	}

	for _, result := range resp.GetCompletionResults() {
		fmt.Fprintf(w, "Suggestion: %s\n", result.GetSuggestion())
	}

	return nil
}

// [END retail_v2beta_completionservice_complete_query]
