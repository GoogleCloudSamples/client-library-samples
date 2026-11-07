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

// [START workloadmanager_v1_workloadmanager_run_evaluation]

import (
	"context"
	"fmt"
	"io"

	workloadmanager "cloud.google.com/go/workloadmanager/apiv1"
	workloadmanagerpb "cloud.google.com/go/workloadmanager/apiv1/workloadmanagerpb"
)

// runEvaluation triggers an evaluation scan on a designated workload.
func runEvaluation(ctx context.Context, w io.Writer, projectID string, locationID string, evaluationID string, executionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/evaluations/%s", projectID, locationID, evaluationID)
	execution := &workloadmanagerpb.Execution{
		RunType: workloadmanagerpb.Execution_ONE_TIME,
	}

	client, err := workloadmanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &workloadmanagerpb.RunEvaluationRequest{
		Name:        name,
		Execution:   execution,
		ExecutionId: executionID,
	}

	// RunEvaluation initiates a long-running operation.
	op, err := client.RunEvaluation(ctx, req)
	if err != nil {
		return fmt.Errorf("RunEvaluation failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Evaluation execution completed: %s\n", resp.GetName())
	return nil
}

// [END workloadmanager_v1_workloadmanager_run_evaluation]
