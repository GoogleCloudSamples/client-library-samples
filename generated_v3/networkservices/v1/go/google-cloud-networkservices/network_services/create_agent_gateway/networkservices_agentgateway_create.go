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

// [START networkservices_v1_networkservices_agentgateway_create]

import (
	"context"
	"fmt"
	"io"

	networkservices "cloud.google.com/go/networkservices/apiv1"
	"cloud.google.com/go/networkservices/apiv1/networkservicespb"
)

// createAgentGateway creates a new AgentGateway resource.
func createAgentGateway(ctx context.Context, w io.Writer, projectID string, locationID string, agentGatewayID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	agentGateway := &networkservicespb.AgentGateway{
		Description: "Example Agent Gateway",
	}

	client, err := networkservices.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networkservicespb.CreateAgentGatewayRequest{
		Parent:         parent,
		AgentGatewayId: agentGatewayID,
		AgentGateway:   agentGateway,
	}

	op, err := client.CreateAgentGateway(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateAgentGateway failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "AgentGateway created: %s\n", resp.GetName())

	return nil
}

// [END networkservices_v1_networkservices_agentgateway_create]
