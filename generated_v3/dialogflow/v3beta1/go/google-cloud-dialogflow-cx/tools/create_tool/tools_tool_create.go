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

// [START dialogflow_v3beta1_tools_tool_create]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// createTool creates a tool in a Dialogflow CX agent.
func createTool(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)

	tool := &cxpb.Tool{
		DisplayName: "example-tool",
		Description: "Tool created for demonstration purposes.",
		Specification: &cxpb.Tool_FunctionSpec{
			FunctionSpec: &cxpb.Tool_FunctionTool{},
		},
	}

	var clientOpts []option.ClientOption
	if locationID != "global" {
		clientOpts = append(clientOpts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewToolsClient(ctx, clientOpts...)
	if err != nil {
		return fmt.Errorf("NewToolsClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.CreateToolRequest{
		Parent: parent,
		Tool:   tool,
	}

	resp, err := client.CreateTool(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateTool failed: %w", err)
	}

	fmt.Fprintf(w, "Created tool: %s\n", resp.GetName())

	return nil
}

// [END dialogflow_v3beta1_tools_tool_create]
