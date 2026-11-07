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

// [START networkconnectivity_v1_internalrangeservice_internalrange_create]

import (
	"context"
	"fmt"
	"io"

	networkconnectivity "cloud.google.com/go/networkconnectivity/apiv1"
	networkconnectivitypb "cloud.google.com/go/networkconnectivity/apiv1/networkconnectivitypb"
)

// createInternalRange creates an internal range for a Virtual Private Cloud (VPC) network.
func createInternalRange(ctx context.Context, w io.Writer, projectID string, locationID string, internalRangeID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	internalRange := &networkconnectivitypb.InternalRange{
		Network:      fmt.Sprintf("projects/%s/locations/global/networks/default", projectID),
		Usage:        networkconnectivitypb.InternalRange_FOR_VPC,
		Peering:      networkconnectivitypb.InternalRange_FOR_SELF,
		PrefixLength: 24,
	}

	client, err := networkconnectivity.NewInternalRangeClient(ctx)
	if err != nil {
		return fmt.Errorf("NewInternalRangeClient failed: %w", err)
	}
	defer client.Close()

	req := &networkconnectivitypb.CreateInternalRangeRequest{
		Parent:          parent,
		InternalRangeId: internalRangeID,
		InternalRange:   internalRange,
	}

	op, err := client.CreateInternalRange(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateInternalRange failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("waiting for internal range creation failed: %w", err)
	}

	fmt.Fprintf(w, "Created internal range: %s\n", resp.GetName())
	return nil
}

// [END networkconnectivity_v1_internalrangeservice_internalrange_create]
