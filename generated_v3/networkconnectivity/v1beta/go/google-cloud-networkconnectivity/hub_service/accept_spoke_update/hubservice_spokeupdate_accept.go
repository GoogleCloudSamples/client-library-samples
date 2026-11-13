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

// [START networkconnectivity_v1beta_hubservice_accept_spoke_update]

import (
	"context"
	"fmt"
	"io"

	networkconnectivity "cloud.google.com/go/networkconnectivity/apiv1beta"
	networkconnectivitypb "cloud.google.com/go/networkconnectivity/apiv1beta/networkconnectivitypb"
)

// acceptSpokeUpdate accepts a pending update to a spoke associated with a hub.
func acceptSpokeUpdate(ctx context.Context, w io.Writer, projectID string, hubID string, spokeURI string, spokeEtag string) error {
	name := fmt.Sprintf("projects/%s/locations/global/hubs/%s", projectID, hubID)

	client, err := networkconnectivity.NewHubClient(ctx)
	if err != nil {
		return fmt.Errorf("NewHubClient failed: %w", err)
	}
	defer client.Close()

	req := &networkconnectivitypb.AcceptSpokeUpdateRequest{
		Name:      name,
		SpokeUri:  spokeURI,
		SpokeEtag: spokeEtag,
	}

	op, err := client.AcceptSpokeUpdate(ctx, req)
	if err != nil {
		return fmt.Errorf("AcceptSpokeUpdate failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Accepted spoke update for: %s\n", resp.GetSpoke().GetName())
	return nil
}

// [END networkconnectivity_v1beta_hubservice_accept_spoke_update]
