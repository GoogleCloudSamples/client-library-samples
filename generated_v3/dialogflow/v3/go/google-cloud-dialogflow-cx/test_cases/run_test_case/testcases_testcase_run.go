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

// [START dialogflow_v3_testcases_run_test_case]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// runTestCase executes a specified test case in Dialogflow CX.
func runTestCase(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, testCaseID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/testCases/%s", projectID, locationID, agentID, testCaseID)

	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}
	if projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := dialogflow.NewTestCasesClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewTestCasesClient: %w", err)
	}
	defer client.Close()

	req := &cxpb.RunTestCaseRequest{
		Name: name,
	}

	op, err := client.RunTestCase(ctx, req)
	if err != nil {
		return fmt.Errorf("RunTestCase: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Run test case result name: %s\n", resp.GetResult().GetName())
	fmt.Fprintf(w, "Test result status: %s\n", resp.GetResult().GetTestResult())

	return nil
}

// [END dialogflow_v3_testcases_run_test_case]
