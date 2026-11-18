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

// [START networkservices_v1_networkservices_tlsroute_update]

import (
	"context"
	"fmt"
	"io"

	networkservices "cloud.google.com/go/networkservices/apiv1"
	networkservicespb "cloud.google.com/go/networkservices/apiv1/networkservicespb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateTlsRoute updates the description of an existing TLS route.
func updateTlsRoute(ctx context.Context, w io.Writer, projectID string, locationID string, tlsRouteID string) error {
	client, err := networkservices.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	name := fmt.Sprintf("projects/%s/locations/%s/tlsRoutes/%s", projectID, locationID, tlsRouteID)

	// Retrieve the existing TLS route to retain required fields such as rules.
	existingRoute, err := client.GetTlsRoute(ctx, &networkservicespb.GetTlsRouteRequest{
		Name: name,
	})
	if err != nil {
		return fmt.Errorf("GetTlsRoute failed: %w", err)
	}

	tlsRoute := &networkservicespb.TlsRoute{
		Name:        name,
		Description: "Updated TLS route description",
		Rules:       existingRoute.GetRules(),
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	req := &networkservicespb.UpdateTlsRouteRequest{
		TlsRoute:   tlsRoute,
		UpdateMask: updateMask,
	}

	op, err := client.UpdateTlsRoute(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateTlsRoute failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated TLS route: %s\n", resp.GetName())
	return nil
}

// [END networkservices_v1_networkservices_tlsroute_update]
