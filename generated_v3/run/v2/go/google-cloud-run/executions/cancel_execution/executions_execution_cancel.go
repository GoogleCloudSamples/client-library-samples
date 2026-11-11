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

// [START run_v2_executions_execution_cancel]

import (
	"context"
	"fmt"
	"io"

	run "cloud.google.com/go/run/apiv2"
	runpb "cloud.google.com/go/run/apiv2/runpb"
)

// cancelExecution cancels an active Cloud Run execution and waits for completion.
func cancelExecution(ctx context.Context, w io.Writer, projectID string, locationID string, jobID string, executionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/jobs/%s/executions/%s", projectID, locationID, jobID, executionID)

	client, err := run.NewExecutionsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewExecutionsClient: %w", err)
	}
	defer client.Close()

	req := &runpb.CancelExecutionRequest{
		Name: name,
	}

	// CancelExecution initiates a long-running operation.
	op, err := client.CancelExecution(ctx, req)
	if err != nil {
		return fmt.Errorf("CancelExecution: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("CancelExecution operation wait: %w", err)
	}

	fmt.Fprintf(w, "Cancelled execution: %s\n", resp.GetName())
	return nil
}

// [END run_v2_executions_execution_cancel]
