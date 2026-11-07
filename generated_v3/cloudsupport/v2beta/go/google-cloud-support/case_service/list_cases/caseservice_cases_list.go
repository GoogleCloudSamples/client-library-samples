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

// [START cloudsupport_v2beta_caseservice_cases_list]

import (
	"context"
	"fmt"
	"io"

	cloudsupport "cloud.google.com/go/support/apiv2beta"
	cloudsupportpb "cloud.google.com/go/support/apiv2beta/supportpb"
	"google.golang.org/api/iterator"
)

// listCases lists customer support cases for a given project.
func listCases(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)

	client, err := cloudsupport.NewCaseClient(ctx)
	if err != nil {
		return fmt.Errorf("cloudsupport.NewCaseClient: %w", err)
	}
	defer client.Close()

	req := &cloudsupportpb.ListCasesRequest{
		Parent: parent,
	}

	var count int
	it := client.ListCases(ctx, req)
	for {
		c, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "Case: %s (%s)\n", c.GetName(), c.GetDisplayName())
		count++
	}

	fmt.Fprintf(w, "Cases found: %d\n", count)
	return nil
}

// [END cloudsupport_v2beta_caseservice_cases_list]
