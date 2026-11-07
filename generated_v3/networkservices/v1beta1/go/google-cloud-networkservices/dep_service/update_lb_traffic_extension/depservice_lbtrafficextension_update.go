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

// [START networkservices_v1beta1_depservice_lbtrafficextension_update]

import (
	"context"
	"fmt"
	"io"

	networkservices "cloud.google.com/go/networkservices/apiv1beta1"
	"cloud.google.com/go/networkservices/apiv1beta1/networkservicespb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateLbTrafficExtension updates an existing traffic extension's description.
func updateLbTrafficExtension(ctx context.Context, w io.Writer, projectID string, locationID string, lbTrafficExtensionID string) error {
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}
	lbTrafficExtension := &networkservicespb.LbTrafficExtension{
		Name:        fmt.Sprintf("projects/%s/locations/%s/lbTrafficExtensions/%s", projectID, locationID, lbTrafficExtensionID),
		Description: "Updated description for traffic extension",
	}

	client, err := networkservices.NewDepClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDepClient failed: %w", err)
	}
	defer client.Close()

	req := &networkservicespb.UpdateLbTrafficExtensionRequest{
		UpdateMask:         updateMask,
		LbTrafficExtension: lbTrafficExtension,
	}

	op, err := client.UpdateLbTrafficExtension(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateLbTrafficExtension failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("waiting for operation failed: %w", err)
	}

	fmt.Fprintf(w, "Updated LbTrafficExtension: %s\n", resp.GetName())
	return nil
}

// [END networkservices_v1beta1_depservice_lbtrafficextension_update]
