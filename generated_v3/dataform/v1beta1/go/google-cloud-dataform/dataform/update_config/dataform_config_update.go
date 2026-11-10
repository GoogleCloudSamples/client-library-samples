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

// [START dataform_v1beta1_dataform_config_update]

import (
	"context"
	"fmt"
	"io"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	"cloud.google.com/go/dataform/apiv1beta1/dataformpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateConfig updates the project-level Dataform configuration with a KMS key.
func updateConfig(ctx context.Context, w io.Writer, projectID string, locationID string, cryptoKeyID string) error {
	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	config := &dataformpb.Config{
		Name:              fmt.Sprintf("projects/%s/locations/%s/config", projectID, locationID),
		DefaultKmsKeyName: cryptoKeyID,
	}

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"default_kms_key_name"},
	}

	req := &dataformpb.UpdateConfigRequest{
		Config:     config,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateConfig failed: %w", err)
	}

	fmt.Fprintf(w, "Updated config: %s\nDefault KMS Key: %s\n", resp.GetName(), resp.GetDefaultKmsKeyName())
	return nil
}

// [END dataform_v1beta1_dataform_config_update]
