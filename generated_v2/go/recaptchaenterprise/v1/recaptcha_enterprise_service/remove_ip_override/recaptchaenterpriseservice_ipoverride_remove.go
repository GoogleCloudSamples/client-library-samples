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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_remove_ip_override]

import (
	"context"
	"fmt"
	"io"

	recaptchaenterprise "cloud.google.com/go/recaptchaenterprise/v2/apiv1"
	"cloud.google.com/go/recaptchaenterprise/v2/apiv1/recaptchaenterprisepb"
)

// removeIpOverride removes an existing IP override from a reCAPTCHA key.
func removeIpOverride(ctx context.Context, w io.Writer, projectID string, keyID string) error {
	name := fmt.Sprintf("projects/%s/keys/%s", projectID, keyID)
	ipOverrideData := &recaptchaenterprisepb.IpOverrideData{
		Ip:           "198.51.100.1",
		OverrideType: recaptchaenterprisepb.IpOverrideData_ALLOW,
	}

	client, err := recaptchaenterprise.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("recaptchaenterprise.NewClient: %w", err)
	}
	defer client.Close()

	req := &recaptchaenterprisepb.RemoveIpOverrideRequest{
		Name:           name,
		IpOverrideData: ipOverrideData,
	}

	if _, err := client.RemoveIpOverride(ctx, req); err != nil {
		return fmt.Errorf("client.RemoveIpOverride: %w", err)
	}

	fmt.Fprintf(w, "Removed IP override: %s\n", ipOverrideData.GetIp())
	return nil
}

// [END recaptchaenterprise_v1_recaptchaenterpriseservice_remove_ip_override]
