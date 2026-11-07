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

// [START dialogflow_v3beta1_transitionroutegroups_transitionroutegroups_list]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listTransitionRouteGroups lists all transition route groups in a specified flow.
func listTransitionRouteGroups(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, flowID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s/flows/%s", projectID, locationID, agentID, flowID)

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewTransitionRouteGroupsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewTransitionRouteGroupsClient: %w", err)
	}
	defer client.Close()

	req := &cxpb.ListTransitionRouteGroupsRequest{
		Parent: parent,
	}

	it := client.ListTransitionRouteGroups(ctx, req)
	for {
		routeGroup, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListTransitionRouteGroups: %w", err)
		}

		fmt.Fprintf(w, "Transition Route Group: %s\n", routeGroup.GetName())
		fmt.Fprintf(w, "Display Name: %s\n", routeGroup.GetDisplayName())
		fmt.Fprintf(w, "Transition Routes Count: %d\n", len(routeGroup.GetTransitionRoutes()))
	}

	return nil
}

// [END dialogflow_v3beta1_transitionroutegroups_transitionroutegroups_list]
