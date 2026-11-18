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

// [START networkconnectivity_v1alpha1_hubservice_spoke_delete]

import (
	"context"
	"fmt"
	"io"

	networkconnectivity "cloud.google.com/go/networkconnectivity/apiv1beta"
	networkconnectivitypb "cloud.google.com/go/networkconnectivity/apiv1beta/networkconnectivitypb"
)

// Use the DeleteSpoke method.
func deleteSpoke(ctx context.Context, w io.Writer, projectID string, locationID string, spokeID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/spokes/%s", projectID, locationID, spokeID)

	client, err := networkconnectivity.NewHubClient(ctx)
	if err != nil {
		return fmt.Errorf("NewHubClient failed: %w", err)
	}
	defer client.Close()

	req := &networkconnectivitypb.DeleteSpokeRequest{
		Name: name,
	}

	op, err := client.DeleteSpoke(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteSpoke: %w", err)
	}

	// DeleteSpoke is a long-running operation; wait for it to complete.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted spoke: %s\n", name)
	return nil
}

// [END networkconnectivity_v1alpha1_hubservice_spoke_delete]
