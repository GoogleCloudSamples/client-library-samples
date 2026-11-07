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

// [START cloudkms_v1_keymanagementservice_importjob_create]

import (
	"context"
	"fmt"
	"io"

	cloudkms "cloud.google.com/go/kms/apiv1"
	"cloud.google.com/go/kms/apiv1/kmspb"
)

// createImportJob creates a new import job in Cloud KMS.
func createImportJob(ctx context.Context, w io.Writer, importJobID string, projectID string, locationID string, keyRingID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/keyRings/%s", projectID, locationID, keyRingID)
	importJob := &kmspb.ImportJob{
		ImportMethod:    kmspb.ImportJob_RSA_OAEP_3072_SHA1_AES_256,
		ProtectionLevel: kmspb.ProtectionLevel_HSM,
	}

	client, err := cloudkms.NewKeyManagementClient(ctx)
	if err != nil {
		return fmt.Errorf("failed to create key management client: %w", err)
	}
	defer client.Close()

	req := &kmspb.CreateImportJobRequest{
		Parent:      parent,
		ImportJobId: importJobID,
		ImportJob:   importJob,
	}

	result, err := client.CreateImportJob(ctx, req)
	if err != nil {
		return fmt.Errorf("failed to create import job: %w", err)
	}

	fmt.Fprintf(w, "Created import job: %s\n", result.GetName())
	return nil
}

// [END cloudkms_v1_keymanagementservice_importjob_create]
