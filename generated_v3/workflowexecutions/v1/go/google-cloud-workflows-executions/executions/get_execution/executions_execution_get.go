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

// [START workflowexecutions_v1_executions_execution_get]

import (
	"context"
	"fmt"
	"io"

	workflowexecutions "cloud.google.com/go/workflows/executions/apiv1"
	executionspb "cloud.google.com/go/workflows/executions/apiv1/executionspb"
)

// getExecution retrieves the details of an existing workflow execution.
func getExecution(ctx context.Context, w io.Writer, projectID string, locationID string, workflowID string, executionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/workflows/%s/executions/%s", projectID, locationID, workflowID, executionID)

	client, err := workflowexecutions.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &executionspb.GetExecutionRequest{
		Name: name,
	}

	resp, err := client.GetExecution(ctx, req)
	if err != nil {
		return fmt.Errorf("GetExecution failed: %w", err)
	}

	fmt.Fprintf(w, "Execution: %s\nState: %s\n", resp.GetName(), resp.GetState())
	return nil
}

// [END workflowexecutions_v1_executions_execution_get]
