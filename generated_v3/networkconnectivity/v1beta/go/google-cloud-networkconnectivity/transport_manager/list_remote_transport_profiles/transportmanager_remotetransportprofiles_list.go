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

// [START networkconnectivity_v1beta_transportmanager_remotetransportprofiles_list]

import (
	"context"
	"fmt"
	"io"

	networkconnectivity "cloud.google.com/go/networkconnectivity/apiv1beta"
	networkconnectivitypb "cloud.google.com/go/networkconnectivity/apiv1beta/networkconnectivitypb"
	"google.golang.org/api/iterator"
)

// listRemoteTransportProfiles lists remote transport profiles in a given location.
func listRemoteTransportProfiles(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := networkconnectivity.NewTransportManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTransportManagerClient failed: %w", err)
	}
	defer client.Close()

	req := &networkconnectivitypb.ListRemoteTransportProfilesRequest{
		Parent: parent,
	}

	it := client.ListRemoteTransportProfiles(ctx, req)
	var count int
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to list remote transport profiles: %w", err)
		}
		fmt.Fprintf(w, "Remote transport profile: %s\n", resp.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No remote transport profiles found.")
	}

	return nil
}

// [END networkconnectivity_v1beta_transportmanager_remotetransportprofiles_list]
