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

// [START iam-admin_v1_iam_serviceaccountkey_get]

import (
	"context"
	"fmt"
	"io"

	admin "cloud.google.com/go/iam/admin/apiv1"
	"cloud.google.com/go/iam/admin/apiv1/adminpb"
)

// getServiceAccountKey gets metadata for a service account key.
func getServiceAccountKey(ctx context.Context, w io.Writer, projectID string, serviceAccountID string, keyID string) error {
	name := fmt.Sprintf("projects/%s/serviceAccounts/%s/keys/%s", projectID, serviceAccountID, keyID)

	client, err := admin.NewIamClient(ctx)
	if err != nil {
		return fmt.Errorf("admin.NewIamClient: %w", err)
	}
	defer client.Close()

	req := &adminpb.GetServiceAccountKeyRequest{
		Name:          name,
		PublicKeyType: adminpb.ServiceAccountPublicKeyType_TYPE_X509_PEM_FILE,
	}

	key, err := client.GetServiceAccountKey(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetServiceAccountKey: %w", err)
	}

	fmt.Fprintf(w, "Retrieved service account key: %s\n", key.GetName())
	return nil
}

// [END iam-admin_v1_iam_serviceaccountkey_get]
