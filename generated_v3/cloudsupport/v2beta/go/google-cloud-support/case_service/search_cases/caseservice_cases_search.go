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

// [START cloudsupport_v2beta_caseservice_cases_search]

import (
	"context"
	"fmt"
	"io"

	cloudsupport "cloud.google.com/go/support/apiv2beta"
	cloudsupportpb "cloud.google.com/go/support/apiv2beta/supportpb"
	"google.golang.org/api/iterator"
)

// searchCases searches for support cases under a Google Cloud project.
func searchCases(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)
	query := fmt.Sprintf("project=\"%s\"", parent)

	client, err := cloudsupport.NewCaseClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCaseClient failed: %w", err)
	}
	defer client.Close()

	req := &cloudsupportpb.SearchCasesRequest{
		Query: query,
	}

	it := client.SearchCases(ctx, req)
	count := 0
	for {
		c, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("SearchCases iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Case: %s, Display Name: %s\n", c.GetName(), c.GetDisplayName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No cases found.")
	}

	return nil
}

// [END cloudsupport_v2beta_caseservice_cases_search]
