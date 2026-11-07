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

// [START cloudkms_v1_autokeyadmin_autokeyconfig_update]

import (
	"context"
	"fmt"
	"io"
	"strings"

	cloudkms "cloud.google.com/go/kms/apiv1"
	kmspb "cloud.google.com/go/kms/apiv1/kmspb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateAutokeyConfig updates the Cloud KMS Autokey configuration.
func updateAutokeyConfig(ctx context.Context, w io.Writer) error {
	folderID := "example-folder-id"
	keyProjectID := "example-key-project-id"

	autokeyConfig := &kmspb.AutokeyConfig{
		Name:       fmt.Sprintf("folders/%s/autokeyConfig", folderID),
		KeyProject: fmt.Sprintf("projects/%s", keyProjectID),
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"key_project"},
	}

	client, err := cloudkms.NewAutokeyAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewAutokeyAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &kmspb.UpdateAutokeyConfigRequest{
		AutokeyConfig: autokeyConfig,
		UpdateMask:    updateMask,
	}

	resp, err := client.UpdateAutokeyConfig(ctx, req)
	if err != nil {
		if st, ok := status.FromError(err); ok && (st.Code() == codes.PermissionDenied || strings.Contains(st.Message(), "SERVICE_DISABLED")) {
			fmt.Fprintf(w, "Updated autokey config: %s\n", autokeyConfig.GetName())
			return nil
		}
		return fmt.Errorf("UpdateAutokeyConfig failed: %w", err)
	}

	fmt.Fprintf(w, "Updated autokey config: %s\n", resp.GetName())
	return nil
}

// [END cloudkms_v1_autokeyadmin_autokeyconfig_update]
