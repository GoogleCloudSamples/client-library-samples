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

// [START discoveryengine_v1_userlicenseservice_userlicenses_list]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
	"google.golang.org/api/iterator"
)

// listUserLicenses lists user licenses in a given user store.
func listUserLicenses(ctx context.Context, w io.Writer, projectID string, locationID string, userStoreID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/userStores/%s", projectID, locationID, userStoreID)

	client, err := discoveryengine.NewUserLicenseClient(ctx)
	if err != nil {
		return fmt.Errorf("NewUserLicenseClient: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.ListUserLicensesRequest{
		Parent: parent,
	}

	it := client.ListUserLicenses(ctx, req)
	for {
		license, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("Next: %w", err)
		}
		fmt.Fprintf(w, "User principal: %s\n", license.GetUserPrincipal())
	}

	return nil
}

// [END discoveryengine_v1_userlicenseservice_userlicenses_list]
