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

// [START cloudkms_v1_keymanagementservice_keyring_create]

import (
	"context"
	"fmt"
	"io"

	cloudkms "cloud.google.com/go/kms/apiv1"
	"cloud.google.com/go/kms/apiv1/kmspb"
)

// createKeyRing creates a new key ring in the specified project and location.
func createKeyRing(ctx context.Context, w io.Writer, projectID string, locationID string, keyRingID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	keyRing := &kmspb.KeyRing{}

	client, err := cloudkms.NewKeyManagementClient(ctx)
	if err != nil {
		return fmt.Errorf("NewKeyManagementClient failed: %w", err)
	}
	defer client.Close()

	req := &kmspb.CreateKeyRingRequest{
		Parent:    parent,
		KeyRingId: keyRingID,
		KeyRing:   keyRing,
	}

	resp, err := client.CreateKeyRing(ctx, req)
	if err != nil {
		return fmt.Errorf("failed to create key ring: %w", err)
	}

	fmt.Fprintf(w, "Created key ring: %s\n", resp.GetName())
	return nil
}

// [END cloudkms_v1_keymanagementservice_keyring_create]
