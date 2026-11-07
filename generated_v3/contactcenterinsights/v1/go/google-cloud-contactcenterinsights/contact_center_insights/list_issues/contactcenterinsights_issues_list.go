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

// [START contactcenterinsights_v1_contactcenterinsights_issues_list]

import (
	"context"
	"fmt"
	"io"

	contactcenterinsights "cloud.google.com/go/contactcenterinsights/apiv1"
	"cloud.google.com/go/contactcenterinsights/apiv1/contactcenterinsightspb"
)

// listIssues lists all issues associated with a specified issue model.
func listIssues(ctx context.Context, w io.Writer, projectID string, locationID string, issueModelID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/issueModels/%s", projectID, locationID, issueModelID)

	client, err := contactcenterinsights.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("contactcenterinsights.NewClient: %w", err)
	}
	defer client.Close()

	req := &contactcenterinsightspb.ListIssuesRequest{
		Parent: parent,
	}

	resp, err := client.ListIssues(ctx, req)
	if err != nil {
		return fmt.Errorf("ListIssues: %w", err)
	}

	fmt.Fprintf(w, "Listed %d issue(s) for %s:\n", len(resp.GetIssues()), parent)
	for _, issue := range resp.GetIssues() {
		fmt.Fprintf(w, "Issue: %s (%s)\n", issue.GetDisplayName(), issue.GetName())
	}

	return nil
}

// [END contactcenterinsights_v1_contactcenterinsights_issues_list]
