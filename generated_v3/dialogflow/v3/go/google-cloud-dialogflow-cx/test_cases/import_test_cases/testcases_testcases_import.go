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

// [START dialogflow_v3_testcases_import_test_cases]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// importTestCases imports test cases from a Google Cloud Storage URI.
func importTestCases(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, gcsURI string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewTestCasesClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewTestCasesClient: %w", err)
	}
	defer client.Close()

	req := &cxpb.ImportTestCasesRequest{
		Parent: parent,
		Source: &cxpb.ImportTestCasesRequest_GcsUri{
			GcsUri: gcsURI,
		},
	}

	op, err := client.ImportTestCases(ctx, req)
	if err != nil {
		return fmt.Errorf("ImportTestCases: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Imported %d test case(s):\n", len(resp.GetNames()))
	for _, name := range resp.GetNames() {
		fmt.Fprintf(w, "- %s\n", name)
	}

	return nil
}

// [END dialogflow_v3_testcases_import_test_cases]
