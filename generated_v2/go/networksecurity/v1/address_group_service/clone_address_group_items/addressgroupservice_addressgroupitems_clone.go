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

// [START networksecurity_v1_addressgroupservice_clone_address_group_items]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
)

// cloneAddressGroupItems clones items from a source address group into a destination address group.
func cloneAddressGroupItems(ctx context.Context, w io.Writer, projectID string, locationID string, addressGroupID string, sourceAddressGroupID string) error {
	sourceAddressGroup := fmt.Sprintf("projects/%s/locations/%s/addressGroups/%s", projectID, locationID, sourceAddressGroupID)
	addressGroup := fmt.Sprintf("projects/%s/locations/%s/addressGroups/%s", projectID, locationID, addressGroupID)

	client, err := networksecurity.NewAddressGroupClient(ctx)
	if err != nil {
		return fmt.Errorf("NewAddressGroupClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.CloneAddressGroupItemsRequest{
		AddressGroup:       addressGroup,
		SourceAddressGroup: sourceAddressGroup,
	}

	op, err := client.CloneAddressGroupItems(ctx, req)
	if err != nil {
		return fmt.Errorf("CloneAddressGroupItems failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("waiting for operation failed: %w", err)
	}

	fmt.Fprintf(w, "Cloned items to address group: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1_addressgroupservice_clone_address_group_items]
