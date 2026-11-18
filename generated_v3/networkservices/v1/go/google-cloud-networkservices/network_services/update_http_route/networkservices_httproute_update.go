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

// [START networkservices_v1_networkservices_httproute_update]

import (
	"context"
	"fmt"
	"io"

	networkservices "cloud.google.com/go/networkservices/apiv1"
	networkservicespb "cloud.google.com/go/networkservices/apiv1/networkservicespb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateHttpRoute updates an existing HTTP route.
func updateHttpRoute(ctx context.Context, w io.Writer, projectID string, locationID string, httpRouteID string) error {
	httpRoute := &networkservicespb.HttpRoute{
		Name:        fmt.Sprintf("projects/%s/locations/%s/httpRoutes/%s", projectID, locationID, httpRouteID),
		Description: "Updated description for HTTP route",
		Hostnames:   []string{"example.com"},
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := networkservices.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networkservicespb.UpdateHttpRouteRequest{
		UpdateMask: updateMask,
		HttpRoute:  httpRoute,
	}

	op, err := client.UpdateHttpRoute(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateHttpRoute failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated HTTP route: %s\n", resp.GetName())
	return nil
}

// [END networkservices_v1_networkservices_httproute_update]
