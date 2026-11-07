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

// [START contactcenterinsights_v1_contactcenterinsights_issuemodels_list]

import (
	"context"
	"fmt"
	"io"

	contactcenterinsights "cloud.google.com/go/contactcenterinsights/apiv1"
	contactcenterinsightspb "cloud.google.com/go/contactcenterinsights/apiv1/contactcenterinsightspb"
)

// listIssueModels lists the issue models in the specified project and location.
func listIssueModels(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := contactcenterinsights.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &contactcenterinsightspb.ListIssueModelsRequest{
		Parent: parent,
	}

	resp, err := client.ListIssueModels(ctx, req)
	if err != nil {
		return fmt.Errorf("ListIssueModels: %w", err)
	}

	issueModels := resp.GetIssueModels()
	if len(issueModels) == 0 {
		fmt.Fprintln(w, "No issue models found.")
		return nil
	}

	for _, model := range issueModels {
		fmt.Fprintf(w, "Issue Model: %s (Display Name: %s)\n", model.GetName(), model.GetDisplayName())
	}

	return nil
}

// [END contactcenterinsights_v1_contactcenterinsights_issuemodels_list]
