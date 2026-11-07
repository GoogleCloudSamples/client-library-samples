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

// [START dialogflow_v3_testcases_batch_run_test_cases]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
)

// Use the BatchRunTestCases method.
func batchRunTestCases(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, testCaseID string) error {
	testCases := fmt.Sprintf("projects/%s/locations/%s/agents/%s/testCases/%s", projectID, locationID, agentID, testCaseID)
	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)

	client, err := dialogflow.NewTestCasesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTestCasesClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.BatchRunTestCasesRequest{
		Parent:    parent,
		TestCases: []string{testCases},
	}

	op, err := client.BatchRunTestCases(ctx, req)
	if err != nil {
		return fmt.Errorf("BatchRunTestCases failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Batch run completed with %d test case results.\n", len(resp.GetResults()))
	for _, result := range resp.GetResults() {
		fmt.Fprintf(w, "Test case result: %s, status: %s\n", result.GetName(), result.GetTestResult())
	}

	return nil
}

// [END dialogflow_v3_testcases_batch_run_test_cases]
