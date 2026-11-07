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

// [START discoveryengine_v1_identitymappingstoreservice_identitymappingstore_create]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
)

// createIdentityMappingStore creates an identity mapping store.
func createIdentityMappingStore(ctx context.Context, w io.Writer, projectID string, locationID string, identityMappingStoreID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	identityMappingStore := &discoveryenginepb.IdentityMappingStore{}

	client, err := discoveryengine.NewIdentityMappingStoreClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIdentityMappingStoreClient failed: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.CreateIdentityMappingStoreRequest{
		Parent:                 parent,
		IdentityMappingStore:   identityMappingStore,
		IdentityMappingStoreId: identityMappingStoreID,
	}

	resp, err := client.CreateIdentityMappingStore(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateIdentityMappingStore failed: %w", err)
	}

	fmt.Fprintf(w, "Created identity mapping store: %s\n", resp.GetName())
	return nil
}

// [END discoveryengine_v1_identitymappingstoreservice_identitymappingstore_create]
