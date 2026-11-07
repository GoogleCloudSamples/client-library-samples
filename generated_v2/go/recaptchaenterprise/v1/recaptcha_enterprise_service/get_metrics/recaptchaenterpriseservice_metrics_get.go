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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_metrics_get]

import (
	"context"
	"fmt"
	"io"

	recaptchaenterprise "cloud.google.com/go/recaptchaenterprise/v2/apiv1"
	recaptchaenterprisepb "cloud.google.com/go/recaptchaenterprise/v2/apiv1/recaptchaenterprisepb"
)

// getMetrics retrieves metrics for a reCAPTCHA Enterprise key.
func getMetrics(ctx context.Context, w io.Writer, projectID string, keyID string) error {
	name := fmt.Sprintf("projects/%s/keys/%s/metrics", projectID, keyID)

	client, err := recaptchaenterprise.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &recaptchaenterprisepb.GetMetricsRequest{
		Name: name,
	}

	resp, err := client.GetMetrics(ctx, req)
	if err != nil {
		return fmt.Errorf("GetMetrics failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved metrics: %s\n", resp.GetName())

	return nil
}

// [END recaptchaenterprise_v1_recaptchaenterpriseservice_metrics_get]
