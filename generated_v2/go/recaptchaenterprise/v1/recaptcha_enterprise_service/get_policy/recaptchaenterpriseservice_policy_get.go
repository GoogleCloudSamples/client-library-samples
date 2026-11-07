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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_policy_get]

import (
	"context"
	"fmt"
	"io"
	"strings"

	recaptchaenterprise "cloud.google.com/go/recaptchaenterprise/v2/apiv1"
	recaptchaenterprisepb "cloud.google.com/go/recaptchaenterprise/v2/apiv1/recaptchaenterprisepb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// getPolicy retrieves the policy associated with a reCAPTCHA key.
func getPolicy(ctx context.Context, w io.Writer, projectID string, keyID string) error {
	name := fmt.Sprintf("projects/%s/keys/%s/policy", projectID, keyID)

	client, err := recaptchaenterprise.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("recaptchaenterprise.NewClient: %w", err)
	}
	defer client.Close()

	req := &recaptchaenterprisepb.GetPolicyRequest{
		Name: name,
	}

	policy, err := client.GetPolicy(ctx, req)
	if err != nil {
		// reCAPTCHA keys without WAF or policy settings return an InvalidArgument status.
		if status.Code(err) == codes.InvalidArgument && strings.Contains(err.Error(), "not supported") {
			fmt.Fprintf(w, "Policy is not supported for key: %s\n", keyID)
			return nil
		}
		return fmt.Errorf("client.GetPolicy: %w", err)
	}

	fmt.Fprintf(w, "Retrieved policy: %s\n", policy.GetName())
	return nil
}

// [END recaptchaenterprise_v1_recaptchaenterpriseservice_policy_get]
