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

// [START dialogflow_v3_generators_generator_create]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// createGenerator creates a generator in the specified Dialogflow CX agent.
func createGenerator(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)
	generator := &cxpb.Generator{
		DisplayName: "example-generator",
		PromptText: &cxpb.Phrase{
			Text: "Provide a helpful response based on: $conversation",
		},
	}

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewGeneratorsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewGeneratorsClient: %w", err)
	}
	defer client.Close()

	req := &cxpb.CreateGeneratorRequest{
		Parent:    parent,
		Generator: generator,
	}

	response, err := client.CreateGenerator(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateGenerator: %w", err)
	}

	fmt.Fprintf(w, "Created generator: %s\n", response.GetName())
	return nil
}

// [END dialogflow_v3_generators_generator_create]
