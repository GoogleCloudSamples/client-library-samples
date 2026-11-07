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

// [START dialogflow_v3_agents_agent_create]

import (
	"context"
	"fmt"
	"io"
	"time"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// createAgent creates an agent in Dialogflow CX.
func createAgent(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	agent := &cxpb.Agent{
		DisplayName:         fmt.Sprintf("example-agent-%d", time.Now().Unix()),
		DefaultLanguageCode: "en",
		TimeZone:            "America/Los_Angeles",
	}

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewAgentsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewAgentsClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.CreateAgentRequest{
		Parent: parent,
		Agent:  agent,
	}

	response, err := client.CreateAgent(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateAgent failed: %w", err)
	}

	fmt.Fprintf(w, "Created agent: %s\n", response.GetName())
	return nil
}

// [END dialogflow_v3_agents_agent_create]
