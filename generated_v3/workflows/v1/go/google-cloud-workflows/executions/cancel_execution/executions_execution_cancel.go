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

// [START workflows_v1_executions_execution_cancel]

import (
	"context"
	"fmt"
	"io"

	workflows "cloud.google.com/go/workflows/executions/apiv1"
	executionspb "cloud.google.com/go/workflows/executions/apiv1/executionspb"
)

// cancelExecution cancels an ongoing execution of a workflow.
func cancelExecution(ctx context.Context, w io.Writer, projectID string, locationID string, workflowID string, executionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/workflows/%s/executions/%s", projectID, locationID, workflowID, executionID)

	client, err := workflows.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &executionspb.CancelExecutionRequest{
		Name: name,
	}

	resp, err := client.CancelExecution(ctx, req)
	if err != nil {
		return fmt.Errorf("client.CancelExecution: %w", err)
	}

	fmt.Fprintf(w, "Canceled execution: %s\nState: %v\n", resp.GetName(), resp.GetState())
	return nil
}

// [END workflows_v1_executions_execution_cancel]
