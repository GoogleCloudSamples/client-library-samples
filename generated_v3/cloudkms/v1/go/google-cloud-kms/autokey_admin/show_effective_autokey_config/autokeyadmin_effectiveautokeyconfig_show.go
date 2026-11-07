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

// [START cloudkms_v1_autokeyadmin_show_effective_autokey_config]

import (
	"context"
	"fmt"
	"io"

	cloudkms "cloud.google.com/go/kms/apiv1"
	kmspb "cloud.google.com/go/kms/apiv1/kmspb"
)

// showEffectiveAutokeyConfig displays the effective Cloud KMS Autokey configuration for a project.
func showEffectiveAutokeyConfig(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)

	client, err := cloudkms.NewAutokeyAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewAutokeyAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &kmspb.ShowEffectiveAutokeyConfigRequest{
		Parent: parent,
	}

	resp, err := client.ShowEffectiveAutokeyConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("failed to show effective Autokey config: %w", err)
	}

	fmt.Fprintf(w, "Effective key project: %s\n", resp.GetKeyProject())
	return nil
}

// [END cloudkms_v1_autokeyadmin_show_effective_autokey_config]
