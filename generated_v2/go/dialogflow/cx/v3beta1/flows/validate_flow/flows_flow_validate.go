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

// [START dialogflow_v3beta1_flows_validate_flow]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// validateFlow validates the specified flow and prints any validation messages.
func validateFlow(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, flowID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/flows/%s", projectID, locationID, agentID, flowID)

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewFlowsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewFlowsClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.ValidateFlowRequest{
		Name: name,
	}

	res, err := client.ValidateFlow(ctx, req)
	if err != nil {
		return fmt.Errorf("ValidateFlow failed: %w", err)
	}

	fmt.Fprintf(w, "Flow validation completed: %s\n", res.GetName())
	for _, msg := range res.GetValidationMessages() {
		fmt.Fprintf(w, "- [%v] %s\n", msg.GetSeverity(), msg.GetDetail())
	}

	return nil
}

// [END dialogflow_v3beta1_flows_validate_flow]
