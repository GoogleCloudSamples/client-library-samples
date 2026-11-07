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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_key_get]

import (
	"context"
	"fmt"
	"io"

	recaptchaenterprise "cloud.google.com/go/recaptchaenterprise/v2/apiv1"
	recaptchaenterprisepb "cloud.google.com/go/recaptchaenterprise/v2/apiv1/recaptchaenterprisepb"
)

// getKey retrieves a reCAPTCHA key using the GetKey method.
func getKey(ctx context.Context, w io.Writer, projectID string, keyID string) error {
	name := fmt.Sprintf("projects/%s/keys/%s", projectID, keyID)

	client, err := recaptchaenterprise.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &recaptchaenterprisepb.GetKeyRequest{
		Name: name,
	}

	resp, err := client.GetKey(ctx, req)
	if err != nil {
		return fmt.Errorf("GetKey failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved key: %s\n", resp.GetName())
	fmt.Fprintf(w, "Display name: %s\n", resp.GetDisplayName())

	return nil
}

// [END recaptchaenterprise_v1_recaptchaenterpriseservice_key_get]
