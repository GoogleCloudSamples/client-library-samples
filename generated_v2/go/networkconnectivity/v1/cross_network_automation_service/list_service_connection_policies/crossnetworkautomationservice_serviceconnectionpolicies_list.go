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

// [START networkconnectivity_v1_crossnetworkautomationservice_serviceconnectionpolicies_list]

import (
	"context"
	"fmt"
	"io"

	networkconnectivity "cloud.google.com/go/networkconnectivity/apiv1"
	networkconnectivitypb "cloud.google.com/go/networkconnectivity/apiv1/networkconnectivitypb"
	"google.golang.org/api/iterator"
)

// listServiceConnectionPolicies lists service connection policies in a given project and location.
func listServiceConnectionPolicies(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := networkconnectivity.NewCrossNetworkAutomationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCrossNetworkAutomationClient: %w", err)
	}
	defer client.Close()

	req := &networkconnectivitypb.ListServiceConnectionPoliciesRequest{
		Parent: parent,
	}

	it := client.ListServiceConnectionPolicies(ctx, req)
	for {
		policy, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("Next: %w", err)
		}
		fmt.Fprintf(w, "Service Connection Policy: %s\n", policy.GetName())
	}

	return nil
}

// [END networkconnectivity_v1_crossnetworkautomationservice_serviceconnectionpolicies_list]
