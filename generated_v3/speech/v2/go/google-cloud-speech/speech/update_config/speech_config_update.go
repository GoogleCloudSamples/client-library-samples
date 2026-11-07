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

// [START speech_v2_speech_config_update]

import (
	"context"
	"fmt"
	"io"

	speech "cloud.google.com/go/speech/apiv2"
	speechpb "cloud.google.com/go/speech/apiv2/speechpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateConfig updates the Cloud Speech-to-Text configuration for a project and location.
func updateConfig(ctx context.Context, w io.Writer, projectID string, locationID string, kmsKeyID string) error {
	config := &speechpb.Config{
		Name:       fmt.Sprintf("projects/%s/locations/%s/config", projectID, locationID),
		KmsKeyName: kmsKeyID,
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"kms_key_name"},
	}

	client, err := speech.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &speechpb.UpdateConfigRequest{
		Config:     config,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateConfig: %w", err)
	}

	fmt.Fprintf(w, "Updated config: %s\n", resp.GetName())
	return nil
}

// [END speech_v2_speech_config_update]
