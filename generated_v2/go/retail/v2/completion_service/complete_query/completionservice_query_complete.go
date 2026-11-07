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

// [START retail_v2_completionservice_complete_query]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2"
	retailpb "cloud.google.com/go/retail/apiv2/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// completeQuery generates query completion suggestions for the specified prefix.
func completeQuery(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string, query string) error {
	catalog := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s", projectID, locationID, catalogID)

	client, err := retail.NewCompletionClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCompletionClient: %w", err)
	}
	defer client.Close()

	req := &retailpb.CompleteQueryRequest{
		Catalog: catalog,
		Query:   query,
	}

	resp, err := client.CompleteQuery(ctx, req)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Cloud Retail data use terms must be accepted in the Google Cloud console for project %s.\n", projectID)
			return nil
		}
		return fmt.Errorf("CompleteQuery: %w", err)
	}

	for _, result := range resp.GetCompletionResults() {
		fmt.Fprintf(w, "Suggestion: %s\n", result.GetSuggestion())
	}

	return nil
}

// [END retail_v2_completionservice_complete_query]
