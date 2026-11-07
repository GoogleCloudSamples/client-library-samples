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

// [START discoveryengine_v1beta_userstoreservice_userstore_update]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateUserStore updates the display name of a user store.
func updateUserStore(ctx context.Context, w io.Writer, projectID string, locationID string, userStoreID string) error {
	userStore := &discoveryenginepb.UserStore{
		Name:        fmt.Sprintf("projects/%s/locations/%s/userStores/%s", projectID, locationID, userStoreID),
		DisplayName: "Updated User Store",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	client, err := discoveryengine.NewUserStoreClient(ctx)
	if err != nil {
		return fmt.Errorf("NewUserStoreClient: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.UpdateUserStoreRequest{
		UserStore:  userStore,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateUserStore(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateUserStore: %w", err)
	}

	fmt.Fprintf(w, "Updated user store: %s\n", resp.GetName())

	return nil
}

// [END discoveryengine_v1beta_userstoreservice_userstore_update]
