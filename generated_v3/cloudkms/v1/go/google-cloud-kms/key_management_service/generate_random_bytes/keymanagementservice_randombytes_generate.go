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

// [START cloudkms_v1_keymanagementservice_generate_random_bytes]

import (
	"context"
	"fmt"
	"io"
	"strconv"

	cloudkms "cloud.google.com/go/kms/apiv1"
	"cloud.google.com/go/kms/apiv1/kmspb"
)

// generateRandomBytes generates random bytes using Cloud KMS.
func generateRandomBytes(ctx context.Context, w io.Writer, projectID string, locationID string, lengthBytes string) error {
	location := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	protectionLevel := kmspb.ProtectionLevel_HSM

	numBytes, err := strconv.Atoi(lengthBytes)
	if err != nil {
		return fmt.Errorf("strconv.Atoi: %w", err)
	}

	client, err := cloudkms.NewKeyManagementClient(ctx)
	if err != nil {
		return fmt.Errorf("NewKeyManagementClient failed: %w", err)
	}
	defer client.Close()

	req := &kmspb.GenerateRandomBytesRequest{
		Location:        location,
		LengthBytes:     int32(numBytes),
		ProtectionLevel: protectionLevel,
	}

	resp, err := client.GenerateRandomBytes(ctx, req)
	if err != nil {
		return fmt.Errorf("GenerateRandomBytes failed: %w", err)
	}

	fmt.Fprintf(w, "Random bytes: %x\n", resp.GetData())
	return nil
}

// [END cloudkms_v1_keymanagementservice_generate_random_bytes]
