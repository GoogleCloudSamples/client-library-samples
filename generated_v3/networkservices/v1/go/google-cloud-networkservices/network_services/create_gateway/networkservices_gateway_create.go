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

// [START networkservices_v1_networkservices_gateway_create]

import (
	"context"
	"fmt"
	"io"

	networkservices "cloud.google.com/go/networkservices/apiv1"
	networkservicespb "cloud.google.com/go/networkservices/apiv1/networkservicespb"
)

// createGateway creates a Gateway resource.
func createGateway(ctx context.Context, w io.Writer, projectID string, locationID string, gatewayID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	gateway := &networkservicespb.Gateway{
		Type:  networkservicespb.Gateway_OPEN_MESH,
		Ports: []int32{443},
		Scope: "example-scope",
	}

	client, err := networkservices.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networkservicespb.CreateGatewayRequest{
		Parent:    parent,
		GatewayId: gatewayID,
		Gateway:   gateway,
	}

	op, err := client.CreateGateway(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateGateway failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created Gateway: %s\n", resp.GetName())
	return nil
}

// [END networkservices_v1_networkservices_gateway_create]
