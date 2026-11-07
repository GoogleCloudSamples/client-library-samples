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

// [START cloudkms_v1_keymanagementservice_cryptokeyversions_list]

import (
	"context"
	"fmt"
	"io"

	cloudkms "cloud.google.com/go/kms/apiv1"
	kmspb "cloud.google.com/go/kms/apiv1/kmspb"
	"google.golang.org/api/iterator"
)

// listCryptoKeyVersions lists all key versions for a given CryptoKey.
func listCryptoKeyVersions(ctx context.Context, w io.Writer, projectID string, locationID string, keyRingID string, cryptoKeyID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/keyRings/%s/cryptoKeys/%s", projectID, locationID, keyRingID, cryptoKeyID)

	client, err := cloudkms.NewKeyManagementClient(ctx)
	if err != nil {
		return fmt.Errorf("NewKeyManagementClient failed: %w", err)
	}
	defer client.Close()

	req := &kmspb.ListCryptoKeyVersionsRequest{
		Parent: parent,
	}

	it := client.ListCryptoKeyVersions(ctx, req)
	for {
		version, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to list crypto key versions: %w", err)
		}
		fmt.Fprintf(w, "CryptoKeyVersion: %s (State: %s)\n", version.GetName(), version.GetState())
	}

	return nil
}

// [END cloudkms_v1_keymanagementservice_cryptokeyversions_list]
