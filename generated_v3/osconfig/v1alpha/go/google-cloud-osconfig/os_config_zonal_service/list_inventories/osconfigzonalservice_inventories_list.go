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

// [START osconfig_v1alpha_osconfigzonalservice_inventories_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	osconfig "cloud.google.com/go/osconfig/apiv1alpha"
	osconfigpb "cloud.google.com/go/osconfig/apiv1alpha/osconfigpb"
	"google.golang.org/api/iterator"
)

// listInventories retrieves and prints inventories for instances in a given project and zone.
func listInventories(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s/locations/us-central1-a/instances/-", projectID)

	client, err := osconfig.NewOsConfigZonalClient(ctx)
	if err != nil {
		return fmt.Errorf("NewOsConfigZonalClient failed: %w", err)
	}
	defer client.Close()

	req := &osconfigpb.ListInventoriesRequest{
		Parent: parent,
		View:   osconfigpb.InventoryView_BASIC,
	}

	it := client.ListInventories(ctx, req)
	var count int
	for {
		inventory, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate inventories: %w", err)
		}

		fmt.Fprintf(w, "Inventory found: %s\n", inventory.GetName())
		count++
	}

	fmt.Fprintf(w, "Total inventories: %d\n", count)
	return nil
}

// [END osconfig_v1alpha_osconfigzonalservice_inventories_list]
