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

// [START dialogflow_v3beta1_sessions_match_intent]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// matchIntent detects intent matches based on user input for a session.
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

	opts := []option.ClientOption{
		option.WithQuotaProject(projectID),
	}
	if locationID != "global" && locationID != "" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewSessionsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewSessionsClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.MatchIntentRequest{
		Session:    session,
		QueryInput: queryInput,
	}

	resp, err := client.MatchIntent(ctx, req)
	if err != nil {
		return fmt.Errorf("MatchIntent failed: %w", err)
	}

	for _, match := range resp.GetMatches() {
		fmt.Fprintf(w, "Match type: %v, confidence: %f\n", match.GetMatchType(), match.GetConfidence())
		if intent := match.GetIntent(); intent != nil {
			fmt.Fprintf(w, "Matched intent: %s (%s)\n", intent.GetDisplayName(), intent.GetName())
		}
	}

	return nil
}

// [END dialogflow_v3beta1_sessions_match_intent]
