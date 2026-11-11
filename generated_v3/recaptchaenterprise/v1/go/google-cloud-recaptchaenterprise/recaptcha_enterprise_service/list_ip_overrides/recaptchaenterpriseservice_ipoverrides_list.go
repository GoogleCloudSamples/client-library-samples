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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_ipoverrides_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	recaptchaenterprise "cloud.google.com/go/recaptchaenterprise/v2/apiv1"
	recaptchaenterprisepb "cloud.google.com/go/recaptchaenterprise/v2/apiv1/recaptchaenterprisepb"
	"google.golang.org/api/iterator"
)

// listIpOverrides lists all IP overrides configured for the given reCAPTCHA key.
func listIpOverrides(ctx context.Context, w io.Writer, projectID string, keyID string) error {
	parent := fmt.Sprintf("projects/%s/keys/%s", projectID, keyID)

	client, err := recaptchaenterprise.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("recaptchaenterprise.NewClient: %w", err)
	}
	defer client.Close()

	req := &recaptchaenterprisepb.ListIpOverridesRequest{
		Parent: parent,
	}

	it := client.ListIpOverrides(ctx, req)
	for {
		override, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("iteration error: %w", err)
		}
		fmt.Fprintf(w, "IP: %s, Override Type: %s\n", override.GetIp(), override.GetOverrideType())
	}

	return nil
}

// [END recaptchaenterprise_v1_recaptchaenterpriseservice_ipoverrides_list]
