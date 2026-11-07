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

// [START dialogflow_v3_flows_export_flow]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// Use the ExportFlow method.
func exportFlow(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, flowID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/flows/%s", projectID, locationID, agentID, flowID)

	apiEndpoint := fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)
	client, err := dialogflow.NewFlowsClient(ctx, option.WithEndpoint(apiEndpoint))
	if err != nil {
		return fmt.Errorf("NewFlowsClient: %w", err)
	}
	defer client.Close()

	req := &cxpb.ExportFlowRequest{
		Name: name,
	}

	op, err := client.ExportFlow(ctx, req)
	if err != nil {
		return fmt.Errorf("ExportFlow: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Exported flow: %s\n", name)
	if content := resp.GetFlowContent(); len(content) > 0 {
		fmt.Fprintf(w, "Flow content size: %d bytes\n", len(content))
	} else if uri := resp.GetFlowUri(); uri != "" {
		fmt.Fprintf(w, "Flow exported to URI: %s\n", uri)
	}

	return nil
}

// [END dialogflow_v3_flows_export_flow]
