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

// [START dialogflow_v3_intents_export_intents]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// exportIntents exports the specified intent from a Dialogflow CX agent.
func exportIntents(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, intentID string) error {
	intents := fmt.Sprintf("projects/%s/locations/%s/agents/%s/intents/%s", projectID, locationID, agentID, intentID)
	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)

	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}
	opts = append(opts, option.WithQuotaProject(projectID))

	client, err := dialogflow.NewIntentsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewIntentsClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.ExportIntentsRequest{
		Parent:  parent,
		Intents: []string{intents},
		Destination: &cxpb.ExportIntentsRequest_IntentsContentInline{
			IntentsContentInline: true,
		},
		DataFormat: cxpb.ExportIntentsRequest_JSON,
	}

	op, err := client.ExportIntents(ctx, req)
	if err != nil {
		return fmt.Errorf("ExportIntents failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	var dataLen int
	if content := resp.GetIntentsContent(); content != nil {
		dataLen = len(content.GetContent())
	}
	fmt.Fprintf(w, "Exported %d bytes of intent data\n", dataLen)

	return nil
}

// [END dialogflow_v3_intents_export_intents]
