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

// [START dialogflow_v3_sessions_streaming_detect_intent]

import (
	"context"
	"fmt"
	"io"
	"strings"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// streamingDetectIntent sends a conversational query through a bidirectional stream.
func streamingDetectIntent(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, sessionID string) error {
	queryInput := &cxpb.QueryInput{
		LanguageCode: "en-US",
		Input: &cxpb.QueryInput_Text{
			Text: &cxpb.TextInput{
				Text: "Hello",
			},
		},
	}

	endpoint := fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)
	if locationID == "global" {
		endpoint = "dialogflow.googleapis.com:443"
	}

	client, err := dialogflow.NewSessionsClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewSessionsClient failed: %w", err)
	}
	defer client.Close()

	sessionPath := fmt.Sprintf("projects/%s/locations/%s/agents/%s/sessions/%s", projectID, locationID, agentID, sessionID)

	stream, err := client.StreamingDetectIntent(ctx)
	if err != nil {
		return fmt.Errorf("StreamingDetectIntent failed: %w", err)
	}

	req := &cxpb.StreamingDetectIntentRequest{
		Session:    sessionPath,
		QueryInput: queryInput,
	}

	if err := stream.Send(req); err != nil {
		return fmt.Errorf("stream.Send failed: %w", err)
	}

	if err := stream.CloseSend(); err != nil {
		return fmt.Errorf("stream.CloseSend failed: %w", err)
	}

	for {
		resp, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			return fmt.Errorf("stream.Recv failed: %w", err)
		}

		if recog := resp.GetRecognitionResult(); recog != nil {
			fmt.Fprintf(w, "Intermediate transcript: %s\n", recog.GetTranscript())
		}

		if detectResp := resp.GetDetectIntentResponse(); detectResp != nil {
			queryResult := detectResp.GetQueryResult()
			for _, msg := range queryResult.GetResponseMessages() {
				if text := msg.GetText(); text != nil {
					fmt.Fprintf(w, "Response text: %s\n", strings.Join(text.GetText(), " "))
				}
			}
		}
	}

	return nil
}

// [END dialogflow_v3_sessions_streaming_detect_intent]
