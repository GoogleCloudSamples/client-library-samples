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

// [START dialogflow_v3_sessions_detect_intent]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// detectIntent detects user intent based on text input.
func detectIntent(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string) error {
	sessionID := "123456"
	session := fmt.Sprintf("projects/%s/locations/%s/agents/%s/sessions/%s", projectID, locationID, agentID, sessionID)

	textInput := &cxpb.TextInput{
		Text: "hello",
	}
	queryInput := &cxpb.QueryInput{
		Input: &cxpb.QueryInput_Text{
			Text: textInput,
		},
		LanguageCode: "en",
	}

	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}
	opts = append(opts, option.WithQuotaProject(projectID))

	client, err := dialogflow.NewSessionsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewSessionsClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.DetectIntentRequest{
		Session:    session,
		QueryInput: queryInput,
	}

	resp, err := client.DetectIntent(ctx, req)
	if err != nil {
		return fmt.Errorf("DetectIntent failed: %w", err)
	}

	fmt.Fprintf(w, "Response ID: %s\n", resp.GetResponseId())
	if queryResult := resp.GetQueryResult(); queryResult != nil {
		if intent := queryResult.GetIntent(); intent != nil {
			fmt.Fprintf(w, "Detected Intent: %s\n", intent.GetDisplayName())
		}
		for _, msg := range queryResult.GetResponseMessages() {
			if text := msg.GetText(); text != nil {
				for _, t := range text.GetText() {
					fmt.Fprintf(w, "Response text: %s\n", t)
				}
			}
		}
	}

	return nil
}

// [END dialogflow_v3_sessions_detect_intent]
