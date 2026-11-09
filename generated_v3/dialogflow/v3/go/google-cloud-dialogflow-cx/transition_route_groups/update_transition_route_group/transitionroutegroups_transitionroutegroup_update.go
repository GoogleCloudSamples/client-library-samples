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

// [START dialogflow_v3_transitionroutegroups_transitionroutegroup_update]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateTransitionRouteGroup updates the display name of a flow transition route group.
func updateTransitionRouteGroup(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, flowID string, transitionRouteGroupID string) error {
	formattedName := fmt.Sprintf("projects/%s/locations/%s/agents/%s/flows/%s/transitionRouteGroups/%s",
		projectID, locationID, agentID, flowID, transitionRouteGroupID)

	transitionRouteGroup := &cxpb.TransitionRouteGroup{
		Name:        formattedName,
		DisplayName: "updated-route-group",
	}

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewTransitionRouteGroupsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewTransitionRouteGroupsClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.UpdateTransitionRouteGroupRequest{
		TransitionRouteGroup: transitionRouteGroup,
		UpdateMask:           updateMask,
	}

	res, err := client.UpdateTransitionRouteGroup(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateTransitionRouteGroup failed: %w", err)
	}

	fmt.Fprintf(w, "Updated transition route group: %s\n", res.GetName())

	return nil
}

// [END dialogflow_v3_transitionroutegroups_transitionroutegroup_update]
