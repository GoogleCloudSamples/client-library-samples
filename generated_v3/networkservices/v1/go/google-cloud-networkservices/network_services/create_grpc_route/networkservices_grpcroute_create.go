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

// [START networkservices_v1_networkservices_grpcroute_create]

import (
	"context"
	"fmt"
	"io"

	networkservices "cloud.google.com/go/networkservices/apiv1"
	networkservicespb "cloud.google.com/go/networkservices/apiv1/networkservicespb"
)

// createGrpcRoute creates a gRPC route in a specified project and location.
func createGrpcRoute(ctx context.Context, w io.Writer, projectID string, locationID string, gRPCRouteID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	destinations := []*networkservicespb.GrpcRoute_Destination{
		{
			DestinationType: &networkservicespb.GrpcRoute_Destination_ServiceName{
				ServiceName: fmt.Sprintf("projects/%s/locations/%s/backendServices/example-backend-service", projectID, locationID),
			},
		},
	}
	routeRules := []*networkservicespb.GrpcRoute_RouteRule{
		{
			Action: &networkservicespb.GrpcRoute_RouteAction{
				Destinations: destinations,
			},
		},
	}
	grpcRoute := &networkservicespb.GrpcRoute{
		Hostnames: []string{"example-service.com"},
		Rules:     routeRules,
	}

	client, err := networkservices.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networkservicespb.CreateGrpcRouteRequest{
		Parent:      parent,
		GrpcRouteId: gRPCRouteID,
		GrpcRoute:   grpcRoute,
	}

	op, err := client.CreateGrpcRoute(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateGrpcRoute failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created GrpcRoute: %s\n", resp.GetName())
	return nil
}

// [END networkservices_v1_networkservices_grpcroute_create]
