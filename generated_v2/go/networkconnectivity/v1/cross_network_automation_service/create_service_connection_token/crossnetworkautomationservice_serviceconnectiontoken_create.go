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

// [START networkconnectivity_v1_crossnetworkautomationservice_serviceconnectiontoken_create]

import (
	"context"
	"fmt"
	"io"

	networkconnectivity "cloud.google.com/go/networkconnectivity/apiv1"
	"cloud.google.com/go/networkconnectivity/apiv1/networkconnectivitypb"
)

// createServiceConnectionToken creates a service connection token in the specified network.
func createServiceConnectionToken(ctx context.Context, w io.Writer, projectID string, locationID string, serviceConnectionTokenID string, networkID string) error {
	client, err := networkconnectivity.NewCrossNetworkAutomationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCrossNetworkAutomationClient: %w", err)
	}
	defer client.Close()

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	serviceConnectionToken := &networkconnectivitypb.ServiceConnectionToken{
		Description: "Example service connection token",
		Network:     fmt.Sprintf("projects/%s/global/networks/%s", projectID, networkID),
	}

	req := &networkconnectivitypb.CreateServiceConnectionTokenRequest{
		Parent:                   parent,
		ServiceConnectionTokenId: serviceConnectionTokenID,
		ServiceConnectionToken:   serviceConnectionToken,
	}

	op, err := client.CreateServiceConnectionToken(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateServiceConnectionToken: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created service connection token: %s\n", resp.GetName())
	return nil
}

// [END networkconnectivity_v1_crossnetworkautomationservice_serviceconnectiontoken_create]
