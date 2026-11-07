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

// [START networkconnectivity_v1_internalrangeservice_internalrange_update]

import (
	"context"
	"fmt"
	"io"

	networkconnectivity "cloud.google.com/go/networkconnectivity/apiv1"
	"cloud.google.com/go/networkconnectivity/apiv1/networkconnectivitypb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateInternalRange updates the description of an existing internal range.
func updateInternalRange(ctx context.Context, w io.Writer, projectID string, locationID string, internalRangeID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/internalRanges/%s", projectID, locationID, internalRangeID)
	internalRange := &networkconnectivitypb.InternalRange{
		Name:        name,
		Description: "Updated description for example-internal-range",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := networkconnectivity.NewInternalRangeClient(ctx)
	if err != nil {
		return fmt.Errorf("NewInternalRangeClient failed: %w", err)
	}
	defer client.Close()

	req := &networkconnectivitypb.UpdateInternalRangeRequest{
		InternalRange: internalRange,
		UpdateMask:    updateMask,
	}

	op, err := client.UpdateInternalRange(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateInternalRange failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("waiting for operation to complete failed: %w", err)
	}

	fmt.Fprintf(w, "Updated internal range: %s\n", resp.GetName())
	return nil
}

// [END networkconnectivity_v1_internalrangeservice_internalrange_update]
