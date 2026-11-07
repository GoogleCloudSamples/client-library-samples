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

// [START workflows_v1beta_workflows_workflow_create]

import (
	"context"
	"fmt"
	"io"

	workflows "cloud.google.com/go/workflows/apiv1beta"
	workflowspb "cloud.google.com/go/workflows/apiv1beta/workflowspb"
)

// createWorkflow creates a workflow in a specified project and location.
func createWorkflow(ctx context.Context, w io.Writer, projectID string, locationID string, workflowID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	workflow := &workflowspb.Workflow{
		Description: "Sample workflow created with Go",
		SourceCode: &workflowspb.Workflow_SourceContents{
			SourceContents: "# Sample workflow\n- getCurrentTime:\n    call: http.get\n    args:\n        url: https://timeapi.io/api/Time/current/zone?timeZone=UTC\n    result: currentTime\n- returnResult:\n    return: ${currentTime}",
		},
	}

	client, err := workflows.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &workflowspb.CreateWorkflowRequest{
		Parent:     parent,
		WorkflowId: workflowID,
		Workflow:   workflow,
	}

	op, err := client.CreateWorkflow(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateWorkflow: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created workflow: %s\n", resp.GetName())
	return nil
}

// [END workflows_v1beta_workflows_workflow_create]
