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

// [START dialogflow_v3beta1_testcases_export_test_cases]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	dialogflowpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// exportTestCases exports test cases from a Dialogflow CX agent.
func exportTestCases(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)

	apiEndpoint := fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)
	if locationID == "global" || locationID == "" {
		apiEndpoint = "dialogflow.googleapis.com:443"
	}

	client, err := dialogflow.NewTestCasesClient(ctx,
		option.WithEndpoint(apiEndpoint),
		option.WithQuotaProject(projectID),
	)
	if err != nil {
		return fmt.Errorf("NewTestCasesClient failed: %w", err)
	}
	defer client.Close()

	req := &dialogflowpb.ExportTestCasesRequest{
		Parent:     parent,
		DataFormat: dialogflowpb.ExportTestCasesRequest_JSON,
	}

	op, err := client.ExportTestCases(ctx, req)
	if err != nil {
		return fmt.Errorf("ExportTestCases failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Exported test cases (%d bytes)\n", len(resp.GetContent()))

	return nil
}

// [END dialogflow_v3beta1_testcases_export_test_cases]
