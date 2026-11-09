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

// [START dialogflow_v3beta1_sessions_server_streaming_detect_intent]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// serverStreamingDetectIntent performs server-side streaming intent detection on a session.
func serverStreamingDetectIntent(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, sessionID string) error {
	if locationID == "" {
		locationID = "global"
	}

	session := fmt.Sprintf("projects/%s/locations/%s/agents/%s/sessions/%s", projectID, locationID, agentID, sessionID)
	queryInput := &cxpb.QueryInput{
		Input: &cxpb.QueryInput_Text{
			Text: &cxpb.TextInput{
				Text: "Hello",
			},
		},
		LanguageCode: "en",
	}

	var opts []option.ClientOption
	if projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewSessionsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewSessionsClient: %w", err)
	}
	defer client.Close()

	req := &cxpb.DetectIntentRequest{
		Session:    session,
		QueryInput: queryInput,
	}

	stream, err := client.ServerStreamingDetectIntent(ctx, req)
	if err != nil {
		return fmt.Errorf("ServerStreamingDetectIntent: %w", err)
	}

	for {
		resp, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			return fmt.Errorf("stream.Recv: %w", err)
		}
		fmt.Fprintf(w, "Response ID: %s\n", resp.GetResponseId())
		if qr := resp.GetQueryResult(); qr != nil {
			fmt.Fprintf(w, "Matched Intent: %s\n", qr.GetMatch().GetIntent().GetDisplayName())
		}
	}

	return nil
}

// [END dialogflow_v3beta1_sessions_server_streaming_detect_intent]
