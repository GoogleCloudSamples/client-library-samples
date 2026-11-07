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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_key_delete]

import (
	"context"
	"fmt"
	"io"

	recaptchaenterprise "cloud.google.com/go/recaptchaenterprise/v2/apiv1"
	recaptchaenterprisepb "cloud.google.com/go/recaptchaenterprise/v2/apiv1/recaptchaenterprisepb"
)

// deleteKey deletes an existing reCAPTCHA key in a Google Cloud project.
func deleteKey(ctx context.Context, w io.Writer, projectID string, keyID string) error {
	name := fmt.Sprintf("projects/%s/keys/%s", projectID, keyID)

	client, err := recaptchaenterprise.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("recaptchaenterprise.NewClient: %w", err)
	}
	defer client.Close()

	req := &recaptchaenterprisepb.DeleteKeyRequest{
		Name: name,
	}

	if err := client.DeleteKey(ctx, req); err != nil {
		return fmt.Errorf("DeleteKey: %w", err)
	}

	fmt.Fprintf(w, "Deleted key: %s\n", name)
	return nil
}

// [END recaptchaenterprise_v1_recaptchaenterpriseservice_key_delete]
