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

// [START networksecurity_v1_addressgroupservice_remove_address_group_items]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	"cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
)

// removeAddressGroupItems removes IP addresses or CIDR ranges from an address group.
func removeAddressGroupItems(ctx context.Context, w io.Writer, projectID string, locationID string, addressGroupID string) error {
	addressGroup := fmt.Sprintf("projects/%s/locations/%s/addressGroups/%s", projectID, locationID, addressGroupID)
	items := "10.0.0.1"

	client, err := networksecurity.NewAddressGroupClient(ctx)
	if err != nil {
		return fmt.Errorf("NewAddressGroupClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.RemoveAddressGroupItemsRequest{
		AddressGroup: addressGroup,
		Items:        []string{items},
	}

	op, err := client.RemoveAddressGroupItems(ctx, req)
	if err != nil {
		return fmt.Errorf("RemoveAddressGroupItems failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Removed items from address group: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1_addressgroupservice_remove_address_group_items]
