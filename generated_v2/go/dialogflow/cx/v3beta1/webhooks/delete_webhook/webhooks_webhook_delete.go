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

// [START dialogflow_v3beta1_webhooks_webhook_delete]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// deleteWebhook deletes a webhook from a Dialogflow CX agent.
func deleteWebhook(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, webhookID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/webhooks/%s", projectID, locationID, agentID, webhookID)

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewWebhooksClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewWebhooksClient: %w", err)
	}
	defer client.Close()

	req := &cxpb.DeleteWebhookRequest{
		Name: name,
	}

	if err := client.DeleteWebhook(ctx, req); err != nil {
		return fmt.Errorf("DeleteWebhook: %w", err)
	}

	fmt.Fprintf(w, "Deleted webhook: %s\n", name)

	return nil
}

// [END dialogflow_v3beta1_webhooks_webhook_delete]
