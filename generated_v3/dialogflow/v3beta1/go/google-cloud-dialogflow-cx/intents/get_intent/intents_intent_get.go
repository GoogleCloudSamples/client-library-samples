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

// [START dialogflow_v3beta1_intents_intent_get]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// getIntent retrieves a Dialogflow CX intent.
func getIntent(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, intentID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/intents/%s", projectID, locationID, agentID, intentID)

	endpoint := fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)
	client, err := dialogflow.NewIntentsClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewIntentsClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.GetIntentRequest{
		Name: name,
	}

	intent, err := client.GetIntent(ctx, req)
	if err != nil {
		return fmt.Errorf("GetIntent failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved intent: %s (%s)\n", intent.GetDisplayName(), intent.GetName())

	return nil
}

// [END dialogflow_v3beta1_intents_intent_get]
