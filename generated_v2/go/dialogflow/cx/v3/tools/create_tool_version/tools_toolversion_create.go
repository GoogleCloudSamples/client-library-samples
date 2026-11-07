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

// [START dialogflow_v3_tools_toolversion_create]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// createToolVersion creates a version for an existing tool in Dialogflow CX.
func createToolVersion(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, toolID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s/tools/%s", projectID, locationID, agentID, toolID)

	tool := &cxpb.Tool{
		DisplayName: "example-tool",
		Description: "Example tool snapshot description",
		Specification: &cxpb.Tool_FunctionSpec{
			FunctionSpec: &cxpb.Tool_FunctionTool{},
		},
	}
	toolVersion := &cxpb.ToolVersion{
		DisplayName: "v1.0.0",
		Tool:        tool,
	}

	endpoint := "dialogflow.googleapis.com:443"
	if locationID != "global" {
		endpoint = fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)
	}

	client, err := dialogflow.NewToolsClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewToolsClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.CreateToolVersionRequest{
		Parent:      parent,
		ToolVersion: toolVersion,
	}

	resp, err := client.CreateToolVersion(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateToolVersion failed: %w", err)
	}

	fmt.Fprintf(w, "Created tool version: %s\n", resp.GetName())
	return nil
}

// [END dialogflow_v3_tools_toolversion_create]
