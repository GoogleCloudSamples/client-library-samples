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

// [START dialogflow_v3_sessions_match_intent]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// matchIntent evaluates user input against intent detection without altering session state.
func matchIntent(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, sessionID string) error {
	session := fmt.Sprintf("projects/%s/locations/%s/agents/%s/sessions/%s", projectID, locationID, agentID, sessionID)

	queryInput := &cxpb.QueryInput{
		Input: &cxpb.QueryInput_Text{
			Text: &cxpb.TextInput{
				Text: "Hello",
			},
		},
		LanguageCode: "en",
	}

	apiEndpoint := fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)
	if locationID == "" || locationID == "global" {
		apiEndpoint = "dialogflow.googleapis.com:443"
	}

	client, err := dialogflow.NewSessionsClient(ctx,
		option.WithEndpoint(apiEndpoint),
		option.WithQuotaProject(projectID),
	)
	if err != nil {
		return fmt.Errorf("NewSessionsClient: %w", err)
	}
	defer client.Close()

	req := &cxpb.MatchIntentRequest{
		Session:    session,
		QueryInput: queryInput,
	}

	resp, err := client.MatchIntent(ctx, req)
	if err != nil {
		return fmt.Errorf("MatchIntent: %w", err)
	}

	fmt.Fprintf(w, "Found %d matches\n", len(resp.GetMatches()))
	for _, match := range resp.GetMatches() {
		if intent := match.GetIntent(); intent != nil {
			fmt.Fprintf(w, "Matched intent: %s (confidence: %f)\n", intent.GetDisplayName(), match.GetConfidence())
		}
	}

	return nil
}

// [END dialogflow_v3_sessions_match_intent]
