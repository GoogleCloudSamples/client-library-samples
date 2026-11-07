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

// [START networkservices_v1_networkservices_httproute_create]

import (
	"context"
	"fmt"
	"io"

	networkservices "cloud.google.com/go/networkservices/apiv1"
	"cloud.google.com/go/networkservices/apiv1/networkservicespb"
)

// createHttpRoute creates an HTTP route in the specified project and location.
func createHttpRoute(ctx context.Context, w io.Writer, projectID string, locationID string, httpRouteID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	routeMatch := &networkservicespb.HttpRoute_RouteMatch{
		PathMatch: &networkservicespb.HttpRoute_RouteMatch_PrefixMatch{
			PrefixMatch: "/",
		},
	}
	routeRule := &networkservicespb.HttpRoute_RouteRule{
		Matches: []*networkservicespb.HttpRoute_RouteMatch{routeMatch},
	}
	httpRoute := &networkservicespb.HttpRoute{
		Description: "Example HTTP route",
		Hostnames:   []string{"example.com"},
		Rules:       []*networkservicespb.HttpRoute_RouteRule{routeRule},
	}

	client, err := networkservices.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &networkservicespb.CreateHttpRouteRequest{
		Parent:      parent,
		HttpRouteId: httpRouteID,
		HttpRoute:   httpRoute,
	}

	op, err := client.CreateHttpRoute(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateHttpRoute: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created HttpRoute: %s\n", resp.GetName())
	return nil
}

// [END networkservices_v1_networkservices_httproute_create]
