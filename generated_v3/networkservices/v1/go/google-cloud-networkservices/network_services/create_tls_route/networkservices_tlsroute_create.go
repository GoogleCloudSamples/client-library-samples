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

// [START networkservices_v1_networkservices_tlsroute_create]

import (
	"context"
	"fmt"
	"io"

	networkservices "cloud.google.com/go/networkservices/apiv1"
	networkservicespb "cloud.google.com/go/networkservices/apiv1/networkservicespb"
)

// createTlsRoute creates a TLS route resource in Network Services.
func createTlsRoute(ctx context.Context, w io.Writer, projectID string, locationID string, tlsRouteID string, backendServiceID string) error {
	client, err := networkservices.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	backendServiceURI := fmt.Sprintf("projects/%s/global/backendServices/%s", projectID, backendServiceID)

	match := &networkservicespb.TlsRoute_RouteMatch{
		SniHost: []string{"example.com"},
	}
	destination := &networkservicespb.TlsRoute_RouteDestination{
		ServiceName: backendServiceURI,
	}
	action := &networkservicespb.TlsRoute_RouteAction{
		Destinations: []*networkservicespb.TlsRoute_RouteDestination{destination},
	}
	rule := &networkservicespb.TlsRoute_RouteRule{
		Matches: []*networkservicespb.TlsRoute_RouteMatch{match},
		Action:  action,
	}
	tlsRoute := &networkservicespb.TlsRoute{
		Rules: []*networkservicespb.TlsRoute_RouteRule{rule},
	}

	req := &networkservicespb.CreateTlsRouteRequest{
		Parent:     parent,
		TlsRouteId: tlsRouteID,
		TlsRoute:   tlsRoute,
	}

	op, err := client.CreateTlsRoute(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateTlsRoute failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created TLS route: %s\n", resp.GetName())
	return nil
}

// [END networkservices_v1_networkservices_tlsroute_create]
