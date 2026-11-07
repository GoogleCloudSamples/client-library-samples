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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_key_update]

import (
	"context"
	"fmt"
	"io"

	recaptchaenterprise "cloud.google.com/go/recaptchaenterprise/v2/apiv1"
	recaptchaenterprisepb "cloud.google.com/go/recaptchaenterprise/v2/apiv1/recaptchaenterprisepb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateKey updates an existing reCAPTCHA key.
func updateKey(ctx context.Context, w io.Writer, projectID string, keyID string) error {
	key := &recaptchaenterprisepb.Key{
		Name:        fmt.Sprintf("projects/%s/keys/%s", projectID, keyID),
		DisplayName: "Updated Key",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	client, err := recaptchaenterprise.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &recaptchaenterprisepb.UpdateKeyRequest{
		Key:        key,
		UpdateMask: updateMask,
	}

	response, err := client.UpdateKey(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateKey: %w", err)
	}

	fmt.Fprintf(w, "Updated key: %s\n", response.GetName())

	return nil
}

// [END recaptchaenterprise_v1_recaptchaenterpriseservice_key_update]
