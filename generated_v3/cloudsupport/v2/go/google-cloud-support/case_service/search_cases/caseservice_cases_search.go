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

// [START cloudsupport_v2_caseservice_cases_search]

import (
	"context"
	"fmt"
	"io"

	cloudsupport "cloud.google.com/go/support/apiv2"
	supportpb "cloud.google.com/go/support/apiv2/supportpb"
	"google.golang.org/api/iterator"
)

// searchCases searches customer support cases matching a query.
func searchCases(ctx context.Context, w io.Writer, projectID string, query string) error {
	parent := fmt.Sprintf("projects/%s", projectID)

	client, err := cloudsupport.NewCaseClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCaseClient failed: %w", err)
	}
	defer client.Close()

	req := &supportpb.SearchCasesRequest{
		Parent: parent,
		Query:  query,
	}

	it := client.SearchCases(ctx, req)
	count := 0
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("SearchCases iteration failed: %w", err)
		}
		count++
		fmt.Fprintf(w, "Case: %s, Display Name: %s, State: %s\n", resp.GetName(), resp.GetDisplayName(), resp.GetState())
	}

	fmt.Fprintf(w, "Total cases found: %d\n", count)
	return nil
}

// [END cloudsupport_v2_caseservice_cases_search]
