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

// [START iam_v1_iam_lint_policy]

import (
	"context"
	"fmt"
	"io"

	iam "cloud.google.com/go/iam/admin/apiv1"
	"cloud.google.com/go/iam/admin/apiv1/adminpb"
	expr "google.golang.org/genproto/googleapis/type/expr"
)

// lintPolicy lints an IAM policy condition to validate syntax and semantics.
func lintPolicy(ctx context.Context, w io.Writer, fullResourceName string) error {
	condition := &expr.Expr{
		Expression:  "request.time < timestamp('2025-01-01T00:00:00Z')",
		Title:       "example-condition-title",
		Description: "example-condition-description",
	}

	client, err := iam.NewIamClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIamClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.LintPolicyRequest{
		FullResourceName: fullResourceName,
		LintObject: &adminpb.LintPolicyRequest_Condition{
			Condition: condition,
		},
	}

	resp, err := client.LintPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("LintPolicy failed: %w", err)
	}

	fmt.Fprintf(w, "Lint policy results count: %d\n", len(resp.GetLintResults()))
	for _, result := range resp.GetLintResults() {
		fmt.Fprintf(w, "Level: %s, Validation unit: %s, Message: %s\n",
			result.GetLevel(),
			result.GetValidationUnitName(),
			result.GetDebugMessage(),
		)
	}

	return nil
}

// [END iam_v1_iam_lint_policy]
