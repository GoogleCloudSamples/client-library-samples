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

// [START dialogflow_v3beta1_testcases_testcaseresult_get]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// getTestCaseResult retrieves the result of a test case execution.
func getTestCaseResult(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, testCaseID string, testCaseResultID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/testCases/%s/results/%s", projectID, locationID, agentID, testCaseID, testCaseResultID)

	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}
	if projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := dialogflow.NewTestCasesClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewTestCasesClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.GetTestCaseResultRequest{
		Name: name,
	}

	result, err := client.GetTestCaseResult(ctx, req)
	if err != nil {
		return fmt.Errorf("GetTestCaseResult failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved test case result: %s\n", result.GetName())
	fmt.Fprintf(w, "Test result: %s\n", result.GetTestResult())

	return nil
}

// [END dialogflow_v3beta1_testcases_testcaseresult_get]
