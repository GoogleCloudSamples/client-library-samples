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

// [START dialogflow_v3beta1_intents_intent_create]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// createIntent creates an intent in the specified Dialogflow CX agent.
func createIntent(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string) error {
	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewIntentsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewIntentsClient: %w", err)
	}
	defer client.Close()

	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)

	trainingPhrase := &cxpb.Intent_TrainingPhrase{
		Parts: []*cxpb.Intent_TrainingPhrase_Part{
			{Text: "hello"},
		},
		RepeatCount: 1,
	}

	intent := &cxpb.Intent{
		DisplayName:     "example-intent",
		Description:     "Example intent for demonstration",
		TrainingPhrases: []*cxpb.Intent_TrainingPhrase{trainingPhrase},
	}

	req := &cxpb.CreateIntentRequest{
		Parent: parent,
		Intent: intent,
	}

	resp, err := client.CreateIntent(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateIntent: %w", err)
	}

	fmt.Fprintf(w, "Created intent: %s\n", resp.GetName())
	return nil
}

// [END dialogflow_v3beta1_intents_intent_create]
