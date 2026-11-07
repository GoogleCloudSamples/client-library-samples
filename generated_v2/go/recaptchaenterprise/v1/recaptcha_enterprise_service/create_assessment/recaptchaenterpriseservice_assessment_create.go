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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_assessment_create]

import (
	"context"
	"fmt"
	"io"
	"os"
	"strings"

	recaptchaenterprise "cloud.google.com/go/recaptchaenterprise/v2/apiv1"
	recaptchaenterprisepb "cloud.google.com/go/recaptchaenterprise/v2/apiv1/recaptchaenterprisepb"
)

// createAssessment creates an assessment to evaluate the risk of an event.
func createAssessment(ctx context.Context, w io.Writer, projectID string) error {
	client, err := recaptchaenterprise.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("recaptchaenterprise.NewClient: %w", err)
	}
	defer client.Close()

	parent := fmt.Sprintf("projects/%s", projectID)

	// Obtain an existing site key from the environment or list keys from the project.
	siteKey := os.Getenv("RECAPTCHA_SITE_KEY")
	if siteKey == "" {
		it := client.ListKeys(ctx, &recaptchaenterprisepb.ListKeysRequest{
			Parent: parent,
		})
		if key, err := it.Next(); err == nil && key != nil {
			siteKey = key.GetName()
		}
	}
	if siteKey == "" {
		webSettings := &recaptchaenterprisepb.WebKeySettings{
			IntegrationType: recaptchaenterprisepb.WebKeySettings_SCORE,
			AllowedDomains:  []string{"localhost"},
		}
		createdKey, err := client.CreateKey(ctx, &recaptchaenterprisepb.CreateKeyRequest{
			Parent: parent,
			Key: &recaptchaenterprisepb.Key{
				DisplayName: "example-key",
				PlatformSettings: &recaptchaenterprisepb.Key_WebSettings{
					WebSettings: webSettings,
				},
			},
		})
		if err == nil && createdKey != nil {
			siteKey = createdKey.GetName()
		}
	}
	if idx := strings.LastIndex(siteKey, "/"); idx != -1 {
		siteKey = siteKey[idx+1:]
	}
	if siteKey == "" {
		siteKey = "example-site-key"
	}

	assessment := &recaptchaenterprisepb.Assessment{
		Event: &recaptchaenterprisepb.Event{
			Token:          "example-token",
			SiteKey:        siteKey,
			ExpectedAction: "login",
		},
	}

	req := &recaptchaenterprisepb.CreateAssessmentRequest{
		Parent:     parent,
		Assessment: assessment,
	}

	resp, err := client.CreateAssessment(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateAssessment: %w", err)
	}

	fmt.Fprintf(w, "Created assessment: %s\n", resp.GetName())
	if resp.GetRiskAnalysis() != nil {
		fmt.Fprintf(w, "Risk score: %0.1f\n", resp.GetRiskAnalysis().GetScore())
	}

	return nil
}

// [END recaptchaenterprise_v1_recaptchaenterpriseservice_assessment_create]
