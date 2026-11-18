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

// [START networkservices_v1_networkservices_grpcroute_update]

import (
	"context"
	"fmt"
	"io"

	networkservices "cloud.google.com/go/networkservices/apiv1"
	networkservicespb "cloud.google.com/go/networkservices/apiv1/networkservicespb"
	fieldmaskpb "google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateGrpcRoute updates the description of an existing GrpcRoute.
func updateGrpcRoute(ctx context.Context, w io.Writer, projectID string, locationID string, grpcRouteID string) error {
	client, err := networkservices.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	grpcRouteName := fmt.Sprintf("projects/%s/locations/%s/grpcRoutes/%s", projectID, locationID, grpcRouteID)

	// Fetch existing GrpcRoute to preserve required configuration such as rules during update.
	grpcRoute, err := client.GetGrpcRoute(ctx, &networkservicespb.GetGrpcRouteRequest{
		Name: grpcRouteName,
	})
	if err != nil {
		return fmt.Errorf("GetGrpcRoute failed: %w", err)
	}

	grpcRoute.Description = "Updated GrpcRoute description"

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	req := &networkservicespb.UpdateGrpcRouteRequest{
		UpdateMask: updateMask,
		GrpcRoute:  grpcRoute,
	}

	op, err := client.UpdateGrpcRoute(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateGrpcRoute failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated GrpcRoute: %s\n", resp.GetName())
	return nil
}

// [END networkservices_v1_networkservices_grpcroute_update]
