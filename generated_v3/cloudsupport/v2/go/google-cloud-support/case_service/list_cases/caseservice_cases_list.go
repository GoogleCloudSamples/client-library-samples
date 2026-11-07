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

// [START cloudsupport_v2_caseservice_cases_list]

import (
	"context"
	"fmt"
	"io"

	cloudsupport "cloud.google.com/go/support/apiv2beta"
	supportpb "cloud.google.com/go/support/apiv2beta/supportpb"
	"google.golang.org/api/iterator"
)

// listCases lists Google Cloud Support cases for a given project.
func listCases(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)

	client, err := cloudsupport.NewCaseClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCaseClient failed: %w", err)
	}
	defer client.Close()

	req := &supportpb.ListCasesRequest{
		Parent: parent,
	}

	it := client.ListCases(ctx, req)
	var found bool
	for {
		c, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListCases failed: %w", err)
		}
		found = true
		fmt.Fprintf(w, "Case: %s, DisplayName: %s\n", c.GetName(), c.GetDisplayName())
	}
	if !found {
		fmt.Fprintln(w, "No cases found.")
	}

	return nil
}

// [END cloudsupport_v2_caseservice_cases_list]
