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

// [START run_v2_executions_execution_delete]

import (
	"context"
	"fmt"
	"io"

	run "cloud.google.com/go/run/apiv2"
	runpb "cloud.google.com/go/run/apiv2/runpb"
)

// deleteExecution deletes a Cloud Run execution.
func deleteExecution(ctx context.Context, w io.Writer, projectID string, locationID string, jobID string, executionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/jobs/%s/executions/%s", projectID, locationID, jobID, executionID)

	client, err := run.NewExecutionsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewExecutionsClient failed: %w", err)
	}
	defer client.Close()

	req := &runpb.DeleteExecutionRequest{
		Name: name,
	}

	op, err := client.DeleteExecution(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteExecution failed: %w", err)
	}

	execution, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("waiting for DeleteExecution operation failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted execution: %s\n", execution.GetName())
	return nil
}

// [END run_v2_executions_execution_delete]
