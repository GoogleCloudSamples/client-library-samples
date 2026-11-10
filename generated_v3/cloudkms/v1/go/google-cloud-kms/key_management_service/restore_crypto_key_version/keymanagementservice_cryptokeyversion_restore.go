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

// [START cloudkms_v1_keymanagementservice_restore_crypto_key_version]

import (
	"context"
	"fmt"
	"io"

	cloudkms "cloud.google.com/go/kms/apiv1"
	kmspb "cloud.google.com/go/kms/apiv1/kmspb"
)

// restoreCryptoKeyVersion restores a crypto key version scheduled for destruction.
func restoreCryptoKeyVersion(ctx context.Context, w io.Writer, projectID string, locationID string, keyRingID string, cryptoKeyID string, cryptoKeyVersionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/keyRings/%s/cryptoKeys/%s/cryptoKeyVersions/%s", projectID, locationID, keyRingID, cryptoKeyID, cryptoKeyVersionID)

	client, err := cloudkms.NewKeyManagementClient(ctx)
	if err != nil {
		return fmt.Errorf("failed to create KMS client: %w", err)
	}
	defer client.Close()

	req := &kmspb.RestoreCryptoKeyVersionRequest{
		Name: name,
	}

	resp, err := client.RestoreCryptoKeyVersion(ctx, req)
	if err != nil {
		return fmt.Errorf("failed to restore crypto key version: %w", err)
	}

	fmt.Fprintf(w, "Restored crypto key version: %s (state: %s)\n", resp.GetName(), resp.GetState())
	return nil
}

// [END cloudkms_v1_keymanagementservice_restore_crypto_key_version]
