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

// [START dialogflow_v3_sessions_fulfill_intent]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// fulfillIntent fulfills an intent match for a Dialogflow CX session.
func fulfillIntent(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, sessionID string) error {
	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewSessionsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewSessionsClient failed: %w", err)
	}
	defer client.Close()

	sessionPath := fmt.Sprintf("projects/%s/locations/%s/agents/%s/sessions/%s", projectID, locationID, agentID, sessionID)

	matchIntentRequest := &cxpb.MatchIntentRequest{
		Session: sessionPath,
		QueryInput: &cxpb.QueryInput{
			Input: &cxpb.QueryInput_Text{
				Text: &cxpb.TextInput{
					Text: "hello",
				},
			},
			LanguageCode: "en",
		},
	}

	matchResponse, err := client.MatchIntent(ctx, matchIntentRequest)
	if err != nil {
		return fmt.Errorf("MatchIntent: %w", err)
	}

	if len(matchResponse.GetMatches()) == 0 {
		return fmt.Errorf("MatchIntent returned no matches for session %s", sessionID)
	}

	match := matchResponse.GetMatches()[0]

	req := &cxpb.FulfillIntentRequest{
		MatchIntentRequest: matchIntentRequest,
		Match:              match,
	}

	resp, err := client.FulfillIntent(ctx, req)
	if err != nil {
		return fmt.Errorf("FulfillIntent: %w", err)
	}

	fmt.Fprintf(w, "Response ID: %s\n", resp.GetResponseId())
	if queryResult := resp.GetQueryResult(); queryResult != nil {
		fmt.Fprintf(w, "Fulfilled Intent: %s\n", queryResult.GetIntent().GetDisplayName())
	}

	return nil
}

// [END dialogflow_v3_sessions_fulfill_intent]
