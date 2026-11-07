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

// [START cloudkms_v1_keymanagementservice_cryptokey_update]

import (
	"context"
	"fmt"
	"io"

	cloudkms "cloud.google.com/go/kms/apiv1"
	"cloud.google.com/go/kms/apiv1/kmspb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateCryptoKey updates user labels on an existing Cloud KMS CryptoKey.
func updateCryptoKey(ctx context.Context, w io.Writer, projectID string, locationID string, keyRingID string, cryptoKeyID string) error {
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"labels"},
	}
	cryptoKey := &kmspb.CryptoKey{
		Name: fmt.Sprintf("projects/%s/locations/%s/keyRings/%s/cryptoKeys/%s", projectID, locationID, keyRingID, cryptoKeyID),
		Labels: map[string]string{
			"env": "production",
		},
	}

	client, err := cloudkms.NewKeyManagementClient(ctx)
	if err != nil {
		return fmt.Errorf("NewKeyManagementClient failed: %w", err)
	}
	defer client.Close()

	req := &kmspb.UpdateCryptoKeyRequest{
		CryptoKey:  cryptoKey,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateCryptoKey(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateCryptoKey failed: %w", err)
	}

	fmt.Fprintf(w, "Updated CryptoKey: %s\n", resp.GetName())
	return nil
}

// [END cloudkms_v1_keymanagementservice_cryptokey_update]
