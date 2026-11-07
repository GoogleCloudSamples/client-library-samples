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

// [START workloadmanager_v1_workloadmanager_evaluation_get]

import (
	"context"
	"fmt"
	"io"

	workloadmanager "cloud.google.com/go/workloadmanager/apiv1"
	workloadmanagerpb "cloud.google.com/go/workloadmanager/apiv1/workloadmanagerpb"
)

// getEvaluation retrieves an evaluation by its resource name.
func getEvaluation(ctx context.Context, w io.Writer, projectID string, locationID string, evaluationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/evaluations/%s", projectID, locationID, evaluationID)

	client, err := workloadmanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &workloadmanagerpb.GetEvaluationRequest{
		Name: name,
	}

	evaluation, err := client.GetEvaluation(ctx, req)
	if err != nil {
		return fmt.Errorf("GetEvaluation failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved evaluation: %s\n", evaluation.GetName())
	return nil
}

// [END workloadmanager_v1_workloadmanager_evaluation_get]
