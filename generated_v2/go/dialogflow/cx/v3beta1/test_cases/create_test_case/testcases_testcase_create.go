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

// [START dialogflow_v3beta1_testcases_testcase_create]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// createTestCase creates a test case for a Dialogflow CX agent.
func createTestCase(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)
	testCase := &cxpb.TestCase{
		DisplayName: "Example Test Case",
		Notes:       "A test case created for validation.",
	}

	// Dialogflow CX requires setting the regional endpoint.
	apiEndpoint := fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)
	client, err := dialogflow.NewTestCasesClient(ctx, option.WithEndpoint(apiEndpoint))
	if err != nil {
		return fmt.Errorf("NewTestCasesClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.CreateTestCaseRequest{
		Parent:   parent,
		TestCase: testCase,
	}

	resp, err := client.CreateTestCase(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateTestCase failed: %w", err)
	}

	fmt.Fprintf(w, "Created test case: %s\n", resp.GetName())
	return nil
}

// [END dialogflow_v3beta1_testcases_testcase_create]
