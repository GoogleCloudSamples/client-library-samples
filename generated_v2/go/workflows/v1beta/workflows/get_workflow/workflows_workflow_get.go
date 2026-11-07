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

// [START workflows_v1beta_workflows_workflow_get]

import (
	"context"
	"fmt"
	"io"

	workflows "cloud.google.com/go/workflows/apiv1beta"
	workflowspb "cloud.google.com/go/workflows/apiv1beta/workflowspb"
)

// Use the GetWorkflow method.
func getWorkflow(ctx context.Context, w io.Writer, projectID string, locationID string, workflowID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/workflows/%s", projectID, locationID, workflowID)

	client, err := workflows.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("workflows.NewClient: %w", err)
	}
	defer client.Close()

	req := &workflowspb.GetWorkflowRequest{
		Name: name,
	}

	resp, err := client.GetWorkflow(ctx, req)
	if err != nil {
		return fmt.Errorf("GetWorkflow: %w", err)
	}

	fmt.Fprintf(w, "Retrieved workflow: %s\n", resp.GetName())
	return nil
}

// [END workflows_v1beta_workflows_workflow_get]
