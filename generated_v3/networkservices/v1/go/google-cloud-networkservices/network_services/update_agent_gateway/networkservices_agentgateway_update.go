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

// [START networkservices_v1_networkservices_agentgateway_update]

import (
	"context"
	"fmt"
	"io"

	networkservices "cloud.google.com/go/networkservices/apiv1"
	networkservicespb "cloud.google.com/go/networkservices/apiv1/networkservicespb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateAgentGateway updates an existing agent gateway description.
func updateAgentGateway(ctx context.Context, w io.Writer, projectID string, locationID string, agentGatewayID string) error {
	agentGateway := &networkservicespb.AgentGateway{
		Name:        fmt.Sprintf("projects/%s/locations/%s/agentGateways/%s", projectID, locationID, agentGatewayID),
		Description: "Updated agent gateway description",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := networkservices.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("networkservices.NewClient: %w", err)
	}
	defer client.Close()

	req := &networkservicespb.UpdateAgentGatewayRequest{
		UpdateMask:   updateMask,
		AgentGateway: agentGateway,
	}

	op, err := client.UpdateAgentGateway(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateAgentGateway: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Updated Agent Gateway: %s\n", resp.GetName())
	return nil
}

// [END networkservices_v1_networkservices_agentgateway_update]
