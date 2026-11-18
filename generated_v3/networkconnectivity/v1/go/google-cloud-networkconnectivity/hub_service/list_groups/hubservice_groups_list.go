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

// [START networkconnectivity_v1_hubservice_groups_list]

import (
	"context"
	"fmt"
	"io"

	networkconnectivity "cloud.google.com/go/networkconnectivity/apiv1beta"
	networkconnectivitypb "cloud.google.com/go/networkconnectivity/apiv1beta/networkconnectivitypb"
	"google.golang.org/api/iterator"
)

// listGroups lists groups associated with a Network Connectivity Center hub.
func listGroups(ctx context.Context, w io.Writer, projectID string, hubID string) error {
	parent := fmt.Sprintf("projects/%s/locations/global/hubs/%s", projectID, hubID)

	client, err := networkconnectivity.NewHubClient(ctx)
	if err != nil {
		return fmt.Errorf("NewHubClient failed: %w", err)
	}
	defer client.Close()

	req := &networkconnectivitypb.ListGroupsRequest{
		Parent: parent,
	}

	it := client.ListGroups(ctx, req)
	for {
		group, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next failed: %w", err)
		}

		fmt.Fprintf(w, "Group: %s\n", group.GetName())
	}

	return nil
}

// [END networkconnectivity_v1_hubservice_groups_list]
