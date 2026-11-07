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

// [START dialogflow_v3beta1_examples_example_get]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// getExample retrieves an existing example from a Dialogflow CX playbook.
func getExample(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, playbookID string, exampleID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/playbooks/%s/examples/%s", projectID, locationID, agentID, playbookID, exampleID)

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewExamplesClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewExamplesClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.GetExampleRequest{
		Name: name,
	}

	example, err := client.GetExample(ctx, req)
	if err != nil {
		return fmt.Errorf("GetExample failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved example: %s\n", example.GetName())

	return nil
}

// [END dialogflow_v3beta1_examples_example_get]
