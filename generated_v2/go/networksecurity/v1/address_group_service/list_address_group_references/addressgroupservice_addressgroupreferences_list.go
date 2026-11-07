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

// [START networksecurity_v1_addressgroupservice_addressgroupreferences_list]

import (
	"context"
	"fmt"
	"io"
	"strings"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	"cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
	"google.golang.org/api/iterator"
)

// listAddressGroupReferences lists references to a specific address group.
func listAddressGroupReferences(ctx context.Context, w io.Writer, projectsOrganizationID string, locationID string, addressGroupID string) error {
	parent := projectsOrganizationID
	if !strings.Contains(parent, "/") {
		parent = "projects/" + parent
	}
	addressGroup := fmt.Sprintf("%s/locations/%s/addressGroups/%s", parent, locationID, addressGroupID)

	client, err := networksecurity.NewAddressGroupClient(ctx)
	if err != nil {
		return fmt.Errorf("NewAddressGroupClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.ListAddressGroupReferencesRequest{
		AddressGroup: addressGroup,
	}

	it := client.ListAddressGroupReferences(ctx, req)
	count := 0
	for {
		ref, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "Reference to firewall policy: %s (rule priority: %d)\n", ref.GetFirewallPolicy(), ref.GetRulePriority())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No address group references found.")
	}

	return nil
}

// [END networksecurity_v1_addressgroupservice_addressgroupreferences_list]
