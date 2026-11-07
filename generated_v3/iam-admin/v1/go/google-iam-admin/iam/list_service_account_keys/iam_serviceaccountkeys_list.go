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

// [START iam-admin_v1_iam_serviceaccountkeys_list]

import (
	"context"
	"fmt"
	"io"

	admin "cloud.google.com/go/iam/admin/apiv1"
	"cloud.google.com/go/iam/admin/apiv1/adminpb"
)

// listServiceAccountKeys lists the keys associated with a service account.
func listServiceAccountKeys(ctx context.Context, w io.Writer, projectID string, accountID string) error {
	name := fmt.Sprintf("projects/%s/serviceAccounts/%s", projectID, accountID)

	client, err := admin.NewIamClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIamClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.ListServiceAccountKeysRequest{
		Name: name,
		KeyTypes: []adminpb.ListServiceAccountKeysRequest_KeyType{
			adminpb.ListServiceAccountKeysRequest_USER_MANAGED,
			adminpb.ListServiceAccountKeysRequest_SYSTEM_MANAGED,
		},
	}

	resp, err := client.ListServiceAccountKeys(ctx, req)
	if err != nil {
		return fmt.Errorf("ListServiceAccountKeys: %w", err)
	}

	for _, key := range resp.GetKeys() {
		fmt.Fprintf(w, "Key: %s\n", key.GetName())
	}

	return nil
}

// [END iam-admin_v1_iam_serviceaccountkeys_list]
