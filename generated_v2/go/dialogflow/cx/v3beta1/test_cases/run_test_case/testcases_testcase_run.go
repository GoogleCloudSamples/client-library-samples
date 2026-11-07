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

// [START dialogflow_v3beta1_testcases_run_test_case]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// runTestCase runs an existing test case in a Dialogflow CX agent.
func runTestCase(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, testCaseID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/testCases/%s", projectID, locationID, agentID, testCaseID)

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewTestCasesClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewTestCasesClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.RunTestCaseRequest{
		Name: name,
	}

	op, err := client.RunTestCase(ctx, req)
	if err != nil {
		return fmt.Errorf("RunTestCase failed: %w", err)
	}

	// Wait for the long-running operation to complete.
	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Test case run completed: %s\n", resp.GetResult().GetName())
	fmt.Fprintf(w, "Result: %v\n", resp.GetResult().GetTestResult())

	return nil
}

// [END dialogflow_v3beta1_testcases_run_test_case]
