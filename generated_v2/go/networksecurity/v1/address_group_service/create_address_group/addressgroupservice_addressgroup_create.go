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

// [START networksecurity_v1_addressgroupservice_addressgroup_create]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
)

// createAddressGroup creates an address group in the specified location.
func createAddressGroup(ctx context.Context, w io.Writer, projectID string, locationID string, addressGroupID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	addressGroup := &networksecuritypb.AddressGroup{
		Description: "Example Address Group",
		Type:        networksecuritypb.AddressGroup_IPV4,
		Capacity:    100,
		Items:       []string{"10.0.0.0/16"},
	}

	client, err := networksecurity.NewAddressGroupClient(ctx)
	if err != nil {
		return fmt.Errorf("NewAddressGroupClient: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.CreateAddressGroupRequest{
		Parent:         parent,
		AddressGroupId: addressGroupID,
		AddressGroup:   addressGroup,
	}

	op, err := client.CreateAddressGroup(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateAddressGroup: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created address group: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1_addressgroupservice_addressgroup_create]
