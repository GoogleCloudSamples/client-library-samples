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

// [START kmsinventory_v1_keydashboardservice_cryptokeys_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	kmsinventory "cloud.google.com/go/kms/inventory/apiv1"
	inventorypb "cloud.google.com/go/kms/inventory/apiv1/inventorypb"
	"google.golang.org/api/iterator"
)

// listCryptoKeys lists Cloud KMS keys in a project using KeyDashboardService.
func listCryptoKeys(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)

	client, err := kmsinventory.NewKeyDashboardClient(ctx)
	if err != nil {
		return fmt.Errorf("NewKeyDashboardClient failed: %w", err)
	}
	defer client.Close()

	req := &inventorypb.ListCryptoKeysRequest{
		Parent: parent,
	}

	it := client.ListCryptoKeys(ctx, req)
	for {
		key, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next failed: %w", err)
		}
		fmt.Fprintf(w, "CryptoKey: %s\n", key.GetName())
	}

	return nil
}

// [END kmsinventory_v1_keydashboardservice_cryptokeys_list]
