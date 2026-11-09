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

// [START dialogflow_v3_flows_import_flow]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// importFlow imports a flow from a Cloud Storage URI into a Dialogflow CX agent.
func importFlow(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, flowURI string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)

	// Dialogflow CX requires setting the regional endpoint for non-global locations.
	apiEndpoint := fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)
	client, err := dialogflow.NewFlowsClient(ctx, option.WithEndpoint(apiEndpoint))
	if err != nil {
		return fmt.Errorf("NewFlowsClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.ImportFlowRequest{
		Parent: parent,
		Flow: &cxpb.ImportFlowRequest_FlowUri{
			FlowUri: flowURI,
		},
	}

	op, err := client.ImportFlow(ctx, req)
	if err != nil {
		return fmt.Errorf("ImportFlow: %w", err)
	}

	// Wait for the long-running operation to complete.
	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Imported flow: %s\n", resp.GetFlow())
	return nil
}

// [END dialogflow_v3_flows_import_flow]
