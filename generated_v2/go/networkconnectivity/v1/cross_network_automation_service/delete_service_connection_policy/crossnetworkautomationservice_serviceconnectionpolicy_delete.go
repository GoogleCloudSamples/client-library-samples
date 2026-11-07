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

// [START networkconnectivity_v1_crossnetworkautomationservice_serviceconnectionpolicy_delete]

import (
	"context"
	"fmt"
	"io"

	networkconnectivity "cloud.google.com/go/networkconnectivity/apiv1"
	networkconnectivitypb "cloud.google.com/go/networkconnectivity/apiv1/networkconnectivitypb"
)

// deleteServiceConnectionPolicy deletes a service connection policy.
func deleteServiceConnectionPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, serviceConnectionPolicyID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/serviceConnectionPolicies/%s", projectID, locationID, serviceConnectionPolicyID)

	client, err := networkconnectivity.NewCrossNetworkAutomationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCrossNetworkAutomationClient: %w", err)
	}
	defer client.Close()

	req := &networkconnectivitypb.DeleteServiceConnectionPolicyRequest{
		Name: name,
	}

	op, err := client.DeleteServiceConnectionPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteServiceConnectionPolicy: %w", err)
	}

	// DeleteServiceConnectionPolicy is a long-running operation; wait for it to complete.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted service connection policy: %s\n", name)
	return nil
}

// [END networkconnectivity_v1_crossnetworkautomationservice_serviceconnectionpolicy_delete]
