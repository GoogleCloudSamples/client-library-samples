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

// [START workflowexecutions_v1beta_executions_executions_list]

import (
	"context"
	"fmt"
	"io"

	workflowexecutions "cloud.google.com/go/workflows/executions/apiv1beta"
	executionspb "cloud.google.com/go/workflows/executions/apiv1beta/executionspb"
	"google.golang.org/api/iterator"
)

// Use the ListExecutions method.
func listExecutions(ctx context.Context, w io.Writer, projectID string, locationID string, workflowID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/workflows/%s", projectID, locationID, workflowID)

	client, err := workflowexecutions.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("workflowexecutions.NewClient: %w", err)
	}
	defer client.Close()

	req := &executionspb.ListExecutionsRequest{
		Parent: parent,
	}

	it := client.ListExecutions(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "Execution: %s\n", resp.GetName())
	}

	return nil
}

// [END workflowexecutions_v1beta_executions_executions_list]
