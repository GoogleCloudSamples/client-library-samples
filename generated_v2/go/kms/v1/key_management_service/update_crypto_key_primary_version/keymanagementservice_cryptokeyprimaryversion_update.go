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

// [START cloudkms_v1_keymanagementservice_cryptokeyprimaryversion_update]

import (
	"context"
	"fmt"
	"io"

	cloudkms "cloud.google.com/go/kms/apiv1"
	kmspb "cloud.google.com/go/kms/apiv1/kmspb"
)

// updateCryptoKeyPrimaryVersion updates the primary version of a CryptoKey.
func updateCryptoKeyPrimaryVersion(ctx context.Context, w io.Writer, cryptoKeyVersionID string, projectID string, locationID string, keyRingID string, cryptoKeyID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/keyRings/%s/cryptoKeys/%s", projectID, locationID, keyRingID, cryptoKeyID)

	client, err := cloudkms.NewKeyManagementClient(ctx)
	if err != nil {
		return fmt.Errorf("NewKeyManagementClient failed: %w", err)
	}
	defer client.Close()

	req := &kmspb.UpdateCryptoKeyPrimaryVersionRequest{
		Name:               name,
		CryptoKeyVersionId: cryptoKeyVersionID,
	}

	response, err := client.UpdateCryptoKeyPrimaryVersion(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateCryptoKeyPrimaryVersion failed: %w", err)
	}

	fmt.Fprintf(w, "Updated primary version: %s\n", response.GetPrimary().GetName())
	return nil
}

// [END cloudkms_v1_keymanagementservice_cryptokeyprimaryversion_update]
