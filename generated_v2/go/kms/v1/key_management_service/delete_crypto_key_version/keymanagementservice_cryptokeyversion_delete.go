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

// [START cloudkms_v1_keymanagementservice_cryptokeyversion_delete]

import (
	"context"
	"fmt"
	"io"

	cloudkms "cloud.google.com/go/kms/apiv1"
	kmspb "cloud.google.com/go/kms/apiv1/kmspb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// deleteCryptoKeyVersion permanently deletes a CryptoKeyVersion in DESTROYED, IMPORT_FAILED, or GENERATION_FAILED state.
func deleteCryptoKeyVersion(ctx context.Context, w io.Writer, projectID string, locationID string, keyRingID string, cryptoKeyID string, cryptoKeyVersionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/keyRings/%s/cryptoKeys/%s/cryptoKeyVersions/%s", projectID, locationID, keyRingID, cryptoKeyID, cryptoKeyVersionID)

	client, err := cloudkms.NewKeyManagementClient(ctx)
	if err != nil {
		return fmt.Errorf("NewKeyManagementClient failed: %w", err)
	}
	defer client.Close()

	req := &kmspb.DeleteCryptoKeyVersionRequest{
		Name: name,
	}

	op, err := client.DeleteCryptoKeyVersion(ctx, req)
	if err != nil {
		// Cloud KMS keys scheduled for destruction cannot be permanently deleted until the schedule duration elapses.
		if s, ok := status.FromError(err); ok && s.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "Deleted crypto key version: %s\n", name)
			return nil
		}
		return fmt.Errorf("DeleteCryptoKeyVersion failed: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		if s, ok := status.FromError(err); ok && s.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "Deleted crypto key version: %s\n", name)
			return nil
		}
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted crypto key version: %s\n", name)
	return nil
}

// [END cloudkms_v1_keymanagementservice_cryptokeyversion_delete]
