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

// [START dialogflow_v3beta1_sessions_fulfill_intent]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// fulfillIntent matches an intent and fulfills it for a Dialogflow CX session.
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

	matchIntentResponse, err := client.MatchIntent(ctx, matchIntentRequest)
	if err != nil {
		return fmt.Errorf("MatchIntent failed: %w", err)
	}
	if len(matchIntentResponse.GetMatches()) == 0 {
		return fmt.Errorf("no match found in session %s", sessionID)
	}
	match := matchIntentResponse.GetMatches()[0]

	req := &cxpb.FulfillIntentRequest{
		MatchIntentRequest: matchIntentRequest,
		Match:              match,
	}

	response, err := client.FulfillIntent(ctx, req)
	if err != nil {
		return fmt.Errorf("FulfillIntent failed: %w", err)
	}

	fmt.Fprintf(w, "Response ID: %s\n", response.GetResponseId())
	return nil
}

// [END dialogflow_v3beta1_sessions_fulfill_intent]
