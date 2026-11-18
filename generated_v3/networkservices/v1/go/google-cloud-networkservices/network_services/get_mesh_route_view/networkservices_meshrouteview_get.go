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

// [START networkservices_v1_networkservices_meshrouteview_get]

import (
	"context"
	"fmt"
	"io"

	networkservices "cloud.google.com/go/networkservices/apiv1"
	networkservicespb "cloud.google.com/go/networkservices/apiv1/networkservicespb"
)

// getMeshRouteView retrieves a specific route view associated with a mesh.
func getMeshRouteView(ctx context.Context, w io.Writer, projectID string, locationID string, meshID string, routeViewID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/meshes/%s/routeViews/%s", projectID, locationID, meshID, routeViewID)

	client, err := networkservices.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networkservicespb.GetMeshRouteViewRequest{
		Name: name,
	}

	routeView, err := client.GetMeshRouteView(ctx, req)
	if err != nil {
		return fmt.Errorf("GetMeshRouteView failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved route view: %s\n", routeView.GetName())
	return nil
}

// [END networkservices_v1_networkservices_meshrouteview_get]
