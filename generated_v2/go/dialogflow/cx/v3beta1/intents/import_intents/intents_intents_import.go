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

// [START dialogflow_v3beta1_intents_import_intents]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// Use the ImportIntents method.
func importIntents(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)
	intentsContent := &cxpb.InlineSource{
		Content: []byte(`{"intents": []}`),
	}

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewIntentsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewIntentsClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.ImportIntentsRequest{
		Parent: parent,
		Intents: &cxpb.ImportIntentsRequest_IntentsContent{
			IntentsContent: intentsContent,
		},
		MergeOption: cxpb.ImportIntentsRequest_REPORT_CONFLICT,
	}

	op, err := client.ImportIntents(ctx, req)
	if err != nil {
		return fmt.Errorf("ImportIntents failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("ImportIntents operation failed: %w", err)
	}

	fmt.Fprintf(w, "Imported %d intent(s):\n", len(resp.GetIntents()))
	for _, intent := range resp.GetIntents() {
		fmt.Fprintf(w, "- %s\n", intent)
	}

	return nil
}

// [END dialogflow_v3beta1_intents_import_intents]
